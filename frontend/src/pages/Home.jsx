import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Departments from "../components/Departments";
import MessageForm from "../components/MessageForm";

const Home = () => {
  return (
    <>
      <Hero
        title={"Welcome to CareHub | Connecting Care, Empowering Health"}
        imageUrl={"/hero.png"}
      />
      <Biography imggeUrl={"/about.png"}/>
      <Departments />
      <MessageForm />
    </>
  );
};

export default Home;
