import React, { useState, useEffect, useMemo } from 'react';
import {
  Container, Row, Col, Card, Table, Button, Form, Modal, Badge, Spinner
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addAdmissionsRequest, deleteAdmissionsRequest, fetchAdmissionsRequest, updateAdmissionsRequest } from '../Redux/action/admissionAction';
import CustomPagination from '../Component/CustomPagination';
import Classes from '../Component/Classes';
import AdminPageHeader from '../Component/AdminPageHeader';
import AdminFilterBar from '../Component/AdminFilterBar';
import {
  AdminDetailModal,
  AdminDetailHero,
  AdminDetailSection,
  AdminDetailItem,
  AdminDetailGrid,
} from '../Component/AdminDetailModal';
import { matchesSearch, uniqueOptions } from '../utils/listFilters';

const Admissions = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [admissionsPerPage, setAdmissionsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');

  const [applicationForm, setApplicationForm] = useState({
    student: {
      name: "",
      father_name: "",
      age: "",
      gender: "",
      class_id: "",
      phone_number: "",
      address: ""
    },

    admission_date: "",
    previous_school: "",
    guardian_name: "",
    guardian_number: ""
  });

  const dispatch = useDispatch();

  const { admissions, success, loading } = useSelector(state => state.admissions);

  const classOptions = useMemo(
    () => uniqueOptions(admissions, (item) => item?.student?.classes?.name, (item) => item?.student?.classes?.name),
    [admissions]
  );

  const filteredAdmissions = useMemo(() => {
    return admissions.filter((application) => {
      if (classFilter !== 'all' && String(application?.student?.classes?.name) !== classFilter) {
        return false;
      }

      if (genderFilter !== 'all' && application?.student?.gender !== genderFilter) {
        return false;
      }

      return matchesSearch(application, search, [
        'student.name',
        'student.father_name',
        'student.phone_number',
        'guardian_name',
        'previous_school',
        'student.classes.name',
      ]);
    });
  }, [admissions, search, classFilter, genderFilter]);

  const indexOfLastadmission = currentPage * admissionsPerPage;
  const indexOfFirstadmission = indexOfLastadmission - admissionsPerPage;

  const currentadmissions = filteredAdmissions.slice(
    indexOfFirstadmission,
    indexOfLastadmission
  );

  const totalPages = Math.ceil(filteredAdmissions.length / admissionsPerPage) || 1;

  useEffect(() => {
    dispatch(fetchAdmissionsRequest());
  }, [dispatch, success]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, classFilter, genderFilter, admissionsPerPage]);

  const clearFilters = () => {
    setSearch('');
    setClassFilter('all');
    setGenderFilter('all');
  };

  const handleShowModal = (application = null) => {
    if (application) {
      setIsEditing(true);
      setSelectedApplication(application);

      setApplicationForm({
        student: {
          name: application.student.name,
          father_name: application.student.father_name,
          age: application.student.age,
          gender: application.student.gender,
          class_id: application?.student?.class_id,
          phone_number: application.student.phone_number,
          address: application.student.address
        },
        admission_date: application.admission_date,
        previous_school: application.previous_school,
        guardian_name: application.guardian_name,
        guardian_number: application.guardian_number
      });
    } else {
      setIsEditing(false);

      setApplicationForm({
        student: {
          name: "",
          father_name: "",
          age: null,
          gender: "",
          class_id: "",
          phone_number: "",
          address: ""
        },
        admission_date: "",
        previous_school: "",
        guardian_name: "",
        guardian_number: ""
      });
    }

    setShowModal(true);
  };

  const handleShowDetailModal = (application) => {
    setSelectedApplication(application);
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowDetailModal(false);
    setIsEditing(false);
    setSelectedApplication(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const studentFields = [
      "name",
      "father_name",
      "age",
      "gender",
      "class_id",
      "phone_number",
      "address"
    ];

    if (studentFields.includes(name)) {
      setApplicationForm((prev) => ({
        ...prev,
        student: {
          ...prev.student,
          [name]: name === 'age' ? (value === '' ? '' : Number(value)) : value,
        },
      }));
    } else {
      setApplicationForm((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...applicationForm,
      student: {
        ...applicationForm.student,
        age: Number(applicationForm.student.age),
      },
    };

    if (isEditing) {
      dispatch(updateAdmissionsRequest(selectedApplication.id, payload));
    } else {
      dispatch(addAdmissionsRequest(payload));
    }

    handleCloseModal();
  };

  const handledelete = (id) => {
    if (window.confirm("Are you sure want to Delete")) {
      dispatch(deleteAdmissionsRequest(id))
    }
  }

  return (
    <div className="admin-page fade-in">
      <Container fluid className="py-4">
        <AdminPageHeader
          badge="Enrollment"
          icon="clipboard-data"
          title="Admissions Management"
          subtitle="Process and track student admission applications"
          actions={
            <Button variant="primary" onClick={() => handleShowModal()}>
              <i className="bi bi-plus-lg me-2" />
              New Admission
            </Button>
          }
        />

        <AdminFilterBar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search by student, guardian, or school..."
          resultCount={filteredAdmissions.length}
          totalCount={admissions.length}
          onClear={clearFilters}
          filters={[
            {
              id: 'class',
              label: 'Class',
              value: classFilter,
              onChange: setClassFilter,
              options: [{ value: 'all', label: 'All Classes' }, ...classOptions],
            },
            {
              id: 'gender',
              label: 'Gender',
              value: genderFilter,
              onChange: setGenderFilter,
              options: [
                { value: 'all', label: 'All Genders' },
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
              ],
            },
          ]}
        />

      <Card className="admin-card admin-table-card shadow-sm">
        <Card.Header className="admin-card-header border-0">
          <h5 className="mb-0">Admissions List</h5>
        </Card.Header>

        <Card.Body className="p-0">
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <div className="mt-2">Loading applications...</div>
            </div>
          ) : (
            <div className="data-table-wrapper">
              <Table responsive hover className="mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Father Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Class</th>
                    <th>Contact Number</th>
                    <th>Previous School</th>
                    <th>Admission Date</th>
                    <th>Gaurdian Name</th>
                    <th>Gaurdian Contact</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentadmissions.length > 0 ? (
                    currentadmissions.map((application) => {
                      return (
                        <tr key={application.id}>
                          <td>
                            <div className="fw-bold text-primary">
                              {application?.id}
                            </div>
                          </td>
                          <td>{application?.student?.name}</td>
                          <td>{application?.student?.father_name}</td>
                          <td>{application?.student?.age}</td>
                          <td>{application?.student?.gender}</td>
                          <td>
                            <Badge bg="primary">{application?.student?.classes?.name}</Badge>
                          </td>
                          <td>{application?.student?.phone_number}</td>
                          <td>{application?.previous_school}</td>
                          <td>{application?.admission_date}</td>
                          <td>{application?.guardian_name}</td>
                          <td>{application?.guardian_number}</td>
                          <td>
                            <div className="table-actions">
                              <Button
                                variant="outline-info"
                                size="sm"
                                onClick={() => handleShowDetailModal(application)}
                                title="View Details"
                              >
                                <i className="bi bi-eye"></i>
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handledelete(application.id)}
                                title="View Details"
                              >
                                <i className="bi bi-trash"></i>
                              </Button>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => handleShowModal(application)}
                                title="Edit"
                              >
                                <i className="bi bi-pencil"></i>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="12" className="text-center py-5">
                        <div className="empty-state">
                          <i className="bi bi-inbox"></i>
                          <h4>No Applications Found</h4>
                          <p>No applications match your current filters.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>

        {filteredAdmissions.length > 0 && (
          <div className="admin-table-footer">
            <CustomPagination
              totalRecords={filteredAdmissions.length}
              totalPages={totalPages}
              currentPage={currentPage}
              pageSize={admissionsPerPage}
              setPageSize={setAdmissionsPerPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </Card>

      {/* Application Form Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? 'Edit Application' : 'New Application'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <h6 className="text-primary mb-3">Student Information</h6>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={applicationForm?.student?.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Father Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="father_name"
                        value={applicationForm?.student?.father_name}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Contact *</Form.Label>
                      <Form.Control
                        type="number"
                        name="phone_number"
                        value={applicationForm?.student?.phone_number}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Age</Form.Label>
                      <Form.Control
                        type="number"
                        name="age"
                        value={applicationForm?.student?.age}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Gender *</Form.Label>
                      <Form.Select
                        name="gender"
                        value={applicationForm?.student?.gender}
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
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Previous School</Form.Label>
                  <Form.Control
                    type="text"
                    name="previous_school"
                    value={applicationForm?.previous_school}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <h6 className="text-primary mb-3">Guardian Information</h6>
                <Form.Group className="mb-3">
                  <Form.Label>Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="guardian_name"
                    value={applicationForm?.guardian_name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Contact Number *</Form.Label>
                      <Form.Control
                        type="tel"
                        name="guardian_number"
                        value={applicationForm?.guardian_number}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Address *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="address"
                    value={applicationForm?.student?.address}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* <hr /> */}

            <Row>
              <h6 className="text-primary mb-3">Application Details</h6>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Class Applying For *</Form.Label>
                  <Form.Select
                    name="class_id"
                    value={applicationForm?.student?.class_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Class</option>
                    <Classes id={applicationForm.student?.class_id}/>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Admission Date *</Form.Label>
                  <Form.Control
                    type="date"
                    name="admission_date"
                    value={applicationForm?.admission_date}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              {isEditing ? 'Update Application' : 'Add Application'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <AdminDetailModal
        show={showDetailModal}
        onHide={handleCloseModal}
        title="Application Details"
        subtitle={selectedApplication ? `Admission #${selectedApplication.id}` : ''}
        icon="clipboard-check"
        footer={
          <>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleCloseModal();
                handleShowModal(selectedApplication);
              }}
            >
              Edit Application
            </Button>
          </>
        }
      >
        {selectedApplication && (
          <>
            <AdminDetailHero
              name={selectedApplication?.student?.name}
              subtitle={selectedApplication?.student?.classes?.name}
              meta={[
                { icon: 'telephone', text: selectedApplication?.student?.phone_number },
                { icon: 'calendar-event', text: selectedApplication?.admission_date },
              ]}
            />

            <AdminDetailSection title="Student Information" icon="person">
              <AdminDetailGrid>
                <AdminDetailItem label="Name" value={selectedApplication?.student?.name} />
                <AdminDetailItem label="Father's Name" value={selectedApplication?.student?.father_name} />
                <AdminDetailItem label="Gender" value={selectedApplication?.student?.gender} />
                <AdminDetailItem label="Age" value={selectedApplication?.student?.age} />
                <AdminDetailItem label="Contact" value={selectedApplication?.student?.phone_number} />
                <AdminDetailItem label="Previous School" value={selectedApplication?.previous_school || 'Not specified'} />
              </AdminDetailGrid>
            </AdminDetailSection>

            <AdminDetailSection title="Guardian Information" icon="people">
              <AdminDetailGrid>
                <AdminDetailItem label="Guardian Name" value={selectedApplication?.guardian_name} />
                <AdminDetailItem label="Guardian Phone" value={selectedApplication?.guardian_number} />
                <AdminDetailItem label="Address" value={selectedApplication?.student?.address} md={12} />
              </AdminDetailGrid>
            </AdminDetailSection>

            <AdminDetailSection title="Application Status" icon="check2-circle">
              <AdminDetailGrid>
                <AdminDetailItem label="Class">
                  <Badge bg="primary">{selectedApplication?.student?.classes?.name}</Badge>
                </AdminDetailItem>
                <AdminDetailItem label="Date of Admission" value={selectedApplication?.admission_date} />
              </AdminDetailGrid>
            </AdminDetailSection>
          </>
        )}
      </AdminDetailModal>
      </Container>
    </div>
  );
};

export default Admissions;