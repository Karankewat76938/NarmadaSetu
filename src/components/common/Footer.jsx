import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#0b1329', color: '#94a3b8', paddingTop: '70px', paddingBottom: '40px', borderTop: '1px solid #1e293b' }}>
      <div style={{ width: '92%', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', marginBottom: '50px' }}>
          
          {/* Col 1: About */}
          <div>
            <h4 style={{ color: '#ffd369', fontSize: '1.4rem', fontWeight: 700, marginBottom: '16px' }}>
              🌊 NarmadaSetu
            </h4>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '20px' }}>
              A dedicated digital bridge connecting tourists with verified local boat operators, homestay hosts, authentic cuisine, and cultural experiences across the holy Narmada River basin.
            </p>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Empowering local river communities through transparent, verified digital tourism.
            </div>
          </div>

          {/* Col 2: Destinations */}
          <div>
            <h5 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 600, marginBottom: '18px' }}>
              Key Destinations
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><Link to="/explore?city=Jabalpur" style={footerLinkStyle}>Bhedaghat Marble Rocks (Jabalpur)</Link></li>
              <li><Link to="/explore?city=Maheshwar" style={footerLinkStyle}>Ahilya Fort & Ghats (Maheshwar)</Link></li>
              <li><Link to="/explore?city=Omkareshwar" style={footerLinkStyle}>Island Sangam & Temples (Omkareshwar)</Link></li>
              <li><Link to="/explore?city=Amarkantak" style={footerLinkStyle}>Narmada Udgam (Amarkantak)</Link></li>
              <li><Link to="/explore?city=Mandla" style={footerLinkStyle}>Sahasradhara & Mandla Fort</Link></li>
            </ul>
          </div>

          {/* Col 3: Experiences */}
          <div>
            <h5 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 600, marginBottom: '18px' }}>
              Tourism Experiences
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><Link to="/explore?category=boat_ride" style={footerLinkStyle}>Certified Boat Rides</Link></li>
              <li><Link to="/explore?category=homestay" style={footerLinkStyle}>Riverside Traditional Homestays</Link></li>
              <li><Link to="/explore?category=food" style={footerLinkStyle}>Malwi & Nimar Vegetarian Thalis</Link></li>
              <li><Link to="/explore?category=narmada_aarti" style={footerLinkStyle}>Maha Aarti & VIP Ghat Seating</Link></li>
              <li><Link to="/explore?category=local_guide" style={footerLinkStyle}>Accredited Heritage Guides</Link></li>
            </ul>
          </div>

          {/* Col 4: Safety & Partner */}
          <div>
            <h5 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 600, marginBottom: '18px' }}>
              Safety & Local Partners
            </h5>
            <div style={{ backgroundColor: 'rgba(2, 132, 199, 0.1)', border: '1px solid rgba(2, 132, 199, 0.3)', padding: '14px', borderRadius: '8px', marginBottom: '16px' }}>
              <div style={{ color: '#38bdf8', fontWeight: 600, fontSize: '0.88rem', marginBottom: '4px' }}>
                🛡️ River Safety Verified
              </div>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>
                All listed boat rides require certified life jackets, verified pilots, and safety gear.
              </p>
            </div>
            <Link to="/partner/apply" className="btn btn-sm btn-outline" style={{ width: '100%', borderColor: '#ffd369', color: '#ffd369' }}>
              Join as a Service Partner
            </Link>
          </div>

        </div>

        <hr style={{ borderColor: '#1e293b', margin: '30px 0' }} />

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', fontSize: '0.85rem' }}>
          <div>
            © {new Date().getFullYear()} NarmadaSetu Platform. Built according to PRD v1.0 specifications.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/explore" style={footerLinkStyle}>Explore</Link>
            <a href="/#how-it-works" style={footerLinkStyle}>How It Works</a>
            <a href="/#safety" style={footerLinkStyle}>Safety Policy</a>
            <Link to="/login" style={footerLinkStyle}>Partner Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

const footerLinkStyle = {
  color: '#94a3b8',
  textDecoration: 'none',
  transition: 'color 0.2s'
};

export default Footer;

