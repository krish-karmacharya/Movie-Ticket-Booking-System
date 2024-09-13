import React, { useState } from "react";

const NowShowingBooking: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  const toggleStep = (step: number) => {
    setSelectedStep(selectedStep === step ? null : step);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex">
        <div className="w-1/4">
          <img
            src="https://via.placeholder.com/150x300?text=Movie+Poster"
            alt="Movie Poster"
            className="rounded-lg shadow-lg"
          />
          <h2 className="text-xl font-bold mt-4">Stree 2</h2>
          <p className="text-gray-600">2 hrs 30 mins | Horror, Comedy</p>
          <p className="text-gray-600 mt-2">
            "Stree 2" unfolds strange events in the town of Chanderi, where men
            start disappearing mysteriously. The town's residents believe it's
            the work of an evil spirit named Stree.
          </p>
          <a href="#" className="text-blue-500 mt-4 inline-block">
            View More details
          </a>
        </div>
        <div className="w-3/4 pl-8">
          <div className="border-b border-gray-300 mb-4">
            <ul className="flex">
              <li className="mr-6">
                <a
                  href="#"
                  className="text-blue-500 border-b-2 border-blue-500 pb-2"
                >
                  NOW SHOWING
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 pb-2">
                  CHECKOUT
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <button
              onClick={() => toggleStep(1)}
              className="w-full text-left bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <span>1. Select Date, Language & Time</span>
              <span>{selectedStep === 1 ? "-" : "+"}</span>
            </button>
            {selectedStep === 1 && (
              <div className="p-4 bg-white shadow-md rounded-lg mt-2">
                {/* Content for Step 1 */}
              </div>
            )}
          </div>
          <div>
            <button
              onClick={() => toggleStep(2)}
              className="w-full text-left bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <span>2. Pick Seats </span>
              <span>{selectedStep === 2 ? "-" : "+"}</span>
            </button>
            {selectedStep === 2 && (
              <div className="p-4 bg-white shadow-md rounded-lg mt-2">
                {/* Content for Step 2 */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowShowingBooking;
