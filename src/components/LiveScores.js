import React, { useEffect, useState } from 'react';
import { fetchLiveScores } from '../services/api';
import team_one from "../assets/team1.png";
import team_two from "../assets/team2.png";
import ModeToggle from './ModeToggle';
import OddsTradingValues from './OddsTradingValues';
import MatchEvents from './MatchEvents';
import OddsTrends from './OddsTrends';
import { mockLiveScores } from '../services/mockData'; 

const LiveScores = () => {
  const [scores, setScores] = useState([]);
  const [isMock, setIsMock] = useState(false);
  const [filter, setFilter] = useState('all');
  const [selectedOutcome, setSelectedOutcome] = useState(null);
  const [teamNames, setTeamNames] = useState([]);

  useEffect(() => {
    const getScores = async () => {
      const { data, isMock } = await fetchLiveScores();
      console.log('API Response:', data); 
      setScores(data);
      setIsMock(isMock);

      const teams = new Set();
      data.forEach(match => {
        teams.add(match.t1);
        teams.add(match.t2);
      });
      setTeamNames(Array.from(teams));
    };

    getScores();
    //axios poling
    const intervalId = setInterval(getScores, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleOutcomeClick = (outcome) => {
    setSelectedOutcome(outcome);
  };

  const filteredScores = scores.filter(match => 
    filter === 'all' || match.t1.includes(filter) || match.t2.includes(filter) || match.series.includes(filter)
  );

  const generateOdds = (team1, team2, team1Score, team2Score) => {
    const team1Runs = parseInt(team1Score.split('/')[0]);
    const team2Runs = parseInt(team2Score.split('/')[0]);

    const keyPlayerFactor = (Math.random() * 0.2 + 0.9).toFixed(2);

    const historicalFactor = (Math.random() * 0.2 + 0.9).toFixed(2); 

    const matchConditionFactor = (Math.random() * 0.2 + 0.9).toFixed(2);

    const scoreDifference = team1Runs - team2Runs;
    const baseOdds = 1.5;

    const team1Odds = (baseOdds - scoreDifference / 100 * keyPlayerFactor * historicalFactor * matchConditionFactor).toFixed(2);
    const team2Odds = (baseOdds + scoreDifference / 100 * keyPlayerFactor * historicalFactor * matchConditionFactor).toFixed(2);

    return { team1Odds, team2Odds };
  };

  const assignMockData = (matches, mockMatches) => {
    return matches.map((match, index) => {
      if (index < 5 && mockMatches[index]) {
        return {
          ...match,
          odds: mockMatches[index].odds,
          events: mockMatches[index].events,
          trends: mockMatches[index].trends
        };
      }
      return match;
    });
  };

  const liveMatches = assignMockData(
    filteredScores.filter(match => !match.status.toLowerCase().includes('won') && match.status !== 'Match not started'),
    mockLiveScores.data.filter(match => match.status.toLowerCase().includes('live'))
  );

  const finishedMatches = assignMockData(
    filteredScores.filter(match => match.status.toLowerCase().includes('won')),
    mockLiveScores.data.filter(match => match.status.toLowerCase().includes('won'))
  );

  const upcomingMatches = assignMockData(
    filteredScores.filter(match => match.status === 'Match not started'),
    mockLiveScores.data.filter(match => match.status.toLowerCase().includes('match not started'))
  );

  return (
    <div className="p-4 bg-gray-100 min-h-screen dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold text-center mb-4">CricKing</h1>
      <h2 className="text-xl font-bold text-center mb-4 mt-2">BIG BASH LEAGUE</h2>

      {/** Dark Mode Toggle Button */}
      <div className='text-center mb-4 mt-4'>
        <ModeToggle />
      </div>
      <p className={`mb-4 text-center ${isMock ? 'text-red-500 dark:text-red-400' : 'text-green-500 dark:text-green-400'}`}>
        {isMock ? 'Currently displaying mock data due to API limits.' : 'Live data from API.'}
      </p>
      
      {/** Filters */}
      <div className="mb-4 text-center">
        <label htmlFor="filter" className="block text-lg font-semibold mb-2">Filter by:</label>
        { isMock? 
        <select id="filter" value={filter} onChange={handleFilterChange} className="p-2 border rounded-md shadow-sm dark:bg-gray-800 dark:text-white dark:border-gray-600">
          
        <option value="all">All</option>
        <option value="Auckland [AKL]">Auckland [AKL]</option>
        <option value="Canterbury [CAN]">Canterbury [CAN]</option>
        <option value="Pakistan A [PKA]">Pakistan A [PKA]</option>
        <option value="West Indies [WI]">West Indies [WI]</option>
        <option value="MI Cape Town [MICT]">MI Cape Town [MICT]</option>
        <option value="Sunrisers Eastern Cape [SEC]">Sunrisers Eastern Cape [SEC]</option>
      </select> : 
      <select id='filter' value={filter} onChange={handleFilterChange} className='p-2 border rounded-md shadow-sm dark:bg-gray-800 dark:text-white dark:border-gray-600'>
        <option value="all">All</option>
        {teamNames.map((team, index)=> (
          <option key={index} value={team}>{team}</option>
        ))}
        </select>}
        
      </div>

      {/* Section for Live Matches */}
      {liveMatches.length > 0 && (
        <div className='shadow-lg shadow-red-600 rounded-lg p-4'>
          <h2 className="text-xl font-semibold mb-2 text-center">Live Matches</h2>
          <ul className="list-disc pl-6 mb-4">
            {liveMatches.map((match) => {
              const { team1Odds, team2Odds } = generateOdds(match.t1, match.t2, match.t1s, match.t2s);
              return (
                <li key={match.id} className="mb-4 bg-green-400 p-4 rounded shadow-md dark:bg-gray-800 dark:text-white">
                  <div className="flex items-center bg-green-800 font-bold">
                    <img src={match.t1img} alt="" className="w-12 h-12 mr-2 bg-black" onError={(e) => {e.target.src = team_one; }}/>
                    <p className="font-semibold">{match.t1}</p>
                    <span className="mx-2">vs</span>
                    <img src={match.t2img} alt="" className="w-12 h-12 mr-2 bg-black" onError={(e) => {e.target.src = team_two; }}/>
                    <p className="font-semibold">{match.t2}</p>
                  </div>
                  <p className="mt-2">Match Status: {match.status}</p>
                  <p>Series: {match.series}</p>
                  <p>Score: {match.t1s} - {match.t2s}</p>
                  <p>Odds: {match.t1}: {team1Odds} | {match.t2}: {team2Odds}</p>
                  <OddsTradingValues odds={match.odds} />
                  <MatchEvents events={match.events} />
                  <button
                    className="mt-2 p-2 bg-blue-500 text-white rounded"
                    onClick={() => handleOutcomeClick(match)}
                  >
                    View Odds Trends
                  </button>
                  {selectedOutcome && selectedOutcome.id === match.id && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold">Odds Trends for {match.t1} vs {match.t2}</h3>
                      <OddsTrends trends={match.trends || []} /> {/* Pass trends data */}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
   
      {/* Section for Finished Matches */}
      {finishedMatches.length > 0 && (
        <div className='mt-4 mb-4 shadow-lg shadow-green-500 rounded-lg p-4 dark:bg-gray-800 dark:text-white'>
          <h2 className="text-xl font-semibold mb-2 text-center">Finished Matches</h2>
          <ul className="list-disc pl-6 mb-4">
            {finishedMatches.map((match) => (
              <li key={match.id} className="mb-4 bg-blue-400 p-4 rounded shadow-md dark:bg-gray-800 dark:text-white">
                <div className="flex items-center bg-blue-700 font-bold dark:bg-gray-700">
                  <img src={match.t1img} alt="" className="w-12 h-12 mr-2" onError={(e) => {e.target.src = team_one; }} />
                  <p className="font-semibold">{match.t1}</p>
                  <span className="mx-2">vs</span>
                  <img src={match.t2img} alt="" className="w-12 h-12 mr-2" onError={(e) => {e.target.src = team_two; }} />
                  <p className="font-semibold">{match.t2}</p>
                </div>
                <p className="mt-2">Match Status: {match.status}</p>
                <p>Series: {match.series}</p>
                <p>Score: {match.t1s} - {match.t2s}</p>
                <OddsTradingValues odds={match.odds} />
                <MatchEvents events={match.events} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Section for Matches Not Started */}
      {upcomingMatches.length > 0 && (
        <div className='shadow-lg shadow-yellow-500 rounded-lg p-4'>
          <h2 className="text-xl font-semibold mb-2 text-center">Upcoming Matches</h2>
          <ul className="list-disc pl-6">
            {upcomingMatches.map((match) => (
              <li key={match.id} className="mb-4 bg-teal-400 p-4 rounded shadow-md dark:bg-gray-800 dark:text-white">
                <div className="flex items-center bg-teal-700 font-bold dark:bg-gray-700">
                  <img src={match.t1img} alt="" className="w-12 h-12 mr-2" onError={(e) => {e.target.src = team_one; }} />
                  <p className="font-semibold">{match.t1}</p>
                  <span className="mx-2">vs</span>
                  <img src={match.t2img} alt="" className="w-12 h-12 mr-2" onError={(e) => {e.target.src = team_two; }} />
                  <p className="font-semibold">{match.t2}</p>
                </div>
                <p className="mt-2">Match Status: {match.status}</p>
                <p>Series: {match.series}</p>
                <p>Date: {new Date(match.dateTimeGMT).toLocaleString()}</p> {/* Convert date to local string */}
                <OddsTradingValues odds={match.odds} />
                <MatchEvents events={match.events} />
              </li>
            ))}
          </ul>
        </div>
      )}

      
      {/* Loading message */}
      {scores.length === 0 && (
        <p className="text-center">Loading scores...</p>
      )}
    </div>
  );
};

export default LiveScores;