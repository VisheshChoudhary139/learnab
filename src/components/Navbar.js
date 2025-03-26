import React, { Component } from "react";

export class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" style={{ color: "#DF7F13", fontWeight: "bold" }} href="#">
              LearnAble
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
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <button className="nav-link active" onClick={() => this.props.onNavigate("home")}>
                    Home
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={() => this.props.onNavigate("practice")}>
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
                  <ul className="dropdown-menu">
                    <li>
                      <button className="dropdown-item" onClick={() => this.props.onNavigate("interactive")}>
                      Interactive Lessons
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={() => this.props.onNavigate("english")}>
                      Speech Recognition
                      </button>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={() => this.props.onNavigate("programming")}>
                      Multimodal Learning
                      </button>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={() => this.props.onNavigate("progress")}>
                    Progress Report
                  </button>
                </li>
              </ul>
              <form className="d-flex" style={{ gap: "10px" }} role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-hover" type="submit">
                  Search
                </button>
                <button className="btn btn-hover" onClick={() => this.props.onNavigate("login")}>
                  Login
                </button>
                <button className="btn btn-hover" onClick={() => this.props.onNavigate("signup")}>
                  Signup
                </button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
