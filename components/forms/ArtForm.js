import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getTags } from '../../api/tagData';
import { createArt, updateArt } from '../../api/artData';

const initialState = {
  imageUrl: '',
  title: '',
  tagIds: [],
};
function ArtForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [tags, setTags] = useState([]);
  const [selectInput, setSelectInput] = useState();
  const router = useRouter();
  const { user } = useAuth();
  console.warn(selectInput);
  useEffect(() => {
    getTags(user.uid).then(setTags);
    if (obj.id) setFormInput(obj);
  }, [obj, user]);
  // TODO: handleselect for tags
  const handleSelect = (x) => {
    const { tagIds, value } = x.target;
    setSelectInput((prevState) => ({
      ...prevState,
      [tagIds]: value,
    }));
  };
  // (x) => formInput.tagIds.push(x)
  const handleChange = (e) => {
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
      createArt(payload).then(() => {
        router.push('/myArt' && '/');
      });
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (obj.id) {
  //     updateArt(formInput).then(() => router.push('/myArt' && '/'));
  //   } else {
  //     const payload = { ...formInput, uid: user.uid };
  //     createArt(payload).then(({ title }) => {
  //       const patchPayload = { id: title };
  //       updateArt(patchPayload).then(() => {
  //         router.push('/myArt' && '/');
  //       });
  //     });
  //   }
  // };

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

      <FloatingLabel controlId="floatingSelect" label="Tags">
        <Form.Select
          type="text"
          placeholder="Select Tags"
          name="tags"
          onChange={handleSelect}
          className="mb-3"
          value={formInput.tags}
          required
        >
          <option value="this">Select Tags</option>
          {
            tags.map((tag) => (
              <option
                key={tag.name}
                value={tag.id}
              >
                {tag.name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.id ? 'Update' : 'Create'} Art</Button>
    </Form>
  );
}
ArtForm.propTypes = {
  obj: PropTypes.shape({
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    tagIds: PropTypes.number,
    id: PropTypes.number,
  }),
};
// ArtForm.propTypes = {
//   obj: PropTypes.shape({
//     imageUrl: PropTypes.string,
//     title: PropTypes.string,
//     tags: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })),
//     id: PropTypes.number,
//   }),
// };

ArtForm.defaultProps = {
  obj: initialState,
};

export default ArtForm;
