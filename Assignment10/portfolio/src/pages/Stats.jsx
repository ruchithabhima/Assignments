import React from 'react'

const Stats = () => {
  return (
   <section id="stats">
        <div className="container">
        <div className="row">
        <h3 className="heading2 mb-1 padding">Skills</h3>
        <div className=" d-flex flex-wrap gap-3">
            <div className="skill-category bgcard">
                <h4>Programming Languages</h4>
                <div className="d-flex flex-column">
                <p className="paracolor">Python (Intermediate)</p>
                <p className="paracolor">C++ Programming (Basic)</p>
                </div>
            </div>
            <div className="skill-category bgcard">
                <h4>Web Development</h4>
                <div className="d-flex flex-column">
                <p className="paracolor">HTML, CSS, Bootstrap & JavaScript</p>
                <p className="paracolor">Node.js, Express.js</p>
                </div>
                
            </div>
            <div className="skill-category bgcard shadow">
                <h4>Database Management</h4>
                <div className="d-flex flex-column">
                <p className="paracolor">SQL / MySQL</p>
                <p className="paracolor">mongoDB</p>
                </div>
            </div>
            <div className="skill-category bgcard">
                <h4>Tools & Platforms</h4>
                <div className="d-flex flex-column">
                <p className="paracolor">Git & GitHub</p>
                <p className="paracolor">VS Code</p>
                </div>
            </div>
        </div>
        </div>
        </div>
    </section>
  )
}

export default Stats
