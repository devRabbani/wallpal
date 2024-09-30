"use server";

import { headers } from "next/headers";
import prisma from "./db";
import { WallpaperConfig, WallpapersResponse } from "./types";
import { generateWallpaperHash } from "./utils";
import { revalidateTag, unstable_cache } from "next/cache";
import ratelimit from "./ratelimit";

const getIp = () => {
  const forwardedFor = headers().get("x-forwarded-for");
  const realIp = headers().get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  if (realIp) return realIp.trim();

  return "0.0.0.0";
};

// Saving Wallpaper in DB

export const saveWallpaper = async (config: WallpaperConfig) => {
  try {
    const ip = getIp();

    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return {
        error: "Too many requests!, Try after some time",
      };
    }

    const wallpaperHash = generateWallpaperHash(config);
    const { textPosition, ...otherConfig } = config;
    const newWallpaper = await prisma.wallpaper.create({
      data: {
        ...otherConfig,
        hash: wallpaperHash,
        textPositionX: textPosition.x,
        textPositionY: textPosition.y,
      },
    });
    if (!newWallpaper.id)
      return {
        error: "Something went wrong",
      };
    revalidateTag(`wallpapers-${ip}`);
    console.log("New Wallpaper Created", newWallpaper.id);
  } catch (error: any) {
    console.log(error?.message);
    if (error.code === "P2002") {
      return;
    }
    return {
      error: error?.message,
    };
  }
};

export const getWallpapers = async (
  cursor?: number | null,
  pageSize: number = 8
): Promise<WallpapersResponse> => {
  const ip = getIp();

  return unstable_cache(
    async () => {
      try {
        const wallpapers = await prisma.wallpaper.findMany({
          take: pageSize + 1, // To check has more
          ...(cursor ? { cursor: { id: cursor as number }, skip: 1 } : {}),
          orderBy: { createdAt: "desc" },
        });

        const hasMore = wallpapers.length > pageSize;
        const wallpapersPagesize = hasMore
          ? wallpapers.slice(0, -1)
          : wallpapers;

        const wallpapersPreview = wallpapersPagesize.map((wallpaper) => {
          const { textPositionX, textPositionY, ...otherData } = wallpaper;
          return {
            ...otherData,
            textPosition: {
              x: textPositionX,
              y: textPositionY,
            },
          };
        });

        const nextCursor = hasMore
          ? wallpapersPagesize[wallpapersPagesize.length - 1].id
          : null;
        return {
          wallpapers: wallpapersPreview || [],
          nextCursor: nextCursor,
          hasMore,
        };
      } catch (error: any) {
        console.log(error?.message);
        return {
          error: error?.message,
        };
      }
    },
    [`wallpapers-${ip}`],
    {
      revalidate: 60 * 60 * 2, // 2 hours
      tags: [`wallpapers-${ip}`],
    }
  )();
};
