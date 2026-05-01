import { useEffect, useState } from 'react';
import apiBase from '../config';

const endpoint = `${apiBase}/api/teams/`;

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        console.log('Teams endpoint:', endpoint);
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: failed to load teams`);
        }

        const data = await response.json();
        console.log('Teams fetched data:', data);

        const normalizedData = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : [];

        setTeams(normalizedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return <p>Loading teams...</p>;
  }

  if (error) {
    return <p>Error loading teams: {error}</p>;
  }

  return (
    <section>
      <h2>Teams</h2>
      {teams.length === 0 ? (
        <p>No teams available.</p>
      ) : (
        <ul>
          {teams.map((team) => (
            <li key={team.id ?? team.name}>{team.name ?? 'Unnamed team'}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Teams;
