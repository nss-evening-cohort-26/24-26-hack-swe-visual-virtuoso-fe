import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createArt, updateArt } from '../../api/artData';

const initialState = {
  imageUrl: '',
  title: '',
  tags: '',
};

function ArtForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    console.warn(e.target);
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateArt(formInput).then(() => router.push('/myArt' && '/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createArt(payload).then(({ title }) => {
        const patchPayload = { id: title };
        updateArt(patchPayload).then(() => {
          router.push('/myArt' && '/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Art</h2>
      <FloatingLabel controlId="floatingInput1" label="Art Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter Image URL"
          name="imageUrl"
          value={formInput.imageUrl}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Art Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Title"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect3" label="Art Categories" className="mb-3">
        <Form.Select
          type="text"
          placeholder="Select Category"
          name="tags"
          value={formInput.tags}
          onChange={handleChange}
          required
        >
          <option> Select a Category</option>
          <option value="Surrealism">Surrealism</option>
          <option value="Impressionism">Impressionism</option>
          <option value="Abstract Expressionism">Abstract Expressionism</option>
          <option value="Realism">Realism</option>
          <option value="Cubism">Cubism</option>
          <option value="Portraiture">Portraiture</option>
          <option value="Still Life">Still Life</option>
          <option value="Romanticism">Romanticism</option>
        </Form.Select>
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      {/* <Form.Check
        className="text-white mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="Favorite?"
        checked={formInput.sale}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            favortie: e.target.checked,
          }));
        }}
      /> */}

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.id ? 'Update' : 'Create'} Art</Button>
    </Form>
  );
}

ArtForm.propTypes = {
  obj: PropTypes.shape({
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    tags: PropTypes.string,
    id: PropTypes.string,
  }),
};

ArtForm.defaultProps = {
  obj: initialState,
};

export default ArtForm;
