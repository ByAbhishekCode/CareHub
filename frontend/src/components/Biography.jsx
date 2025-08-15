import React from "react";

const Biography = ({ imggeUrl }) => {
  return (
    <div className="container biography">
      <div className="banner">
        <img src={imggeUrl} alt="aboutimg" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who We Are</h3>
        <p>
          CareHub is a modern healthcare platform built to connect doctors,
          clinics, and patients seamlessly.
        </p>
        <p>
          We focus on making healthcare simple, reliable, and accessible for
          everyone.
        </p>
        <p>
          Our system streamlines appointments, record management, and patient
          communication.
        </p>
        <p>
          We believe in delivering care that is both efficient and deeply
          compassionate.
        </p>
        <p>
          With cutting-edge technology, we ensure your health information stays
          secure and private.
        </p>
        <p>At CareHub, your well-being is at the heart of everything we do.</p>
      </div>
    </div>
  );
};

export default Biography;
