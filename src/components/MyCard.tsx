import { compressToEncodedURIComponent } from "lz-string";
import React, { useRef, useEffect } from "react";

interface Move{
  name: string
}

interface CardProps {
  id: number;
  name: string;
  height: number;
  weight: number;
  official: string;
  sprite: string;
  move: Move[];
}

const MyCard: React.FC<CardProps> = ({id, name, official, height, weight, sprite, move}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const imageContainer = imageContainerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (!card) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } = card.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const posX = clientX - centerX;
      const posY = clientY - centerY;
      const rotateX = (posY / height) * 30;
      const rotateY = (posX / width) * -30;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      const scaleAmount = 1.08;
      if (imageContainer) {
        imageContainer.style.transform = `scale(${scaleAmount}) translateZ(50px)`;
      }
    };

    const handleMouseLeave = () => {
      if (card) {
        card.style.transform = "rotateX(0) rotateY(0)";
      }
      if (imageContainer) {
        imageContainer.style.transform = "scale(1) translateZ(0px)";
      }
    };

    card?.addEventListener("mousemove", handleMouseMove);
    card?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card?.removeEventListener("mousemove", handleMouseMove);
      card?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const redirect = ()=>{
    const dataString = JSON.stringify(move);
    const compressMove = compressToEncodedURIComponent(dataString)
    const compressOfficial = compressToEncodedURIComponent(official)
    const compressSprite = compressToEncodedURIComponent(sprite)
    window.location.href = `http://localhost:5173/details?id=${id}&name=${name}&height=${height}&weight=${weight}&official=${compressOfficial}&sprite=${compressSprite}&move=${compressMove}`
  }
  return (
    <div
      className="perspective-container"
      style={{
        perspective: "1500px",
        maxWidth: "600px",
        padding: "20px",
      }}
    >
      <div
        ref={cardRef}
        className="card-tilt"
        style={{
          transition: "transform 0.2s all cubic-bezier(.25,.36,.81,.72)",
          transformStyle: "preserve-3d",
          width: "100%",
          borderRadius: "20px",
          boxShadow: "0 5px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h1>{name}</h1>

        <div ref={imageContainerRef} className="img-container" style={{ width: "100%", transition: "transform 0.2s ease", transformStyle: "preserve-3d" }}>
          <img src={official} alt={name} style={{ width: "100%" }} />
        </div>
        <button onClick={() => {
            redirect();
        }}>Whos That Pokemon</button>
      </div>
    </div>
  );
};

export default MyCard;
