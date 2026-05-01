import { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Users endpoint:', endpoint);
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: failed to load users`);
        }

        const data = await response.json();
        console.log('Users fetched data:', data);

        const normalizedData = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : [];

        setUsers(normalizedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>Error loading users: {error}</p>;
  }

  return (
    <section>
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>No users available.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id ?? user.username}>{user.username ?? user.name ?? 'Unnamed user'}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Users;
