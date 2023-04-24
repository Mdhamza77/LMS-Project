import React, { useState, useEffect } from "react";
import { getCategory } from "./../../services/book/book.service";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../pagination/Pagination";
const Books = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(data.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { category } = useParams();
  const get = () => {
    getCategory(category)
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    get();
  }, []);

  const handleClick = (id) => {
    navigate("/category/books/:category/" + id);
  };

  const Posts = ({ data }) => {
    return (
      <div className="posts">
        <div className="ui">
          <div className="ui link cards">
            {data
              .filter((item) => item.category)
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
              ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Posts data={currentPosts} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={data.length}
        paginate={paginate}
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </div>
  );
};

export default Books;
