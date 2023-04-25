import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";
import { getBooks, deleteBooks } from "../../services/book/book.service";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const UBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const Rent = (id) => {
    navigate(`/Rent/` + id);
  };

  const Delete = (id) => {
    deleteBooks(id)
      .then(toast("Deleted successfully"), navigate("/home"))
      .catch((err) => console.log(err));
  };

  const Edit = (id) => {
    navigate("/EditBooks/" + id);
  };

  const isUserLoggedin = sessionStorage.getItem("isUserLoggedin")
    ? sessionStorage.getItem("isUserLoggedin")
    : false;
  const isAdmin = sessionStorage.getItem("isAdmin")
    ? sessionStorage.getItem("isAdmin")
    : false;
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
        toast('cannot load book data')
      });
  };
  return (
    <div className="Book">
      <div>
        <div>
          <Form className="Id">
            <div className="container-black">
              <img className="book-Img" src={img} />
              <h1>Book Name : {bookName}</h1>
              <p>Description : {description}</p>
              <h3>Author Name : {authorName}</h3>
              <p>Category : {category}</p>
              <p>Quantity : {quantity}</p>
              <p>Price : {price}</p>
              {isUserLoggedin && !isAdmin && (
                <Button className="blue" id="Button" onClick={() => Rent(id)}>
                  Rent Book
                </Button>
              )}
              {isUserLoggedin && isAdmin && (
                <Button className="blue" id="Button" onClick={() => Edit(id)}>
                  Edit Books
                </Button>
              )}
              {isUserLoggedin && isAdmin && (
                <Button className="red" id="Button" onClick={() => Delete(id)}>
                  Delete Books
                </Button>
              )}
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UBook;
