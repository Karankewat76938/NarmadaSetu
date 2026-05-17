import React from 'react';
import { Download, FileText, Calendar, Filter } from 'lucide-react';

const AdminReports = () => {
  const reports = [
    { id: 1, title: 'Monthly Revenue Summary', desc: 'Detailed breakdown of platform fees and provider payouts.', type: 'CSV', date: 'Oct 01, 2026' },
    { id: 2, type: 'PDF', title: 'User Growth Analytics', desc: 'New tourist registrations and provider onboardings.', date: 'Oct 01, 2026' },
    { id: 3, type: 'CSV', title: 'Service Moderation Log', desc: 'Log of flagged services and admin actions taken.', date: 'Sep 01, 2026' },
    { id: 4, type: 'PDF', title: 'Quarterly Performance', desc: 'Overall platform performance for Q3 2026.', date: 'Oct 05, 2026' }
  ];

  return (
    <div className="dark-panel">
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={{ 
            background: 'rgba(255,255,255,0.05)', 
            border: '1px solid var(--border-color)', 
            color: 'white', 
            padding: '0.5rem 1rem', 
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer'
          }}>
            <Calendar size={16} /> Date Range
          </button>
          <button style={{ 
            background: 'rgba(255,255,255,0.05)', 
            border: '1px solid var(--border-color)', 
            color: 'white', 
            padding: '0.5rem 1rem', 
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer'
          }}>
            <Filter size={16} /> Filter By Type
          </button>
        </div>
        
        <button className="btn-dark-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Download size={16} /> Generate Custom Report
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {reports.map(report => (
          <div key={report.id} style={{ 
            background: 'rgba(0,0,0,0.2)', 
            border: '1px solid var(--border-color)', 
            borderRadius: '8px', 
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ 
                  background: report.type === 'CSV' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
                  color: report.type === 'CSV' ? 'var(--accent-primary)' : 'var(--accent-danger)', 
                  padding: '0.2rem 0.5rem', 
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  {report.type}
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{report.date}</span>
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{report.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>{report.desc}</p>
            </div>
            
            <button style={{ 
              background: 'transparent',
              border: '1px solid var(--border-color)',
              color: 'white',
              padding: '0.6rem',
              borderRadius: '6px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <Download size={16} /> Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminReports;
