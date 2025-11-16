import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class About extends Component {
  static propTypes = {
    
  };

  render() {
    return (
      <div>
        <div className="container px-4 py-5" style={{ backgroundColor: "#f8f9fa" }}>
          {/* Hero Section */}
          <div
            className="container-fluid d-flex align-items-center justify-content-center text-center"
            style={{
              backgroundImage: "url('/images/prepex1.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "120vh",
              color: "white",
              position: "relative",
              borderRadius: "15px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)",
                borderRadius: "15px",
              }}
            ></div>

            <div className="container px-4 py-5" style={{ position: "relative", zIndex: 2 }}>
              <h1 className="display-4 fw-bold" style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.5)" }}>
                "Empowering Students to Achieve Their Dreams"
              </h1>
              <p className="lead" style={{ textShadow: "1px 1px 5px rgba(0,0,0,0.5)" }}>
                At PrepEx, we are committed to providing the best resources and support to help you succeed in your placement journey.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <button className="btn btn-warning px-4 py-2">Get Started</button>
                <button className="btn btn-outline-light px-4 py-2">Contact Us</button>
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="row align-items-center my-5" style={{ backgroundColor: "white", padding: "30px", borderRadius: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
            <div className="col-md-6">
              <div
                className="ratio ratio-16x9"
                style={{
                  backgroundColor: "#f8f9fa",
                  borderRadius: "10px",
                  border: "2px solid #DF7F13",
                  padding: "4px",
                }}
              >
                <video controls style={{ width: "100%", borderRadius: "8px" }}>
                  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div className="col-md-6">
              <h2 className="fw-bold" style={{ color: "#DF7F13" }}>Our Mission</h2>
              <p className="text-muted">
                We aim to bridge the gap between students and their dream jobs by providing comprehensive placement preparation resources, personalized guidance, and a supportive community.
              </p>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="row my-5" style={{ backgroundColor: "white", padding: "30px", borderRadius: "10px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
            <div className="col-md-6">
              <h2 className="fw-bold" style={{ color: "#DF7F13" }}>What Our Users Say</h2>
              <p className="text-muted" style={{ marginBottom: "40px" }}>
                Hear from students who have successfully aced their placements with PrepEx.
              </p>
              <div style={{ position: "relative", marginBottom: "20px", paddingTop: "40px" }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                  <img src="/images/pritha.png" alt="User" style={{ borderRadius: "50%", marginRight: "10px", width: "50px", height: "50px" }} />
                  <div>
                    <div style={{ fontWeight: "bold" }}>Pritha Das</div>
                    <div style={{ color: "#657786" }}>@PrithaDas69</div>
                  </div>
                </div>
                <div style={{ border: "1px solid #DF7F13", padding: "10px", borderRadius: "5px", backgroundColor: "#f8f9fa" }}>
                  <p>PrepEx has been a game-changer for me. The resources are top-notch, and the personalized approach helped me crack my dream company!</p>
                </div>
                <div style={{ color: "#657786", fontSize: "0.9rem" }}>05:00</div>
              </div>
            </div>

            <div className="col-md-6">
              <div style={{ position: "relative", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                  <img
                    src="/images/my photo.png"
                    alt="User"
                    style={{ borderRadius: "50%", marginRight: "10px", width: "50px", height: "50px" }}
                  />
                  <div>
                    <div style={{ fontWeight: "bold" }}>Vishesh Choudhary</div>
                    <div style={{ color: "#657786" }}>@VisheshChoudhary149</div>
                  </div>
                </div>
                <div style={{ border: "1px solid #DF7F13", padding: "10px", borderRadius: "5px", backgroundColor: "#f8f9fa" }}>
                  <p>"The placement quizzes and mock tests on PrepEx are incredibly helpful. I feel much more confident now!"</p>
                </div>
                <div style={{ color: "#657786", fontSize: "0.9rem" }}>05:00</div>
              </div>

              <div
                className="ratio ratio-16x9"
                style={{
                  backgroundColor: "#f8f9fa",
                  borderRadius: "10px",
                  border: "2px solid #DF7F13",
                  padding: "4px",
                  marginBottom: "20px",
                }}
              >
                <video controls style={{ width: "100%", borderRadius: "8px" }}>
                  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;