import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-500 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-white text-2xl font-bold">Pelist</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-white hover:text-gray-200">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-200">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-200">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
