import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, ListGroup, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchstatsRequest } from '../Redux/action/dasboardAction';
import student from '../assets/images/dashboard/students.png';
import book from '../assets/images/dashboard/book.png';
import enquiryImg from '../assets/images/dashboard/enquiry.png';
import admissionImg from '../assets/images/dashboard/admissions.png';
import StatCard from '../Component/StatCard';
import AdminPageHeader from '../Component/AdminPageHeader';

const formatDate = (value) => {
  if (!value) return 'N/A';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString();
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading } = useSelector((state) => state.dashboard);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchstatsRequest());
  }, [dispatch]);

  const dateBlock = (
    <div className="date-time d-inline-flex align-items-center">
      <i className="bi bi-calendar4-week me-3 fs-5" />
      <div>
        <div className="fw-semibold day">
          {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
        </div>
        <div className="small date">{new Date().toLocaleDateString()}</div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="admin-page">
        <Container fluid className="py-4">
          <div className="admin-loading">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="admin-page dashboard fade-in">
      <Container fluid className="py-4">
        <AdminPageHeader
          badge="Overview"
          icon="speedometer2"
          title={`Welcome back, ${user?.name || user?.username || 'Admin'}!`}
          subtitle="Here's what's happening at your school today."
          actions={dateBlock}
        />

        <Row className="g-3 mb-4">
          <StatCard
            title="Total Students"
            value={stats.total_students}
            icon="mortarboard-fill"
            variant="primary"
            src={student}
          />
          <StatCard
            title="Total Classes"
            value={stats.total_classes}
            icon="diagram-3"
            variant="success"
            src={book}
          />
          <StatCard
            title="Total Enquiries"
            value={stats.total_inquiries}
            icon="question-circle"
            variant="warning"
            src={enquiryImg}
          />
          <StatCard
            title="Total Admissions"
            value={stats.total_admission}
            icon="check-circle"
            variant="success"
            src={admissionImg}
          />
        </Row>

        <Row className="g-3 recent-enquiry-admission">
          <Col lg={6}>
            <Card className="admin-card p-0">
              <Card.Header className="admin-card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="bi bi-chat-left-text me-2" />
                  Recent Enquiries
                </h5>
                <Link to="/admin/enquiries">View All</Link>
              </Card.Header>
              <Card.Body className="p-0">
                {stats.recent_inquiries?.length > 0 ? (
                  <ListGroup variant="flush">
                    {stats.recent_inquiries.slice(0, 3).map((item) => (
                      <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                        <div>
                          <div className="fw-medium">{item.name}</div>
                          <small className="text-muted">{item.phone_number}</small>
                        </div>
                        <div className="text-end">
                          <Badge bg="primary">{item.classes?.name || 'N/A'}</Badge>
                          <div className="small text-muted">
                            {formatDate(item.created_at)}
                          </div>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <div className="text-center py-4 text-muted">
                    <i className="bi bi-inbox fs-2 d-block mb-2" />
                    No recent enquiries
                  </div>
                )}
                <Link className="view-all" to="/admin/enquiries">View All Enquiries</Link>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6}>
            <Card className="admin-card p-0">
              <Card.Header className="admin-card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="bi bi-clipboard-check me-2" />
                  Recent Admissions
                </h5>
                <Link to="/admin/admissions">View All</Link>
              </Card.Header>
              <Card.Body className="p-0">
                {stats.recent_admissions?.length > 0 ? (
                  <ListGroup variant="flush">
                    {stats.recent_admissions.slice(0, 5).map((item) => (
                      <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                        <div>
                          <div className="fw-medium">{item?.student?.name}</div>
                        </div>
                        <div className="text-end">
                          {/* <Badge bg="success">{item.student?.classes?.name || 'N/A'}</Badge> */}
                          <div className="small text-muted">
                            {formatDate(item.admission_date)}
                          </div>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <div className="text-center py-4 text-muted">
                    <i className="bi bi-inbox fs-2 d-block mb-2" />
                    No recent admissions
                  </div>
                )}
                <Link className="view-all" to="/admin/admissions">View All Admissions</Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
