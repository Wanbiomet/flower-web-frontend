import React, { useEffect, useState } from "react";

const Hero = () => {
  const [currImage, setCurrImage] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (currImage === 2) {
        setCurrImage(0);
      } else {
        setCurrImage(currImage + 1);
      }
    }, 3000);
  }, [currImage]);
  const images = [
    "images/home-bg.png",
    "images/tulip.png",
    "images/slider2.png",
  ];
  return (
    <div className="relative w-full min-h-[70vh] 800px:min-h-[80vh] flex items-center">
      <div
      className="duration-500 w-full absolute"
      style={{
        backgroundImage: `url(${images[currImage]})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "100%",
      }}
    >
      <div className="absolute top-[50%] translate-x-0 translate-y-[-50%] left-16 right-16 w-auto mx-auto 800px:w-[55%]">
        <h1 className="text-[35px] leading-[1.2] 800px:text-[60px] font-[500] capitalize py-4">
          Hoa Tươi
        </h1>
        <span className="py-5 text-[35px]  text-[#e84393] leading-6">
          Các loài hoa đẹp từ thiên nhiên
        </span>
        <p className="text-[25px] py-4">
          Mua hoa giá rẻ và thời gian vận chuyển nhanh
        </p>
        <a
          href="/"
          className="inline-block rounded-[5rem] bg-[#555] text-white px-5 py-2 hover:bg-[#e84393]"
        >
          Mua Ngay
        </a>
      </div>
    </div>
    </div>
    
  );
};

export default Hero;
