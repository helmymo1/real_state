import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { useProperties } from "../context/PropertyContext";
import PropertyCard from "../components/PropertyCard";
import AnimationTitles from "../components/functions/AnimationTitles";

function Properties() {
  const { properties } = useProperties();

  return (
    <div className="properties">
      <Container>
        <AnimationTitles
          className="title mx-auto"
          title="Discover more properties"
        />
        <Swiper
          slidesPerView={4}
          spaceBetween={15}
          grabCursor={true}
          loop={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            520: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            992: {
              slidesPerView: 4,
            },
            1198: {
              slidesPerView: 5,
            },
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper mt-4"
        >
          {properties.slice(0, 6).map((property) => (
            <SwiperSlide key={property.id}>
              <PropertyCard property={property} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
}

export default Properties;
