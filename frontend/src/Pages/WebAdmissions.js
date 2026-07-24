import React, { useEffect, useMemo, useState } from 'react';
import {
  Container, Row, Col, Card, Table, Button, Badge, Spinner
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchWebAdmissionsRequest,
  deleteWebAdmissionRequest,
} from '../Redux/action/webAdmissionAction';
import CustomPagination from '../Component/CustomPagination';
import AdminPageHeader from '../Component/AdminPageHeader';
import AdminFilterBar from '../Component/AdminFilterBar';
import {
  AdminDetailModal,
  AdminDetailHero,
  AdminDetailSection,
  AdminDetailItem,
  AdminDetailGrid,
  AdminDetailNote,
} from '../Component/AdminDetailModal';
import { matchesSearch } from '../utils/listFilters';

const WebAdmissions = () => {
  const dispatch = useDispatch();
  const { webAdmissions, success, loading } = useSelector((state) => state.webAdmissions);

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredRecords = useMemo(() => {
    return webAdmissions.filter((application) => {
      if (categoryFilter !== 'all' && application.admission_category !== categoryFilter) {
        return false;
      }

      return matchesSearch(application, search, [
        'student_name',
        'father_name',
        'phone',
        'email',
        'course_name',
        'class_applying',
      ]);
    });
  }, [webAdmissions, search, categoryFilter]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage) || 1;

  useEffect(() => {
    dispatch(fetchWebAdmissionsRequest());
  }, [dispatch, success]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, categoryFilter, recordsPerPage]);

  const clearFilters = () => {
    setSearch('');
    setCategoryFilter('all');
  };

  const handleView = (application) => {
    setSelectedApplication(application);
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedApplication(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this web admission?')) {
      dispatch(deleteWebAdmissionRequest(id));
    }
  };

  const getCategoryBadge = (category) => {
    if (category === 'professional') {
      return <Badge bg="success">Professional</Badge>;
    }
    return <Badge bg="primary">Tuition</Badge>;
  };

  const getProgramLabel = (application) => {
    if (application.admission_category === 'professional') {
      return application.course_name || 'N/A';
    }
    return application.class_applying || 'N/A';
  };

  const formatDate = (value) => {
    if (!value) return 'N/A';
    return new Date(value).toLocaleString();
  };

  return (
    <div className="admin-page fade-in">
      <Container fluid className="py-4">
        <AdminPageHeader
          badge="Website Applications"
          icon="globe2"
          title="Web Admissions"
          subtitle="Applications submitted through the public admission form"
        />

        <AdminFilterBar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search by name, phone, or program..."
          resultCount={filteredRecords.length}
          totalCount={webAdmissions.length}
          onClear={clearFilters}
          filters={[
            {
              id: 'category',
              label: 'Category',
              value: categoryFilter,
              onChange: setCategoryFilter,
              options: [
                { value: 'all', label: 'All Categories' },
                { value: 'tuition', label: 'Tuition' },
                { value: 'professional', label: 'Professional' },
              ],
            },
          ]}
        />

      <Card className="admin-card admin-table-card shadow-sm">
        <Card.Header className="admin-card-header">
          <Row className="align-items-center">
            <Col md={4}>
              <h5 className="mb-0">Web Admission Applications</h5>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body className="p-0">
          {loading ? (
            <div className="admin-loading">
              <Spinner animation="border" variant="primary" />
              <div className="mt-2">Loading web admissions...</div>
            </div>
          ) : (
            <div className="data-table-wrapper">
              <Table responsive hover className="mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Father Name</th>
                    <th>Category</th>
                    <th>Program</th>
                    <th>Phone</th>
                    <th>Submitted</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.length > 0 ? (
                    currentRecords.map((application) => (
                      <tr key={application.id}>
                        <td>{application.id}</td>
                        <td>{application.student_name}</td>
                        <td>{application.father_name}</td>
                        <td>{getCategoryBadge(application.admission_category)}</td>
                        <td>{getProgramLabel(application)}</td>
                        <td>
                          <div className="small">
                            <div><i className="bi bi-telephone me-1"></i>{application.phone}</div>
                          </div>
                        </td>
                        <td>{formatDate(application.created_at)}</td>
                        <td>
                          <div className="table-actions">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => handleView(application)}
                              title="View Details"
                            >
                              <i className="bi bi-eye"></i>
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDelete(application.id)}
                              title="Delete"
                            >
                              <i className="bi bi-trash"></i>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">
                        <div className="empty-state">
                          <i className="bi bi-inbox"></i>
                          <h5>No Web Admissions Found</h5>
                          <p>Applications submitted from the website will appear here.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>

        {filteredRecords.length > 0 && (
          <div className="admin-table-footer">
            <CustomPagination
              totalRecords={filteredRecords.length}
              totalPages={totalPages}
              currentPage={currentPage}
              pageSize={recordsPerPage}
              setPageSize={setRecordsPerPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </Card>

      <AdminDetailModal
        show={showDetailModal}
        onHide={handleCloseModal}
        title="Web Admission Details"
        subtitle={selectedApplication ? `Application #${selectedApplication.id}` : ''}
        icon="globe2"
        footer={
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        }
      >
        {selectedApplication && (
          <>
            <AdminDetailHero
              name={selectedApplication.student_name}
              subtitle={getProgramLabel(selectedApplication)}
              meta={[
                { icon: 'telephone', text: selectedApplication.phone },
                { icon: 'envelope', text: selectedApplication.email || 'No email provided' },
              ]}
            />

            <AdminDetailSection title="Applicant Information" icon="person-vcard">
              <AdminDetailGrid>
                <AdminDetailItem label="Student Name" value={selectedApplication.student_name} />
                <AdminDetailItem label="Father / Guardian" value={selectedApplication.father_name} />
                <AdminDetailItem label="Address" value={selectedApplication.address} md={12} />
              </AdminDetailGrid>
            </AdminDetailSection>

            <AdminDetailSection title="Program Details" icon="mortarboard">
              <AdminDetailGrid>
                <AdminDetailItem label="Category">
                  {getCategoryBadge(selectedApplication.admission_category)}
                </AdminDetailItem>
                <AdminDetailItem label="Program" value={getProgramLabel(selectedApplication)} />
                {selectedApplication.admission_category === 'tuition' && (
                  <AdminDetailItem label="Previous School" value={selectedApplication.previous_school} />
                )}
                {selectedApplication.admission_category === 'professional' && (
                  <AdminDetailItem label="Preferred Batch" value={selectedApplication.preferred_batch} />
                )}
              </AdminDetailGrid>
            </AdminDetailSection>

            <AdminDetailSection title="Submission Details" icon="clock-history">
              <AdminDetailGrid>
                <AdminDetailItem label="Submitted At" value={formatDate(selectedApplication.created_at)} />
              </AdminDetailGrid>
              {(selectedApplication.message || '').trim() && (
                <AdminDetailNote label="Additional Notes" value={selectedApplication.message} />
              )}
            </AdminDetailSection>
          </>
        )}
      </AdminDetailModal>
      </Container>
    </div>
  );
};

export default WebAdmissions;
