"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { VideoPlayer } from "@/components/video-player";

const featuredVideos = [
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
    title: "Cloud Orb",
    src: "/videos/craft11.mp4",
    href: "https://usefork.dev/docs/cloud-orb",
  },
];

export function ComponentsSection() {
  return (
    <section className="flex w-full flex-col items-center px-6 pt-24 pb-10">
      {/* Heading */}
      <h2 className="max-w-3xl text-center text-2xl font-medium tracking-tight">
        Interactive Components
      </h2>

      {/* Subheading */}
      <p className="mt-2 max-w-md text-center text-lg text-foreground/50">
        Collection of interactive components recreated from the web out
        there.
      </p>

      {/* Video Grid Header — CTA aligned to top of grid */}
      <div className="mt-8 flex w-full max-w-6xl items-center justify-end">
        <Link
          href="/components"
          className="group flex items-center gap-1.5 text-base font-medium transition-opacity hover:opacity-70"
        >
          View All Components
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Video Grid */}
      <div className="mt-4 grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {featuredVideos.map((video, index) => (
          <VideoPlayer
            key={index}
            src={video.src}
            title={video.title}
            href={video.href}
          />
        ))}
      </div>
    </section>
  );
}