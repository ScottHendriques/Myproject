import { Instagram, Twitter, Youtube } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const Footer = () => {
  const { theme } = useThemeStore(); 

  return (
    <div>
      <footer className=" text-white" data-theme={theme}>
      <div className="bg-base-100 text-base-content py-4 text-center">
        <p className="text-lg font-medium">Stay connected with us</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="#" className="text-xl"><Instagram size={20} /></a>
          <a href="#" className="text-xl"><Twitter size={20} /></a>
          <a href="#" className="text-xl"><Youtube size={20} /></a>
        </div>
      </div>

      <div className="py-6 px-4 md:px-20 bg-neutral text-neutral-content">
        <div className="flex justify-center items-center space-x-6 md:space-x-12">
          <a href="#" className="hover:text-white">About us</a>
          <span className="hidden md:inline-block border-l border-gray-500 h-5"></span>
          <a href="#" className="hover:text-white">Contact us</a>
          <span className="hidden md:inline-block border-l border-gray-500 h-5"></span>
          <a href="#" className="hover:text-white">Login/Register</a>
          <span className="hidden md:inline-block border-l border-gray-500 h-5"></span>
          <a href="#" className="hover:text-white">Flight Schedule</a>
        </div>
        <hr className="mt-4 border-gray-700" />
      </div>
    </footer>
    </div>
  );
};

export default Footer;
