import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <div className="hero container" style={{ overflow: "hidden" }}>
      <div className="banner">
        <h1>{title}</h1>
        <p>
          CareHub is a trusted healthcare management platform that connects
          doctors, clinics, and patients through a secure, seamless system. We
          simplify appointments, medical records, and service coordination to
          deliver efficient, personalized care. At CareHub, your health is our
          top priority — guided by trust, compassion, and innovation.
        </p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="hero" className="animated-image" />
        <span>
          <img src="/Vector.png" alt="vector" />
        </span>
      </div>
    </div>
  );
};

export default Hero;
