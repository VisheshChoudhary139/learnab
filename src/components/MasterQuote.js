import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const MasterQuote = ({ text, color, accentColor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        backgroundColor: color,
        padding: "20px 30px",
        borderRadius: "12px",
        textAlign: "center",
        color: accentColor,
        boxShadow: `0px 6px 15px ${color}50`,
        maxWidth: "800px",
        margin: "30px auto",
        position: "relative",
      }}
    >
      <blockquote
        style={{
          fontStyle: "italic",
          fontSize: "1.2rem",
          fontWeight: "500",
          lineHeight: "1.6",
        }}
      >
        “"Finding the perfect placement is like solving a puzzle – every piece matters. Our app helps students and professionals connect with the right opportunities, turning challenges into triumphs. Start your journey to success with us today!"”
      </blockquote>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "-10px",
          height: "40px",
          width: "8px",
          backgroundColor: accentColor,
          transform: "translateY(-50%)",
          borderRadius: "10px",
        }}
      />
    </motion.div>
  );
};

MasterQuote.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  accentColor: PropTypes.string,
};

MasterQuote.defaultProps = {
  color: "#F3F4F6",
  accentColor: "#007BFF",
};

export default MasterQuote;
