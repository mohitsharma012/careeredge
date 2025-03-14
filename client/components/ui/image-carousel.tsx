import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
interface ICarouselItem {
  id: number;
  title: string;
  image: string;
}
interface IImageCarouselProps {
  items: ICarouselItem[];
}

export default function ImageCarousel({ items: initialItems }: IImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % initialItems.length);
  };
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + initialItems.length) % initialItems.length);
  };
  const visibleIndices = [
    (currentIndex - 1 + initialItems.length) % initialItems.length,
    currentIndex,
    (currentIndex + 1) % initialItems.length,
  ];

  const visibleItems = visibleIndices.map((index) => initialItems[index]);

  return (
    <div className="carousel-container h-[50vh] md:h-[70vh] rounded-2xl ">
      <div
        onClick={handlePrev}
        className="navigation-item-left absolute left-0 md:left-52 top-[60%] mx-3 z-20 flex h-16 w-10 translate-y-[-50%] cursor-pointer items-center justify-center rounded-lg  bg-custom-dark  bg-clip-padding  backdrop-filter"
      >
        <ChevronLeft className="text-white" />
      </div>
      <div
        onClick={handleNext}
        className="navigation-item-right absolute right-0 md:right-52 top-[60%] mx-3 z-20 flex h-16 w-10 translate-y-[-50%] cursor-pointer items-center justify-center rounded-lg  bg-custom-dark  bg-clip-padding  backdrop-filter"
      >
        <ChevronRight className="text-white" />
      </div>
      {visibleItems.map((item, index) => (
        <div
          key={item.id}
          className={
            "absolute left-[50%] z-10 h-[45vh] w-[31vh] md:h-[65vh] md:w-[46vh] animate-fadeIn rounded-xl bg-gray-500 border shadow-lg"
          }
          style={{
            backgroundImage: `url(${item.image})`,
            backgroundSize: "cover",
            transform:
              index === 1
                ? "translateX(-50%) scale(1.1)"
                : index === 0
                  ? "translateX(-110%)"
                  : "translateX(10%) ",
            transition: "transform 0.5s ease, filter 0.5s ease",
            
            zIndex: index === 1 ? 3 : 1,
          }}
        ></div>
      ))}
    </div>
  );
}
