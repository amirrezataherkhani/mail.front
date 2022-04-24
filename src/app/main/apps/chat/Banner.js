import React from "react";
import BannerImg from "../../../../@fuse/assets/banners/furniture.jpg";

const Banner = () => {
  return (
    <a href="https://google.com/">
      <div className="flex justify-center px-16 py-8 min-h-96">
        <img className="rounded-20" src={BannerImg} alt="banner" />
      </div>
    </a>
  );
};

export default Banner;
