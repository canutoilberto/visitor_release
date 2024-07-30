"use client";
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Carregando...</p>
      <style jsx>{`
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }

        .loading-spinner {
          border: 8px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top: 8px solid #007bff;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        p {
          margin-top: 10px;
          font-size: 16px;
          color: #555;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
