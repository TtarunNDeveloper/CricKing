import React from 'react';

const OddsTradingValues = ({ odds }) => {
  if (!odds || !odds.matchWinner) {
    return <p className="mt-2">No odds data available.</p>;
  }

  return (
    <div>
      <p className="mt-2">Trading Values: </p>
      <ul className="list-disc pl-6">
        <li>Match Winner: {odds.matchWinner.team1} (Team 1) | {odds.matchWinner.team2} (Team 2)</li>
        <li>Total Runs: {odds.totalRuns.over} (Over) | {odds.totalRuns.under} (Under)</li>
      </ul>
    </div>
  );
};

export default OddsTradingValues;
