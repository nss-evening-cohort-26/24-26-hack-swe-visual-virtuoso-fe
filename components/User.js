import React from 'react';
import Card from 'react-bootstrap/Card';
import { useAuth } from '../utils/context/authContext';

export default function UserProfile() {
  const { user } = useAuth();
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <div>
        <h1>{user.displayName}</h1>
        <img src={user.photoURL} alt="userURL" />
        <h3>{user.email}</h3>
      </div>
    </Card>
  );
}
