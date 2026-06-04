import React from 'react';
import Navbar from './NavBar';
import "./Contact.css"
import {
  FaChevronRight,
  FaChevronLeft,
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from 'react-icons/fa';



function Contact() {
   return (
      <>
      <Navbar />


        <div className = "title">
          <h1>Contact Dashboard</h1>
        </div>

        <div className="description">
          <h1>
          Thank you for exploring my portfolio!<br /><br />
I'm currently seeking work experience for the 2025–2026 school year. If you're interested in connecting, feel free to reach out using this form.<br /><br />
I also welcome you to reach out if you have any feedback on my portfolio, tips for breaking into the cybersecurity or AI fields, or even if you're just looking to connect and network. I'm always open to learning and meeting others in the space!<br /><br />You can also find me on LinkedIn, GitHub, and Instagram using the buttons below — feel free to connect or message me directly.<br /><br />
Thanks again for taking the time to go through my work!
          </h1>
          <div className="logos-contact">
                                  <FaLinkedin className="logos-contact-icon" />
                                  <FaGithub className="logos-contact-icon" />
                                  <FaInstagram className="logos-contact-icon" />
                                </div>
        </div>



      <div>
        <form className = "contact-form">
          <label>Name:</label>
          <input type="text" />

          <label>Email:</label>
          <input type="email" />

          <label>Message:</label>
          <textarea rows="4"></textarea>

          <button type="submit">Send</button>
        </form>

      </div>
      </>
    );
  }

export default Contact;
