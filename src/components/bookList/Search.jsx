import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllBooks } from "../../services/book/book.service";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "semantic-ui-react";
import "../../assets/styles/App.css";

const Search = () => {
  const [searchBook, setSearchBook] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const search = params.sr;
  const laodData = async () => {
    return await getAllBooks()
      .then((res) => {
        setSearchBook(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleClick = (id) => {
    navigate("/category/books/:category/" + id);
  };

  useEffect(() => {
    laodData();
  }, []);
  return (
    <div className="posts">
      <div className="ui">
        <div className="ui link cards">
          {searchBook
            .filter((value) => {
              if (search == "") {
                return value;
              } else if (
                value.title.toLowerCase().includes(search.toLowerCase()) ||
                value.AuthorName.toLowerCase().includes(search.toLowerCase())
              ) {
                return value;
              }
            })
            .map((item) => (
              <div className="card" key={item.id}>
              <div className="image">
                <img
                  src={item.Image}
                  alt=""
                  onClick={() => handleClick(item.id)}
                />
              </div>
              <div className="content">
                <div className="header">{item.title}</div>
                <div className="meta">
                  <p>"{item.AuthorName}"</p>
                </div>
                <div className="description">
                  <b>Price</b>: {item.price}
                </div>
              </div>
              <div className="extra content">
                <span className="floated">
                  <b>Book ID : {item.id}</b>
                </span>
              </div>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
