import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './About.css';

export class About extends Component {
    static propTypes = {};

    render() {
        return (
            <div className="about-container">
                {/* Hero Section */}
                <div
                    className="hero-section"
                    style={{ backgroundImage: "url('/images/prepex1.png')" }}
                >
                    <div className="overlay"></div>
                    <div className="hero-content">
                        <h1 className="hero-title">"Empowering Students to Achieve Their Dreams"</h1>
                        <p className="hero-text">
                            At PrepEx, we are committed to providing the best resources and support to help you succeed in your placement journey.
                        </p>
                        <div className="hero-buttons">
                            <button className="btn btn-warning">Get Started</button>
                            <button className="btn btn-outline-light">Contact Us</button>
                        </div>
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div className="section-container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="video-container">
                                <video controls className="video">
                                    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h2 className="section-title">Our Mission</h2>
                            <p className="section-text">
                                We aim to bridge the gap between students and their dream jobs by providing comprehensive placement preparation resources, personalized guidance, and a supportive community.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Testimonials Section */}
                <div className="section-container">
                    <div className="row">
                        <div className="col-md-6">
                            <h2 className="section-title">What Our Users Say</h2>
                            <p className="section-text">Hear from students who have successfully aced their placements with PrepEx.</p>
                            <div className="testimonial">
                                <div className="testimonial-header">
                                    <img src="/images/pritha.png" alt="User" className="testimonial-img" />
                                    <div>
                                        <div className="testimonial-name">Pritha Das</div>
                                        <div className="testimonial-handle">@PrithaDas69</div>
                                    </div>
                                </div>
                                <div className="testimonial-content">
                                    <p>PrepEx has been a game-changer for me. The resources are top-notch, and the personalized approach helped me crack my dream company!</p>
                                </div>
                                <div className="testimonial-time">05:00</div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="testimonial">
                                <div className="testimonial-header">
                                    <img src="/images/my photo.png" alt="User" className="testimonial-img" />
                                    <div>
                                        <div className="testimonial-name">Vishesh Choudhary</div>
                                        <div className="testimonial-handle">@VisheshChoudhary149</div>
                                    </div>
                                </div>
                                <div className="testimonial-content">
                                    <p>"The placement quizzes and mock tests on PrepEx are incredibly helpful. I feel much more confident now!"</p>
                                </div>
                                <div className="testimonial-time">05:00</div>
                            </div>

                            <div className="video-container">
                                <video controls className="video">
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
