import { Package } from "lucide-react";
import React, { useState } from "react";
import { useThemeStore } from "../store/useThemeStore.js";

const ItemDropDown = ({ onSelect }) => {
  const { theme } = useThemeStore();
  const cargoItems = [
    { name: "ACCESSORIES", category: "GeneralCargo", code: "GEN" },
    { name: "ACTIVE PHARMA", category: "PharmaLife", code: "PIL" },
    { name: "ADHESIVE", category: "GeneralCargo", code: "GEN" },
    { name: "AGRICULTURAL GOODS", category: "GeneralCargo", code: "GEN" },
    { name: "AIRCRAFT ENGINES", category: "Specialized Commodities", code: "ACE" },
    { name: "AIRCRAFT PARTS", category: "GeneralCargo", code: "GEN" },
    { name: "ALCOHOL", category: "GeneralCargo", code: "GEN" },
    { name: "ALLOY WHEELS", category: "GeneralCargo", code: "GEN" },
    { name: "ALUMINIUM", category: "GeneralCargo", code: "GEN" },
    { name: "AOG SPARES", category: "Specialized Commodities", code: "AOG" },
    { name: "APPAREL", category: "GeneralCargo", code: "GEN" },
    { name: "ART WORKS", category: "FlyCulture", code: "ART" },
    { name: "AUTO PARTS", category: "GeneralCargo", code: "GEN" },
    { name: "AUTOMOBILE", category: "GeneralCargo", code: "GEN" },
    { name: "BAGGAGE", category: "GeneralCargo", code: "GEN" },
    { name: "BANK NOTES/COINS", category: "SafeGuard", code: "VAL" },
    { name: "BATHROOM FITTINGS", category: "GeneralCargo", code: "GEN" },
    { name: "BEAUTY PRODUCTS", category: "GeneralCargo", code: "GEN" },
    { name: "BEVERAGES", category: "GeneralCargo", code: "GEN" },
    { name: "BLOOD", category: "PharmaLife", code: "LHO" },
    { name: "BLOOD SERUM", category: "PharmaLife", code: "LHO" },
    { name: "BOOKS", category: "GeneralCargo", code: "GEN" },
    { name: "CABLES", category: "GeneralCargo", code: "GEN" },
    { name: "CAPSULES", category: "GeneralCargo", code: "GEN" },
    { name: "CARPETS", category: "GeneralCargo", code: "GEN" },
    { name: "CARS", category: "FlightValet", code: "FLV" },
    { name: "CATERING EQUIPMENT", category: "GeneralCargo", code: "GEN" },
    { name: "CERAMIC", category: "GeneralCargo", code: "GEN" },
    { name: "CHEESE", category: "FreshForward", code: "PER" },
    { name: "CHEMICAL", category: "GeneralCargo", code: "GEN" },
    { name: "CHOCOLATE", category: "FreshForward", code: "PER" },
    { name: "COMPUTER PARTS", category: "GeneralCargo", code: "GEN" },
    { name: "COMPUTERS", category: "SecureTech", code: "VUN" },
    { name: "CONSOL", category: "GeneralCargo", code: "GEN" },
    { name: "CONSTRUCTION MATERIALS", category: "GeneralCargo", code: "GEN" },
    { name: "COSMETICS", category: "GeneralCargo", code: "GEN" },
    { name: "COURIER", category: "Specialized Commodities", code: "COU" },
    { name: "LIVE GOATS", category: "LiveAnimals", code: "AVI" },
    { name: "LIVE HORSES", category: "SkyStables", code: "EQN" },
    { name: "LIVE HUMAN ORGANS", category: "PharmaLife", code: "LHO" },
    { name: "LIVE PLANTS", category: "FreshForward", code: "PEF" },
    { name: "LIVE TROPICAL FISH", category: "LiveAnimals", code: "LTF" },
    { name: "License Required", category: "Regulated Commodities", code: "LIC" },
    { name: "MACHINERY", category: "GeneralCargo", code: "GEN" },
    { name: "MAGAZINES", category: "Specialized Commodities", code: "NWP" },
    { name: "MANGO", category: "FreshForward", code: "PEP" },
    { name: "MEAT", category: "FreshForward", code: "PEM" },
    { name: "MEDICAL EQUIPMENT", category: "PharmaLife", code: "PIL" },
    { name: "MEDICINES", category: "PharmaLife", code: "PIL" },
    { name: "MOBILE PHONE", category: "SecureTech", code: "VUN" },
    { name: "MUNITIONS OF WAR", category: "Regulated Commodities", code: "MUW" },
    { name: "MUSIC INSTRUMENT", category: "GeneralCargo", code: "GEN" },
    { name: "NEWSPAPERS", category: "Specialized Commodities", code: "NWP" },
    { name: "OFFICE EQUIPMENT", category: "GeneralCargo", code: "GEN" },
    { name: "OIL EQUIPMENT", category: "GeneralCargo", code: "GEN" },
    { name: "PAINTING", category: "GeneralCargo", code: "GEN" },
    { name: "PERSONAL EFFECTS", category: "GeneralCargo", code: "GEN" },
    { name: "PHARMA", category: "PharmaLife", code: "PIL" },
    { name: "TOYS", category: "GeneralCargo", code: "GEN" },
    { name: "TUNA", category: "FreshForward", code: "PES" },
    { name: "UNICEF CRITICAL LIFESAVING SUPPLIES", category: "PharmaLife", code: "NGO" },
    { name: "UNICEF HUMANITARIAN RELIEF", category: "PharmaLife", code: "NGO" },
    { name: "UNICEF VACCINES/MEDICINES", category: "PharmaLife", code: "NGO" },
    { name: "VACCINES", category: "PharmaLife", code: "PIL" },
    { name: "VALUABLE GOODS", category: "SafeGuard", code: "VAL" },
    { name: "VEGETABLES", category: "FreshForward", code: "PEP" },
    { name: "VIP", category: "Specialized Commodities", code: "VIP" },
    { name: "WINE", category: "FreshForward", code: "PER" },
    { name: "WRITING INSTRUMENTS", category: "GeneralCargo", code: "GEN" },
    { name: "YOGHURT", category: "FreshForward", code: "PER" },
  ];

  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = (e) => {
    const item = JSON.parse(e.target.value);
    setSelectedItem(item);
    onSelect(item.name); // Pass the selected item name to the parent component
  };

  return (
    <div className={`w-50 mx-auto relative theme-${theme}`}>
      <Package className="absolute top-3 left-3" />
      <select
        className={`w-full border rounded-md p-2 pl-10 mt-1 bg-${theme}-background text-${theme}-text`}
        onChange={handleSelect}
      >
        <option value="">Select Item</option>
        {cargoItems.map((item, index) => (
          <option key={index} value={JSON.stringify(item)}>
            {item.name}
          </option>
        ))}
      </select>

      {selectedItem && (
        <div className={`mt-4 p-3 border rounded-lg bg-${theme}-background text-${theme}-text`}>
          <h2 className="font-semibold">{selectedItem.name}</h2>
          <p className="text-sm text-gray-600">
            <span className="font-bold">{selectedItem.category}</span>
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-bold">{selectedItem.code}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ItemDropDown;