// ---------------------------------------------------------------------------
// types.ts — Shared TypeScript shapes used across the app.
// ---------------------------------------------------------------------------

// The fields we actually use from each brewery object returned by the API.
// The API returns more fields (address, phone, website, etc.) but we only
// type the ones we display, keeping the interface lean.
export interface Brewery {
  id: string;
  name: string;
  brewery_type: string;
  city: string;
  state_province: string;
}

// The three fake seat-availability levels. Seeding logic lives in api.ts.
export type AvailabilityLevel = 'Low' | 'Medium' | 'High';
