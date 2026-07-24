import React from 'react';
import { Col, Modal, Row } from 'react-bootstrap';

const getInitials = (name = '') =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('') || '?';

export const AdminDetailModal = ({
  show,
  onHide,
  title,
  subtitle,
  icon,
  size = 'lg',
  centered = true,
  children,
  footer,
}) => (
  <Modal
    show={show}
    onHide={onHide}
    size={size}
    centered={centered}
    className="admin-detail-modal"
  >
    <Modal.Header closeButton>
      <div className="admin-detail-modal-heading">
        {icon && (
          <div className="admin-detail-modal-icon" aria-hidden="true">
            <i className={`bi bi-${icon}`} />
          </div>
        )}
        <div>
          <Modal.Title>{title}</Modal.Title>
          {subtitle && <p className="admin-detail-modal-subtitle mb-0">{subtitle}</p>}
        </div>
      </div>
    </Modal.Header>
    <Modal.Body>{children}</Modal.Body>
    {footer && <Modal.Footer className="admin-detail-modal-footer">{footer}</Modal.Footer>}
  </Modal>
);

export const AdminDetailHero = ({ name, subtitle, meta = [] }) => (
  <div className="admin-detail-hero">
    <div className="admin-detail-hero-avatar">{getInitials(name)}</div>
    <div className="admin-detail-hero-content">
      <h4 className="admin-detail-hero-name">{name || 'N/A'}</h4>
      {subtitle && <p className="admin-detail-hero-subtitle mb-0">{subtitle}</p>}
      {meta.length > 0 && (
        <div className="admin-detail-hero-meta">
          {meta.map((item) => (
            <span key={`${item.icon}-${item.text}`} className="admin-detail-meta-chip">
              <i className={`bi bi-${item.icon}`} aria-hidden="true" />
              {item.text || 'N/A'}
            </span>
          ))}
        </div>
      )}
    </div>
  </div>
);

export const AdminDetailSection = ({ title, icon, children }) => (
  <section className="admin-detail-section p-0">
    <div className="admin-detail-section-header">
      {icon && <i className={`bi bi-${icon}`} aria-hidden="true" />}
      <h6>{title}</h6>
    </div>
    <div className="admin-detail-section-body">{children}</div>
  </section>
);

export const AdminDetailItem = ({ label, value, children, md = 6 }) => (
  <Col md={md} className="admin-detail-item">
    <span className="admin-detail-label">{label}</span>
    <div className="admin-detail-value">{children ?? value ?? 'N/A'}</div>
  </Col>
);

export const AdminDetailGrid = ({ children }) => (
  <Row className="g-3 admin-detail-grid">{children}</Row>
);

export const AdminDetailNote = ({ label, value, children }) => (
  <div className="admin-detail-note">
    <span className="admin-detail-label">{label}</span>
    <div className="admin-detail-note-body">{children ?? value ?? 'N/A'}</div>
  </div>
);
