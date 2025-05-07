import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor2() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const targetPosition = useRef({ x: 0, y: 0 }); // Vị trí mục tiêu (vị trí chuột)
  const prevPosition = useRef({ x: 0, y: 0 });
  const speedThreshold = 50;
  const lerpFactor = 0.1; // Hệ số lerp, giá trị càng nhỏ thì di chuyển càng chậm

  useEffect(() => {
    const updateCursorPosition = (e) => {
      targetPosition.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Lerp vị trí hiện tại đến vị trí mục tiêu
      const newX = position.x + (targetPosition.current.x - position.x) * lerpFactor;
      const newY = position.y + (targetPosition.current.y - position.y) * lerpFactor;

      // Tính góc quay và scale dựa trên vị trí trước đó
      const deltaX = targetPosition.current.x - prevPosition.current.x;
      const deltaY = targetPosition.current.y - prevPosition.current.y;
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      const speed = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      const newScale = Math.min(1.5, 1 + speed / speedThreshold);

      setPosition({ x: newX, y: newY });
      setRotation(angle);
      setScale(newScale);

      prevPosition.current = { x: targetPosition.current.x, y: targetPosition.current.y };

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", updateCursorPosition);
    requestAnimationFrame(animate);

    return () => window.removeEventListener("mousemove", updateCursorPosition);
  }, [position]);

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
          transform: `rotate(${rotation}deg) scale(${scale}, ${scale})`,
        }}
      />
    </div>
  );
}
