import { useState } from "react";
import { useThemeStore } from "@/store/useThemeStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Package, Weight, Eye } from "lucide-react";
import AirportAutoComplete from "@/components/Autocomplete";
import ItemDropDown from "../components/ItemDropDown";
import RulesModal from "../components/RulesModel";
import { motion } from "framer-motion";

const BookingPage = () => {
  const { theme } = useThemeStore();
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shippingFrom, setShippingFrom] = useState("");
  const [shippingTo, setShippingTo] = useState("");
  const [preferredShippingDate, setPreferredShippingDate] = useState("");
  const [pieces, setPieces] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [promoType, setPromoType] = useState("");
  const [item, setItem] = useState("");
  const [totalWeight, setTotalWeight] = useState("");
  const [promoCode, setPromoCode] = useState("");

  // Get current date in YYYY-MM-DD format for API
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const calculateSummary = () => {
    const parsedPieces = Number(pieces) || 0;
    const parsedLength = Number(length) || 0;
    const parsedWidth = Number(width) || 0;
    const parsedHeight = Number(height) || 0;
    const parsedWeight = Number(weight) || 0;

    const grossWeight = parsedPieces * parsedWeight;
    const volume =
      parsedPieces && parsedLength && parsedWidth && parsedHeight
        ? (parsedLength * parsedWidth * parsedHeight * parsedPieces) / 6000
        : 0;
    const density = volume ? (grossWeight / volume).toFixed(2) : 0;
    const chargeableWeight = Math.max(grossWeight, volume * 167).toFixed(2);

    return { grossWeight, volume, density, chargeableWeight };
  };

  const { grossWeight, volume, density, chargeableWeight } = calculateSummary();

  const getFinalPrice = () => {
    let basePrice = 90;

    const promo = promoCode.trim().toUpperCase();
    if (promo === "CARGO20") {
      return (basePrice * 0.8).toFixed(2);
    }
    if (promo === "CARGO10") {
      return (basePrice * 0.9).toFixed(2);
    }
    if (promo === "FREESHIP") {
      return (basePrice * 0.7).toFixed(2);
    }
    return basePrice.toFixed(2);
  };

  const validateWeight = () => {
    const parsedTotalWeight = Number(totalWeight) || 0;
    const parsedPieces = Number(pieces) || 0;
    const parsedWeight = Number(weight) || 0;
    if (parsedTotalWeight === 0) {
      // Allow totalWeight to be optional or zero
      return true;
    }
    if (parsedPieces * parsedWeight > parsedTotalWeight) {
      console.error("Weight validation failed:", {
        pieces: parsedPieces,
        weight: parsedWeight,
        totalWeight: parsedTotalWeight,
      });
      return false;
    }
    return true;
  };

  const handleContinue = (e) => {
    e.preventDefault();
    console.log("Continue button clicked", {
      shippingFrom,
      shippingTo,
      preferredShippingDate,
      pieces,
      length,
      width,
      height,
      weight,
      totalWeight,
      item,
      promoCode,
      authUser,
    });

    if (!authUser || !authUser._id) {
      console.error("Authentication failed:", { authUser });
      return;
    }

    if (!shippingFrom || !shippingTo) {
      console.error("Missing locations:", { shippingFrom, shippingTo });
      return;
    }

    if (!preferredShippingDate) {
      console.error("Missing date:", { preferredShippingDate });
      return;
    }

    if (!pieces || !length || !width || !height || !weight) {
      console.error("Missing cargo details:", { pieces, length, width, height, weight });
      return;
    }

    if (
      Number(pieces) <= 0 ||
      Number(length) <= 0 ||
      Number(width) <= 0 ||
      Number(height) <= 0 ||
      Number(weight) <= 0
    ) {
      console.error("Invalid cargo details:", {
        pieces: Number(pieces),
        length: Number(length),
        width: Number(width),
        height: Number(height),
        weight: Number(weight),
      });
      return;
    }

    if (!item) {
      console.error("Missing item:", { item });
      return;
    }

    if (!validateWeight()) {
      toast.error("Weight validation failed. Please check your inputs.");
      console.error("Weight validation failed in handleContinue");
      return;
    }

    const apiDate = getCurrentDate();

    console.log("All validations passed, navigating to /select", {
      bookingData: {
        shippingFrom,
        shippingTo,
        preferredShippingDate,
        apiDate,
        item,
        totalWeight: parseFloat(totalWeight) || 0,
        grossWeight: parseFloat(grossWeight),
        pieces: parseInt(pieces, 10),
        length: parseFloat(length),
        width: parseFloat(width),
        height: parseFloat(height),
        weight: parseFloat(weight),
        promoCode,
        finalPrice: getFinalPrice(),
        userId: authUser._id,
      },
    });

    navigate("/select", {
      state: {
        bookingData: {
          shippingFrom,
          shippingTo,
          preferredShippingDate,
          apiDate,
          item,
          totalWeight: parseFloat(totalWeight) || 0,
          grossWeight: parseFloat(grossWeight),
          pieces: parseInt(pieces, 10),
          length: parseFloat(length),
          width: parseFloat(width),
          height: parseFloat(height),
          weight: parseFloat(weight),
          promoCode,
          finalPrice: getFinalPrice(),
          userId: authUser._id,
        },
      },
    });
  };

  return (
    <form
      onSubmit={handleContinue}
      className="mt-20 p-6 bg-base-100 shadow-lg rounded-xl"
    >
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
            <span className="label-text">Preferred shipping date</span>
          </label>
          <div className="relative">
            <Calendar className="absolute top-3 left-3" />
            <input
              type="date"
              name="date"
              value={preferredShippingDate}
              onChange={(e) => setPreferredShippingDate(e.target.value)}
              className="input input-bordered pl-10 w-full"
              min={getCurrentDate()}
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
          <div className="relative col-span-2">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Weight className="absolute top-3 left-3" />
                <input
                  type="number"
                  name="totalWeight"
                  placeholder="Total weight (kg)"
                  value={totalWeight}
                  onChange={(e) => setTotalWeight(e.target.value)}
                  className="input input-bordered pl-10 w-full"
                  min="0"
                  step="0.01"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenModal}
                className="flex items-center px-4 py-2 rounded hover:bg-green-600 transition"
              >
                <Eye className="mr-2" /> View IATA Rules
              </motion.button>
            </div>
            <RulesModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              rulesType="booking"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 border rounded-lg">
        <div className="grid grid-cols-5 gap-2">
          <label className="label">
            <span className="label-text">Pieces</span>
          </label>
          <label className="label">
            <span className="label-text">Length (cm)</span>
          </label>
          <label className="label">
            <span className="label-text">Width (cm)</span>
          </label>
          <label className="label">
            <span className="label-text">Height (cm)</span>
          </label>
          <label className="label">
            <span className="label-text">Weight (kg)</span>
          </label>
        </div>
        <div className="grid grid-cols-5 gap-2 mt-2">
          <input
            type="number"
            name="pieces"
            placeholder="Pieces"
            className="input input-bordered"
            value={pieces}
            onChange={(e) => setPieces(e.target.value)}
            min="1"
            step="1"
          />
          <input
            type="number"
            name="length"
            placeholder="Length (cm)"
            className="input input-bordered"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            min="0"
            step="0.01"
          />
          <input
            type="number"
            name="width"
            placeholder="Width (cm)"
            className="input input-bordered"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            min="0"
            step="0.01"
          />
          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            className="input input-bordered"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            min="0"
            step="0.01"
          />
          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            className="input input-bordered"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            min="0"
            step="0.01"
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
            <p className="text-lg font-bold">{pieces || 0}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Gross weight</p>
            <p className="text-lg font-bold">{grossWeight.toFixed(2)} kg</p>
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
          <button type="submit" className="btn btn-primary">
            Continue
          </button>
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