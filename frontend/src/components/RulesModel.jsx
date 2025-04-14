// src/components/RulesModal.jsx
import React from 'react';

const RulesModal = ({ isOpen, onClose, rulesType }) => {
  if (!isOpen) return null;

  const rules = rulesType === 'booking' ? bookingRules : trackingRules;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className=" bg-white p-6 rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto relative">
        <h2 className="text-2xl font-bold mb-4">
          {rulesType === 'booking' ? 'IATA Booking Rules' : 'IATA Tracking Rules'}
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          {rules.map((rule, index) => (
            <li key={index} className="text-gray-700">
              {rule}
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};


const bookingRules = [
  'Proper Documentation: Customers must submit a correctly completed Air Waybill (AWB) for every shipment, as it acts as a contract of carriage.',
  'Declared Value: The customer must declare the correct value of the goods for carriage if insurance or liability is requested.',
  'Weight & Dimensions Accuracy: Customers must provide accurate weight and dimensions for the cargo. Misdeclared weights may lead to rejections or additional fees.',
  'Packaging Compliance: Shipments must be packed in accordance with IATA packaging standards. Fragile, perishable, or hazardous items must follow special packaging rules.',
  'Prohibited & Restricted Goods: Customers are not allowed to ship items that are banned or restricted by IATA, national, or international regulations (e.g., explosives, illegal goods).',
  'Dangerous Goods Declaration: If shipping hazardous materials, a Shipper’s Declaration for Dangerous Goods must be provided and compliant with IATA’s DGR.',
  'Advance Booking: Certain types of cargo (e.g., live animals, perishables, valuables) require advance booking and confirmation due to special handling needs.',
  'Customs Compliance: All customs documentation must be accurate and complete to ensure clearance at both origin and destination.',
  'Time of Delivery Commitment: IATA encourages carriers and customers to agree on a specific time for delivery using products like e-AWB and e-freight solutions.',
  'Payment Terms: Customers must ensure payment is made according to agreed terms, including charges for freight, handling, fuel surcharge, and customs where applicable.',
];

const trackingRules = [
  'Tracking via AWB: Customers can track their cargo using the Air Waybill number through the airline’s cargo tracking systems or IATA-endorsed portals.',
  'Real-Time Updates: Airlines must provide real-time status updates at major milestones (Received, Departed, Arrived, Delivered).',
  'Status Codes Transparency: Tracking information must include standardized status codes (as per IATA Cargo-IMP codes) for clarity and consistency.',
  'Notification Alerts: Customers may subscribe to alert notifications for status changes (e.g., delays, customs hold, delivery updates).',
  'Cargo iQ Milestones: Airlines and freight forwarders should comply with Cargo iQ standards which define planning and tracking milestones for shipment quality.',
  'Delay Communication: Customers must be informed promptly of delays or disruptions in the cargo journey.',
  'e-AWB Visibility: For shipments using electronic Air Waybills (e-AWB), customers should have access to a digital copy and tracking timeline.',
  'Delivery Confirmation: Final delivery must be confirmed and made available to the customer digitally or in writing.',
  'Cargo Station Contact Access: Customers should be able to contact cargo stations or agents at origin, transit, or destination for tracking inquiries.',
  'Claims Procedure: If cargo is lost, damaged, or delayed beyond agreed timelines, customers must be able to initiate a claims process per IATA liability regulations.',
];

export default RulesModal;