import React, { useState } from "react";

const Pax = () => {
  const [paxCount, setPaxCount] = useState(2); 
  const [paxValues, setPaxValues] = useState(
    Array.from({ length: paxCount }, () => "")
  );

  const handlePaxCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Math.min(parseInt(e.target.value, 10), 5); // Set max to 5
    setPaxCount(count);
    setPaxValues(Array.from({ length: count }, (_, i) => paxValues[i] || ""));
  };

  const handlePaxValueChange = (index: number, value: string) => {
    const updatedPaxValues = [...paxValues];
    updatedPaxValues[index] = value;
    setPaxValues(updatedPaxValues);
  };

  return (
    <div className="w-full px-4 flex flex-wrap">
      <div className="flex flex-col gap-2 w-full lg:w-[25%] p-4">
        <span className="text-xs text-[#162c43]">Pax Count</span>
        <input
          type="number"
          min="1"
          max="5" // Max set to 5
          value={paxCount}
          onChange={handlePaxCountChange}
          className="border py-2 text-xs px-4 rounded text-[#162c43]"
          placeholder="Number of Pax fields"
        />
      </div>

      {Array.from({ length: paxCount }).map((_, index) => (
        <div key={index} className="flex flex-col gap-2 w-full lg:w-[25%] p-4">
          <span className="text-xs text-[#162c43]">Pax{index + 1}</span>
          <input
            type="number"
            value={paxValues[index]}
            onChange={(e) => handlePaxValueChange(index, e.target.value)}
            className="border py-2 text-xs px-4 rounded text-[#162c43]"
            placeholder="1'000'000MNT"
          />
        </div>
      ))}
    </div>
  );
};

export default Pax;
