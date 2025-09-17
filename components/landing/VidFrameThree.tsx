export default function VidFrameThree() {
  return (
    <video
      className="h-full w-full object-cover"
      autoPlay
      loop
      muted
      controls
      playsInline
    >
      <source src="/videos/videoThree.mp4" type="video/mp4" />
    </video>
  );
}
