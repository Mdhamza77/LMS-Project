import React, { useState } from "react";
import { addCategory } from "../../../services/book/book.service";
import { Form, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CategoryName } from "../../../utils/validation/RegexValidator";
const AddCategory = () => {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const [Img, setImg] = useState("");
  const [err, setErr] = useState("")

  const handleSubmit = (e) => {
    const cat = {
      category: category,
      Img: Img,
    };
    e.preventDefault();
    if(!CategoryName(addCategory)){
         return setErr("Enter validated category name")
    }else {
    addCategory(cat)
      .then((res) => {
        console.log(res)
        setImg("");
        setCategory("");
        navigate('/home') 
      })
      .catch((err) => { 
        console.log(err) 
        toast(`cannot add the category`) 
      });
    }
  };
  return (
    <div className="cat">
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
        { err.length > 0 && <p style={{color : "red"}}>{err}</p>}
        <Button onClick={handleSubmit}   disabled={!Img || !category}>Add-Category</Button>
      </Form>
    </div>
  );
};

export default AddCategory;
