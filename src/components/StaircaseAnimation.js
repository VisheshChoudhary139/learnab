// StaircaseAnimation.jsx
import React, { useEffect } from "react";
import "./StaircaseAnimation.css";

const StaircaseAnimation = () => {
    useEffect(() => {
        const staircase = document.getElementById("animated-staircase-steps");
        const arrowPath = document.getElementById("animated-staircase-arrowPath");

        const stepWidth = 90;
        const stepCount = Math.ceil(1000 / stepWidth) * 4;
        const heights = [40, 60, 80, 100, 120, 140, 160];

        let pathData = "";
        let currentX = 0;
        const chartHeight = 500;
        const arrowGap = 150;

        for (let i = 0; i < stepCount; i++) {
            const stepHeight = heights[i % heights.length];
            const step = document.createElement("div");
            step.className = "animated-staircase-step";
            step.style.height = `${stepHeight}px`;
            staircase.appendChild(step);

            const mappedY = chartHeight - stepHeight - arrowGap;
            pathData += `${i === 0 ? "M" : "L"} ${currentX} ${mappedY} `;
            currentX += stepWidth;
        }

        const totalWidth = stepCount * stepWidth;
        staircase.style.width = `${totalWidth}px`;

        const style = document.createElement("style");
        style.innerHTML = `
            @keyframes animated-staircase-moveStairs {
                from { transform: translateX(0); }
                to { transform: translateX(-${totalWidth / 2}px); }
            }

            @keyframes animated-staircase-moveArrow {
                from { transform: translateX(-${totalWidth / 2}px); }
                to { transform: translateX(0); }
            }
        `;
        document.head.appendChild(style);
        arrowPath.setAttribute("d", pathData);
    }, []);

    return (
        <div className="animated-staircase-container">
            <div className="animated-staircase-wrapper">
                <svg className="animated-staircase-chart" id="animated-staircase-chart" viewBox="0 0 3000 220"
                     preserveAspectRatio="xMinYMin">
                    <defs>
                        <linearGradient id="animated-staircase-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="#161179"/>
                            <stop offset="50%" stopColor="#161179"/>
                            <stop offset="100%" stopColor="#261FB3"/>
                        </linearGradient>
                        <marker id="animated-staircase-arrowhead" markerWidth="10" markerHeight="7" refX="6" refY="3.5"
                                orient="auto" markerUnits="strokeWidth">
                            <polygon points="0 0, 10 3.5, 0 7" fill="url(#animated-staircase-gradient)"/>
                        </marker>
                    </defs>
                    <path className="animated-staircase-path" id="animated-staircase-arrowPath" d=""/>
                </svg>
                <div className="animated-staircase-steps" id="animated-staircase-steps"></div>
            </div>
            <img src="trophy.png" alt="Trophy" className="progresspng"/>
        </div>
    );
};

export default StaircaseAnimation;
