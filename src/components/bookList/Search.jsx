import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllBooks } from "../../services/book/book.service";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "../../assets/styles/App.css";
import NoDataImage from "../noData/NoDataImage";

const Search = () => {
  const [searchBook, setSearchBook] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  const search = params.sr;
  const laodData = () => {
    getAllBooks()
      .then((res) => {
        setSearchBook(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast("search data error");
      });
  };
  const handleClick = (id) => {
    navigate("/search/:se/" + id);
  };

  useEffect(() => {
    laodData();
  }, [search]);

  return (
    <div className="posts">
      <div className="ui">
        <div className="ui link cards">
          {searchBook
            .filter((value) => {
              if (search === "") {
                return value;
              } else if (
                value.title.toLowerCase().includes(search.toLowerCase()) ||
                value.AuthorName.toLowerCase().includes(search.toLowerCase())
              ) {
                return value;
              }
              return null;
            })
            .map((item) => (
              <div className="card" key={item.id}>
                <div className="image">
                  <img
                    src={item.Image}
                    alt="image"
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
            ))
            .filter((item) => item !== null).length > 0 ? (
            searchBook
              .filter((value) => {
                if (search === "") {
                  return value;
                } else if (
                  value.title.toLowerCase().includes(search.toLowerCase()) ||
                  value.AuthorName.toLowerCase().includes(search.toLowerCase())
                ) {
                  return value;
                }
                return null;
              })
              .map((item) => (
                <div className="card" key={item.id}>
                  <div className="image">
                    <img
                      src={item.Image}
                      alt="image"
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
              ))
          ) : (
            <NoDataImage />
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
