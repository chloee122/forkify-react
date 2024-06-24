import { useMemo } from "react";
import { IoArrowBackSharp, IoArrowForwardSharp } from "react-icons/io5";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

function Pagination({
  totalPages,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
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
    <div className="mb-8">
      {previousPage && (
        <button
          onClick={goToPreviousPage}
          className="bg-secondary rounded-full w-[25%] p-1 float-left ml-5 hover:bg-greylight2"
        >
          <div className="flex items-center justify-center gap-1 text-primary">
            <IoArrowBackSharp /> Page {previousPage}
          </div>
        </button>
      )}

      {nextPage && (
        <button
          onClick={goToNextPage}
          className="bg-secondary rounded-full w-[25%] p-1 float-right mr-5 hover:bg-greylight2"
        >
          <div className="flex items-center justify-center gap-1 text-primary">
            Page {nextPage} <IoArrowForwardSharp />
          </div>
        </button>
      )}
    </div>
  );
}

export default Pagination;
