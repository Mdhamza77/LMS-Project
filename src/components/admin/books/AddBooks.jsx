import React, { useState, useEffect } from "react";
import { Form, Button, TextArea } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { addBooks, getCat } from "../../../services/book/book.service";
import { toast } from "react-toastify";
import {
  BookName,
  AuthorName,
  Textarea,
} from "../../../utils/validation/RegexValidator";

const AddBooks = () => {
  const navigate = useNavigate();
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");
  const [cat, getCategories] = useState([]);
  const [err, setErr] = useState("");

  const loadData = () => {
    getCat()
      .then((res) => getCategories(res.data))

      .catch((err) => {
        console.log(err);
        toast(`Cannot Fetch data from api axios error`);
      });
  };

  useEffect(() => {
    loadData();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: bookName,
      AuthorName: authorName,
      Description: description,
      Quantity: quantity,
      price: price,
      Image: img,
      category: category,
    };
    if (!BookName(bookName)) {
      return setErr("Enter validated Book Name");
    } else if (!AuthorName(authorName)) {
      return setErr("Enter validated User Name");
    } else if (!Textarea(description)) {
      return setErr("Enter the Validated Books Description");
    } else {
      addBooks(data)
        .then((res) => {
          console.log(res.data);
          setBookName("");
          setAuthorName("");
          setCategory("");
          setDescription("");
          setQuantity("");
          setImg("");
          setPrice("");
          toast("Added Successfully");
          navigate("/home");
        })
        .catch((err) => {
          console.log(err);
          toast(`Add Books api error`);
        });
    }
  };
  return (
    <div className="card">
      <>
        <h1>Add Book</h1>
        <div>
          <Form className="ui form" onSubmit={handleSubmit}>
            <Form.Field>
              <label htmlFor="book">Book Name</label>
              <input
                type="text"
                name="name"
                placeholder="Book name"
                id="book"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
                required
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="author">Author Name</label>
              <input
                type="text"
                name="name"
                placeholder="Author name"
                id="author"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                required
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="book">Book Image</label>
              <input
                id="book"
                type="text"
                value={img}
                placeholder="profile image"
                onChange={(e) => setImg(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="category">Book Category</label>
              <select
                id="category"
                onChange={(e) => setCategory(e.target.value)}
                defaultValue="default"
              >
                <option value="default" disabled>
                  Select a category
                </option>
                {cat.map((data) => (
                  <option key={data.id} value={data.category}>
                    {data.category}
                  </option>
                ))}
              </select>
            </Form.Field>
            <Form.Field>
              <label htmlFor="description">Description</label>
              <TextArea
                placeholder="Description"
                style={{ minHeight: 100 }}
                value={description}
                id="description"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="quantity">Book Quantity</label>
              <input
                type="number"
                name="name"
                placeholder="Books Quantity"
                value={quantity}
                min="1"
                max="50"
                id="quantity"
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="price">Book Price</label>
              <input
                type="number"
                name="name"
                placeholder="Book Price"
                value={price}
                min="100"
                max="3000"
                id="price"
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Field>
            {err.length > 0 && <p style={{ color: "red" }}>{err}</p>}
            <Button className="ui button blue">Add</Button>
            <Button className="ui button red" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </Form>
        </div>
      </>
    </div>
  );
};

export default AddBooks;
