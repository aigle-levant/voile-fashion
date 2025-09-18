import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Mousewheel, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-creative";
// modules
import GlassFile from "./GlassFile";
import VoileIntro from "./VoileIntro";
import SaintLaurent from "./SaintLaurent";
import VidFrameOne from "./VidFrameOne";
import VidFrameTwo from "./VidFrameTwo";
import VidFrameThree from "./VidFrameThree";
import Footer from "../common/Footer";

export default function SwiperParallaxEffect() {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Swiper
        direction="vertical"
        effect="creative"
        speed={900}
        loop={false}
        grabCursor={false}
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectCreative, Mousewheel, Pagination]}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, "-120%", -500],
          },
          next: {
            shadow: true,
            translate: [0, "120%", -500],
          },
        }}
        className="h-full w-full"
      >
        <SwiperSlide>
          <GlassFile />
        </SwiperSlide>
        {/* load the video HERE instead of in vidframes */}
        {/* typescript wont yell at you */}
        <SwiperSlide>
          <VidFrameOne />
        </SwiperSlide>
        {/* voile fancy intro like hello comrade */}
        <SwiperSlide>
          <VoileIntro />
        </SwiperSlide>
        {/* couch vid */}
        <SwiperSlide>
          <VidFrameTwo />
        </SwiperSlide>
        {/* i wanna be m. saint-laurent */}
        <SwiperSlide>
          <SaintLaurent />
        </SwiperSlide>
        <SwiperSlide>
          <VidFrameThree />
        </SwiperSlide>
        <SwiperSlide>
          <Footer />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
