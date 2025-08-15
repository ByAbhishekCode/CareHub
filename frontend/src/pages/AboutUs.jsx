import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";

const AboutUs = () => {
  return (
    <>
      <Hero title={"Learn More About Us | CareHub"} imageUrl={"/about.png"} />
      <Biography imggeUrl={"/whoweare.png"} />
    </>
  );
};

export default AboutUs;
