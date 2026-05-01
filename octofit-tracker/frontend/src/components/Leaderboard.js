import { useEffect, useState } from 'react';
import apiBase from '../config';

const endpoint = `${apiBase}/api/leaderboard/`;

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        console.log('Leaderboard endpoint:', endpoint);
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: failed to load leaderboard`);
        }

        const data = await response.json();
        console.log('Leaderboard fetched data:', data);

        const normalizedData = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : [];

        setEntries(normalizedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <p>Loading leaderboard...</p>;
  }

  if (error) {
    return <p>Error loading leaderboard: {error}</p>;
  }

  return (
    <section>
      <h2>Leaderboard</h2>
      {entries.length === 0 ? (
        <p>No leaderboard entries available.</p>
      ) : (
        <ol>
          {entries.map((entry) => (
            <li key={entry.id ?? `${entry.user ?? entry.name}-${entry.score ?? ''}`}>
              {(entry.user ?? entry.name ?? 'Unknown')}: {entry.score ?? 0}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default Leaderboard;
