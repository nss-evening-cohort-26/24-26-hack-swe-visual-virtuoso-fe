// eslint-disable-next-line no-alert
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getTags } from '../../api/tagData';
import { createArt, updateArt } from '../../api/artData';

const initialState = {
  imageUrl: '',
  title: '',
  description: '',
  tagIds: [],
};
function ArtForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [tags, setTags] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  // useEffect(() => {
  //   getTags(user.uid).then(setTags);
  //   if (obj.id) setFormInput(obj);
  // }, [obj, user]);
  useEffect(() => {
    getTags(user.uid).then(setTags);
    if (obj.id) {
      setFormInput(obj);
      console.warn(obj);
      // Update tagIds state with existing tags
      setTags((prevState) => prevState.filter((tag) => obj.tagIds?.includes(tag.id)));
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTagChange = (selectedOptions) => {
    // Update formInput.tagIds with the selected tag IDs
    setFormInput((prevState) => ({
      ...prevState,
      tagIds: selectedOptions.map((option) => option.value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateArt(formInput).then(() => router.push('/myArt' && '/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createArt(payload).then((title) => {
        const patchPayload = { id: title };
        updateArt(patchPayload).then(() => {
          router.push('/myArt' && '/');
        });
      });
    }
  };
  console.warn(obj);

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

      <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Description"
          style={{ height: '100px' }}
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="">
        <Select
          value={formInput.tags?.map((tag) => ({
            label: tag.tag.name,
            value: tag.tag.id,
          }))}
          isMulti // Enable multi-select
          onChange={handleTagChange}
          options={tags.map((tag) => ({
            label: tag.name,
            value: tag.id,
          }))}
          className="mb-3"
        />
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
    description: PropTypes.string,
    tags: PropTypes.string,
    tagIds: PropTypes.arrayOf(PropTypes.number),
    id: PropTypes.number,
  }),
};

ArtForm.defaultProps = {
  obj: initialState,
};

export default ArtForm;
