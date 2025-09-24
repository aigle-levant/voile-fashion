import Bottleneck from "bottleneck";

export const rateLimiter = new Bottleneck({
  minTime: 13,
  maxConcurrent: 10,
});
