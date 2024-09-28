"use server";

import { headers } from "next/headers";
import prisma from "./db";
import { WallpaperConfig } from "./types";
import { generateWallpaperHash } from "./utils";

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

// Get Wallpaper from DB
export const getWallpapers = async (cursor?: number, pageSize: number = 8) => {
  try {
    const wallpapers = await prisma.wallpaper.findMany({
      take: pageSize,
      ...(cursor ? { cursor: { id: cursor as number }, skip: 1 } : {}),
      orderBy: { createdAt: "desc" },
    });

    if (wallpapers.length === 0) {
      return {
        error: "Something went wrong while fetching wallpapers",
      };
    }
    const wallpapersPreview = wallpapers.map((wallpaper) => {
      const { textPositionX, textPositionY, ...otherData } = wallpaper;
      return {
        ...otherData,
        textPosition: {
          x: textPositionX,
          y: textPositionY,
        },
      };
    });

    const nextCursor =
      wallpapers.length === pageSize
        ? wallpapers[wallpapers.length - 1].id
        : null;
    return { wallpapers: wallpapersPreview, nextCursor };
  } catch (error: any) {
    console.log(error?.message);
    return {
      error: error?.message,
    };
  }
};
