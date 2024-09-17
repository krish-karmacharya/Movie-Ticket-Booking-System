import React, { useState, useEffect } from 'react';
import { FaCouch } from 'react-icons/fa';

const Seats = () => {
  const [rows, setRows] = useState(13);
  const [seatsPerRow, setSeatsPerRow] = useState(14);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setRows(6);
        setSeatsPerRow(6);
      } else if (width < 768) {
        setRows(8);
        setSeatsPerRow(8);
      } else if (width < 1024) {
        setRows(10);
        setSeatsPerRow(12);
      } else {
        setRows(13);
        setSeatsPerRow(14);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getSeatStatus = (rowIndex, seatIndex) => {
    const seatId = `${rowIndex}-${seatIndex}`;
    if (selectedSeats.includes(seatId)) return 'picking';
    // You can add logic here to determine if a seat is reserved, sold, or unavailable
    return 'available';
  };

  const handleSeatClick = (rowIndex, seatIndex) => {
    const seatId = `${rowIndex}-${seatIndex}`;
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  const getSeatColor = (status) => {
    switch (status) {
      case 'available': return 'text-green-500';
      case 'reserved': return 'text-blue-500';
      case 'sold': return 'text-red-500';
      case 'picking': return 'text-yellow-500';
      case 'unavailable': return 'text-gray-500';
      default: return 'text-green-500';
    }
  };

  return (

    <div className="flex flex-col items-center mt-8 px-4">
      <div className="mb-4 w-full max-w-3xl h-2 bg-cyan-500 rounded"></div>
      <p className="mb-4 text-lg font-semibold">Screen</p>
      <div className="grid gap-1 sm:gap-2">
        {[...Array(rows)].map((_, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1 sm:gap-2">
            <span className="w-4 sm:w-6 text-right mr-1 sm:mr-2 text-xs sm:text-sm">{String.fromCharCode(65 + rowIndex)}</span>
            {[...Array(seatsPerRow)].map((_, seatIndex) => {
              const status = getSeatStatus(rowIndex, seatIndex);
              return (
                <button
                  key={seatIndex}
                  className={`focus:outline-none ${getSeatColor(status)}`}
                  onClick={() => handleSeatClick(rowIndex, seatIndex)}
                >
                  <FaCouch size={16} className="sm:text-lg md:text-xl" />
                </button>
              );
            })}
            <span className="w-4 sm:w-6 text-left ml-1 sm:ml-2 text-xs sm:text-sm">{String.fromCharCode(65 + rowIndex)}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        {[...Array(seatsPerRow)].map((_, index) => (
          <span key={index} className="w-4 sm:w-5 text-center text-xs sm:text-sm">{index + 1}</span>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-4">
        <div className="flex items-center">
          <FaCouch className="text-green-500 mr-1 sm:mr-2 text-sm sm:text-base" />
          <span className="text-xs sm:text-sm">Available</span>
        </div>
        <div className="flex items-center">
          <FaCouch className="text-blue-500 mr-1 sm:mr-2 text-sm sm:text-base" />
          <span className="text-xs sm:text-sm">Reserved</span>
        </div>
        <div className="flex items-center">
          <FaCouch className="text-red-500 mr-1 sm:mr-2 text-sm sm:text-base" />
          <span className="text-xs sm:text-sm">Sold</span>
        </div>
        <div className="flex items-center">
          <FaCouch className="text-yellow-500 mr-1 sm:mr-2 text-sm sm:text-base" />
          <span className="text-xs sm:text-sm">Picking</span>
        </div>
        <div className="flex items-center">
          <FaCouch className="text-gray-500 mr-1 sm:mr-2 text-sm sm:text-base" />
          <span className="text-xs sm:text-sm">Unavailable</span>
        </div>
      </div>
      <button className="mt-8 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-sm sm:text-base">
        Buy Now
      </button>
    </div>
  );
};

export default Seats;
