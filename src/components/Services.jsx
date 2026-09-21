import { FaShip, FaHome, FaUtensils, FaPray } from "react-icons/fa";

const Services = () => {

  const services = [
    {
      icon:<FaShip/>,
      title:"Boat Rides",
      desc:"Book trusted boat rides with local Kewat riders."
    },
    {
      icon:<FaHome/>,
      title:"Homestay",
      desc:"Stay with local families near Narmada river."
    },
    {
      icon:<FaUtensils/>,
      title:"Food Facility",
      desc:"Enjoy authentic local food experience."
    },
    {
      icon:<FaPray/>,
      title:"Narmada Aarti",
      desc:"Join divine evening Narmada Aarti."
    }
  ];

  return (
    <section className="container">
      <h2 className="section-title">Our Services</h2>

      <div className="services-grid">

        {services.map((service,index)=>(
          <div className="service-card" key={index}>

            <div className="service-icon">
              {service.icon}
            </div>

            <h3>{service.title}</h3>
            <p>{service.desc}</p>

          </div>
        ))}

      </div>
    </section>
  );
};

export default Services;