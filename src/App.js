import "./App.css";
import React, { Component } from "react";
import Home from "./components/Home";
import Footer from "./components/Footer";
import MasterQuote from "./components/MasterQuote";
import Auth from "./components/Auth";
import Navbar from "./components/Navbar";
import Progress from "./components/Progress";
import Interactive from "./components/LessonPage";
import English from "./components/Speech";
import Programming from "./components/MultimodalLearning";
import Practice from "./components/AIChatBox";
import About from "./components/About";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "auth",
      isAuthenticated: false, // Default: not authenticated
    };
  }

  componentDidMount() {
    // Check if the user is already authenticated
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ isAuthenticated: true, currentPage: "home" });
    }
  }

  onNavigate = (page) => {
    if (!this.state.isAuthenticated && page !== "auth") {
      alert("You must be logged in to access this page!");
      return;
    }
    this.setState({ currentPage: page });
  };

  handleLogin = (token) => {
    localStorage.setItem("token", token); // Store token
    this.setState({ isAuthenticated: true, currentPage: "home" });
  };

  handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    this.setState({ isAuthenticated: false, currentPage: "auth" });
  };

  render() {
    const { currentPage, isAuthenticated } = this.state;

    return (
        <div>
          <Navbar
              onNavigate={this.onNavigate}
              isAuthenticated={isAuthenticated}
              onLogout={this.handleLogout}
          />
          {currentPage === "auth" && <Auth onNavigate={this.onNavigate} onLogin={this.handleLogin} />}

          {isAuthenticated && (
              <>
                {currentPage === "home" && <Home onNavigate={this.onNavigate} />}
                {currentPage === "masterquote" && <MasterQuote onNavigate={this.onNavigate} />}
                {currentPage === "progress" && <Progress onNavigate={this.onNavigate} />}
                {currentPage === "interactive" && <Interactive onNavigate={this.onNavigate} />}
                {currentPage === "english" && <English onNavigate={this.onNavigate} />}
                {currentPage === "programming" && <Programming onNavigate={this.onNavigate} />}
                {currentPage === "practice" && <Practice onNavigate={this.onNavigate} />}
                {currentPage === "about" && <About onNavigate={this.onNavigate} />}
              </>
          )}

          <Footer onNavigate={this.onNavigate} />
        </div>
    );
  }
}
