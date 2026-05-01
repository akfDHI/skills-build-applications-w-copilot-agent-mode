import { useEffect, useState } from 'react';

const apiBase = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';
const endpoint = `${apiBase}/api/workouts/`;

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        console.log('Workouts endpoint:', endpoint);
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: failed to load workouts`);
        }

        const data = await response.json();
        console.log('Workouts fetched data:', data);

        const normalizedData = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : [];

        setWorkouts(normalizedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return <p>Loading workouts...</p>;
  }

  if (error) {
    return <p>Error loading workouts: {error}</p>;
  }

  return (
    <section>
      <h2>Workouts</h2>
      {workouts.length === 0 ? (
        <p>No workouts available.</p>
      ) : (
        <ul>
          {workouts.map((workout) => (
            <li key={workout.id ?? `${workout.title ?? workout.name}-${workout.date ?? ''}`}>
              {workout.title ?? workout.name ?? 'Untitled workout'}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Workouts;
