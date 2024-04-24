import React from 'react';
import { useAuth } from '../utils/context/authContext';

export default function UserProfile() {
  const { user } = useAuth();
  return (
    <div>
      <h1>{user.displayName}</h1>
      <img src={user.photoURL} alt="userURL" />
      <h3>{user.email}</h3>
      <h4>Last Sign In: {user.metadata.lastSignInTime}</h4>
    </div>
  );
}
