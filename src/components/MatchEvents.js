import React from 'react';

const MatchEvents = ({ events }) => {
  if (!events || !events.length) {
    return <p className="mt-2">No match events available.</p>;
  }

  return (
    <div>
      <p className="mt-2">Match Events: </p>
      <ul className="list-disc pl-6">
        {events.map((event, index) => (
          <li key={index}>{event.timestamp}: {event.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default MatchEvents;
