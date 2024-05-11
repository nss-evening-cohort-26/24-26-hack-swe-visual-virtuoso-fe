/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleArt } from '../../api/artData';
// import TagCard from '../../components/TagCard';
export default function ViewArt() {
  const [artDetails, setArtDetails] = useState({});
  const router = useRouter();
  // TODO: grab firebaseKey from url
  const { id } = router.query;
  // TODO: make call to API layer to get the data
  useEffect(() => {
    getSingleArt(id).then(setArtDetails);
    getSingleArt(id).then(setArtDetails);
  }, [id]);
  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={artDetails?.imageUrl} alt={artDetails?.title} style={{ width: '300px' }} />
      </div>
      <div style={{ color: 'black' }}>
        <h5>
          {artDetails?.title}
        </h5>
        <div style={{ color: 'black', border: 'solid, 2px, black' }} className="d-flex flex-wrap">
          {artDetails.artworkTags?.map((tag) => (
            <span key={tag.tag.id}>{tag.tag.name} </span>
          ))}
          <div className="d-flex flex-wrap">
            {artDetails.artworkTags?.map((tag) => (
              <span key={tag.tag.id} style={{ margin: '3px' }}>{tag.tag.name} </span>
            ))}
          </div>
          <p>{artDetails?.description || ''}</p>
          <hr />
        </div>
      </div>
    </div>
  );
}
