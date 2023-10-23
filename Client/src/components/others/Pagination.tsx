import { useNavigate } from "react-router-dom";

export const Pagination = ({ currentPage = 0, totalPages = 1 }) => {
  const navigate = useNavigate();
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = totalPages >= 5 ? 5 : totalPages;
    const halfPagesToShow = Math.floor(maxPagesToShow / 2);
    let startingPage = currentPage - halfPagesToShow;
    let endingPage = currentPage + halfPagesToShow;

    if (startingPage < 1) {
      startingPage = 1;
      endingPage = maxPagesToShow;
    } else if (endingPage > totalPages) {
      endingPage = totalPages;
      startingPage = totalPages - maxPagesToShow + 1;
    }

    for (let i = startingPage; i <= endingPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((pageNumber) => (
      <li
        key={pageNumber}
        className={`page-item ${currentPage === pageNumber ? "active" : ""}`}
      >
        <button
          className="page-link"
          onClick={() => navigate(`/blog/page/${pageNumber}`)}
        >
          {pageNumber}
        </button>
      </li>
    ));
  };

  return (
    <div className="pagination-container text-center">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => navigate(`/blog/page/${currentPage - 1}`)}
            disabled={currentPage === 1}
          >
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </button>
        </li>
        {renderPageNumbers()}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => navigate(`/blog/page/${currentPage + 1}`)}
            disabled={currentPage === totalPages}
          >
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </button>
        </li>
      </ul>
    </div>
  );
};
