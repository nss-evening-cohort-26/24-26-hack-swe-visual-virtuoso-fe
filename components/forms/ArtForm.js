import React, { useState, useEffect } from 'react';
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
  description: '',
  tagIds: [],
};

function ArtForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [tags, setTags] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getTags(user.uid).then(setTags);
    if (obj.id) {
      setFormInput({ ...obj, tagIds: obj.artworkTags.map((tag) => tag.tag.id) });
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const {
      name, type, checked, value,
    } = e.target;
    if (type === 'checkbox') {
      const currentTagIds = [...formInput.tagIds];
      const tagId = parseInt(e.target.value, 10); // Assuming value attribute holds tag id
      if (checked) {
        currentTagIds.push(tagId);
      } else {
        const index = currentTagIds.indexOf(tagId);
        currentTagIds.splice(index, 1);
      }
      setFormInput((prevState) => ({
        ...prevState,
        tagIds: currentTagIds,
      }));
    } else {
      // Handle other input types (text, url, etc.)
      setFormInput((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateArt(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createArt(payload).then((title) => {
        const patchPayload = { id: title };
        updateArt(patchPayload).then(() => {
          router.push('/');
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

      <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
        <Form.Control as="textarea" placeholder="Description" style={{ height: '100px' }} name="description" value={formInput.description} onChange={handleChange} required />
      </FloatingLabel>

      {/* Checkbox section for tags */}
      <div>
        <b>Tags: </b>
        {tags.map((tag) => (
          <label key={tag.id}>
            <input type="checkbox" value={tag.id} onChange={handleChange} checked={formInput.tagIds.includes(tag.id)} />
            {tag.name}
          </label>
        ))}
      </div>

      {/* SUBMIT BUTTON */}
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
    tagsIds: PropTypes.arrayOf(PropTypes.number),
    id: PropTypes.number,
    artworkTags: PropTypes.arrayOf,
  }),
};

ArtForm.defaultProps = {
  obj: initialState,
};

export default ArtForm;
// eslint-disable-next-line no-alert
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import PropTypes from 'prop-types';
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Form from 'react-bootstrap/Form';
// import { Button } from 'react-bootstrap';
// import { useAuth } from '../../utils/context/authContext';
// import { getTags } from '../../api/tagData';
// import { createArt, updateArt } from '../../api/artData';

// const initialState = {
//   imageUrl: '',
//   title: '',
//   description: '',
//   tagIds: [],
// };
// function ArtForm({ obj }) {
//   const [formInput, setFormInput] = useState(initialState);
//   const [tags, setTags] = useState([]);
//   const [tagData, setTagData] = useState([]);
//   const router = useRouter();
//   const { user } = useAuth();

//   // useEffect(() => {
//   //   getTags(user.uid).then(setTags);
//   //   if (obj.id) setFormInput(obj);
//   // }, [obj, user]);
//   useEffect(() => {
//     getTags(user.uid).then((data) => {
//       if (obj.id) {
//         setFormInput({ ...obj, tagIds: obj.artworkTags.map((tag) => tag.tag.id) });
//         setTagData(obj.artworkTags.map((tag) => tag.tag.id));
//         // Update tagIds state with existing tags
//         console.warn(obj.artworkTags);
//         setTags(() => data.map((tag) => ({
//           ...tag,
//           isSelected: obj.artworkTags?.some((t) => t.tag.id === tag.id),
//         })),
//         // setTags((prevState) => prevState.filter((tag) => obj.tagIds?.includes(tag.id)));
//         // eslint-disable-next-line function-paren-newline
//         );
//       } else { setTags(data); }
//     });
//     console.warn(tags);
//   }, [obj, user]);

//   useEffect(() => {
//     console.warn(formInput);
//     setTagData(formInput.tagIds);
//     const tagsArray = formInput.artworkTags?.map((tag) => ({
//       label: tag.tag.name,
//       value: tag.tag.id,
//     }));
//     console.warn(tagsArray);
//   }, [formInput]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     console.warn(e);
//     setFormInput((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // const handleTagChange = (selectedOptions) => {
//   //   console.warn(selectedOptions);
//   //   console.warn(formInput);
//   //   console.warn(tags);
//   //   // Update formInput.tagIds with the selected tag IDs
//   //   setFormInput((prevState) => ({
//   //     ...prevState,
//   //     tagIds: selectedOptions.map((option) => option.value),
//   //   }));
//   // };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (obj.id) {
//       updateArt(formInput).then(() => router.push('/'));
//     } else {
//       const payload = { ...formInput, uid: user.uid };
//       createArt(payload).then((title) => {
//         const patchPayload = { id: title };
//         updateArt(patchPayload).then(() => {
//           router.push('/');
//         });
//       });
//     }
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Art</h2>
//       <FloatingLabel controlId="floatingInput1" label="Art Image" className="mb-3">
//         <Form.Control
//           type="url"
//           placeholder="Enter Image URL"
//           name="imageUrl"
//           value={formInput.imageUrl}
//           onChange={handleChange}
//           required
//         />
//       </FloatingLabel>

//       <FloatingLabel controlId="floatingInput2" label="Art Title" className="mb-3">
//         <Form.Control
//           type="text"
//           placeholder="Enter Title"
//           name="title"
//           value={formInput.title}
//           onChange={handleChange}
//           required
//         />
//       </FloatingLabel>

//       <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
//         <Form.Control
//           as="textarea"
//           placeholder="Description"
//           style={{ height: '100px' }}
//           name="description"
//           value={formInput.description}
//           onChange={handleChange}
//           required
//         />
//       </FloatingLabel>

//       <FloatingLabel controlId="floatingSelect" label="">
//         <Form>
//           {['checkbox'].map((type) => (
//             <div key={`inline-${type}`} className="mb-3">
//               <Form.Check
//                 inline
//                 label="Surrealism"
//                 name="group1"
//                 type={type}
//                 id={`inline-${type}-1`}
//               />
//               <Form.Check
//                 inline
//                 label="Impressionism"
//                 name="group1"
//                 type={type}
//                 id={`inline-${type}-2`}
//               />
//               <Form.Check
//                 inline
//                 label="Abstract"
//                 name="group1"
//                 type={type}
//                 id={`inline-${type}-3`}
//               />
//               <Form.Check
//                 inline
//                 label="Realism"
//                 name="group1"
//                 type={type}
//                 id={`inline-${type}-2`}
//               />
//               <Form.Check
//                 inline
//                 label="Cubism"
//                 name="group1"
//                 type={type}
//                 id={`inline-${type}-2`}
//               />
//               <Form.Check
//                 inline
//                 label="Portraiture"
//                 name="group1"
//                 type={type}
//                 id={`inline-${type}-2`}
//               />
//               <Form.Check
//                 inline
//                 label="Romanticism"
//                 name="group1"
//                 type={type}
//                 id={`inline-${type}-2`}
//               />
//             </div>
//           ))}
//         </Form>
//       </FloatingLabel>

//       {/* SUBMIT BUTTON  */}
//       <Button type="submit">{obj.id ? 'Update' : 'Create'} Art</Button>
//     </Form>
//   );
// }
// ArtForm.propTypes = {
//   obj: PropTypes.shape({
//     imageUrl: PropTypes.string,
//     title: PropTypes.string,
//     description: PropTypes.string,
//     tags: PropTypes.string,
//     tagsIds: PropTypes.arrayOf(PropTypes.number),
//     id: PropTypes.number,
//     artworkTags: PropTypes.arrayOf,
//   }),
// };

// ArtForm.defaultProps = {
//   obj: initialState,
// };

// export default ArtForm;
