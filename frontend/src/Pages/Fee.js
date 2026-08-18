import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Row, Col, Card, Table, Form,
  Badge, Spinner, Alert
} from 'react-bootstrap';
import { Toaster } from 'react-hot-toast';
import { addFeeRequest, getFeeRequest, updateFeeRequest } from '../Redux/action/feeAction';
import CustomPagination from '../Component/CustomPagination';
import AdminPageHeader from '../Component/AdminPageHeader';
import AdminFilterBar from '../Component/AdminFilterBar';
import { matchesSearch } from '../utils/listFilters';

const getPeriodKey = (month, year) => `${month}-${year}`;

const formatMonthName = (month, year) =>
  new Date(year, month - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

const formatCurrency = (value) => `Rs. ${Number(value || 0).toLocaleString('en-PK')}`;

const Fee = () => {
  const now = new Date();
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(10);
  const [selectedPeriod, setSelectedPeriod] = useState({
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const dispatch = useDispatch();

  const {
    feeList,
    loading,
    savingFeeId,
    error,
    totalCollection,
    pendingCollection,
    paidCount,
    totalCount,
    monthOptions,
  } = useSelector((state) => state.fees);

  const selectedLabel = formatMonthName(selectedPeriod.month, selectedPeriod.year);

  const dropdownOptions = useMemo(() => {
    const options = [...(monthOptions || [])];
    const selectedKey = getPeriodKey(selectedPeriod.month, selectedPeriod.year);
    const exists = options.some(
      (option) => getPeriodKey(option.month, option.year) === selectedKey
    );

    if (!exists) {
      options.unshift({
        month: selectedPeriod.month,
        year: selectedPeriod.year,
        collection: totalCollection,
        pending: pendingCollection,
        total_count: totalCount,
      });
    }

    return options;
  }, [monthOptions, selectedPeriod, totalCollection, pendingCollection, totalCount]);

  useEffect(() => {
    dispatch(getFeeRequest(selectedPeriod));
  }, [dispatch, selectedPeriod]);

  const filteredFees = useMemo(() => {
    return feeList.filter((fee) => {
      if (statusFilter === 'paid' && !fee?.isPaid) return false;
      if (statusFilter === 'unpaid' && fee?.isPaid) return false;

      return matchesSearch(fee, search, [
        'student.name',
        'student.father_name',
        'student.phone_number',
        'student.classes.name',
      ]);
    });
  }, [feeList, search, statusFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, selectedPeriod, studentsPerPage]);

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('all');
  };

  const indexOfLastRecord = currentPage * studentsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - studentsPerPage;
  const currentFees = filteredFees.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredFees.length / studentsPerPage) || 1;

  const handleFeeStatus = (fee) => {
    if (fee?.isPaid) return;

    const confirmed = window.confirm(`Mark ${fee?.student?.name || 'this student'}'s fee as paid?`);
    if (confirmed) {
      dispatch(addFeeRequest(fee.id, selectedPeriod));
    }
  };

  const handleAmountSave = (fee, value) => {
    const nextAmount = Number(value);

    if (!Number.isFinite(nextAmount) || nextAmount < 0) {
      return;
    }

    if (nextAmount === Number(fee?.amount || 0)) {
      return;
    }

    dispatch(updateFeeRequest(fee.id, { amount: nextAmount }, selectedPeriod));
  };

  return (
    <div className="fee-page admin-page dashboard fade-in">
      <Container fluid className="py-4">
        <Toaster />

        <AdminPageHeader
          badge="Finance"
          icon="cash-coin"
          title="Fees Management"
          subtitle="Track monthly collections, pending dues, and student payment status"
        />

        {error && (
          <Alert variant="danger" className="mb-3">
            {error}
          </Alert>
        )}

        <AdminFilterBar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search by student name, father name, or phone..."
          resultCount={filteredFees.length}
          totalCount={feeList.length}
          onClear={clearFilters}
          filters={[
            {
              id: 'month',
              label: 'Month',
              value: getPeriodKey(selectedPeriod.month, selectedPeriod.year),
              onChange: (value) => {
                const [month, year] = value.split('-').map(Number);
                setSelectedPeriod({ month, year });
              },
              options: dropdownOptions.map((option) => ({
                value: getPeriodKey(option.month, option.year),
                label: `${formatMonthName(option.month, option.year)} — ${formatCurrency(option.collection)}`,
              })),
            },
            {
              id: 'status',
              label: 'Status',
              value: statusFilter,
              onChange: setStatusFilter,
              options: [
                { value: 'all', label: 'All Status' },
                { value: 'paid', label: 'Paid' },
                { value: 'unpaid', label: 'Unpaid' },
              ],
            },
          ]}
        />

        <Row className="g-3 mb-4">
          <Col md={4}>
            <Card className="fee-stat-card collected">
              <Card.Body className="d-flex align-items-center gap-3 p-4">
                <div className="fee-stat-icon">
                  <i className="bi bi-cash-stack"></i>
                </div>
                <div>
                  <div className="fee-stat-label">Total Collection</div>
                  <p className="fee-stat-value mb-0">
                    {loading ? '...' : formatCurrency(totalCollection)}
                  </p>
                  <small className="text-muted">{selectedLabel}</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="fee-stat-card pending">
              <Card.Body className="d-flex align-items-center gap-3 p-4">
                <div className="fee-stat-icon">
                  <i className="bi bi-hourglass-split"></i>
                </div>
                <div>
                  <div className="fee-stat-label">Pending Amount</div>
                  <p className="fee-stat-value mb-0">
                    {loading ? '...' : formatCurrency(pendingCollection)}
                  </p>
                  <small className="text-muted">Unpaid fees this month</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="fee-stat-card paid-count">
              <Card.Body className="d-flex align-items-center gap-3 p-4">
                <div className="fee-stat-icon">
                  <i className="bi bi-check2-circle"></i>
                </div>
                <div>
                  <div className="fee-stat-label">Paid Students</div>
                  <p className="fee-stat-value mb-0">
                    {loading ? '...' : `${paidCount} / ${totalCount}`}
                  </p>
                  <small className="text-muted">Payment completion rate</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="fee-table-card admin-table-card">
          <Card.Header>
            <Row className="align-items-center g-2">
              <Col md={8}>
                <h5 className="fee-table-title">Student Fee Records</h5>
                <div className="fee-table-meta">
                  Showing fees for <strong>{selectedLabel}</strong>
                </div>
              </Col>
              <Col md={4} className="text-md-end">
                <Badge bg="light" text="dark" className="px-3 py-2">
                  {filteredFees.length} students
                </Badge>
              </Col>
            </Row>
          </Card.Header>

          <Card.Body className="p-0">
            {loading ? (
              <div className="admin-loading">
                <Spinner animation="border" variant="primary" />
                <div className="mt-2">Loading fee records...</div>
              </div>
            ) : (
              <>
                <Table responsive hover className="mb-0">
                  <thead>
                    <tr>
                      <th>Fee ID</th>
                      <th>Student</th>
                      <th>Father Name</th>
                      <th>Class</th>
                      <th>Contact</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Mark Paid</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentFees.length > 0 ? (
                      currentFees.map((fee) => {
                        const isSaving = savingFeeId === fee?.id;

                        return (
                        <tr key={fee?.id}>
                          <td className="fw-medium">#{String(fee?.id || '').slice(-6)}</td>
                          <td>{fee?.student?.name}</td>
                          <td>{fee?.student?.father_name}</td>
                          <td>
                            <Badge bg="primary">{fee?.student?.classes?.name || 'N/A'}</Badge>
                          </td>
                          <td>
                            <div className="small">
                              <i className="bi bi-telephone me-1"></i>
                              {fee?.student?.phone_number}
                            </div>
                          </td>
                          <td className="fee-amount">
                            <div className={`fee-amount-editor${fee?.isPaid ? ' is-paid' : ''}`}>
                              <span className="fee-amount-prefix">Rs.</span>
                              <Form.Control
                                type="number"
                                min="0"
                                step="1"
                                size="sm"
                                className="fee-amount-input"
                                defaultValue={fee?.amount ?? 0}
                                key={`${fee?.id}-${fee?.amount}-${fee?.isPaid}`}
                                disabled={Boolean(fee?.isPaid) || isSaving}
                                onBlur={(event) => handleAmountSave(fee, event.target.value)}
                                onKeyDown={(event) => {
                                  if (event.key === 'Enter') {
                                    event.target.blur();
                                  }
                                }}
                              />
                            </div>
                          </td>
                          <td>
                            <Badge
                              bg={fee?.isPaid ? 'success' : 'warning'}
                              className="fee-status-badge"
                            >
                              {fee?.isPaid ? 'Paid' : 'Unpaid'}
                            </Badge>
                          </td>
                          <td>
                            <Form.Check
                              type="switch"
                              id={`fee-switch-${fee?.id}`}
                              className="fee-switch"
                              onChange={() => handleFeeStatus(fee)}
                              checked={Boolean(fee?.isPaid)}
                              disabled={Boolean(fee?.isPaid) || isSaving}
                            />
                            {isSaving && (
                              <Spinner animation="border" size="sm" className="ms-2" />
                            )}
                          </td>
                        </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center py-5 text-muted">
                          <i className="bi bi-inbox fs-2 d-block mb-2"></i>
                          No fee records found for {selectedLabel}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>

                {filteredFees.length > 0 && (
                  <div className="admin-table-footer">
                    <CustomPagination
                      totalRecords={filteredFees.length}
                      totalPages={totalPages}
                      currentPage={currentPage}
                      pageSize={studentsPerPage}
                      setPageSize={setStudentsPerPage}
                      setCurrentPage={setCurrentPage}
                    />
                  </div>
                )}
              </>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Fee;
