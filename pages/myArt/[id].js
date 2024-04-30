/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewArtDetails } from '../../api/mergeData';

export default function ViewBook() {
  const [artDetails, setArtDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { id } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    viewArtDetails(id).then(setArtDetails);
  }, [id]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={artDetails.imageUrl} alt={artDetails.title} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {artDetails.title}
          {artDetails.tagObject?.name}
        </h5>
        <p>{artDetails.description || ''}</p>
        <hr />
      </div>
    </div>
  );
}
