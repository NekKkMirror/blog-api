import ReactPaginate from "react-paginate";
import React from "react";

const Pagination = ({ onChangePage }) => {
  return (
    <ReactPaginate
      className="pagination"
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={20}
      pageCount={10}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
