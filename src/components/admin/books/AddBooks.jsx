import React, { useState, useEffect } from "react";
import { Form, Button, TextArea } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { addBooks, getCat } from "../../../services/book/book.service";
import { toast } from "react-toastify";

const AddBooks = () => {
  const isUserLoggedin = sessionStorage.getItem("isUserLoggedin")
    ? sessionStorage.getItem("isUserLoggedin")
    : false;
  const isAdmin = sessionStorage.getItem("isAdmin")
    ? sessionStorage.getItem("isAdmin")
    : false;

  const navigate = useNavigate();
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");
  const [cat, getCategories] = useState([]);
  const [setData] = useState("");

  const loadData = async () => {
    return await getCat()
      .then((res) => getCategories(res.data))

      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, []);
  const handleSubmit = (e) => {
    const data = {
      title: bookName,
      AuthorName: authorName,
      Description: description,
      Quantity: quantity,
      price: price,
      Image: img,
      category: category,
    };

    e.preventDefault();

    addBooks(data)
      .then((res) => {
        setData(res.data);
        setBookName("");
        setAuthorName("");
        setDescription("");
        setQuantity("");
        setPrice("");
        setImg("");
        setCategory("");
        toast("Added Successfully");
        navigate("/home");
      })
      .catch((err) => {
        console.log(err.data);
      });
  };
  return (
    <div className="card">
      <br />

      {isUserLoggedin && isAdmin && (
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
                <label>Book Image</label>
                <input
                  type="text"
                  value={img}
                  placeholder="profile image"
                  onChange={(e) => setImg(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>Book Category</label>

                <select onChange={(e) => setCategory(e.target.value)}>
                  {" "}
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
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </Form.Field>

              <Button className="ui button blue">Add</Button>
              <Button className="ui button red" onClick={() => navigate(-1)}>
                Go Back
              </Button>
            </Form>
          </div>
        </>
      )}
    </div>
  );
};

export default AddBooks;
