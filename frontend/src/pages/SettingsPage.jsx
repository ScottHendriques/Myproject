import { useEffect } from "react";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Truck } from "lucide-react";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme); // Apply theme on load
  }, [theme]);

  return (
    <div className="min-h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        <div className="flex flex-col gap-1 mt-11">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-base-content/70">Choose a theme for your cargo interface</p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`
                group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
              `}
              onClick={() => setTheme(t)}
            >
              <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>

        {/* Preview Section */}
        <h3 className="text-lg font-semibold mb-3">Preview</h3>
        <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
          <div className="p-4 bg-base-200">
            <div className="max-w-lg mx-auto">
              {/* Mock Cargo Shipment Card */}
              <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                {/* Card Header */}
                <div className="px-4 py-3 border-b border-base-300 bg-base-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content">
                      <Truck size={18} />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Shipment AWB123456</h3>
                      <p className="text-xs text-base-content/70">In Transit</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-primary">On Time</span>
                </div>

                {/* Card Body */}
                <div className="p-4 bg-base-100">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-base-content/70">Origin</p>
                      <p className="text-sm font-medium">JFK - New York</p>
                    </div>
                    <div>
                      <p className="text-xs text-base-content/70">Destination</p>
                      <p className="text-sm font-medium">LHR - London</p>
                    </div>
                    <div>
                      <p className="text-xs text-base-content/70">Weight</p>
                      <p className="text-sm font-medium">1,250 kg</p>
                    </div>
                    <div>
                      <p className="text-xs text-base-content/70">ETA</p>
                      <p className="text-sm font-medium">Apr 14, 2025</p>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-4 border-t border-base-300 bg-base-100">
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-base-content/70">Last Updated: 12:00 PM</p>
                    <button className="btn btn-primary btn-sm">Track Shipment</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;