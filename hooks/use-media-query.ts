import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    
    const updateMatches = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    // Set initial value
    setMatches(media.matches)

    // Add event listener
    media.addEventListener('change', updateMatches)

    // Clean up
    return () => {
      media.removeEventListener('change', updateMatches)
    }
  }, [query])

  return matches
}