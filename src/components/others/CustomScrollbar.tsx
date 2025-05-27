import { useState, useEffect } from 'react';
import type Lenis from 'lenis';
import { useLenis } from 'lenis/react';

const CustomScrollbar: React.FC = () => {
  const [scrollHeight, setScrollHeight] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const handleScroll = (lenis: Lenis) => {
      const { scroll, limit } = lenis;

      // Tính chiều cao và vị trí của thanh cuộn
      const windowHeight = window.innerHeight; // Chiều cao viewport
      const documentHeight = document.documentElement.scrollHeight; // Chiều cao toàn bộ nội dung

      // Tính chiều cao của thanh cuộn (dựa trên tỷ lệ viewport/tổng nội dung)
      const trackHeight = windowHeight; // Chiều cao track = chiều cao viewport
      const scrollHeightPercent = (trackHeight / documentHeight) * 100 * 0.5; // Chiều cao thanh cuộn (%)

      // Tính vị trí của thanh cuộn (dựa trên vị trí scroll hiện tại)
      const scrollTopPercent =
        limit > 0 ? (scroll / limit) * (100 - scrollHeightPercent) : 0;

      setScrollHeight(scrollHeightPercent);
      setScrollTop(scrollTopPercent);
    };
    lenis.on('scroll', handleScroll);

    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollHeightPercent = (windowHeight / documentHeight) * 100 * 0.5;
      setScrollHeight(scrollHeightPercent);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      lenis.off('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [lenis]);

  return (
    <div
      id="custom-scrollbar"
      className="fixed top-0 right-0 z-140 h-screen w-[0.4rem]"
      style={{
        backgroundColor: 'rgba(48, 47, 53, 0.3)',
      }}
    >
      <div
        className="inner-scrollbar absolute left-0 w-[0.4rem] bg-[#302F35]"
        style={{
          height: `${scrollHeight}%`,
          top: `${scrollTop}%`,
        }}
      />
    </div>
  );
};

export default CustomScrollbar;
