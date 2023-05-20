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
    e.preventDefault();
    const cat = {
      category: category,
      Img: Img,
    };
    if(!CategoryName(category)){
         return setErr("Enter validated category name")
    }else {
    addCategory(cat)
      .then((res) => {
        console.log(res.data)
        setImg("");
        setCategory("");
        navigate('/home') 
      })
      .catch((err) => { 
        console.log(err) 
        toast(`cannot get api data`) 
      });
    }
  };
  return (
    <div className="cat">
      <Form>
        <Form.Field>
          <label htmlFor="catname">Category Name</label>
          <input
            type="text"
            id="catname"
            required
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="catImg">Category Image</label>
          <input
            id="catImg"
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
