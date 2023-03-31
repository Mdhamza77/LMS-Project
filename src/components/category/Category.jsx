import React, { useState, useEffect } from "react";
import { getCat } from "../../services/book/book.service";
import { useNavigate } from "react-router-dom";
const Category = () => {
  const [books, getBooks] = useState([]);
  const navigate = useNavigate();
  const get = async () => {
    return await getCat()
      .then((res) => {
        getBooks(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err.data));
  };

  useEffect(() => {
    get();
  }, []);

  const Category = (category) => {
    navigate("/category/books/" + category);
  };

  return (
    <div className="cat">
      {" "}
      <br />
      <br />
      <br />
      <div className="ui four column grid">
        {books.map((post) => (
          <div className="column" key={post.id}>
            <div className="ui fluid card">
              <div className="image">
                <img
                  src={post.Img}
                  alt="image"
                  onClick={() => Category(post.category)}
                />
              </div>
              <div className="content">
                <a className="header">{post.category}</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
