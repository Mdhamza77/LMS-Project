import React, { useState } from "react";
import { addCategory } from "../../../services/book/book.service";
import { Form, Button } from "semantic-ui-react";

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const [Img, setImg] = useState("");

  const handleSubmit = (e) => {
    const cat = {
      category: category,
      Img: Img,
    };
    addCategory(cat)
      .then((res) => {
        console.log(res)
        setImg("");
        setCategory("");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Form>
        <Form.Field>
          <label>Category Name</label>
          <input
            type="text"
            required
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Category Image</label>
          <input
            type="text"
            required
            onChange={(e) => setImg(e.target.value)}
          />
        </Form.Field>
        <Button onClick={handleSubmit}>Add-Category</Button>
      </Form>
    </div>
  );
};

export default AddCategory;
