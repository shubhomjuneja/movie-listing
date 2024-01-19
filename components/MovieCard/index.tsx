import React from "react";

type Props = {
  banner?: any;
  title?: string;
  year?: number;
};

function MovieCard({ banner, title, year }: Props) {
  return (
    <div className="mobileMax:w-full w-[282px] laptopMax:w-full laptopMax:m-0 rounded-[12px] px-[8px] pt-[8px] pb-[16px] bg-card md:mx-[12px] mb-[24px]">
      <img
        src={banner}
        alt="banner"
        className="mobileMax:h-[200px] mobileMax:w-[100%] laptopMax:w-full w-full h-full md:h-[400px] md:w-[266px] rounded-[12px] object-cover"
      />
      <div className="mt-[16px] ms-[8px]">
        <p className="text-white text-[20px] font-[500]">{title}</p>
      </div>
      <div className="mt-[8px] ms-[8px]">
        <p className="text-white text-[14px] font-[400]">{year}</p>
      </div>
    </div>
  );
}

export default MovieCard;
