import React from "react";

function Course() {
  return (
    <section className="page-card info-page">
      <p className="eyebrow">Courses</p>
      <h1>Choose a path and start building.</h1>

      <div className="feature-grid">
        <div className="feature-card course-card">
          <span className="pill">Beginner</span>
          <h3>React Basics</h3>
          <p>Components, props, state, routing, and page design.</p>
        </div>
        <div className="feature-card course-card">
          <span className="pill">Backend</span>
          <h3>Node + Express</h3>
          <p>Create APIs, connect routes, and serve data to React.</p>
        </div>
        <div className="feature-card course-card">
          <span className="pill">Database</span>
          <h3>MongoDB CRUD</h3>
          <p>Store, read, update, and delete records like a real app.</p>
        </div>
      </div>
    </section>
  );
}

export default Course;