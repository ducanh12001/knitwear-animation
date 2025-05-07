import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateCursorPosition);

    return () => window.removeEventListener("mousemove", updateCursorPosition);
  }, []);

  return (
    <div
      id="cursor"
      className="desktop pointer-events-none fixed top-0 left-0 z-[200] will-change-transform"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0px)`,
      }}
    >
      <div
        className="cursor__circle -mt-[50%] -ml-[50%] h-[1.5rem] w-[1.5rem] rounded-full bg-white transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{
          transitionProperty: "opacity, background-color, width, height",
        }}
      />
    </div>
  );
}
