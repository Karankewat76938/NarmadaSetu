import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { servicesAPI } from '../services/services.api';
import ServiceCard from '../components/service/ServiceCard';

function Home() {
  const navigate = useNavigate();
  const [popularServices, setPopularServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search widget state
  const [searchCategory, setSearchCategory] = useState('all');
  const [searchCity, setSearchCity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await servicesAPI.getServices({ sort: 'popular', limit: 3 });
        if (res.success && res.data?.services) {
          setPopularServices(res.data.services);
        }
      } catch (err) {
        console.warn('Could not fetch popular services:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPopular();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchCategory !== 'all') params.append('category', searchCategory);
    if (searchCity !== 'all') params.append('city', searchCity);
    if (searchQuery.trim()) params.append('search', searchQuery.trim());
    navigate(`/explore?${params.toString()}`);
  };

  const categories = [
    { id: 'boat_ride', name: 'Boat Rides', icon: '⛵', desc: 'Sunset & morning rides through Marble Rocks and holy Ghats' },
    { id: 'homestay', name: 'Riverside Homestays', icon: '🏡', desc: 'Traditional stone bungalows overlooking the Narmada' },
    { id: 'food', name: 'Traditional Food', icon: '🍲', desc: 'Pure desi ghee Dal Bafla and authentic Malwi & Nimari thalis' },
    { id: 'narmada_aarti', name: 'Narmada Aarti', icon: '🪔', desc: 'VIP reserved seating & evening diya rituals at historic Ghats' },
    { id: 'local_guide', name: 'Local Guides', icon: '🧭', desc: 'Accredited historians and cultural storytellers' },
    { id: 'other', name: 'River Heritage', icon: '🌿', desc: 'Temple walks, island trails, and woven textile tours' }
  ];

  return (
    <div className="home-page" style={{ paddingTop: '68px' }}>

      {/* SECTION 2: HERO (PRD Section 31 & Design.md Section 6) */}
      <section
        style={{
          position: 'relative',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.65), rgba(15, 23, 42, 0.8)), url("https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#ffffff',
          textAlign: 'center',
          padding: '80px 20px'
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', backgroundColor: 'rgba(255, 211, 105, 0.15)', border: '1px solid #ffd369', color: '#ffd369', padding: '6px 16px', borderRadius: '30px', fontSize: '0.88rem', fontWeight: 600, marginBottom: '20px' }}>
            ✨ Trusted Bridge to Narmada River Tourism
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '20px', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            Discover the Soul of Holy Narmada
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#e2e8f0', maxWidth: '720px', margin: '0 auto 36px', lineHeight: 1.6 }}>
            Book verified boat operators at Marble Rocks, authentic riverside homestays, evening Maha Aarti rituals, and pure traditional cuisine directly from local communities.
          </p>

          {/* SECTION 3: DISCOVERY SEARCH WIDGET (PRD Section 18 & Design.md 6.2) */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
              color: 'var(--color-text)',
              maxWidth: '840px',
              margin: '0 auto'
            }}
          >
            <form onSubmit={handleSearchSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', alignItems: 'flex-end' }}>
              <div style={{ textAlign: 'left' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                  SEARCH EXPERIENCES
                </label>
                <input
                  type="text"
                  placeholder="e.g. Marble rocks, boating..."
                  className="form-input"
                  style={{ padding: '10px 14px' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div style={{ textAlign: 'left' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                  CATEGORY
                </label>
                <select
                  className="form-select"
                  style={{ padding: '10px 14px' }}
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                >
                  <option value="all">All Experiences</option>
                  <option value="boat_ride">Boat Rides</option>
                  <option value="homestay">Homestays</option>
                  <option value="food">Traditional Food</option>
                  <option value="narmada_aarti">Narmada Aarti</option>
                  <option value="local_guide">Local Guides</option>
                </select>
              </div>

              <div style={{ textAlign: 'left' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                  LOCATION / GHAT
                </label>
                <select
                  className="form-select"
                  style={{ padding: '10px 14px' }}
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                >
                  <option value="all">All Locations</option>
                  <option value="Jabalpur">Bhedaghat / Jabalpur</option>
                  <option value="Maheshwar">Ahilya Ghat / Maheshwar</option>
                  <option value="Omkareshwar">Island Ghat / Omkareshwar</option>
                  <option value="Amarkantak">Narmada Origin / Amarkantak</option>
                  <option value="Mandla">Sahasradhara / Mandla</option>
                </select>
              </div>

              <div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '46px' }}>
                  🔍 Find Experiences
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* SECTION 4: POPULAR EXPERIENCES (PRD Section 31) */}
      <section style={{ padding: '80px 20px', backgroundColor: '#ffffff' }}>
        <div style={{ width: '92%', maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
            <div>
              <span style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Most Booked Along the River
              </span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-text)', marginTop: '4px' }}>
                Popular Local Experiences
              </h2>
            </div>
            <Link to="/explore" className="btn btn-outline">
              View All Marketplace Experiences →
            </Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px', color: 'var(--color-text-muted)' }}>
              Loading curated experiences...
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
              {popularServices.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 5: TOURISM CATEGORIES (PRD Section 9 & 31) */}
      <section id="categories" style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
        <div style={{ width: '92%', maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 50px' }}>
            <span style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.88rem', textTransform: 'uppercase' }}>
              Diverse Offerings
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-text)', marginTop: '4px' }}>
              Explore by Tourism Category
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginTop: '10px' }}>
              From morning rowing through misty marble cliffs to sacred evening aartis and home-cooked culinary heritage.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/explore?category=${cat.id}`}
                style={{
                  backgroundColor: '#ffffff',
                  padding: '30px 24px',
                  borderRadius: '16px',
                  border: '1px solid var(--color-border)',
                  textDecoration: 'none',
                  color: 'inherit',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                className="category-card"
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{cat.icon}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '8px' }}>
                  {cat.name}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.5, flex: 1 }}>
                  {cat.desc}
                </p>
                <div style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.88rem', marginTop: '16px' }}>
                  Browse Services →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: HOW NARMADASETU WORKS (PRD Section 31 & 47) */}
      <section id="how-it-works" style={{ padding: '90px 20px', backgroundColor: '#ffffff' }}>
        <div style={{ width: '92%', maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 60px' }}>
            <span style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.88rem', textTransform: 'uppercase' }}>
              Simple & Direct
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-text)', marginTop: '4px' }}>
              How NarmadaSetu Works
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginTop: '10px' }}>
              Eliminating informal haggling, uncertain availability, and middleman markups.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '30px' }}>
            {[
              { step: '01', title: 'Discover & Compare', text: 'Browse verified boat operators, homestays, and Aarti experiences across Narmada Ghats with transparent prices.' },
              { step: '02', title: 'Select Date & Reserve', text: 'Pick your preferred time slot and passenger count. The backend calculates exact prices with guaranteed availability.' },
              { step: '03', title: 'Direct Partner Confirmation', text: 'Local operators receive your request directly on their dashboard and confirm your arrival.' },
              { step: '04', title: 'Safe Experience & Reviews', text: 'Enjoy your tour with life-safety standards. Post authentic feedback to build local community reputation.' }
            ].map((item, idx) => (
              <div key={idx} style={{ padding: '24px', backgroundColor: '#f8fafc', borderRadius: '14px', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '12px' }}>
                  {item.step}
                </div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '8px' }}>
                  {item.title}
                </h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: FEATURED LOCAL PARTNERS (PRD Section 31) */}
      <section style={{ padding: '80px 20px', backgroundColor: '#f1f5f9' }}>
        <div style={{ width: '92%', maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 50px' }}>
            <span style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.88rem', textTransform: 'uppercase' }}>
              Verified Hosts
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-text)', marginTop: '4px' }}>
              Meet Our Community Partners
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginTop: '10px' }}>
              Locals who have navigated the river waters and preserved Narmada traditions for generations.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              {
                name: 'Rameshwar Majhi',
                role: 'Master Boatman',
                loc: 'Bhedaghat Marble Rocks',
                exp: '18 Years on the Narmada',
                desc: 'Specialist in marble rock echo songs, sunrise rides, and seasonal water currents.'
              },
              {
                name: 'Sunita & Arvind Sharma',
                role: 'Homestay Hosts',
                loc: 'Ahilya Ghat, Maheshwar',
                exp: '7 Years of Hospitality',
                desc: 'Hosting travelers in heritage stone cottages with traditional vegetarian cooking.'
              },
              {
                name: 'Devendra Shastri',
                role: 'Aarti Priest & Guide',
                loc: 'Gwarighat, Jabalpur',
                exp: '12 Years Vedic Tradition',
                desc: 'Organizes peaceful VIP seating and ritual diya offerings for evening Maha Aarti.'
              }
            ].map((p, i) => (
              <div key={i} className="card" style={{ textAlign: 'center' }}>
                <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', margin: '0 auto 16px' }}>
                  👨‍✈️
                </div>
                <div style={{ display: 'inline-block', backgroundColor: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '2px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, marginBottom: '8px' }}>
                  ✓ ID & License Verified
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '4px 0' }}>{p.name}</h4>
                <div style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.88rem' }}>{p.role} • {p.loc}</div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', margin: '4px 0 12px' }}>{p.exp}</div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  "{p.desc}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: RIVER CULTURE & COMMUNITY (PRD Section 31) */}
      <section style={{ padding: '90px 20px', backgroundColor: '#ffffff' }}>
        <div style={{ width: '92%', maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
          <div>
            <span style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.88rem', textTransform: 'uppercase' }}>
              Sacred Heritage
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-text)', margin: '8px 0 18px' }}>
              Honoring the Timeless Traditions of River Narmada
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '16px' }}>
              Known as Rewa, the Narmada is one of the oldest river valley civilizations on Earth. The traditional boatmen, temple priests, weavers, and home cooks are the living custodians of this legacy.
            </p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '24px' }}>
              NarmadaSetu directly transfers value to these grassroots providers without middlemen cuts, fostering sustainable eco-tourism and cultural preservation.
            </p>
            <Link to="/explore" className="btn btn-primary">
              Explore Cultural Itineraries
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <img
              src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=500&q=80"
              alt="Marble Rocks"
              style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px' }}
            />
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80"
              alt="Maheshwar Fort"
              style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px' }}
            />
            <img
              src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=500&q=80"
              alt="Narmada Aarti"
              style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px' }}
            />
            <img
              src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=500&q=80"
              alt="Malwi Thali"
              style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px' }}
            />
          </div>
        </div>
      </section>

      {/* SECTION 9: SAFETY & TRUST (PRD Section 21 & 31) */}
      <section id="safety" style={{ padding: '80px 20px', backgroundColor: '#0f172a', color: '#ffffff' }}>
        <div style={{ width: '92%', maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 50px' }}>
            <span style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.88rem', textTransform: 'uppercase' }}>
              Operational Safety Standards
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>
              Safety on the Water Comes First
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '10px' }}>
              NarmadaSetu treats water safety not as a marketing tagline, but as a verified operational prerequisite.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {[
              { icon: '🦺', title: '100% Life Jacket Mandate', text: 'All passenger boats are verified for certified life vests for every adult and child on board before dispatch.' },
              { icon: '📜', title: 'Admin Partner Verification', text: 'Operators must submit government IDs and local tourism permits before listings go live on the marketplace.' },
              { icon: '🏊‍♂️', title: 'Certified Swimmer Pilots', text: 'Boat pilots are experienced local swimmers familiar with river currents, whirlpools, and water depths.' },
              { icon: '⭐', title: 'Verified Tourist Reviews', text: 'Reviews are exclusively permitted from tourists who have completed actual reservations on the platform.' }
            ].map((s, idx) => (
              <div key={idx} style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '24px', borderRadius: '14px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{s.icon}</div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffd369', marginBottom: '8px' }}>
                  {s.title}
                </h4>
                <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: CALL TO ACTION (PRD Section 31) */}
      <section style={{ padding: '80px 20px', backgroundColor: 'var(--color-primary)', color: '#ffffff', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '16px' }}>
            Are You a Local Boatman, Host, or Guide?
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#e0f2fe', lineHeight: 1.6, marginBottom: '32px' }}>
            Join NarmadaSetu to reach thousands of domestic and international tourists visiting Bhedaghat, Maheshwar, and Omkareshwar. Get verified and accept direct bookings today.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/partner/apply" className="btn btn-lg btn-accent">
              Register as a Partner Now
            </Link>
            <Link to="/explore" className="btn btn-lg btn-secondary" style={{ backgroundColor: '#ffffff', color: 'var(--color-primary)' }}>
              Explore All Experiences
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;