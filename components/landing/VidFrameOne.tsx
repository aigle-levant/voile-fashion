export default function VidFrameOne() {
  return (
    <video
      className="h-full w-full object-cover"
      autoPlay
      loop
      muted
      controls
      playsInline
    >
      <source src="/videos/videoOne.mp4" type="video/mp4" />
    </video>
  );
}
