import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserInfo } from '../services/userService';

export const ProfilePage = () => {
  const { username } = useParams(); // Extract username from URL
  const [userInfo, setUserInfo] = useState(null); // State to store user info
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(''); // State to handle errors

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getUserInfo(username); // Fetch user info
        setUserInfo(data);
      } catch (error) {
        setError('Failed to fetch user information. Please try again later.');
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  // Render loading state
  if (loading) {
    return <p>Loading profile...</p>;
  }

  // Render error state
  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Profile Page</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Render user info
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Profile Page</h1>
      {userInfo ? (
        <div>
          <p>
            Welcome to the profile of{' '}
            <span className="text-primary">{userInfo.fullName}</span>
          </p>
          <div className="mt-4">
            <p>Email: {userInfo.email}</p>
            <p>Birthday: {userInfo.dateOfBirth || 'N/A'}</p>
            <p>Gender: {userInfo.gender || 'N/A'}</p>
            <p>Joined: {userInfo.createdAt?.split('T')[0] || 'N/A'}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No user information available.</p>
      )}
    </div>
  );
};
