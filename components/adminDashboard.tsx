
"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from "../app/store";
import withAuth from "../app/utils/withAuth";

const AdminDashboard = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/user/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Exclude admin users
        setUsers(response.data);
        console.log(response.data);
      } catch (error: any) {
        setError(error.response?.data?.msg || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        {users && users.map(user => (
          <li key={user._id}>{user.username} - {user.email} - {user.role}</li>
        ))}
      </ul>
    </div>
  );
};

export default withAuth(AdminDashboard);
