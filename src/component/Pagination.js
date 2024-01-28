import { useMemo } from "react";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";

function Pagination({ totalPages, currentPage, setCurrentPage }) {
  const { previousPage, nextPage } = useMemo(() => {
    let previousPage;
    let nextPage;

    if (currentPage === 1 && currentPage === totalPages) {
      previousPage = null;
      nextPage = null;
    } else if (currentPage === 1) {
      previousPage = null;
      nextPage = currentPage + 1;
    } else if (currentPage === totalPages) {
      previousPage = currentPage - 1;
      nextPage = null;
    } else {
      previousPage = currentPage - 1;
      nextPage = currentPage + 1;
    }
    return { previousPage, nextPage };
  }, [totalPages, currentPage]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <button onClick={goToPreviousPage}>
        {previousPage && (
          <div className="flex">
            <GoArrowLeft /> Page {previousPage}
          </div>
        )}
      </button>
      <button onClick={goToNextPage}>
        {nextPage && (
          <div className="flex">
            Page {nextPage} <GoArrowRight />
          </div>
        )}
      </button>
    </div>
  );
}

export default Pagination;
