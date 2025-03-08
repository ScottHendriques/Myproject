import { useState } from "react";
import { useThemeStore } from "@/store/useThemeStore";
import { MapPin, Calendar, Package, ClipboardList, Weight, UploadCloud } from "lucide-react";

const BookingPage = () => {
  const { theme } = useThemeStore();
  const [shippingFrom, setShippingFrom] = useState("Abu Dhabi, AUH");
  const [shippingTo, setShippingTo] = useState("");
  const [shippingDate, setShippingDate] = useState("");
  const [items, setItems] = useState([
    { pieces: 0, length: 0, width: 0, height: 0, weight: 0 },
  ]);
  const [promoType, setPromoType] = useState("");

  const addItem = () => {
    setItems([...items, { pieces: 0, length: 0, width: 0, height: 0, weight: 0 }]);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = Number(value);
    setItems(newItems);
  };

  const calculateSummary = () => {
    const grossWeight = items.reduce((acc, item) => acc + item.pieces * item.weight, 0);
    const volume = items.reduce((acc, item) => acc + (item.length * item.width * item.height * item.pieces) / 1000000, 0);
    const density = volume ? (grossWeight / volume).toFixed(2) : 0;
    const chargeableWeight = Math.max(grossWeight, volume * 167).toFixed(2);

    return { grossWeight, volume, density, chargeableWeight };
  };

  const { grossWeight, volume, density, chargeableWeight } = calculateSummary();

  return (
    <div className="mt-20 p-6 bg-base-100 shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Booking</h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Shipping from</span>
          </label>
          <div className="relative">
            <MapPin className="absolute top-3 left-3" />
            <input
              type="text"
              placeholder="Shipping from"
              value={shippingFrom}
              onChange={(e) => setShippingFrom(e.target.value)}
              className="input input-bordered pl-10 w-full"
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Shipping to</span>
          </label>
          <div className="relative">
            <MapPin className="absolute top-3 left-3" />
            <input
              type="text"
              placeholder="Destination"
              value={shippingTo}
              onChange={(e) => setShippingTo(e.target.value)}
              className="input input-bordered pl-10 w-full"
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Shipping date</span>
          </label>
          <div className="relative">
            <Calendar className="absolute top-3 left-3" />
            <input
              type="date"
              value={shippingDate}
              onChange={(e) => setShippingDate(e.target.value)}
              className="input input-bordered pl-10 w-full"
            />
          </div>
        </div>
      </div>

      <div className="my-4">
        <label className="label">
          <span className="label-text">What are you shipping?</span>
        </label>
        <div className="grid grid-cols-3 gap-4">
          <div className="relative">
            <Package className="absolute top-3 left-3" />
            <input
              type="text"
              placeholder="Look up item"
              className="input input-bordered pl-10 w-full"
            />
          </div>
          <div className="relative">
            <ClipboardList className="absolute top-3 left-3" />
            <input
              type="text"
              placeholder="Additional special handling codes"
              className="input input-bordered pl-10 w-full"
            />
          </div>
          <div className="relative">
            <Weight className="absolute top-3 left-3" />
            <input
              type="number"
              placeholder="Total weight"
              className="input input-bordered pl-10 w-full"
            />
          </div>
        </div>
      </div>

      {items.map((item, index) => (
        <div key={index} className="mt-4 p-4 border rounded-lg">
          <div className="grid grid-cols-5 gap-2">
            <label className="label">
              <span className="label-text">Pieces</span>
            </label>
            <label className="label">
              <span className="label-text">Length</span>
            </label>
            <label className="label">
              <span className="label-text">Width</span>
            </label>
            <label className="label">
              <span className="label-text">Height</span>
            </label>
            <label className="label">
              <span className="label-text">Weight</span>
            </label>
          </div>
          <div className="grid grid-cols-5 gap-2 mt-2">
            <input
              type="number"
              placeholder="Pieces"
              className="input input-bordered"
              value={item.pieces === 0 ? "" : item.pieces}
              onChange={(e) => updateItem(index, "pieces", e.target.value)}
            />
            <input
              type="number"
              placeholder="Length"
              className="input input-bordered"
              value={item.length === 0 ? "" : item.length}
              onChange={(e) => updateItem(index, "length", e.target.value)}
            />
            <input
              type="number"
              placeholder="Width"
              className="input input-bordered"
              value={item.width === 0 ? "" : item.width}
              onChange={(e) => updateItem(index, "width", e.target.value)}
            />
            <input
              type="number"
              placeholder="Height"
              className="input input-bordered"
              value={item.height === 0 ? "" : item.height}
              onChange={(e) => updateItem(index, "height", e.target.value)}
            />
            <input
              type="number"
              placeholder="Weight"
              className="input input-bordered"
              value={item.weight === 0 ? "" : item.weight}
              onChange={(e) => updateItem(index, "weight", e.target.value)}
            />
          </div>
        </div>
      ))}

      <div className="mt-4 flex items-center gap-4">
        <button className="btn btn-primary flex items-center gap-2" onClick={addItem}>
          <span>+ Add another</span>
        </button>
        <button className="btn btn-outline flex items-center gap-2">
          <UploadCloud size={16} />
          <span>Upload</span>
        </button>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <label className="label cursor-pointer">
          <input
            type="radio"
            name="promo"
            className="radio"
            checked={promoType === "promo"}
            onChange={() => setPromoType("promo")}
          />
          <span className="label-text ml-2">Promo code</span>
        </label>
      </div>
      {promoType === "promo" && (
        <div className="mt-2">
          <input
            type="text"
            placeholder="Enter promo code (optional)"
            className="input input-bordered w-full"
          />
        </div>
      )}

      <div className="p-4 bg-base-100 rounded-lg shadow-md mt-4">
        <h2 className="text-lg font-semibold mb-2">Booking Summary</h2>
        <div className="grid grid-cols-5 gap-4 text-center border-b pb-2">
          <div>
            <p className="text-sm text-gray-500">Pieces</p>
            <p className="text-lg font-bold">{items.reduce((acc, item) => acc + item.pieces, 0)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Gross weight</p>
            <p className="text-lg font-bold">{grossWeight} kg</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Volume</p>
            <p className="text-lg font-bold">{volume.toFixed(2)} CBM</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Density</p>
            <p className="text-lg font-bold">{density} kg/CBM</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Chargeable weight</p>
            <p className="text-lg font-bold">{chargeableWeight} kg</p>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button className="btn btn-primary">Continue</button>
          <button
            className="text-blue-500"
            onClick={() => {
              setItems([{ pieces: 0, length: 0, width: 0, height: 0, weight: 0 }]);
            }}
          >
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;