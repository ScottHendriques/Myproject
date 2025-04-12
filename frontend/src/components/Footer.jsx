import { Instagram, Twitter, Youtube } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { useAuthStore } from "../store/useAuthStore"; // Using authUser to check login state
import { Link } from "react-router-dom";

const Footer = () => {
  const { theme } = useThemeStore();
  const { authUser } = useAuthStore(); // Check if authUser exists

  return (
    <div>
      <footer className="text-white" data-theme={theme}>
        <div className="bg-base-100 text-base-content py-4 text-center">
          <p className="text-lg font-medium">Stay connected with us</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-xl">
              <Instagram size={20} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-xl">
              <Twitter size={20} />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-xl">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        <div className="py-6 px-4 md:px-20 bg-neutral text-neutral-content">
          <div className="flex justify-center items-center space-x-6 md:space-x-12">
            <Link to="/Aboutus" className="hover:text-white">About us</Link>
            <span className="hidden md:inline-block border-l border-gray-500 h-5"></span>
            <Link to="/help" className="hover:text-white">Contact us</Link>
            <span className="hidden md:inline-block border-l border-gray-500 h-5"></span>
            {authUser ? (
              <Link to="/tracking" className="hover:text-white">Track Cargo</Link>
            ) : (
              <Link to="/login" className="hover:text-white">Login/Register</Link>
            )}
            <span className="hidden md:inline-block border-l border-gray-500 h-5"></span>
            <Link to="/flight-schedule" className="hover:text-white">Flight Schedule</Link>
          </div>
          <hr className="mt-4 border-gray-700" />
        </div>
      </footer>
    </div>
  );
};

export default Footer;