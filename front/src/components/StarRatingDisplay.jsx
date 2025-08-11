import { useState } from "react";

export const StarRatingDisplay = ({ value, count }) => {
    const percentage = value? Math.ceil(value / 5 * 100) : 0;
  return (
    <div className="block flex items-center self-start">
    <div className="relative">
    <div className="flex space-x-1 text-2xl">
      {[1, 2, 3, 4, 5].map((star) => {
        return (
          <div
            key={star}     
            className={`text-gray-500/50`}
          >
            ★
          </div>
        );
      })}
    </div>
      <div 
      style={{width: `${percentage}%`}}
      className={`absolute left-0 top-0
       flex space-x-1 text-2xl overflow-hidden`}>
      {[1, 2, 3, 4, 5].map((star) => {
        return (
          <div
            key={star}     
            className={`text-yellow-500`}
          >
            ★
          </div>
        );
      })}
    </div>
    </div>
    <div className="ml-1">({value?.toFixed(2) || 0})</div>
     <div className="ml-3">
      {`${count} rating${count==1? '' :'s'}`}
    </div>
    </div>
    
  );
}