import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllBooks } from "../../services/book/book.service";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "semantic-ui-react";
import '../../assets/styles/App.css'

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

  useEffect(() => {
    laodData();
  }, []);
  return (
    <div className="posts">
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
        .map((post) => (
          <div className="card" key={post.id}>
            <p>{post.id}</p>
            <p>{post.title}</p>
            <p>{post.AuthorName}</p> 
            <div >
            <img src={post.Image} alt="image"
              style={{width : "15em" , height : "20em"  , borderRadius : "5px"}}
            />
            </div>
          </div>
        ))}
    </div>
  );
};

export default Search;
