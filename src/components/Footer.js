import React, { Component } from "react";
import PropTypes from "prop-types";

export class Footer extends Component {
  static propTypes = {
    onNavigate: PropTypes.func.isRequired, 
  };

  render() {
    return (
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <span
              onClick={() => this.props.onNavigate("home")}
              className="nav-link px-2 text-muted"
              style={{ cursor: "pointer" }}
            >
              Home
            </span>
          </li>
          <li className="nav-item">
            <span
              onClick={() => this.props.onNavigate("features")}
              className="nav-link px-2 text-muted"
              style={{ cursor: "pointer" }}
            >
              Features
            </span>
          </li>
          <li className="nav-item">
            <span
              onClick={() => this.props.onNavigate("resources")}
              className="nav-link px-2 text-muted"
              style={{ cursor: "pointer" }}
            >
              Resources
            </span>
          </li>
          <li className="nav-item">
            <span
              onClick={() => this.props.onNavigate("faqs")}
              className="nav-link px-2 text-muted"
              style={{ cursor: "pointer" }}
            >
              FAQs
            </span>
          </li>
          <li className="nav-item">
            <span
              onClick={() => this.props.onNavigate("about")}
              className="nav-link px-2 text-muted"
              style={{ cursor: "pointer" }}
            >
              About us
            </span>
          </li>
        </ul>
        <p className="text-center text-muted">© 2025</p>
      </footer>
    );
  }
}

export default Footer;
