import type { SwiperProps } from "swiper/react";

export interface CreativeSwiperProps extends SwiperProps {
  creativeEffect?: {
    prev?: {
      shadow?: boolean;
      translate?: [number, string, number];
    };
    next?: {
      shadow?: boolean;
      translate?: [number, string, number];
    };
  };
}

export interface VidFrameProps {
  src: string;
}
