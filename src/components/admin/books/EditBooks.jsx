import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { TextArea, Form, Button } from "semantic-ui-react";
import { editBooks, getBooks } from "../../../services/book/book.service";
import { Textarea , AuthorName } from "../../../utils/validation/RegexValidator";

const EditBooks = () => {
  const navigate = useNavigate();
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [err,setErr] = useState("")

  const { id } = useParams();

  useEffect(() => {
    get();
  }, []);

  const get = () => {
    getBooks(id)
      .then((resp) => {
        setBookName(
          resp.data.title,
          setAuthorName(resp.data.AuthorName),
          setDescription(resp.data.Description),
          setQuantity(resp.data.Quantity),
          setPrice(resp.data.price),
          setImg(resp.data.Image),
          setCategory(resp.data.category)
        );
      })
      .catch((err) => {
        console.log(err);
        toast(`Cannot fetch the data`)
      });
  };
  const handleSubmit = () => {
    const book = {
      title: bookName,
      Description: description,
      AuthorName: authorName,
      Quantity: quantity,
      price,
      Image: img,
      category: category,
    };
    if (!Textarea(description)) {
      return setErr("Enter the Validated Books Description");
    } else {
    editBooks(id, book)
      .then((resp) => {
        console.log(resp.data);
        get();
        toast("Updated successfully");
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        toast(`Cannot edit the book`)
      }); 
    }
  };

  return (
    <div>
      <div className="container">
        <h1 className="">Edit Book</h1>
        <Form className="ui form">
          <Form.Field>
            <label htmlFor="id">Books ID</label>
            <input
              type="text"
              name="name"
              placeholder="Book ID"
              value={id}
              readOnly
              id="id"
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="book">Book Name</label>
            <input
              type="text"
              name="name"
              placeholder="Book name"
              id="book"
              value={bookName}
              readOnly
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="description">Description</label>
            <TextArea
              placeholder="Description"
              style={{ minHeight: 100 }}
              value={description}
              
              id="description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="author">Author Name</label>
            <input
              type="text"
              name="name"
              placeholder="Author name"
              value={authorName}
              id="author"
              readOnly
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="image">Book Image</label>
            <input
              type="text"
              id="image"
              value={img}
              placeholder="profile image"
              onChange={(e) => setImg(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="quantity">Book Quantity</label>
            <input
              type="number"
              name="name"
              placeholder="Books Quantity"
              min="1"
              max="50"
              value={quantity}
              id="quantity"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="price">Book Price</label>
            <input
              type="number"
              name="name"
              placeholder="Book Price"
              min="100"
              max="3000"
              value={price}
              id="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Field>
          {err.length > 0 && <p style={{color : "red"}} >{err}</p>}  
          <Button className="ui button blue" onClick={handleSubmit}>
            Save
          </Button>
          <Button className="ui button red" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditBooks;
