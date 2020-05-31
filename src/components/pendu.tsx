import React from 'react';

export default function Pendu({ errors }: { errors: number }) {
  if (errors < 0 || errors > 6) {
    throw new Error('errors must be between 0 and 6 (inclusive)');
  }

  return (
    <svg width={250} height={350}>
      <g>
        <rect x={0} width={250} y={325} height={25} />
        <rect x={200} width={20} y={0} height={350} />
        <rect x={70} width={130} y={0} height={15} />
        <rect x={70} width={15} y={0} height={50} />
        {errors > 0 && (
          <circle
            fill="white"
            stroke="black"
            strokeWidth={5}
            cx={77.5}
            cy={70}
            r={20}
          />
        )}
        {errors > 1 && (
          <line
            x1={77.5}
            x2={77.5}
            y1={90}
            y2={230}
            stroke="black"
            strokeWidth={5}
          />
        )}
        {errors > 2 && (
          <line
            x1={77.5}
            x2={23}
            y1={120}
            y2={145}
            stroke="black"
            strokeWidth={5}
          />
        )}
        {errors > 3 && (
          <line
            x1={77.5}
            x2={132}
            y1={120}
            y2={145}
            stroke="black"
            strokeWidth={5}
          />
        )}
        {errors > 4 && (
          <line
            x1={77.5}
            x2={35}
            y1={230}
            y2={275}
            stroke="black"
            strokeWidth={5}
          />
        )}
        {errors > 5 && (
          <line
            x1={77.5}
            x2={120}
            y1={230}
            y2={275}
            stroke="black"
            strokeWidth={5}
          />
        )}
      </g>
    </svg>
  );
}
