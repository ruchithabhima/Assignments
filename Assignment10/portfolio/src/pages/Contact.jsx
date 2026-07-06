import React from "react";
import { useState } from "react";
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      alert("please enter your name");
      return;
    }
    if (email.trim() === "") {
      alert("please enter your email");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email");
      return;
    }
    if (message.trim() === "") {
      alert("Please enter a message");
      return;
    }
    alert("Form submitted successfully!");
    setName("");
    setEmail("");
    setMessage("");
  };
  return (
    <section id="contact">
      <div className="container">
        <div className="row padding">
          <div className="col-md-4">
            <h2 className="heading pt-4">Let's Connect!</h2>
            <div className="contact-info">
              <div className="email-section">
                <i className="fa-solid fa-envelope email-icon"></i>
                <span className="email-text">ruchithabhima@gmail.com</span>
              </div>
              <div className="social-icons">
                <a
                  href="https://www.linkedin.com/in/ruchitha-bhima-328a79344?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                >
                  <i className="fa-brands fa-linkedin"></i>
                </a>
                <a href="https://github.com/ruchithabhima" target="_blank">
                  <i className="fa-brands fa-github"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-8 contact-form">
            <form id="contactForm" onSubmit={handleSubmit}>
              <div className="d-flex flex-column gap-4">
                <input
                  className="form-control bginput"
                  type="text"
                  placeholder="Your Name"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></input>
                <input
                  className="form-control bginput"
                  type="email"
                  placeholder="Your Email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></input>
                <textarea
                  className="form-control bgtextarea"
                  rows="6"
                  cols="55"
                  placeholder="Message"
                  required
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                ></textarea>
                <button type="submit" className=" btnbg">
                  Submit
                </button>
              </div>
            </form>
            {/* <div>
              <p className="text-white">{name}</p>
              <p className="text-white">{email}</p>
              <p className="text-white">{message}</p>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
