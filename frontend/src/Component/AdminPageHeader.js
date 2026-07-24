import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const AdminPageHeader = ({
  title,
  subtitle,
  icon,
  badge,
  actions,
  children,
}) => (
  <Card className="admin-page-header border-0 shadow-sm mb-3">
    <Card.Body className="p-4">
      <Row className="align-items-center g-3">
        <Col lg={actions || children ? 7 : 12}>
          {badge && <span className="admin-page-badge">{badge}</span>}
          <div className="d-flex align-items-start gap-3">
            {icon && (
              <div className="admin-page-icon">
                <i className={`bi bi-${icon}`} aria-hidden="true" />
              </div>
            )}
            <div>
              <h1 className="admin-page-title">{title}</h1>
              {subtitle && <p className="admin-page-subtitle mb-0">{subtitle}</p>}
            </div>
          </div>
        </Col>
        {(actions || children) && (
          <Col lg={5} className="text-lg-end">
            {actions}
            {children}
          </Col>
        )}
      </Row>
    </Card.Body>
  </Card>
);

export default AdminPageHeader;
