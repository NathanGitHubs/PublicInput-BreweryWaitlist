// ---------------------------------------------------------------------------
// useWaitlist.ts — A small React hook that manages which breweries the user
//                  has joined the waitlist for, persisting to localStorage.
// ---------------------------------------------------------------------------

import { useState, useCallback } from 'react';

// The key under which we store the waitlist in localStorage. Using a
// namespaced key avoids collisions with other apps on the same origin.
const STORAGE_KEY = 'brewery-waitlist:joined';

/**
 * Read the saved set of brewery IDs from localStorage on first load.
 * Returns an empty Set if nothing is stored yet or if parsing fails.
 *
 * A Set is used (rather than an array) because membership checks are O(1)
 * and we never need duplicates or ordering here.
 */
function loadInitial(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed: string[] = JSON.parse(raw);
    return new Set(parsed);
  } catch {
    // If localStorage is disabled or the JSON is corrupt, start empty.
    return new Set();
  }
}

/**
 * useWaitlist — returns the current set of joined brewery IDs plus a
 * `toggle` function that adds or removes a brewery and persists the change.
 */
export function useWaitlist() {
  // Lazy-initialise state from localStorage so it only reads once on mount.
  const [joined, setJoined] = useState<Set<string>>(loadInitial);

  /**
   * Add or remove a brewery ID from the waitlist, then write the updated
   * set to localStorage so it survives a page refresh.
   */
  const toggle = useCallback((breweryId: string) => {
    // Use the functional updater form so we always branch off the latest
    // state, even if multiple toggles fire in the same tick.
    setJoined((prev) => {
      const next = new Set(prev);
      if (next.has(breweryId)) {
        next.delete(breweryId);
      } else {
        next.add(breweryId);
      }

      // Persist the new set as a JSON array. Wrap in try/catch so a full
      // storage quota or disabled localStorage doesn't crash the app.
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        // Silently ignore — in-memory state still updates for this session.
      }

      return next;
    });
  }, []);

  return { joined, toggle };
}
