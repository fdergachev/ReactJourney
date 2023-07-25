import React from 'react';
import "../../../styles/App.css"
import { usePagesArray } from "../../../hooks/usepagination.js";


const Pagination = ({ totalPages, page, changePage }) => {
   let pagesArray = usePagesArray(totalPages);
   return (
      <div className="page__wrapper">
         {pagesArray.map((p) =>
            <span
               key={p}
               onClick={() => changePage(p)}
               className={page === p ? 'page page__current' : 'page'} >
               {p}
            </span>
         )}
      </div>
   );
};

export default Pagination;