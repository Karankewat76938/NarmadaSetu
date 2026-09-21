import React from "react";

const BoatRiders = () => {
  const riders = [
    {
      name: "Ramesh Kewat",
      location: "Omkareshwar",
      price: "₹500 / Ride",
    },
    {
      name: "Suresh Kewat",
      location: "Maheshwar",
      price: "₹700 / Ride",
    },
    {
      name: "Mukesh Kewat",
      location: "Hoshangabad",
      price: "₹600 / Ride",
    },
  ];

  return (
    <section className="riders container">
      <h2>Book Boat Riders</h2>

      <div className="rider-grid">
        {riders.map((rider, index) => (
          <div className="card" key={index}>
            <h3>{rider.name}</h3>
            <p>{rider.location}</p>
            <p>{rider.price}</p>
            <button className="btn">Book Ride</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BoatRiders;