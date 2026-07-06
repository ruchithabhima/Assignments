import React from 'react'
import studybud from "../assets/minihomepage.webp";
import connectFeed from "../assets/createpost_homepage.webp"
import skyCast  from "../assets/wheatherhome.webp";
import internPortal from "../assets/internportal.webp";
console.log("projects component loaded");
const Projects = () => {
  return (
     <section id="projects">
        <div className="container">
            <h1 className="heading2 padding pb-1">My Projects</h1>
            <div className="row">
            <div className="d-flex flex-wrap gap-4">
                <div className="project-card">
                     <div className="d-flex flex-column">
                    <div className="project-image2">
                    <img src={studybud} alt="StudyBud" loading="lazy"/>
                    </div>
                    <div className="content">
                    <h2>StudyBud</h2>
                    <p>
                    AI-powered learning platform that transforms YouTube
                    videos into summaries, notes and quizzes to enhance
                    the learning experience.
                    </p>
                    <div className="technologies mt-2">
                        <span className="bghover2">React</span>
                        <span className="bghover2">Node.js</span>
                        <span className="bghover2">Express</span>
                        <span className="bghover2">MongoDB</span>
                        <span className="bghover2">JWT</span>
                    </div>
                    </div>
                    </div>
                </div>
                <div className="project-card shadow">
                     <div className="d-flex flex-column">
                    <div className="project-image2">
                    <img src={connectFeed} alt="ConnectFeed" loading="lazy"/>
                    </div>
                    <div className="content">
                    <h2>ConnectFeed</h2>
                    <p>
                    A full-stack social media application that allows users to create, upload, and share image-based posts. 
                    </p>
                    <div className="technologies mt-2">
                        <span className="bghover2">HTML</span>
                        <span className="bghover2">CSS</span>
                        <span className="bghover2">Bootstrap</span>
                        <span className="bghover2">MongoDB</span>
                        <span className="bghover2">Node.js</span>
                        <span className="bghover2">Express.js</span>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-wrap mt-3 gap-4">
                <div className="project-card">
                    <div className="d-flex  flex-column">
                    <div className="project-image2">
                    <img src={skyCast} alt="wheatherForecast" loading="lazy"/>
                    </div>
                    <div className="content">
                    <h2>Skycast</h2>
                    <p>
                   A responsive weather forecasting application that provides real-time weather conditions, temperature, humidity & location-based forecasts using weather APIs.
                    </p>
                    <div className="technologies mt-2">
                        <span className="bghover2">HTML</span>
                        <span className="bghover2">CSS</span>
                        <span className="bghover2">Bootstrap</span>
                        <span className="bghover2">Javascript</span>
                        <span className="bghover2">wheather api</span>
                    </div>
                    </div>
                    </div>
                </div>
                <div className="project-card">
                     <div className="d-flex flex-column">
                    <div className="project-image2">
                    <img src={internPortal} alt="internportal" loading="lazy"/>
                    </div>
                    <div className="content">
                    <h2>Internportal</h2>
                    <p>
                    Developed a responsive Internship Portal frontend with multiple sections, intuitive navigation, and mobile-friendly layouts. </p>
                    <div className="technologies mt-2">
                        <span className="bghover2">HTML</span>
                        <span className="bghover2">CSS</span>
                        <span className="bghover2">Bootstrap</span>
                        <span className="bghover2">Javascript</span>
                        
                    </div>
                    </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </section>
  )
}

export default Projects
