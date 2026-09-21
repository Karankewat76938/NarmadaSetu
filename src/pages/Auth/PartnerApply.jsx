import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { partnerAPI } from '../../services/partner.api';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/common/StatusBadge';

function PartnerApply() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Form inputs
  const [serviceCategory, setServiceCategory] = useState('boat_ride');
  const [businessName, setBusinessName] = useState('');
  const [experienceYears, setExperienceYears] = useState(5);
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState('');
  const [ghatOrCity, setGhatOrCity] = useState('Bhedaghat, Jabalpur');
  const [idProofType, setIdProofType] = useState('Aadhaar Card');
  const [idProofNumber, setIdProofNumber] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchAppStatus = async () => {
      try {
        const res = await partnerAPI.getMe();
        if (res.success && res.data?.application) {
          const app = res.data.application;
          setApplication(app);
          if (app.applicationStatus !== 'unregistered') {
            setServiceCategory(app.serviceCategory || 'boat_ride');
            setBusinessName(app.businessName || '');
            setExperienceYears(app.experienceYears || 1);
            if (app.contactDetails) {
              setPhone(app.contactDetails.phone || '');
              setAddress(app.contactDetails.address || '');
              setGhatOrCity(app.contactDetails.ghatOrCity || '');
            }
            if (app.documents) {
              setIdProofType(app.documents.idProofType || 'Aadhaar Card');
              setIdProofNumber(app.documents.idProofNumber || '');
              setLicenseNumber(app.documents.licenseNumber || '');
            }
          }
        }
      } catch (err) {
        console.warn('Error fetching partner application:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppStatus();
  }, [isAuthenticated, navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setMessage('');

    try {
      const payload = {
        serviceCategory,
        businessName: businessName.trim(),
        experienceYears: Number(experienceYears),
        contactDetails: {
          phone: phone.trim(),
          address: address.trim(),
          ghatOrCity: ghatOrCity.trim()
        },
        documents: {
          idProofType,
          idProofNumber: idProofNumber.trim(),
          licenseNumber: licenseNumber.trim()
        }
      };

      const res = await partnerAPI.apply(payload);
      if (res.success && res.data?.application) {
        setApplication(res.data.application);
        setMessage('Application submitted! Platform administrators have been notified for review.');
      }
    } catch (err) {
      setError(err.message || 'Failed to submit application.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '120px 20px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
        Loading partner verification data...
      </div>
    );
  }

  const appStatus = application?.applicationStatus || 'unregistered';

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingTop: '90px', paddingBottom: '80px' }}>
      <div style={{ width: '92%', maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Status Header */}
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <span style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.88rem' }}>
            NarmadaSetu Partner Network
          </span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-text)', marginTop: '4px' }}>
            Local Provider Verification
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
            As per platform safety rules (PRD Section 13), all service providers must be verified by administrators before listing experiences publicly.
          </p>
        </div>

        {/* Current Status Card */}
        <div className="card" style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
              Current Verification Status:
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <StatusBadge status={appStatus} type="partner" />
              {appStatus === 'approved' && (
                <span style={{ color: '#059669', fontSize: '0.9rem', fontWeight: 600 }}>
                  ✓ You are an authorized Narmada partner
                </span>
              )}
            </div>
          </div>

          {appStatus === 'approved' ? (
            <Link to="/partner/services" className="btn btn-primary">
              Manage Services & Listings →
            </Link>
          ) : (
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              {appStatus === 'pending'
                ? 'Your documents are under admin verification review.'
                : 'Submit or update your credentials below.'}
            </div>
          )}
        </div>

        {/* Notification alerts */}
        {message && (
          <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '14px', borderRadius: '10px', marginBottom: '24px', fontSize: '0.92rem' }}>
            ✓ {message}
          </div>
        )}

        {error && (
          <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '14px', borderRadius: '10px', marginBottom: '24px', fontSize: '0.92rem' }}>
            ⚠️ {error}
          </div>
        )}

        {application?.rejectionReason && (
          <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '14px', borderRadius: '10px', marginBottom: '24px', fontSize: '0.92rem' }}>
            <strong>Rejection Reason:</strong> {application.rejectionReason}
          </div>
        )}

        {/* Application Form */}
        <div className="card">
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '20px' }}>
            {appStatus === 'unregistered' ? 'Submit Provider Application' : 'Update Partner Credentials'}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Primary Service Category *</label>
              <select
                className="form-select"
                value={serviceCategory}
                onChange={(e) => setServiceCategory(e.target.value)}
                required
              >
                <option value="boat_ride">Boat Operator (Marble Rocks / Ghats)</option>
                <option value="homestay">Riverside Homestay Host</option>
                <option value="food">Traditional Food / Regional Kitchen</option>
                <option value="local_guide">Accredited Local Guide / Historian</option>
                <option value="narmada_aarti">Narmada Aarti Priest / Organizer</option>
                <option value="other">Other Local River Experience</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="bizName">Business / Operator Name *</label>
              <input
                type="text"
                id="bizName"
                className="form-input"
                placeholder="e.g. Marble Rocks Boating Association"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="exp">Years of Experience on River *</label>
                <input
                  type="number"
                  id="exp"
                  className="form-input"
                  min="0"
                  max="60"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">Contact Mobile Number *</label>
                <input
                  type="tel"
                  id="phone"
                  className="form-input"
                  placeholder="+91 98260 XXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="ghatCity">Operational Ghat / Destination *</label>
              <input
                type="text"
                id="ghatCity"
                className="form-input"
                placeholder="e.g. Panchvati Ghat, Bhedaghat, Jabalpur"
                value={ghatOrCity}
                onChange={(e) => setGhatOrCity(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="address">Operating Address *</label>
              <textarea
                id="address"
                className="form-textarea"
                rows="2"
                placeholder="Complete local address or jetty station"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            {/* Document Section */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '20px', marginTop: '20px' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '14px' }}>
                Identity & Verification Documents (PRD Section 13)
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">ID Proof Document Type</label>
                  <select
                    className="form-select"
                    value={idProofType}
                    onChange={(e) => setIdProofType(e.target.value)}
                  >
                    <option value="Aadhaar Card">Aadhaar Card</option>
                    <option value="Voter ID">Voter ID</option>
                    <option value="Driving License">Driving License</option>
                    <option value="Boat License">Municipal Boat Permit</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="idNum">ID Proof Number</label>
                  <input
                    type="text"
                    id="idNum"
                    className="form-input"
                    placeholder="Document Reference Number"
                    value={idProofNumber}
                    onChange={(e) => setIdProofNumber(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="licNum">Tourism / Operating Permit (If applicable)</label>
                  <input
                    type="text"
                    id="licNum"
                    className="form-input"
                    placeholder="e.g. MP-TOUR-BOAT-XXXX"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: '10px' }}
              disabled={submitting}
            >
              {submitting ? 'Submitting Credentials...' : appStatus === 'approved' ? 'Update Credentials' : 'Submit Application for Admin Review'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default PartnerApply;

