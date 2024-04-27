import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Link from 'next/link';
// import { useAuth } from '../utils/context/authContext';
import { getArt } from '../api/artData';
import ArtCard from '../components/ArtCard';

function Home() {
  const [art, setArt] = useState([]);

  // TODO: Get user ID using useAuth Hook
  // const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the books
  const getAllTheArt = () => {
    getArt().then(setArt);
  };
  console.warn(art);
  // TODO: make the call to the API to get all the books on component render
  useEffect(() => {
    getAllTheArt();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/myArt/new" passHref>
        <Button>Add Artwork</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over art here using ArtCard component */}
        {art.map((arts) => (
          <ArtCard key={art.id} artObj={arts} onUpdate={getAllTheArt} />
        ))}
      </div>

    </div>
  );
}

export default Home;
