import React from "react";

const About = () => {
  return (
    <div className="p-6 bg-white rounded shadow text-gray-800 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">About Our CRM System</h1>
      <p className="mb-4">
        Our CRM (Customer Relationship Management) system is a comprehensive platform designed to streamline business operations,
        improve customer interactions, and drive growth. Inspired by <strong>EspoCRM</strong>, it allows users to manage accounts, leads,
        contacts, opportunities, meetings, calls, emails, and more — all in one centralized interface.
      </p>
      <p className="mb-4">
        Built with modern technologies like <strong>React</strong>, <strong>Node.js</strong>, and <strong>MySQL</strong>, this CRM offers a fast,
        responsive, and intuitive user experience. Whether you're tracking sales, scheduling follow-ups, or managing teams, our system
        empowers your organization with the tools to build strong customer relationships and make data-driven decisions.
      </p>
      <p>
        This project is a custom-built solution tailored to meet the needs of growing businesses that require flexibility, scalability,
        and control over their data.
      </p>
    </div>
  );
};

export default About;
