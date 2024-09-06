import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-800">
            <Link to="/">Mente Ingeniería</Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <Link to="#features" className="text-gray-600 hover:text-gray-900">
              Features
            </Link>
            <Link to="#pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <Link to="#resources" className="text-gray-600 hover:text-gray-900">
              Resources
            </Link>
            <Link to="#community" className="text-gray-600 hover:text-gray-900">
              Community
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Link
              to="#signup"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-800 hover:text-gray-900 focus:outline-none">
              {/* Mobile menu icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
