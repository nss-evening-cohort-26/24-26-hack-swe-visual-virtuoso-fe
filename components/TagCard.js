import React from 'react';
import PropTypes from 'prop-types';
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import { deleteTag } from '../api/tagData';
// import Link from 'next/link';
// import { deleteSingleAuthor } from '../api/authorData';
// import { deleteAuthorBooks } from '../api/mergedData';

function TagCard({ tagObj }) { // add onUpdate here
  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  // const deleteThisTag = () => {
  //   if (window.confirm(`Delete ${tagObj.name}?`)) {
  //     deleteTag(tagObj.id).then(() => onUpdate());
  //   }
  // };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{tagObj.tags?.map((tag) => (
          <span key={tag.tag.id}>{tag.tag.name} </span>
        ))}
        </Card.Title>
        {/* <Button variant="danger" onClick={deleteThisTag} className="m-2">
          DELETE
        </Button> */}
      </Card.Body>
    </Card>
  );
}

TagCard.propTypes = {
  tagObj: PropTypes.shape({
    name: PropTypes.string,
    tags: PropTypes.number,
  }).isRequired,
  // onUpdate: PropTypes.func.isRequired,
};

export default TagCard;
