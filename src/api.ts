// ---------------------------------------------------------------------------
// api.ts — Fetches real brewery data from the Open Brewery DB API and
//          generates fake seat-availability labels.
// ---------------------------------------------------------------------------

import type { Brewery, AvailabilityLevel } from './types';

// The API endpoint. We hardcode a single city query (San Diego, 15 results)
// as the assignment suggests, so the list always loads with real data.
const API_URL =
  'https://api.openbrewerydb.org/v1/breweries?by_city=san_diego&per_page=15';

/**
 * Fetch the list of breweries from Open Brewery DB.
 * Throws on non-OK responses so the caller can show an error state.
 */
export async function fetchBreweries(): Promise<Brewery[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  // The API returns an array of brewery objects. We cast each one to our
  // trimmed Brewery interface — extra fields are simply ignored.
  const data = await response.json();
  return data as Brewery[];
}

/**
 * Deterministically pick a Low / Medium / High label from a brewery ID.
 *
 * We use a simple hash of the ID string so the SAME brewery always gets the
 * SAME availability level on every reload. Without this, labels would
 * reshuffle every time the component re-rendered, which looks buggy.
 *
 * The API has no real seat-availability field — this is entirely faked.
 */
export function seedAvailability(id: string): AvailabilityLevel {
  // Sum the char-code values of every character in the ID. This gives us a
  // stable numeric seed from the string.
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash += id.charCodeAt(i);
  }

  // Map the hash into three buckets. Modulo 3 gives us 0, 1, or 2.
  const bucket = hash % 3;

  const levels: AvailabilityLevel[] = ['Low', 'Medium', 'High'];
  return levels[bucket];
}
