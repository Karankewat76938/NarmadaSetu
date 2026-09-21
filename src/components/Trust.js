import React from "react";

const Trust = () => {
  const features = [
    {
      title: "Verified Boat Riders",
      desc: "All Kewat Samaj boat riders are verified for safety and authenticity.",
      icon: "✅",
    },
    {
      title: "Safe & Secure Booking",
      desc: "Easy and secure online booking experience for every tourist.",
      icon: "🔒",
    },
    {
      title: "Support Local Community",
      desc: "Your booking directly supports local families and livelihoods.",
      icon: "🤝",
    },
    {
      title: "Complete Tourism Services",
      desc: "Boat rides, Homestays, Food, and Narmada Aarti — all in one place.",
      icon: "🌊",
    },
  ];

  return (
    <section className="trust">
      <div className="container">
        <h2>Why Choose NarmadaSetu?</h2>

        <div className="trust-grid">
          {features.map((item, index) => (
            <div className="trust-card" key={index}>
              <div className="trust-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;