import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteArt } from '../api/artData';

function ArtCard({ artObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE ART AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE ART
  const deleteThisArt = () => {
    if (window.confirm(`Delete ${artObj.title}?`)) {
      deleteArt(artObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={artObj.imageUrl} alt={artObj.title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{artObj.title}</Card.Title>
        <Card.Text>{artObj.tags}</Card.Text>
        {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
        <Link href={`/myArt/${artObj.id}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/myArt/edit/${artObj.id}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisArt} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

ArtCard.propTypes = {
  artObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    userId: PropTypes.string,
    tags: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ArtCard;
