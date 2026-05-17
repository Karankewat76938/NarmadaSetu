import React from 'react';
import { Quote } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    text: "The boat ride at Bhedaghat was magical. Our guide, Ramesh, explained the history of the marble rocks beautifully. Booking through Narmada Setu was so easy!",
    author: "Priya Sharma",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    text: "Witnessing the Narmada Aarti from the middle of the river on a private boat is an experience I will never forget. Highly recommend the verified services here.",
    author: "Rahul Verma",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    text: "Safe, secure, and incredibly authentic. I love that the money goes directly to the local Kewat community. It makes the journey even more meaningful.",
    author: "Anita Desai",
    location: "Pune",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="container">
        <h2 className="section-title">Pilgrim Stories</h2>
        <p className="section-subtitle">Read what our tourists and pilgrims have to say about their Narmada experiences.</p>
        
        <div className="testimonials-grid">
          {testimonials.map(t => (
            <div key={t.id} className="testimonial-card glass">
              <Quote size={40} className="quote-icon" />
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <img src={t.image} alt={t.author} className="author-img" />
                <div className="author-info">
                  <h4>{t.author}</h4>
                  <span>{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
