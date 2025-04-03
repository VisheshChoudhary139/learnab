import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import "./MasterQuote.css"; // Import CSS

const MasterQuote = ({ text, color, accentColor }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="master-quote"
            style={{
                backgroundColor: color,
                boxShadow: `0px 6px 15px ${color}50`,
            }}
        >
            <blockquote className="quote-text">{text}</blockquote>
            <div
                className="quote-accent"
                style={{ backgroundColor: accentColor }}
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
