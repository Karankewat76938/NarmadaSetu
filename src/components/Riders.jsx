import React from "react";

const Riders = () => {
  const riders = [
    {
      name: "Ramesh Kewat",
      location: "Bhedaghat",
      price: "₹500 / Ride",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },
    {
      name: " Kewat",
      location: "Omkareshwar",
      price: "₹700 / Ride",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
    {
      name: "Mahesh Kewat",
      location: "Hoshangabad",
      price: "₹600 / Ride",
      image:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce",
    },
  ];

  return (
    <section className="riders">
      <div className="container">
        <h2>Meet Our Boat Riders</h2>

        <div className="rider-grid">
          {riders.map((rider, index) => (
            <div className="rider-card" key={index}>
              <img src={rider.image} alt="rider" />
              <h3>{rider.name}</h3>
              <p>{rider.location}</p>
              <span>{rider.price}</span>
              <button className="btn">Book Ride</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Riders;