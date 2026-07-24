import React, { useState, useEffect, useMemo } from 'react';
import {
  Container, Row, Col, Card, Table, Button, Form, Modal,
  Badge, Spinner
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEnquiriesRequest, addEnquiriesRequest, updateEnquiriesRequest, deleteEnquiriesRequest } from '../Redux/action/enquiryAction';
import CustomPagination from '../Component/CustomPagination';
import Classes from '../Component/Classes';
import AdminPageHeader from '../Component/AdminPageHeader';
import AdminFilterBar from '../Component/AdminFilterBar';
import { matchesSearch, uniqueOptions } from '../utils/listFilters';

const Enquiries = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [enquiriesPerPage, setEnquiriesPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');

  const dispatch = useDispatch();
  const { enquiries, success, loading } = useSelector(state => state.enquiries);

  const classOptions = useMemo(
    () => uniqueOptions(enquiries, (enquiry) => enquiry?.classes?.name, (enquiry) => enquiry?.classes?.name),
    [enquiries]
  );

  const sourceOptions = useMemo(
    () => uniqueOptions(enquiries, (enquiry) => enquiry.source, (enquiry) => enquiry.source?.replace(/_/g, ' ')),
    [enquiries]
  );

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((enquiry) => {
      if (sourceFilter !== 'all' && enquiry.source !== sourceFilter) {
        return false;
      }

      if (classFilter !== 'all' && String(enquiry?.classes?.name) !== classFilter) {
        return false;
      }

      return matchesSearch(enquiry, search, [
        'name',
        'father_name',
        'phone_number',
        'previous_school',
        'classes.name',
      ]);
    });
  }, [enquiries, search, sourceFilter, classFilter]);

  const indexOfLastenquiries = currentPage * enquiriesPerPage;
  const indexOfFirstenquiries = indexOfLastenquiries - enquiriesPerPage;

  const currentenquiries = filteredEnquiries.slice(
    indexOfFirstenquiries,
    indexOfLastenquiries
  );

  const totalPages = Math.ceil(filteredEnquiries.length / enquiriesPerPage) || 1;


  
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    father_name: '',
    age: '',
    gender: '',
    phone_number: '',
    address: '',
    class_id: '',
    source: '',
    previous_school: ''
  });

  useEffect(() => {
    dispatch(fetchEnquiriesRequest());
  }, [dispatch, success]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, sourceFilter, classFilter, enquiriesPerPage]);

  const clearFilters = () => {
    setSearch('');
    setSourceFilter('all');
    setClassFilter('all');
  };

  const handleShowModal = (enquiry = null) => {
    if (enquiry) {
      setIsEditing(true);
      setSelectedEnquiry(enquiry);
      setEnquiryForm({
        name: enquiry.name,
        father_name: enquiry.father_name,
        age: enquiry.age,
        gender: enquiry.gender,
        phone_number: enquiry.phone_number,
        address: enquiry.address,
        class_id: enquiry.class_id,
        source: enquiry.source,
        previous_school: enquiry.previous_school
      });
    } else {
      setIsEditing(false);
      setSelectedEnquiry(null);
      setEnquiryForm({
        name: '',
        father_name: '',
        age: '',
        gender: '',
        phone_number: '',
        address: '',
        class_id: '',
        source: '',
        previous_school: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setSelectedEnquiry(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEnquiryForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      dispatch(updateEnquiriesRequest(selectedEnquiry.id, enquiryForm));
    } else {
      dispatch(addEnquiriesRequest(enquiryForm));
    }

    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      dispatch(deleteEnquiriesRequest(id));
    }
  };

  const getSourceBadge = (source) => {
    const sourceConfig = {
      website: { bg: 'primary', icon: 'globe' },
      phone: { bg: 'success', icon: 'telephone' },
      walk_in: { bg: 'info', icon: 'door-open' },
      referral: { bg: 'warning', icon: 'people' },
      social_media: { bg: 'danger', icon: 'share' },
      advertisement: { bg: 'secondary', icon: 'megaphone' }
    };

    const config = sourceConfig[source] || sourceConfig.website;

    return (
      <Badge bg={config.bg} className="d-flex align-items-center gap-1">
        <i className={`bi bi-${config.icon}`} />
        {source}
      </Badge>
    );
  };

  return (
    <div className="admin-page fade-in">
      <Container fluid className="py-4">
        <AdminPageHeader
          badge="Lead Management"
          icon="question-circle"
          title="Enquiries Management"
          subtitle="Track and manage admission enquiries from prospective students"
          actions={
            <Button variant="primary" onClick={() => handleShowModal()}>
              <i className="bi bi-plus-lg me-2" />
              New Enquiry
            </Button>
          }
        />

        <AdminFilterBar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search by name, phone, or school..."
          resultCount={filteredEnquiries.length}
          totalCount={enquiries.length}
          onClear={clearFilters}
          filters={[
            {
              id: 'source',
              label: 'Source',
              value: sourceFilter,
              onChange: setSourceFilter,
              options: [{ value: 'all', label: 'All Sources' }, ...sourceOptions],
            },
            {
              id: 'class',
              label: 'Class',
              value: classFilter,
              onChange: setClassFilter,
              options: [{ value: 'all', label: 'All Classes' }, ...classOptions],
            },
          ]}
        />

      <Card className="admin-card admin-table-card shadow-sm">
        <Card.Header className="admin-card-header">
          <Row className="align-items-center">
            <Col md={4}>
              <h5 className="mb-0">Enquiries List</h5>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body className="p-0">
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <div className="mt-2">Loading enquiries...</div>
            </div>
          ) : (
            <div className="data-table-wrapper">
              <Table responsive hover className="mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Father Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Class</th>
                    <th>Number</th>
                    <th>Source</th>
                    <th>previous School</th>
                    {/* <th>Address</th> */}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentenquiries.length > 0 ? (
                    currentenquiries.map((enquiry) => (
                      <tr key={enquiry.id}>
                        <td>{enquiry.id}</td>
                        <td>{enquiry.name}</td>
                        <td>{enquiry.father_name}</td>
                        <td>{enquiry.gender}</td>
                        <td>{enquiry.age}</td>
                        <td>
                          <Badge bg="primary">{enquiry.classes?.name}</Badge>
                        </td>
                        <td>
                          <div className="small">
                            <div><i className="bi bi-telephone me-1"></i>{enquiry.phone_number}</div>
                          </div>
                        </td>
                        <td>{getSourceBadge(enquiry.source)}</td>
                        <td>
                          <div className="small">{enquiry.previous_school || 'N/A'}</div>
                        </td>
                        {/* <td>{enquiry.address || 'N/A'}</td> */}
                        <td>
                          <div className="table-actions">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => handleShowModal(enquiry)}
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDelete(enquiry.id)}
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
                      <td colSpan="10" className="text-center">
                        <div className="empty-state">
                          <i className="bi bi-inbox"></i>
                          <h5>No Enquiries Found</h5>
                          <p>No enquiries match your current filters.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>

        {filteredEnquiries.length > 0 && (
          <div className="admin-table-footer">
            <CustomPagination
              totalRecords={filteredEnquiries.length}
              totalPages={totalPages}
              currentPage={currentPage}
              pageSize={enquiriesPerPage}
              setPageSize={setEnquiriesPerPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </Card>

      {/* Add/Edit Enquiry Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? 'Edit Enquiry' : 'New Enquiry'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={enquiryForm.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter full name"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Father Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="father_name"
                    value={enquiryForm.father_name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter father name"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Age *</Form.Label>
                  <Form.Control
                    type="text"
                    name="age"
                    value={enquiryForm.age}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter age"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Gender*</Form.Label>
                  <Form.Select
                    name="gender"
                    value={enquiryForm.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number *</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone_number"
                    value={enquiryForm.phone_number}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter phone number"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Class *</Form.Label>
                  <Form.Select
                    name="class_id"
                    value={enquiryForm.class_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Class</option>
                    <Classes  id={enquiryForm.class_id}/>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Source *</Form.Label>
                  <Form.Select
                    name="source"
                    value={enquiryForm.source}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Source</option>
                    <option value="website">Website</option>
                    <option value="phone">Phone Call</option>
                    <option value="walk_in">Walk In</option>
                    <option value="referral">Referral</option>
                    <option value="social_media">Social Media</option>
                    <option value="advertisement">Advertisement</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Previous School</Form.Label>
              <Form.Control
                type="text"
                name="previous_school"
                value={enquiryForm.previous_school}
                onChange={handleInputChange}
                placeholder="Enter previous school"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="address"
                value={enquiryForm.address}
                onChange={handleInputChange}
                placeholder="Enter address"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              {isEditing ? 'Update Enquiry' : 'Add Enquiry'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      </Container>
    </div>
  );
};

export default Enquiries;