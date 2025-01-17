import React from 'react';
import team_one from "../assets/team1.png";
import team_two from "../assets/team2.png";
import OddsTrends from './OddsTrends';
import OddsTradingValues from './OddsTradingValues';
import MatchEvents from './MatchEvents';

const MatchDetails = ({ match, handleOutcomeClick, generateOdds, selectedOutcome }) => {
  const { team1Odds, team2Odds } = generateOdds(match.t1, match.t2, match.t1s, match.t2s);

  return (
    <li key={match.id} className="mb-4 bg-white p-4 rounded shadow-md dark:bg-gray-800 dark:text-white">
      <div className="flex items-center">
        <img src={match.t1img} alt="" className="w-12 h-12 mr-2" onError={(e) => { e.target.src = team_one; }} />
        <p className="font-semibold">{match.t1}</p>
        <span className="mx-2">vs</span>
        <img src={match.t2img} alt="" className="w-12 h-12 mr-2" onError={(e) => { e.target.src = team_two; }} />
        <p className="font-semibold">{match.t2}</p>
      </div>
      <p className="mt-2">Match Status: {match.status}</p>
      <p>Series: {match.series}</p>
      <p>Score: {match.t1s} - {match.t2s}</p>
      <p>Odds: {match.t1}: {team1Odds} | {match.t2}: {team2Odds}</p>
      <MatchEvents events={match.events} />
      <OddsTradingValues odds={match.odds} />
      <button
        className="mt-2 p-2 bg-blue-500 text-white rounded"
        onClick={() => handleOutcomeClick(match)}
      >
        View Odds Trends
      </button>
      {selectedOutcome && selectedOutcome.id === match.id && (
        <OddsTrends match={match} />
      )}
    </li>
  );
};

export default MatchDetails;
