import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-creative";
// types
import { type CreativeSwiperProps } from "@/types/swiper";
// modules
import GlassFile from "./GlassFile";
import VoileIntro from "./VoileIntro";
import SaintLaurent from "./SaintLaurent";

export default function SwiperParallaxEffect() {
  const params: CreativeSwiperProps = {
    direction: "vertical",
    effect: "creative",
    grabCursor: true,
    loop: true,
    modules: [EffectCreative],
    creativeEffect: {
      prev: {
        shadow: true,
        translate: [0, "-120%", -500],
      },
      next: {
        shadow: true,
        translate: [0, "120%", -500],
      },
    },
  };

  return (
    <div className="h-screen w-full">
      <Swiper {...params} className="h-full w-full">
        <SwiperSlide>
          <GlassFile />
        </SwiperSlide>

        <SwiperSlide>
          <video
            className="w-full h-auto"
            src="/videos/videoOne.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </SwiperSlide>

        <SwiperSlide>
          <VoileIntro />
        </SwiperSlide>
        <SwiperSlide>
          <video
            className="w-full h-auto"
            src="/videos/videoTwo.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </SwiperSlide>
        <SwiperSlide>
          <SaintLaurent />
        </SwiperSlide>
        <SwiperSlide>
          <video
            className="w-full h-auto"
            src="/videos/videoThree.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
