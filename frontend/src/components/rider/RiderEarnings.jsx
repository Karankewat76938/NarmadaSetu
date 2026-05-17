import React from 'react';
import { IndianRupee, TrendingUp, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const RiderEarnings = () => {
  return (
    <div className="earnings-container">
      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.05))', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
          <div className="stat-info">
            <p style={{ color: '#94a3b8' }}>Today's Earnings</p>
            <h3 style={{ color: '#10b981', fontSize: '2rem', margin: '0.5rem 0' }}>₹ 1,850</h3>
            <span style={{ color: '#10b981', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <ArrowUpRight size={16} /> 12% vs yesterday
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p style={{ color: '#94a3b8' }}>This Week</p>
            <h3 style={{ color: '#f8fafc', fontSize: '2rem', margin: '0.5rem 0' }}>₹ 12,400</h3>
            <span style={{ color: '#10b981', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <ArrowUpRight size={16} /> 5% vs last week
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p style={{ color: '#94a3b8' }}>This Month</p>
            <h3 style={{ color: '#f8fafc', fontSize: '2rem', margin: '0.5rem 0' }}>₹ 45,200</h3>
            <span style={{ color: '#ef4444', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <ArrowDownRight size={16} /> 2% vs last month
            </span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card" style={{ gridColumn: 'span 2' }}>
          <div className="card-header">
            <h3>Recent Payouts</h3>
            <button style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: '#f8fafc', padding: '0.4rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>
              Download Statement
            </button>
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', color: '#f8fafc' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', textAlign: 'left' }}>
                <th style={{ padding: '1rem 0' }}>Date</th>
                <th style={{ padding: '1rem 0' }}>Description</th>
                <th style={{ padding: '1rem 0' }}>Amount</th>
                <th style={{ padding: '1rem 0' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: '15 May 2026', desc: 'Weekly Payout (May 8 - May 14)', amount: '₹ 11,500', status: 'Completed' },
                { date: '08 May 2026', desc: 'Weekly Payout (May 1 - May 7)', amount: '₹ 12,100', status: 'Completed' },
                { date: '01 May 2026', desc: 'Weekly Payout (Apr 24 - Apr 30)', amount: '₹ 10,800', status: 'Completed' }
              ].map((tx, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '1rem 0' }}>{tx.date}</td>
                  <td style={{ padding: '1rem 0' }}>{tx.desc}</td>
                  <td style={{ padding: '1rem 0', fontWeight: 'bold' }}>{tx.amount}</td>
                  <td style={{ padding: '1rem 0' }}>
                    <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.8rem' }}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Narmada Setu Fees</h3>
          </div>
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 1.5rem', borderRadius: '50%', border: '8px solid rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h2 style={{ color: '#10b981', fontSize: '1.8rem', margin: 0 }}>0%</h2>
            </div>
            <h4 style={{ color: '#f8fafc', marginBottom: '0.5rem' }}>Zero Commission for Kewat Community</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5 }}>
              100% of the booking amount goes directly to you. Narmada Setu covers platform costs through voluntary tourist donations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderEarnings;
