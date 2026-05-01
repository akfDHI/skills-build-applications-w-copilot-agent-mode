import { useEffect, useState } from 'react';

const apiBase = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';
const endpoint = `${apiBase}/api/activities/`;

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        console.log('Activities endpoint:', endpoint);
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: failed to load activities`);
        }

        const data = await response.json();
        console.log('Activities fetched data:', data);

        const normalizedData = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : [];

        setActivities(normalizedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return <p>Loading activities...</p>;
  }

  if (error) {
    return <p>Error loading activities: {error}</p>;
  }

  return (
    <section>
      <h2>Activities</h2>
      {activities.length === 0 ? (
        <p>No activities available.</p>
      ) : (
        <ul>
          {activities.map((activity) => (
            <li key={activity.id ?? `${activity.name}-${activity.date ?? ''}`}>
              {activity.name ?? 'Unnamed activity'}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Activities;
