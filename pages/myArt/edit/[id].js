import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleArt } from '../../../api/artData';
import ArtForm from '../../../components/forms/ArtForm';

export default function EditArt() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  // make a call to the API to get the member data
  useEffect(() => {
    getSingleArt(id).then(setEditItem);
  }, [id]);

  // pass object to form
  return (<ArtForm obj={editItem} />);
}
