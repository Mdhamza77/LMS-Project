import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/style.css";
import { usePagination } from "../contextApi/PaginationContext";

const Pagination = () => {
  const { pageNumbers, paginate, previousPage, nextPage } = usePagination();
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
