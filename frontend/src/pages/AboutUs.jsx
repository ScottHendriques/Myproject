import React from 'react';
import { Mail, Phone, MapPin, Package, Search, ClipboardCheck, Settings, Palette, ShieldCheck, Send, Instagram, Facebook, Twitter, Flag, Target } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore'; 
import logoColor from '../images/logo-color.png';
import MV from '../images/M&V.png';
import GETDONE from '../images/GETSHITDONE.png';

const AboutUs = () => {
  const { theme } = useThemeStore();

  const features = [
    { icon: Package, title: "Real-Time Cargo Tracking", description: "Stay updated with live tracking maps, flight details, and cargo status, ensuring complete transparency from origin to destination." },
    { icon: Search, title: "Comprehensive Shipment Details", description: "Access vital cargo information, including weight, type, estimated delivery time, and route history, all in one place." },
    { icon: ClipboardCheck, title: "Smart Flight Selection", description: "Easily find and select the best available flights for your shipment based on origin, destination, and date, with seamless integration of the AviationStack API." },
    { icon: Settings, title: "Admin Panel", description: "A powerful admin interface for secure management of shipments, users, and system settings, ensuring smooth platform operations." },
    { icon: Palette, title: "Theme Customization", description: "CargoStack adapts to your visual preferences with dynamic themes, enhancing user experience with personalized aesthetics." },
    { icon: ShieldCheck, title: "Secure & Efficient Cargo Booking", description: "Book shipments with ease while ensuring safety, reliability, and compliance with international freight regulations." },
  ];

  return (
    <div className={`w-full min-h-screen mt-10 p-10 bg-${theme}-background text-${theme}-foreground font-montserrat`}>
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Introduction Section */}
        <div className={`font-montserrat text-${theme}-foreground`}>
          <div className={`flex flex-col lg:flex-row items-center justify-center p-10 lg:p-20 bg-${theme}-background`}>
            <div className="lg:w-1/2 text-center lg:text-left space-y-4">
              <h2 className="text-5xl font-bold">Our Story</h2>
              <p className="italic text-2xl">About</p>
              <h1 className="text-6xl font-bold">CargoStack</h1>
              <p className="text-gray-600">
                Streamlining global cargo operations with innovative tracking solutions. Experience efficiency and transparency with <span className="italic">CargoStack’s Advanced Freight Management</span>.
              </p>
              <div className="flex justify-center lg:justify-start space-x-4 mt-4">
                <Instagram className="w-6 h-6 cursor-pointer" />
                <Facebook className="w-6 h-6 cursor-pointer" />
                <Twitter className="w-6 h-6 cursor-pointer" />
                <Send className="w-6 h-6 cursor-pointer" />
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center mt-6 lg:mt-0">
              <img
                src={logoColor}
                alt="Founder"
                className="rounded-lg shadow-lg w-full max-w-sm"
              />
            </div>
          </div>
          <div className={`bg-${theme}-secondary text-center py-16 px-10`}>
            <h3 className="text-gray-500 uppercase tracking-wide text-lg">Our Story</h3>
            <h2 className="text-3xl font-bold mt-2">Our Commitment to Innovation</h2>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              CargoStack was founded with a mission to transform the logistics industry through digital solutions. Our team is dedicated to providing real-time tracking, optimized shipment management, and a seamless cargo booking experience for businesses worldwide.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2">
            <h2 className="text-5xl font-semibold italic">What is our purpose & Why</h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-lg shadow-lg bg-${theme}-secondary`}>
                <span className="inline-block px-4 py-1 text-lg font-semibold text-white bg-red-500 rounded-full">MISSION</span>
                <h3 className="mt-4 text-2xl font-medium flex items-center"><Target className="w-5 h-5 mr-2" /> Empowering Cargo Management</h3>
                <p className="mt-2 text-md">Our mission is to deliver an innovative, user-friendly cargo management solution that enhances efficiency, transparency, and reliability in air cargo logistics.</p>
              </div>
              <div className={`p-6 rounded-lg shadow-lg bg-${theme}-secondary`}>
                <span className="inline-block px-4 py-1 text-lg font-semibold text-white bg-red-500 rounded-full">VISION</span>
                <h3 className="mt-4 text-2xl font-medium flex items-center"><Flag className="w-5 h-5 mr-2" /> Shaping the Future of Air Cargo</h3>
                <p className="mt-2 text-md">Our vision is to become the leading platform for air cargo operations, optimizing logistics, reducing delays, and improving global trade efficiency through digital transformation.</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <img src={MV} alt="CargoStack Vision" className="rounded-lg shadow-lg" />
          </div>
        </section>

        {/* Features and Services */}
        <section>
          <h2 className="text-5xl font-semibold text-center">Features & Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg shadow-lg bg-${theme}-secondary transition-transform transform hover:scale-105 hover:bg-${theme}-primary hover:shadow-lg hover:shadow-${theme}-primary/50 flex flex-col items-center text-center`}
              >
                <feature.icon className={`w-10 h-10 mb-4 text-${theme}-foreground`} />
                <h3 className="text-2xl font-medium">{feature.title}</h3>
                <p className="mt-2 text-md">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Info */}
        <section className="text-center">
          <h2 className="text-5xl font-semibold">Contact Us</h2>
          <div className="flex flex-col items-center mt-6 space-y-4">
            <div className="flex items-center space-x-2">
              <Mail className="w-6 h-6" />
              <span>support@cargostack.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-6 h-6" />
              <span>+49 123 456 7890</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-6 h-6" />
              <span>CargoStack HQ, Munich, Germany</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;