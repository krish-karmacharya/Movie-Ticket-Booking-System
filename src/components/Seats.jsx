import React, { useState } from 'react';
import { FaCouch } from 'react-icons/fa';

const Seats = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const rows = 5;
  const seatsPerRow = 8;
  const premiumSeats = 16;

  const getSeatStatus = (seatIndex) => {
    const seatId = seatIndex.toString();
    if (selectedSeats.includes(seatId)) return 'picking';
    // You can add logic here to determine if a seat is reserved, sold, or unavailable
    return 'available';
  };

  const handleSeatClick = (seatIndex) => {
    const seatId = seatIndex.toString();
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  const getSeatColor = (status, isPremium) => {
    const baseColor = isPremium ? 'text-purple-500' : 'text-green-500';
    switch (status) {
      case 'available': return baseColor;
      case 'reserved': return 'text-blue-500';
      case 'sold': return 'text-red-500';
      case 'picking': return 'text-yellow-500';
      case 'unavailable': return 'text-gray-500';
      default: return baseColor;
    }
  };

  return (
    <div className="flex flex-col items-center mt-8 px-4">
      <div className="mb-4 w-full max-w-3xl h-2 bg-cyan-500 rounded"></div>
      <p className="mb-4 text-lg font-semibold">Screen</p>
      <div className="grid gap-2">
        {[...Array(rows)].map((_, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-2">
            <span className="w-6 text-right mr-2 text-sm">{String.fromCharCode(65 + rowIndex)}</span>
            {[...Array(seatsPerRow)].map((_, seatIndex) => {
              const seatNumber = rowIndex * seatsPerRow + seatIndex;
              const isPremium = seatNumber < premiumSeats;
              const status = getSeatStatus(seatNumber);
              return (
                <button
                  key={seatIndex}
                  className={`focus:outline-none ${getSeatColor(status, isPremium)}`}
                  onClick={() => handleSeatClick(seatNumber)}
                >
                  <FaCouch size={24} className={isPremium ? 'transform scale-110' : ''} />
                </button>
              );
            })}
            <span className="w-6 text-left ml-2 text-sm">{String.fromCharCode(65 + rowIndex)}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        {[...Array(seatsPerRow)].map((_, index) => (
          <span key={index} className="w-6 text-center text-sm">{index + 1}</span>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <div className="flex items-center">
          <FaCouch className="text-purple-500 mr-2 text-base" />
          <span className="text-sm">Premium</span>
        </div>
        <div className="flex items-center">
          <FaCouch className="text-green-500 mr-2 text-base" />
          <span className="text-sm">Normal</span>
        </div>
        <div className="flex items-center">
          <FaCouch className="text-blue-500 mr-2 text-base" />
          <span className="text-sm">Reserved</span>
        </div>
        <div className="flex items-center">
          <FaCouch className="text-red-500 mr-2 text-base" />
          <span className="text-sm">Sold</span>
        </div>
        <div className="flex items-center">
          <FaCouch className="text-yellow-500 mr-2 text-base" />
          <span className="text-sm">Picking</span>
        </div>
        <div className="flex items-center">
          <FaCouch className="text-gray-500 mr-2 text-base" />
          <span className="text-sm">Unavailable</span>
        </div>
      </div>
      <button className="mt-8 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-base">
        Buy Now
      </button>
    </div>
  );
};

export default Seats;
