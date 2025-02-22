import React from "react";
import { Carousel } from "react-bootstrap";

const coffeeSlides = [
  {
    src: "src/assets/images/slidecoffe.png",
    alt: "Fresh Coffee Beans",
    title: "Freshly Roasted Coffee Beans",
    description:
      "Experience the aroma of premium coffee beans, roasted to perfection.",
  },
  {
    src: "src/assets/images/slidecoffe2.jpg",
    alt: "Perfect Brew",
    title: "The Perfect Brew",
    description: "Enjoy a cup of coffee made just for you, every time.",
  },
  {
    src: "src/assets/images/espresso.jpg",
    alt: "Cozy Coffee Shop",
    title: "Relax in Our Coffee Haven",
    description: "Step into our cozy café and savor the finest blends.",
  },
];

const CoffeeCarousel = () => {
  return (
    <div className="carousel-container">
      <Carousel fade controls={true} indicators={true} interval={3000}>
        {coffeeSlides.map((slide, index) => (
          <Carousel.Item key={index}>
            <img className="d-block w-100" src={slide.src} alt={slide.alt} />
            <Carousel.Caption>
              <h4>{slide.title}</h4>
              <p>{slide.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CoffeeCarousel;
