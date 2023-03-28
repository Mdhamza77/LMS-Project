import React from "react";
import { Link } from "react-router-dom";

import "../../assets/styles/style.css";

const Pagination = ({ postsPerPage, totalPosts, paginate , previousPage , nextPage}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="div">
      <ul className="pagination">
      <li onClick={previousPage} className="page-number">
               Previous
            </li>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <Link onClick={() => paginate(number)} className="page-link">
              {number}
            </Link>
          </li>
        ))}
        <li onClick={nextPage} className="page-number">
               Next
            </li>
      </ul>
    </div>
  );
};

export default Pagination;
