import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { servicesAPI } from '../services/services.api';
import ServiceCard from '../components/service/ServiceCard';

function Explore() {
  const [searchParams] = useSearchParams();

  const [services, setServices] = useState([]);
  const [totalServices, setTotalServices] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Filters state from URL or defaults
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [city, setCity] = useState(searchParams.get('city') || 'all');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'popular');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [rating, setRating] = useState(searchParams.get('rating') || '');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  const categories = [
    { id: 'all', label: 'All Experiences' },
    { id: 'boat_ride', label: '⛵ Boat Rides' },
    { id: 'homestay', label: '🏡 Homestays' },
    { id: 'food', label: '🍲 Traditional Food' },
    { id: 'narmada_aarti', label: '🪔 Narmada Aarti' },
    { id: 'local_guide', label: '🧭 Local Guides' },
    { id: 'other', label: '🌿 Other Experiences' }
  ];

  const cities = ['all', 'Jabalpur', 'Maheshwar', 'Omkareshwar', 'Amarkantak', 'Mandla'];

  useEffect(() => {
    fetchServices();
  }, [category, city, sort, page, rating]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 9,
        sort
      };

      if (category !== 'all') params.category = category;
      if (city !== 'all') params.city = city;
      if (search.trim()) params.search = search.trim();
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      if (rating) params.rating = rating;

      const res = await servicesAPI.getServices(params);
      if (res.success && res.data) {
        setServices(res.data.services || []);
        setTotalServices(res.data.pagination?.total || 0);
        setTotalPages(res.data.pagination?.pages || 1);
      }
    } catch (err) {
      console.error('Error fetching explore services:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchServices();
  };

  const resetFilters = () => {
    setCategory('all');
    setCity('all');
    setSearch('');
    setSort('popular');
    setMinPrice('');
    setMaxPrice('');
    setRating('');
    setPage(1);
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingTop: '90px', paddingBottom: '70px' }}>
      <div style={{ width: '92%', maxWidth: '1240px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <span style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.88rem' }}>
            Narmada Marketplace
          </span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-text)', marginTop: '4px' }}>
            Explore Verified Tourism Services
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>
            Find certified boatmen, heritage riverside stays, and cultural guides along the sacred Narmada.
          </p>
        </div>

        {/* Category Pills Bar */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            overflowX: 'auto',
            paddingBottom: '12px',
            marginBottom: '24px',
            whiteSpace: 'nowrap'
          }}
        >
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => { setCategory(c.id); setPage(1); }}
              className={`btn btn-sm ${category === c.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: '25px', padding: '8px 18px', flexShrink: 0 }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Filters and Search Bar */}
        <div className="card" style={{ padding: '20px', marginBottom: '36px' }}>
          <form onSubmit={handleSearchSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '14px', alignItems: 'flex-end' }}>
            <div>
              <label className="form-label" style={{ fontSize: '0.82rem' }}>Keyword Search</label>
              <input
                type="text"
                className="form-input"
                placeholder="Boat, aarti, ghat, guide..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label" style={{ fontSize: '0.82rem' }}>Ghat / Destination</label>
              <select className="form-select" value={city} onChange={(e) => { setCity(e.target.value); setPage(1); }}>
                {cities.map((ct) => (
                  <option key={ct} value={ct}>
                    {ct === 'all' ? 'All Locations' : ct}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label" style={{ fontSize: '0.82rem' }}>Min Price (₹)</label>
              <input
                type="number"
                className="form-input"
                placeholder="₹ Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label" style={{ fontSize: '0.82rem' }}>Max Price (₹)</label>
              <input
                type="number"
                className="form-input"
                placeholder="₹ Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label" style={{ fontSize: '0.82rem' }}>Sort By</label>
              <select className="form-select" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="popular">Most Popular</option>
                <option value="rating">Top Rated</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="newest">Newly Listed</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1, height: '46px' }}>
                Filter
              </button>
              <button type="button" onClick={resetFilters} className="btn btn-secondary" style={{ height: '46px' }}>
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Results Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)' }}>
            Showing <strong>{services.length}</strong> of <strong>{totalServices}</strong> verified experiences
          </div>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '70px', color: 'var(--color-text-muted)' }}>
            Loading verified services...
          </div>
        ) : services.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🌊</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px' }}>No experiences found</h3>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '400px', margin: '0 auto 20px' }}>
              We couldn't find any services matching your filter criteria. Try resetting filters or choosing another category.
            </p>
            <button onClick={resetFilters} className="btn btn-primary">
              Clear All Filters
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', marginBottom: '40px' }}>
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '40px' }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="btn btn-secondary btn-sm"
            >
              ← Previous
            </button>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="btn btn-secondary btn-sm"
            >
              Next →
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Explore;
