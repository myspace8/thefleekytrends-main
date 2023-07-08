import React, { useEffect, useState } from "react";
//accepts the width prop, the src prop, and the aspect ratio prop

const Image = ({ className, src, ar }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showImage, setShowImage] = useState("none");

  // const handleImageLoad = () => {
  //   setIsLoading(false);
  //   setShowImage("block");
  // };

  useEffect(() => {
    const imgElement = document.createElement("img");
    imgElement.src = src;

    setIsLoading(!imgElement.complete);

    const handleImageLoad = () => {
      setIsLoading(false);
    };

    imgElement.addEventListener("load", handleImageLoad);

    return () => {
      imgElement.removeEventListener("load", handleImageLoad);
    };
  }, [src]);

  return (
    <div
      className={isLoading ? `loading-div ${className}` : className}
      style={{
        aspectRatio: ar, //aspect ratio is passed in as a prop
        overflow: "hidden", //overflow is set to hidden so that the image doesn't overflow the div
        backgroundColor: "grey",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <img
        src={src}
        style={{
          objectFit: "cover",
          height: "100%",
          display: isLoading ? "none" : "block",
          // display: showImage,
        }}
        // onLoad={handleImageLoad} //sets display property of the image only when its done loading
      />
    </div>
  );
};

export default Image;
