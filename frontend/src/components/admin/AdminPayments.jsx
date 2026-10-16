import React from 'react';
import { ArrowUpRight, ArrowDownRight, IndianRupee } from 'lucide-react';

const MOCK_TRANSACTIONS = [
  { id: 'TXN-901', date: 'Oct 24, 2026', type: 'Booking Payment', amount: '+₹1200', fee: '₹120', status: 'Completed', user: 'Priya S.', provider: 'Anil K.' },
  { id: 'TXN-902', date: 'Oct 23, 2026', type: 'Provider Payout', amount: '-₹4500', fee: '₹0', status: 'Processed', user: 'System', provider: 'Ramesh Kewat' },
  { id: 'TXN-903', date: 'Oct 23, 2026', type: 'Booking Payment', amount: '+₹800', fee: '₹80', status: 'Completed', user: 'Rahul D.', provider: 'Ramesh Kewat' },
  { id: 'TXN-904', date: 'Oct 22, 2026', type: 'Refund', amount: '-₹1500', fee: '-₹150', status: 'Processed', user: 'Amit P.', provider: 'Deepak N.' },
];

const AdminPayments = () => {
  return (
    <div className="dark-panel">
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '2rem' }}>
        <div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Total Escrow</p>
          <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <IndianRupee size={20} /> 45,200
          </h3>
        </div>
        <div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Platform Revenue (10%)</p>
          <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--accent-primary)' }}>
            <IndianRupee size={20} /> 12,450
          </h3>
        </div>
        <div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Pending Payouts</p>
          <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--accent-warning)' }}>
            <IndianRupee size={20} /> 8,500
          </h3>
        </div>
      </div>

      <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
        Recent Transactions
      </h3>

      <div className="dark-table-container">
        <table className="dark-table">
          <thead>
            <tr>
              <th>TXN ID</th>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Platform Fee</th>
              <th>Status</th>
              <th>Involved Parties</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_TRANSACTIONS.map(txn => (
              <tr key={txn.id}>
                <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{txn.id}</td>
                <td>{txn.date}</td>
                <td>{txn.type}</td>
                <td style={{ 
                  color: txn.amount.startsWith('+') ? 'var(--accent-primary)' : 'var(--accent-warning)',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  {txn.amount.startsWith('+') ? <ArrowDownRight size={16} /> : <ArrowUpRight size={16} />}
                  {txn.amount.replace('+', '').replace('-', '')}
                </td>
                <td style={{ color: 'var(--text-secondary)' }}>{txn.fee}</td>
                <td>
                  <span style={{ 
                    background: 'rgba(255,255,255,0.05)', 
                    padding: '0.2rem 0.5rem', 
                    borderRadius: '4px',
                    fontSize: '0.8rem'
                  }}>
                    {txn.status}
                  </span>
                </td>
                <td style={{ fontSize: '0.85rem' }}>
                  <div style={{ color: 'var(--text-secondary)' }}>User: {txn.user}</div>
                  <div>Prov: {txn.provider}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPayments;
