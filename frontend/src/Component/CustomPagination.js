import React from 'react';
import { Pagination as BSPagination, Form } from 'react-bootstrap';

const buildPageItems = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);

  return [...pages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b)
    .reduce((items, page, index, sortedPages) => {
      if (index > 0 && page - sortedPages[index - 1] > 1) {
        items.push(`ellipsis-${page}`);
      }
      items.push(page);
      return items;
    }, []);
};

const CustomPagination = ({
  totalRecords,
  totalPages,
  currentPage,
  pageSize,
  setPageSize,
  setCurrentPage,
}) => {
  const pageItems = buildPageItems(currentPage, totalPages);

  return (
    <div className="admin-pagination custom-pagination">
      <span className="admin-pagination-summary">
        Showing page <strong>{currentPage}</strong> of <strong>{Math.max(totalPages, 1)}</strong>
        <span className="admin-pagination-dot">•</span>
        <strong>{totalRecords}</strong> records
      </span>

      <div className="admin-pagination-controls">
        <div className="admin-pagination-size">
          <span className="admin-pagination-size-label">Rows</span>
          <Form.Select
            value={pageSize}
            onChange={(event) => {
              setPageSize(Number(event.target.value));
              setCurrentPage(1);
            }}
            aria-label="Rows per page"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </Form.Select>
        </div>

        {totalPages > 0 && (
          <BSPagination className="mb-0">
            <BSPagination.Prev
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            />

            {pageItems.map((item) =>
              typeof item === 'string' ? (
                <BSPagination.Ellipsis key={item} disabled />
              ) : (
                <BSPagination.Item
                  key={item}
                  active={item === currentPage}
                  onClick={() => setCurrentPage(item)}
                >
                  {item}
                </BSPagination.Item>
              )
            )}

            <BSPagination.Next
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            />
          </BSPagination>
        )}
      </div>
    </div>
  );
};

export default CustomPagination;
