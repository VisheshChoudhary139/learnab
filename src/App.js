import "./App.css";
import React, { Component } from "react";
import Home from "./components/Home";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import MasterQuote from "./components/MasterQuote";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Progress from "./components/Progress";
import Interactive from "./components/Interactive"; // Ensure correct import
import English from "./components/Speech";
import Programming from "./components/Multimodel";
import Practice from "./components/AItutor";
import About from "./components/About";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "login",
    };
  }

  onNavigate = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { currentPage } = this.state;

    return (
      <div>
        <Navbar onNavigate={this.onNavigate} />
        {currentPage === "login" && <Login onNavigate={this.onNavigate} />}
        {currentPage === "signup" && <Signup onNavigate={this.onNavigate} />}
        {currentPage === "home" && <Home onNavigate={this.onNavigate} />}
        {currentPage === "cards" && <Cards onNavigate={this.onNavigate} />}
        {currentPage === "masterquote" && <MasterQuote onNavigate={this.onNavigate} />}
        {currentPage === "progress" && <Progress onNavigate={this.onNavigate} />}
        {currentPage === "interactive" && <Interactive onNavigate={this.onNavigate} />} {/* Fixed this */}
        {currentPage === "english" && <English onNavigate={this.onNavigate} />}
        {currentPage === "programming" && <Programming onNavigate={this.onNavigate} />}
        {currentPage === "practice" && <Practice onNavigate={this.onNavigate} />}
        {currentPage === "about" && <About onNavigate={this.onNavigate} />}

        <Footer onNavigate={this.onNavigate} />
      </div>
    );
  }
}
