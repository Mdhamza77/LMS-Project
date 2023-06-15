import React, { useEffect, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getBooks } from "../../../../services/book/book.service";
import { rentBooks } from "../../../../services/rent/rent.service";

const RentList = () => {
  const navigate = useNavigate();
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const email = sessionStorage.getItem("email");
  const { id } = useParams();

  useEffect(() => {
    getBooks(id)
      .then((resp) => {
        setBookName(resp.data.title);
        setAuthorName(resp.data.AuthorName);
        setDescription(resp.data.Description);
        setPrice(resp.data.price);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = () => {
    const rent = {
      title: bookName,
      Description: description,
      AuthorName: authorName,
      price,
      email: email,
      RentFrom: startDate.toISOString().slice(0, 10), // Format as "yyyy-MM-dd"
      RentUpto: endDate.toISOString().slice(0, 10), // Format as "yyyy-MM-dd"
      BookId: id,
    };

    rentBooks(rent)
      .then((resp) => {
        console.log(resp.data);
        toast("Book Rented");
        navigate("/home");
      })
      .catch((err) => {
        console.log(err.data);
        toast(`Cannot display data 404 error`);
      });
  };
  const filterDate = (date) => {
    return date > startDate; 
  };


  return (
    <>
      <div className="container">
        <div className="card">
          <Form className="ui form">
            <h1>Book Name: {bookName}</h1>
            <p>
              <b>Book ID: {id}</b>
            </p>
            <p>
              <b>Description :</b> {description}{" "}
            </p>
            <p>
              <b>Author Name: {authorName}</b>
            </p>
            <p>
              <b>Price: </b>
              {price}
            </p>
            <Form.Field>
              <label htmlFor="rentF">Rent Book From</label>
              <DatePicker
                placeholderText="Rent From"
                minDate={startDate}
                maxDate={startDate}
                selected={startDate}
                selectsStart
                startDate={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="rentU">Rent Book Upto Days</label>
              <DatePicker
                placeholderText="Rent Upto"
                selected={endDate}
                maxDate={
                  new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000) // Calculates the total number of milliseconds that have passed
                }
                endDate={endDate}
                minDate={startDate}
                filterDate={filterDate}
                onChange={(date) => setEndDate(date)}
              />
            </Form.Field>

            <Button className="ui button blue" onClick={handleSubmit}>
              Rent Book
            </Button>
            <Button className="ui button red" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default RentList;
