import React from "react";

interface ScrollToTopProps {
  goToHeader: () => void;
}
const ScrollToTop: React.FC<ScrollToTopProps> = ({ goToHeader }) => {
  return (
    <div className="fixed right-4 bottom-4 bg-white z-50 rounded-full shadow-lg p-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        onClick={goToHeader}
        viewBox="0 0 24 24"
        className="fill-icongray"
      >
        <path d="M5 15h4v6h6v-6h4l-7-8zM4 3h16v2H4z"></path>
      </svg>
    </div>
  );
};

export default ScrollToTop;
