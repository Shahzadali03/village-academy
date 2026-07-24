import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Row, Col, Card, Table, Button, Form, Modal,
  Badge, Spinner
} from 'react-bootstrap';
import { addStudentsRequest, deleteStudentsRequest, fetchStudentsRequest, updateStudentsRequest } from '../Redux/action/studentAction';
import CustomPagination from '../Component/CustomPagination';
import Classes from '../Component/Classes';
import AdminPageHeader from '../Component/AdminPageHeader';
import AdminFilterBar from '../Component/AdminFilterBar';
import { matchesSearch, uniqueOptions } from '../utils/listFilters';

const Students = () => {
  const dispatch = useDispatch();
  const { students, fetchLoading, Loading, success } = useSelector(state => state.students);


  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');

  const classOptions = useMemo(
    () => uniqueOptions(students, (student) => student?.classes?.name, (student) => student?.classes?.name),
    [students]
  );

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      if (classFilter !== 'all' && String(student?.classes?.name) !== classFilter) {
        return false;
      }

      if (genderFilter !== 'all' && student.gender !== genderFilter) {
        return false;
      }

      return matchesSearch(student, search, ['name', 'father_name', 'phone_number', 'classes.name']);
    });
  }, [students, search, classFilter, genderFilter]);

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage) || 1;

  const [studentForm, setStudentForm] = useState({
    name: '',
    age: '',
    phone_number: '',
    address: '',
    class_id: '',
    gender: '',
    fahter_name: '',
  });

  useEffect(() => {
    dispatch(fetchStudentsRequest());
  }, [dispatch, success]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, classFilter, genderFilter, studentsPerPage]);

  const clearFilters = () => {
    setSearch('');
    setClassFilter('all');
    setGenderFilter('all');
  };

  const handleShowModal = (student = null) => {
    if (student) {
      setSelectedStudentId(student.id);
      setIsEditing(true);
      setStudentForm({
        name: student.name || '',
        age: student.age || '',
        phone_number: student.phone_number || '',
        address: student.address || '',
        class_id: student.class_id || '',
        gender: student.gender || '',
        father_name: student.father_name || '',
      });
    } else {
      setIsEditing(false);
      setStudentForm({
        name: '',
        father_name: '',
        age: '',
        phone_number: '',
        address: '',
        class_id: '',
        gender: '',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setStudentForm({
      user: {
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        address: '',
        date_of_birth: '',
        password: ''
      },
      student_id: '',
      class_assigned: '',
      roll_number: '',
      admission_date: '',
      gender: '',
      parent_name: '',
      parent_phone: '',
      parent_email: '',
      emergency_contact: '',
      blood_group: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = { ...studentForm };

    if (isEditing) {
      dispatch(updateStudentsRequest(selectedStudentId, formData));
    } else {
      dispatch(addStudentsRequest(formData));
    }

    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      dispatch(deleteStudentsRequest(id));
    }
  };

  return (
    <div className="admin-page fade-in">
      <Container fluid className="py-4">
        <AdminPageHeader
          badge="Student Records"
          icon="people"
          title="Students Management"
          subtitle="Manage student records, classes, and contact information"
          actions={
            <Button variant="primary" onClick={() => handleShowModal()}>
              <i className="bi bi-plus-lg me-2" />
              Add Student
            </Button>
          }
        />

        <AdminFilterBar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search by name, father name, or phone..."
          resultCount={filteredStudents.length}
          totalCount={students.length}
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

        <Card className="admin-card admin-table-card">
          <Card.Header className="admin-card-header">
            <Row className="align-items-center">
              <Col md={6}>
                <h5 className="mb-0">Students List</h5>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body className="p-0">
            {fetchLoading ? (
              <div className="admin-loading">
                <Spinner animation="border" variant="primary" />
                <div className="mt-2">Loading students...</div>
              </div>
            ) : (
              <>
                <Table responsive hover className="mb-0">
                  <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Father Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Class</th>
                    <th>Contact</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPage &&
                    currentStudents.length > 0 ? (
                    currentStudents.map((student) => (
                      <tr key={student.id}>
                        <td className="fw-medium">{student.id}</td>
                        <td>{student?.name}</td>
                        <td>{student.father_name}</td>
                        <td>{student.age}</td>
                        <td>{student.gender}</td>
                        <td>
                          <Badge bg="primary">{student?.classes?.name}</Badge>
                        </td>
                        <td>
                          <div className="small">{student.phone_number}</div>
                        </td>
                        <td>
                          <div className="table-actions">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => handleShowModal(student)}
                              title="Edit"
                            >
                              <i className="bi bi-pencil" />
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDelete(student.id)}
                              title="Delete"
                            >
                              <i className="bi bi-trash" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center py-4 text-muted">
                        <i className="bi bi-inbox fs-2 d-block mb-2"></i>
                        No students found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>

            </>
          )}
        </Card.Body>

        {filteredStudents.length > 0 && (
          <div className="admin-table-footer">
            <CustomPagination
              totalRecords={filteredStudents.length}
              totalPages={totalPages}
              currentPage={currentPage}
              pageSize={studentsPerPage}
              setPageSize={setStudentsPerPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </Card>

      {/* Add/Edit Student Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? 'Edit Student' : 'Add New Student'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={12}>
                <h6 className="text-primary mb-3">Personal Information</h6>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name*</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={studentForm.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Father Name*</Form.Label>
                  <Form.Control
                    type="text"
                    name="father_name"
                    value={studentForm.father_name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    name="age"
                    value={studentForm.age}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone number*</Form.Label>
                  <Form.Control
                    type="number"
                    name="phone_number"
                    value={studentForm.phone_number}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Gender*</Form.Label>
                  <Form.Select
                    name="gender"
                    value={studentForm.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="address"
                    value={studentForm.address}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <h6 className="text-primary mb-3">Academic Information</h6>
                <Form.Group className="mb-3">
                  <Form.Label>Class Assigned*</Form.Label>
                  <Form.Select
                    name="class_id"
                    value={studentForm.class_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Class</option>
                    <Classes id = {studentForm.class_id}/>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" disabled={Loading}>
              {Loading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" className="me-2" />
                  {isEditing ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                isEditing ? 'Update Student' : 'Add Student'
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      </Container>
    </div>
  );
};

export default Students;