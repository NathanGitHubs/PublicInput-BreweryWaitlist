// ---------------------------------------------------------------------------
// BreweryCard.tsx — A single brewery card: name, type, location, fake seat
//                   availability badge, and a join/leave waitlist button.
// ---------------------------------------------------------------------------

import type { Brewery, AvailabilityLevel } from './types';

// Props the parent passes down. `isJoined` and `onToggle` connect this card
// to the shared waitlist state in App.tsx.
interface BreweryCardProps {
  brewery: Brewery;
  availability: AvailabilityLevel;
  isJoined: boolean;
  onToggle: (id: string) => void;
}

// Map each availability level to a CSS class so the badge color changes.
// The classes are defined in styles.css.
const availabilityClass: Record<AvailabilityLevel, string> = {
  Low: 'badge badge-low',
  Medium: 'badge badge-medium',
  High: 'badge badge-high',
};

export function BreweryCard({
  brewery,
  availability,
  isJoined,
  onToggle,
}: BreweryCardProps) {
  return (
    <article className="card">
      <div className="card-header">
        <h2 className="card-name">{brewery.name}</h2>
        {/* Color-coded badge showing fake seat availability */}
        <span className={availabilityClass[availability]}>{availability}</span>
      </div>

      {/* Brewery type, capitalised for display (API returns lowercase) */}
      <p className="card-type">
        {brewery.brewery_type.charAt(0).toUpperCase() + brewery.brewery_type.slice(1)}
      </p>

      <p className="card-location">
        {brewery.city}, {brewery.state_province}
      </p>

      {/* Status line: tells the user whether they're currently in line */}
      <p className="card-status">
        {isJoined ? "You're in line" : 'Not on waitlist'}
      </p>

      {/* Toggle button: text and class change based on joined state */}
      <button
        className={isJoined ? 'btn btn-leave' : 'btn btn-join'}
        onClick={() => onToggle(brewery.id)}
      >
        {isJoined ? 'Leave waitlist' : 'Join waitlist'}
      </button>
    </article>
  );
}
