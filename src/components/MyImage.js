import Image from "next/image";
import { useState } from "react";

const MyImage = (props) => {
  const [srcImg, setSrcImg] = useState(props.src);

  const handleImageError = (name) => {
    let initials = "";
    if (name.includes(" ")) {
      initials = name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase();
    } else {
      initials = name.split("")[0].toUpperCase();
    }
    const placeholderImageURL = `https://via.placeholder.com/300x300/53a3a6/cfffe0.jpg?text=${initials}`;
    setSrcImg(placeholderImageURL);
  };

  return (
    <Image
      src={srcImg}
      alt={props.alt}
      width={props.width}
      height={props.height}
      onError={() => handleImageError(props.alt)}
    />
  );
};

export { MyImage };
