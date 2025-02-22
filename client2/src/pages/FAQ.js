import React, { useState } from "react";
import "./FAQ.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FAQImage from "./FAQ/FAQ2.avif";

// FAQ data
const faqData = [
  { question: "Are there any subscription fees?", answer: "No, we do not charge any subscription fees." },
  { question: "Do you share user data with third parties?", answer: "No, we prioritize user privacy and do not share data." },
  { question: "Is there a free trial available?", answer: "Yes, we offer a 7-day free trial." },
  { question: "What kind of customer support do you provide?", answer: "We provide 24/7 customer support via chat and phone." },
  { question: "What payment methods do you accept?", answer: "We accept credit cards, debit cards, and digital wallets." },
  { question: "What payment methods do you accept?", answer: "We accept credit cards, debit cards, and digital wallets." }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      {/* Original Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <a className="navbar-brand" href="/">
            ASAP Health Care Service
          </a>
        </div>
      </nav>

      {/* FAQ Content */}
      <div className="container mt-5">
        <div className="row align-items-start">
          {/* Left Column - Image */}
          <div className="col-md-6">
            <img src={FAQImage} alt="FAQ Illustration" className="img-fluid" />
          </div>

          {/* Right Column - FAQ Content */}
          <div className="col-md-6">
            <h1 className="mb-2">Frequently asked questions</h1>
            <p className="text-muted mb-4">
              Questions you might ask about product and services
            </p>

            <div className="faq-list">
              {faqData.map((faq, index) => (
                <div key={index} className="faq-item">
                  <button
                    className="faq-question w-100 text-start d-flex justify-content-between align-items-center"
                    onClick={() => toggleAnswer(index)}
                  >
                    <span>{faq.question}</span>
                    <span className="plus-icon text-primary">
                      {openIndex === index ? '−' : '+'}
                    </span>
                  </button>
                  {openIndex === index && (
                    <div className="faq-answer">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Original Footer */}
      <footer className="text-center py-3 mt-4 footerFAQ">
        <p className="mb-0">&copy; 2025 ASAP Health Care Service. All Rights Reserved.</p>
        <p className="mb-0">
          We are on a mission to make quality healthcare affordable and accessible for the people of Bangladesh.
        </p>
      </footer>
    </div>
  );
};

export default FAQ;