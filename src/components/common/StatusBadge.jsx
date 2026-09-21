import React from 'react';

const StatusBadge = ({ status, type = 'booking' }) => {
  const normalized = (status || '').toLowerCase();

  const getStyleClass = () => {
    switch (normalized) {
      case 'pending':
        return 'badge-pending';
      case 'confirmed':
      case 'approved':
      case 'active':
      case 'paid':
        return 'badge-confirmed';
      case 'completed':
        return 'badge-completed';
      case 'cancelled':
      case 'suspended':
      case 'inactive':
        return 'badge-cancelled';
      case 'rejected':
      case 'failed':
        return 'badge-rejected';
      default:
        return 'badge-category';
    }
  };

  const getLabel = () => {
    switch (normalized) {
      case 'pending': return '● Pending';
      case 'confirmed': return '✓ Confirmed';
      case 'completed': return '★ Completed';
      case 'cancelled': return '✕ Cancelled';
      case 'rejected': return '✕ Rejected';
      case 'approved': return '✓ Approved';
      case 'paid': return '✓ Paid';
      default: return normalized ? normalized.charAt(0).toUpperCase() + normalized.slice(1) : 'Unknown';
    }
  };

  return (
    <span className={`badge ${getStyleClass()}`} aria-label={`Status: ${normalized}`}>
      {getLabel()}
    </span>
  );
};

export default StatusBadge;

