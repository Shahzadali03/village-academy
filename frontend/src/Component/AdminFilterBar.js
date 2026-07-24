import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';

const AdminFilterBar = ({
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Search records...',
  filters = [],
  onClear,
  resultCount,
  totalCount,
}) => {
  const hasActiveFilters =
    Boolean(searchValue?.trim()) ||
    filters.some((filter) => filter.value && filter.value !== 'all');

  return (
    <div className="admin-filter-bar">
      <div className="admin-filter-bar-top">
        <span className="admin-filter-bar-title">
          <i className="bi bi-sliders" aria-hidden="true" />
          Filters
        </span>
        {typeof resultCount === 'number' && typeof totalCount === 'number' && (
          <span className="admin-filter-bar-pill">
            {resultCount} result{resultCount === 1 ? '' : 's'}
          </span>
        )}
      </div>

      <Row className="g-3 align-items-end">
        <Col lg={4} md={6}>
          <Form.Label className="admin-filter-label">Search</Form.Label>
          <div className="admin-filter-search">
            <i className="bi bi-search" aria-hidden="true" />
            <Form.Control
              type="search"
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={searchPlaceholder}
            />
          </div>
        </Col>

        {filters.map((filter) => (
          <Col lg={2} md={6} key={filter.id}>
            <Form.Label className="admin-filter-label">{filter.label}</Form.Label>
            <Form.Select value={filter.value} onChange={(event) => filter.onChange(event.target.value)}>
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </Col>
        ))}

        <Col lg="auto" className="ms-lg-auto">
          <div className="admin-filter-meta">
            {hasActiveFilters && onClear && (
              <button type="button" className="admin-filter-clear" onClick={onClear}>
                <i className="bi bi-x-lg me-1" aria-hidden="true" />
                Clear filters
              </button>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminFilterBar;
