import React from 'react';

function About() {
  return (
    <section className="page-card info-page">
      <p className="eyebrow">About Us</p>
      <h1>We help learners turn MERN concepts into real working apps.</h1>
      <p>
        This application connects React routes, reusable components, and backend data into a simple learning dashboard.
      </p>

      <div className="feature-grid">
        <div className="feature-card">
          <h3>React UI</h3>
          <p>Fast pages, reusable components, and smooth route changes.</p>
        </div>
        <div className="feature-card">
          <h3>Backend Data</h3>
          <p>Fetch records from your local API and display them clearly.</p>
        </div>
        <div className="feature-card">
          <h3>Practice Ready</h3>
          <p>A clean base you can extend with forms, auth, and CRUD features.</p>
        </div>
      </div>
    </section>
  );
}

export default About;