import PropTypes from 'prop-types';
import React from 'react';
import Card from 'react-bootstrap/Card';
import { useAuth } from '../utils/context/authContext';

export default function UserCard() {
  const { user } = useAuth();
  console.warn(user);
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={user.fbUser.photoURL} style={{ height: '250px' }} />
      <Card.Body>
        <Card.Title>{user.fbUser.displayName}</Card.Title>
        <p className="card-text bold">Email: {user.fbUser.email}</p>
        <p className="card-text bold">Last Sign In: {user.fbUser.metadata.lastSignInTime}</p>
      </Card.Body>
    </Card>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    image: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    bio: PropTypes.string,
  }).isRequired,
};
