import React from 'react';
import { Search, CalendarCheck, Sailboat } from 'lucide-react';
import './HowItWorks.css';

const steps = [
  {
    id: 1,
    icon: <Search size={40} />,
    title: 'Search & Select',
    desc: 'Choose your desired ghat, date, and service type from our verified list.'
  },
  {
    id: 2,
    icon: <CalendarCheck size={40} />,
    title: 'Book Securely',
    desc: 'Confirm your booking with our secure payment gateway and get instant tickets.'
  },
  {
    id: 3,
    icon: <Sailboat size={40} />,
    title: 'Enjoy Your Ride',
    desc: 'Meet your guide at the ghat and experience the spiritual Narmada.'
  }
];

const HowItWorks = () => {
  return (
    <section className="how-it-works-section">
      <div className="container">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">Your spiritual journey is just three simple steps away.</p>
        
        <div className="steps-container">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="step-card">
                <div className="step-icon-wrapper">
                  {step.icon}
                  <span className="step-number">{step.id}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="step-connector"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
