import React, { useState } from "react";
import PropTypes from "prop-types";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const testimonials = [
  {
    name: "Prof. XYZ",
    title: "8th Grade Math Teacher",
    image: "https://via.placeholder.com/80",
    quote: "Just today, I was able to use an already created Quizizz on slope-intercept form to see if my students were ready for their summative assessment on Thursday ... Because of the data from the Quizizz, I was able to support and meet the needs of these students.",
    color: "#FF9933"
  },
  {
    name: "Sarah Edinger",
    title: "8th Grade Algebra Teacher",
    image: "https://via.placeholder.com/80",
    quote: "I had a visually impaired student in distance learning ... With Quizizz, I was able to keep him on track ... and he successfully moved to the next course of accelerated math with all the foundational pieces in place that he needed to know!",
    color: "#FFC107"
  },
  {
    name: "Lisa Anderson",
    title: "Sr. Manager of Academic Instructional Technology",
    image: "https://via.placeholder.com/80",
    quote: "I can't express how valuable it has been in keeping students engaged in their learning whether through instructor paced, individual/team quiz, or as a homework assignment to review together the next day!",
    color: "#DF7F13"
  },
  {
    name: "Michael Ross",
    title: "Science Teacher",
    image: "https://via.placeholder.com/80",
    quote: "Quizizz allows me to challenge my students while keeping learning fun and engaging.",
    color: "#C06500"
  },
  {
    name: "Emily Clarke",
    title: "History Teacher",
    image: "https://via.placeholder.com/80",
    quote: "With Quizizz, history quizzes are interactive and students actually enjoy them!",
    color: "#A14C00"
  }
];

const Card = ({ name, title, image, quote, color }) => {
  return (
    <div
      style={{
        border: `2px solid ${color}`,
        backgroundColor: `${color}10`,
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "15px",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s, box-shadow 0.3s",
        cursor: "pointer"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0px 6px 12px rgba(0, 0, 0, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0px 3px 6px rgba(0, 0, 0, 0.1)";
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <img
            src={image}
            alt={`${name} profile`}
            style={{ maxHeight: "80px", borderRadius: "50%", marginRight: "10px" }}
          />
          <div>
            <h5 style={{ color: color, marginBottom: "3px" }}>{name}</h5>
            <p style={{ color: "#6c757d", marginBottom: "0" }}>{title}</p>
          </div>
        </div>
        <p style={{ color: color }}>{quote}</p>
      </div>
    </div>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};

const Cards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerPage = 3;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + cardsPerPage >= testimonials.length ? 0 : prevIndex + cardsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - cardsPerPage < 0 ? testimonials.length - cardsPerPage : prevIndex - cardsPerPage
    );
  };
  const Card = ({ name, title, image, quote, color }) => {
    return (
      <div
        style={{
          background: `linear-gradient(145deg, ${color}10, ${color}30)`,
          border: `1px solid ${color}50`,
          padding: "20px",
          borderRadius: "15px",
          marginBottom: "15px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s, box-shadow 0.3s",
          cursor: "pointer",
          maxWidth: "300px",
          margin: "10px"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0px 8px 20px rgba(0, 0, 0, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.1)";
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img
            src={image}
            alt={`${name} profile`}
            style={{ 
              width: "80px", 
              height: "80px", 
              borderRadius: "50%", 
              border: `2px solid ${color}`, 
              marginBottom: "15px" 
            }}
          />
          <h5 style={{ color: color, marginBottom: "5px", fontSize: "1.2rem" }}>{name}</h5>
          <p style={{ color: "#6c757d", marginBottom: "10px", fontSize: "0.9rem" }}>{title}</p>
          <p style={{ color: color, textAlign: "center", fontStyle: "italic", fontSize: "0.9rem" }}>
            "{quote}"
          </p>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: "40px 0", position: "relative" }}>
      <div style={{ position: "relative", maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
          {testimonials.slice(currentIndex, currentIndex + cardsPerPage).map((testimonial, index) => (
            <div key={index} style={{ maxWidth: "280px", margin: "8px" }}>
              <Card {...testimonial} />
            </div>
          ))}
        </div>
        <button 
          onClick={prevSlide} 
          style={{ 
            background: "none", 
            border: "none", 
            cursor: "pointer", 
            fontSize: "24px", 
            position: "absolute", 
            left: "-40px", 
            top: "50%", 
            transform: "translateY(-50%)" 
          }}
        >
          <FiArrowLeft />
        </button>
        <button 
          onClick={nextSlide} 
          style={{ 
            background: "none", 
            border: "none", 
            cursor: "pointer", 
            fontSize: "24px", 
            position: "absolute", 
            right: "-40px", 
            top: "50%", 
            transform: "translateY(-50%)" 
          }}
        >
          <FiArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Cards;