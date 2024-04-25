import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function ArtForm() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicImage">
        <Form.Label>Image</Form.Label>
        <Form.Control type="Image" placeholder="Image" />
        <Form.Text className="text-muted" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Title</Form.Label>
        <Form.Control type="password" placeholder="Art Title" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Details</Form.Label>
        <Form.Control type="password" placeholder="Art Description" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Categories</Form.Label>
        <Form.Select aria-label="Default select example">
          <option>Select</option>
          <option value="1">Surrealism</option>
          <option value="2">Impressionism</option>
          <option value="3">Abstract Expressionism</option>
          <option value="4">Realism</option>
          <option value="5">Cubism</option>
          <option value="6">Portraiture</option>
          <option value="7">Still Life</option>
          <option value="8">Romanticism</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default ArtForm;
