import { useState, useEffect } from 'react';

const CustomScrollbar: React.FC = () => {
  const [scrollHeight, setScrollHeight] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Tính chiều cao và vị trí của thanh cuộn
      const windowHeight = window.innerHeight; // Chiều cao viewport
      const documentHeight = document.documentElement.scrollHeight; // Chiều cao toàn bộ nội dung
      const scrollPosition = window.scrollY; // Vị trí scroll hiện tại

      // Tính chiều cao của thanh cuộn (dựa trên tỷ lệ viewport/tổng nội dung)
      const trackHeight = windowHeight; // Chiều cao track = chiều cao viewport
      const contentHeight = documentHeight - windowHeight; // Nội dung có thể cuộn
      const scrollHeightPercent = (trackHeight / documentHeight) * 100 * 0.5; // Chiều cao thanh cuộn (%)

      // Tính vị trí của thanh cuộn (dựa trên vị trí scroll hiện tại)
      const scrollTopPercent =
        contentHeight > 0
          ? (scrollPosition / contentHeight) * (100 - scrollHeightPercent)
          : 0;

      setScrollHeight(scrollHeightPercent);
      setScrollTop(scrollTopPercent);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

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
