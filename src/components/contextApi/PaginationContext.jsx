import { createContext, useContext } from "react";

export const PaginationContext = createContext();

export const usePagination = () => {
    const { postsPerPage, totalPosts, paginate, previousPage, nextPage } =
      useContext(PaginationContext);
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return { pageNumbers, paginate, previousPage, nextPage };
  };
