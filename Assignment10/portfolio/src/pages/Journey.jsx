import React from 'react'

const Journey = () => {
  return (
    <section id="journey">
        <div className="container">
            <h2 className="heading padding pb-3">My Journey</h2>
            <div className="timeline">
                <div className="timeline-item">
                <div className="card leftside">
                    <div className="timeline-content">
                        <span >June 2026 - Present</span>
                        <h3>web Development Intern</h3>
                        <p>Srinivasan Software Solutions Pvt Ltd</p>
                    </div>
                </div>
                </div>
                <div className="timeline-item">
                <div className="cardright rightside">
               
                <div className="timeline-content">
                    <span>2023-2027</span>
                    <h3>B.Tech in Computer Science Engineering</h3>
                    <p> Rajiv Gandhi University Of Knowledge Technologies,CGPA:9.1</p>
                </div>
                </div>
                </div>
                <div className="timeline-item">
                <div className="card leftside">
                    <div className="timeline-content">
                        <span>2021-2023</span>
                        <h3>Pre University Course(PUC)</h3>
                        <p>Rajiv Gandhi University Of Knowledge Technologies,CGPA:9.98</p>
                    </div>
                </div>
                </div>
                    <div className="timeline-item">
                <div className="cardright rightside">
                    <div className="timeline-content">
                        <span>2020 - 2021</span>
                        <h3>Board Of Secondary Education(SSC)</h3>
                        <p>Bhashyam Public School,GPA:10.0</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Journey
