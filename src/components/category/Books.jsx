import React, { useState, useEffect } from "react";
import { getCategory } from "./../../services/book/book.service";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../pagination/Pagination";
import { PaginationContext } from "../contextApi/PaginationContext";
import Posts from "./Posts";
import { toast } from "react-toastify";
const Books = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
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
      .catch((err) => {
        console.log(err);
        toast(`cannot load books data api error`);
      });
  };
  useEffect(() => {
    get();
  }, []);

  const handleClick = (id) => {
    navigate("/category/books/:category/" + id);
  };

  return (
    <div>
      <PaginationContext.Provider
        value={{
          postsPerPage,
          totalPosts: data.length,
          paginate,
          previousPage,
          nextPage,
        }}
      >
        <div>
          <Posts data={currentPosts} handleClick={handleClick} />
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={data.length}
            paginate={paginate}
            previousPage={previousPage}
            nextPage={nextPage}
          />
        </div>
      </PaginationContext.Provider>
    </div>
  );
};

export default Books;
