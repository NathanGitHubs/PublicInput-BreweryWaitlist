// ---------------------------------------------------------------------------
// App.tsx — Top-level component. Fetches breweries, manages loading/error
//           state, and renders the grid of brewery cards.
// ---------------------------------------------------------------------------

import { useState, useEffect } from 'react';
import type { Brewery } from './types';
import { fetchBreweries, seedAvailability } from './api';
import { useWaitlist } from './useWaitlist';
import { BreweryCard } from './BreweryCard';

export function App() {
  // --- State ---------------------------------------------------------------
  // breweries: the list fetched from the API (null until loaded).
  // loading: true while the fetch is in flight.
  // error: an error message string if the fetch failed, otherwise null.
  const [breweries, setBreweries] = useState<Brewery[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // joined: the set of brewery IDs the user has waitlisted (persisted).
  // toggle: add/remove a brewery ID from that set.
  const { joined, toggle } = useWaitlist();

  /**
   * Fetch breweries on mount. We define it as a standalone function so we
   * can call it again from the retry button if the first attempt fails.
   */
  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBreweries();
      setBreweries(data);
    } catch (err) {
      // err is typed as unknown, so we narrow it to a readable message.
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Empty dependency array = run once on mount.
  useEffect(() => {
    load();
  }, []);

  // --- Render: loading state ----------------------------------------------
  if (loading) {
    return (
      <div className="app">
        <header className="header">
          <h1>Brewery Waitlist</h1>
          <p className="subtitle">Find a brewery and get in line.</p>
        </header>
        <p className="status-message">Loading breweries…</p>
      </div>
    );
  }

  // --- Render: error state -------------------------------------------------
  if (error) {
    return (
      <div className="app">
        <header className="header">
          <h1>Brewery Waitlist</h1>
          <p className="subtitle">Find a brewery and get in line.</p>
        </header>
        <div className="error-box">
          <p className="status-message">Couldn't load breweries: {error}</p>
          {/* Retry button re-runs the same fetch */}
          <button className="btn btn-join" onClick={load}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  // --- Render: success state ----------------------------------------------
  return (
    <div className="app">
      <header className="header">
        <h1>Brewery Waitlist</h1>
        <p className="subtitle">Find a brewery and get in line.</p>
      </header>

      {/* Show how many breweries the user is currently waiting for */}
      <p className="waitlist-count">
        You're on {joined.size} waitlist{joined.size === 1 ? '' : 's'}
      </p>

      {/* Responsive grid of brewery cards */}
      <main className="grid">
        {breweries?.map((brewery) => (
          <BreweryCard
            key={brewery.id}
            brewery={brewery}
            availability={seedAvailability(brewery.id)}
            isJoined={joined.has(brewery.id)}
            onToggle={toggle}
          />
        ))}
      </main>
    </div>
  );
}
