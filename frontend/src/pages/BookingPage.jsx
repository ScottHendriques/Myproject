import { useState } from "react";
import { useThemeStore } from "@/store/useThemeStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Package, ClipboardList, Weight } from "lucide-react";
import AirportAutoComplete from "@/components/Autocomplete";
import ItemDropDown from "../components/ItemDropDown";
import { toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS

const BookingPage = () => {
  const { theme } = useThemeStore();
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  const [shippingFrom, setShippingFrom] = useState("");
  const [shippingTo, setShippingTo] = useState("");
  const [shippingDate, setShippingDate] = useState("");
  const [pieces, setPieces] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [promoType, setPromoType] = useState("");
  const [item, setItem] = useState("");
  const [totalWeight, setTotalWeight] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [specialHandlingCode, setSpecialHandlingCode] = useState("");


  const calculateSummary = () => {
    const grossWeight = pieces * weight;
    const volume = (length * width * height * pieces) / 6000;
    const density = volume ? (grossWeight / volume).toFixed(2) : 0;
    const chargeableWeight = Math.max(grossWeight, volume * 167).toFixed(2);

    return { grossWeight, volume, density, chargeableWeight };
  };

  const { grossWeight, volume, density, chargeableWeight } = calculateSummary();

  const getFinalPrice = () => {
    let basePrice = 190; // default price for America

    // Special handling for Admin
    if (authUser?.username === "AdminMUC" && specialHandlingCode?.trim() !== "") {
      return 0.0;
    }

    // Promo Code Discount
    const promo = promoCode.trim().toUpperCase();
    if (promo === "CARGO20") {
      return (basePrice * 0.8).toFixed(2); // 20% off
    }
    if (promo === "CARGO10") {
      return (basePrice * 0.9).toFixed(2); // 10% off
    }
    if (promo === "FREESHIP") {
      return (basePrice * 0.7).toFixed(2); // 30% off
    }
    return basePrice.toFixed(2);
  };
  
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!authUser || !authUser._id) {
      toast.error("User not authenticated!");
      return;
    }

    // Ensure all form values exist
    if (!pieces || !length || !width || !height || !weight) {
      toast.error("Please fill in all cargo details.");
      return;
    }

    // Construct payload
    const payload = {
      shippingFrom,
      shippingTo,
      date: shippingDate,
      item,
      totalWeight: parseFloat(totalWeight),
      grossWeight: parseFloat(grossWeight),
      pieces: parseInt(pieces, 10),
      length: parseFloat(length),
      width: parseFloat(width),
      height: parseFloat(height),
      weight: parseFloat(weight),
      user: authUser._id, 
      promoCode,
      specialHandlingCode,
      finalprice: getFinalPrice(),
    };

    console.log("Payload being sent:", payload);

    try {
      const res = await fetch(`http://localhost:5001/api/cargo/${authUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
      }

      const data = await res.json();
      console.log("Upload successful!", data);
      toast.success("Booking created successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to create booking. Please try again.");
    }
  };

  const handleContinue = () => {
    navigate('/select', { 
      state: { 
        bookingData: { 
          shippingFrom, 
          shippingTo, 
          shippingDate, 
          item, 
          totalWeight, 
          grossWeight, 
          pieces,
          promoCode,
          specialHandlingCode,
          finalprice: getFinalPrice(),
        },
      },
    });
  };

  return (
    <form onSubmit={handleUpload} className="mt-20 p-6 bg-base-100 shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Booking</h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Shipping from</span>
          </label>
          <div className="relative">
            <MapPin className="absolute top-3 left-3" />
            <AirportAutoComplete onSelect={setShippingFrom} />
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Shipping to</span>
          </label>
          <div className="relative">
            <MapPin className="absolute top-3 left-3" />
            <AirportAutoComplete onSelect={setShippingTo} />
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
              name="date"
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
            <ItemDropDown onSelect={setItem} />
          </div>
          <div className="relative">
            <ClipboardList className="absolute top-3 left-3" />
            <input
              type="text"
              name="specialHandlingCodes"
              placeholder="Additional special handling codes"
              className="input input-bordered pl-10 w-full"
              value={specialHandlingCode}
              onChange={(e) => setSpecialHandlingCode(e.target.value)}
            />
          </div>
        </div>
        <div className="my-4">
          <label className="label">
            <span className="label-text">Total Weight</span>
          </label>
          <div className="grid grid-cols-3 gap-4">
            <div className="relative">
              <Weight className="absolute top-3 left-3" />
              <input
                type="number"
                name="totalWeight"
                placeholder="Total weight"
                value={totalWeight}
                onChange={(e) => setTotalWeight(Number(e.target.value))}
                className="input input-bordered pl-10 w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 border rounded-lg">
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
            name="pieces"
            placeholder="Pieces"
            className="input input-bordered"
            value={pieces}
            onChange={(e) => setPieces(Number(e.target.value))}
          />
          <input
            type="number"
            name="length"
            placeholder="Length"
            className="input input-bordered"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
          <input
            type="number"
            name="width"
            placeholder="Width"
            className="input input-bordered"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
          />
          <input
            type="number"
            name="height"
            placeholder="Height"
            className="input input-bordered"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
          <input
            type="number"
            name="weight"
            placeholder="Weight"
            className="input input-bordered"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
          />
        </div>
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
            name="promoCode"
            placeholder="Enter promo code (optional)"
            className="input input-bordered w-full"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
        </div>
      )}

      <div className="p-4 bg-base-100 rounded-lg shadow-md mt-4">
        <h2 className="text-lg font-semibold mb-2">Booking Summary</h2>
        <div className="grid grid-cols-5 gap-4 text-center border-b pb-2">
          <div>
            <p className="text-sm text-gray-500">Pieces</p>
            <p className="text-lg font-bold">{pieces}</p>
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
          <button type="submit" onClick={handleContinue} className="btn btn-primary">Continue</button>
          <button
            type="button"
            className="text-blue-500"
            onClick={() => {
              setPieces("");
              setLength("");
              setWidth("");
              setHeight("");
              setWeight("");
            }}
          >
            Clear all
          </button>
        </div>
      </div>
    </form>
  );
};

export default BookingPage;