import React, { useState, useEffect } from "react";
import { Form, Button } from "semantic-ui-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getData, returnBook } from "../../../../services/rent/rent.service";
import NoDataImage from "../../../noData/NoDataImage";

const RentList = () => {
  const [rentedbook, getRentedBooks] = useState([]);
  const Semail = sessionStorage.getItem("email");
  const navigate = useNavigate();
  const { email } = useParams();
  const isUserLoggedin = sessionStorage.getItem("isUserLoggedin")
    ? sessionStorage.getItem("isUserLoggedin")
    : false;
  const isAdmin = sessionStorage.getItem("isAdmin")
    ? sessionStorage.getItem("isAdmin")
    : false;
  useEffect(() => {
    get();
  }, [email]);

  const get = () => {
    getData()
      .then((res) => {
        getRentedBooks(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast(`Cannot display data 404 error`);
      });
  };

  const Return = (id) => {
    returnBook(id)
      .then(() => {
        toast("Returned Book Successfully");
        navigate("/home");
        getRentedBooks();
      })
      .catch((err) => {
        console.log(err);
        toast(`Cannot return data error`);
      });
  };

  return (
    <div className="container">
      {rentedbook.length > 0 &&
      rentedbook.some((e) => e.email === Semail || e.email === email) ? (
        rentedbook
          .filter((e) => {
            if (e.email === Semail) {
              return e;
            } else if (e.email === email) {
              return e;
            }
          })
          .map((book) => (
            <div className="data" key={book.id}>
              <div className="card">
                <Form className="rent">
                  <h1>BookName : {book.title}</h1>
                  <p>
                    <b>Description :</b> {book.Description}
                  </p>
                  <h2>AuthorName : {book.AuthorName}</h2>
                  <p>
                    <b>Price :</b> {book.price}
                  </p>
                  <p>
                    <b>Rented From :</b> {book.RentFrom}
                  </p>
                  <p>
                    <b>Return Date :</b> {book.RentUpto}
                  </p>
                  <p>
                    {new Date(book.RentUpto) <= new Date()
                      ? <p style={{color : "red" , fontWeight : "bolder"}}>Fine</p>
                      : <p style={{color : "green" , fontWeight : "bolder"}}>Return book before due date</p>  }
                  </p>
                  {isUserLoggedin && !isAdmin && (
                    <Button
                      className="ui button blue"
                      onClick={() => Return(book.id)}
                    >
                      Return Book
                    </Button>
                  )}
                  <Button className="ui red" onClick={() => navigate(-1)}>
                    Go Back
                  </Button>
                </Form>
              </div>
            </div>
          ))
      ) : (
        <NoDataImage />
      )}
    </div>
  );
};

export default RentList;
