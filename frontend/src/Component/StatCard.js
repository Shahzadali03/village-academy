import { Col, Card } from 'react-bootstrap';

const variantClassMap = {
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
};

export default function StatCard({ title, value, icon, src, variant = 'primary' }) {
  const bgClass = variantClassMap[variant] || variantClassMap.primary;

  return (
    <Col md={6} lg={3}>
      <Card className={`stat-card ${bgClass} h-100 border-0`}>
        <Card.Body className="d-flex flex-column justify-content-between gap-2 p-3">
          <div className="d-flex align-items-start justify-content-between gap-2">
            <div>
              <h3 className="mb-1">{value ?? 0}</h3>
              <p className="small mb-0">{title}</p>
            </div>
            <div className="stats-icon">
              <i className={`bi bi-${icon}`} aria-hidden="true" />
            </div>
          </div>
          {src && (
            <div className="text-end">
              <img src={src} className="img-fluid stat-card-img" alt="" />
            </div>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
}
