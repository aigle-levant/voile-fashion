export default function VidFrameTwo() {
  return (
    <video
      className="h-full w-full object-cover"
      autoPlay
      loop
      muted
      controls
      playsInline
    >
      <source src="/videos/videoTwo.mp4" type="video/mp4" />
    </video>
  );
}
