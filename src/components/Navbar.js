import React, { Component } from "react";
import "./Navbar.css"; // Import CSS file

export class Navbar extends Component {
  render() {
    const { onNavigate, isAuthenticated, onLogout } = this.props;

    return (
        <div>
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <a
                  className="navbar-brand"
                  onClick={() => onNavigate("home")}
                  style={{ cursor: "pointer" }}
              >
                <img src="./logo.png" alt="Logo" className="navbar-logo" />
              </a>
              <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                  className="collapse navbar-collapse justify-content-center"
                  id="navbarSupportedContent"
              >
                <ul className="navbar-nav text-center">
                  <li className="nav-item">
                    <button className="nav-link active" onClick={() => onNavigate("home")}>
                      Home
                    </button>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link" onClick={() => onNavigate("practice")}>
                      AI-Tutor
                    </button>
                  </li>
                  <li className="nav-item dropdown">
                    <button
                        className="nav-link dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                      Learning Time
                    </button>
                    <ul className="dropdown-menu text-center">
                      <li>
                        <button className="dropdown-item" onClick={() => onNavigate("interactive")}>
                          Interactive Lessons
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={() => onNavigate("english")}>
                          Speech Recognition
                        </button>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={() => onNavigate("programming")}>
                          Multimodal Learning
                        </button>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link" onClick={() => onNavigate("progress")}>
                      Progress Report
                    </button>
                  </li>
                </ul>
              </div>
              <form className="d-flex search-form" role="search">
                {isAuthenticated ? (
                    <button className="btn btn-danger" onClick={onLogout}>
                      Logout
                    </button>
                ) : (
                    <button className="btn btn-hover" onClick={() => onNavigate("auth")}>
                      Login/Signup
                    </button>
                )}
              </form>
            </div>
          </nav>
        </div>
    );
  }
}

export default Navbar;
