import React from "react";
import "./FAQ.css"; // Custom CSS for FAQ
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS

// FAQ data
const faqData = [
  {
    question: "What is On-Call-Doctor?",
    answer: "On-Call-Doctor is a service that provides immediate medical assistance by connecting you with a doctor over the phone or online.",
  },
  {
    question: "What is Home centric primary healthcare?",
    answer: "Home centric primary healthcare focuses on providing medical services at home, ensuring convenience and personalized care.",
  },
  {
    question: "Which main health screenings are included in your package?",
    answer: "Our package includes comprehensive health screenings such as blood tests, cholesterol checks, and blood pressure monitoring.",
  },
  {
    question: "Does the government approve of your doctor?",
    answer: "Yes, all our doctors are government-approved and licensed to practice medicine.",
  },
  {
    question: "What if I decide to cancel an appointment?",
    answer: "You can cancel your appointment at any time through our website or app. Please check our cancellation policy for more details.",
  },
  {
    question: "Can I set up an online appointment and pay later?",
    answer: "Yes, you can book an appointment online and pay later at the time of the consultation.",
  },
  {
    question: "Can I change the timing of an on-call-doctor appointment?",
    answer: "Yes, you can reschedule your on-call-doctor appointment by contacting our support team or through the app.",
  },
  {
    question: "Can I change the timing of an appointment for Home Centric Primary Care Package?",
    answer: "Yes, you can reschedule your appointment for the Home Centric Primary Care Package by contacting our support team.",
  },
];

const FAQ = () => {
  return (
    <div className="faq-page">
      {/* Simplified Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <a className="navbar-brand" href="/">
            ASAP Health Care Service
          </a>
        </div>
      </nav>

      {/* FAQ Section */}
      <section className="container faq-container py-5">
        <h1 className="text-center mb-4">Frequently Asked Questions</h1>
        <div className="accordion" id="faqAccordion">
          {faqData.map((faq, index) => (
            <div key={index} className="accordion-item">
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded="false"
                  aria-controls={`collapse${index}`}
                >
                  {faq.question}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading${index}`}
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer (Same as Homepage) */}
      <footer className="bg-dark text-white text-center py-3 mt-4">
        <p className="mb-0">&copy; 2025 ASAP Health Care Service. All Rights Reserved.</p>
        <p className="mb-0">
          We are on a mission to make quality healthcare affordable and accessible for the people of Bangladesh.
        </p>
      </footer>
    </div>
  );
};

export default FAQ;