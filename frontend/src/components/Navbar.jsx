import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Settings, User, Landmark, Info, Headphones, LayoutDashboard} from "lucide-react";
import png from "../images/logo-color.png";


const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <>
      <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
        <div className="container mx-auto px-4 h-20 flex items-center">
          <div className="flex items-center justify-between w-full">
            {/* Logo Section */}
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-all">
                <img
                  src={png}
                  alt="CargoStack Logo"
                  className="w-20 h-12 object-contain"
                />
                <h1 className="text-xl font-bold">CargoStack</h1>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-4">
              <Link
                to={authUser?.role === "admin" ? "/admin/dashboard" : "/dashboard"}
                className="btn btn-sm gap-2 transition-colors"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>

              {/* Station Capabilities Link */}
              <Link
                to={authUser?.role === "admin" ? "/Station-Input" : "/Station-Capabilities"}
                className="btn btn-sm gap-2 transition-colors"
              >
                <Landmark className="w-5 h-5" />
                <span className="hidden sm:inline">Station Capabilities</span>
              </Link>

              {/* Conditional Link: About Us (user) or Customer Service (admin) */}
              {authUser?.role === "user" ? (
                <Link to="/Aboutus" className="btn btn-sm gap-2 transition-colors">
                  <Info className="w-5 h-5" />
                  <span className="hidden sm:inline">About Us</span>
                </Link>
              ) : authUser?.role === "admin" ? (
                <Link to="/admin/customer-service" className="btn btn-sm gap-2 transition-colors">
                  <Headphones className="w-5 h-5" />
                  <span className="hidden sm:inline">Customer Service</span>
                </Link>
              ) : null}

              {/* Common Links */}
              <Link to="/settings" className="btn btn-sm gap-2 transition-colors">
                <Settings className="w-5 h-5" />
                <span className="hidden sm:inline">Settings</span>
              </Link>

              {authUser && (
                <>
                  <Link to="/profile" className="btn btn-sm gap-2">
                    <User className="size-5" />
                    <span className="hidden sm:inline">Profile</span>
                  </Link>

                  <button className="flex gap-2 items-center" onClick={logout}>
                    <LogOut className="size-5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;