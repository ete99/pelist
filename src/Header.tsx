import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <header className="bg-teal-500 p-4">
      <div className="flex items-center justify-between">
        <button onClick={goBack} className="text-white">
          <FiArrowLeft
            style={{
              fontWeight: "bold",
              strokeWidth: "4",
              cursor: "pointer",
              height: "20px",
              width: "20px",
            }}
          />
        </button>
        <h1 className="text-white text-2xl font-bold">Pelist</h1>
        <div
          style={{
            width: "20px",
            height: "20px",
          }}
        ></div>
      </div>
    </header>
  );
};

export default Header;
