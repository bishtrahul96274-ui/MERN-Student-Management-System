import React from "react";

function Contact() {
  return (
    <section className="page-card info-page contact-page">
      <p className="eyebrow">Contact</p>
      <h1>Have a question about the MERN course?</h1>
      <p>Send us a message and we will help you choose the next step.</p>

      <div className="contact-box">
        <div>
          <span>Email</span>
          <strong>hello@mernacademy.com</strong>
        </div>
        <div>
          <span>Phone</span>
          <strong>+91 98765 43210</strong>
        </div>
        <div>
          <span>Location</span>
          <strong>Online and classroom batches</strong>
        </div>
      </div>
    </section>
  );
}

export default Contact;