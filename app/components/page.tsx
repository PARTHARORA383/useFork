import { VideoPlayer } from "@/components/video-player";

const craftVideos = [
  {
    title: "Interactive Carousal",
    src: "/videos/craft1.mp4",
    href: "https://usefork.dev/docs/carousal01",
  },
  {
    title: "Hold To Delete",
    src: "/videos/craft2.mp4",
    href: "https://usefork.dev/docs/cool-buttons",
  },
  {
    title: "Parallax Images",
    src: "/videos/craft3.mp4",
    href: "https://usefork.dev/docs/parallax-images",
  },
  {
    title: "Side Navigation",
    src: "/videos/craft4.mp4",
    href: "https://usefork.dev/docs/side-navigation",
  },
  {
    title: "Stopwatch",
    src: "/videos/craft6.mp4",
    href: "https://usefork.dev/docs/stopwatch",
  },
  {
    title: "Hover Marquee ",
    src: "/videos/craft7.mp4",
    href: "https://usefork.dev/docs/text-hover-marquee",
  },
  {
    title: "Save Toggle",
    src: "/videos/craft8.mp4",
    href: "https://usefork.dev/docs/save-toggle",
  },
  {
    title: "Flip Card",
    src: "/videos/craft9.mp4",
    href: "https://usefork.dev/docs/flip-card-hover",
  },
];

export default function ComponentsPage() {
  return (
    <div className="bg-muted2 flex justify-center pt-28 pb-28 px-14 fixed inset-0 no-scrollbar h-[calc(100vh-1rem)] w-[calc(100vw-1rem)] mt-2 ml-2 overflow-scroll border rounded-xl space-y-4">
      <div className="lg:max-w-4xl lg:min-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="flex items-baseline gap-2 text-2xl font-medium text-foreground">
            All Components
            <sup className="text-sm font-medium text-foreground/50">
              [{craftVideos.length}]
            </sup>
          </h1>
          <p className="mt-1 text-foreground/40">
            Collection of some popular components [Hover to play video]
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {craftVideos.map((video, index) => (
            <VideoPlayer
              key={index}
              src={video.src}
              title={video.title}
              href={video.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
}