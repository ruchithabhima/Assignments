import React from "react";
import profileImage from "../assets/profile_image.webp";
const Home = () => {
  return (
    <section id="hero">
      <div className="container bgblue shadow  rounded">
        <div className="row">
          <div className="col-md-6 ">
            <div className="d-flex flex-column justify-content-center  h-100 pt-4 pb-4 pl-3">
              <h1 className="heading fw-bold">
                {" "}
                Hi! This is <span className="highlight"> Ruchitha Bhima </span>
              </h1>
              <h2 className="subtitle">
                B.Tech CSE student @RGUKT, Ongole, Andhra Pradesh.
              </h2>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-center align-items-center">
              <img className="hero-img" src={profileImage} loading="eager"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Home;
