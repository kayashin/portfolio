"use client"

import { useState} from "react";
import Image from "next/image"

type Project = {
    title: string;
    summary: string;
    description: string;
    tech: string[];
    github?: string | null;
    live?: string | null;
    media?: { type: "image" | "video"; src: string; caption?: string }[];
}

const projects: Project[] = [
  {
    title: "Music Quiz",
    summary: "a multiplayer music trivia game that generates questions from your last.fm listening history.",
    description: `is a personal project i'm actively building. the idea: connect your last.fm account, host a room, and play music trivia where the questions are generated from what you and your friends actually listen to. makes it a lot harder than generic trivia.

it's a full-stack app with a Next.js frontend and a custom WebSocket server running on Railway (Vercel doesn't support persistent WebSocket connections, which i learned the hard way). real-time multiplayer is handled with the ws package, with ephemeral in-memory room state on the server. auth is via NextAuth with a custom CredentialsProvider and Last.fm's MD5 signature-based auth flow. question generation pulls from each player's top tracks, loved tracks, top albums, and top artists via Last.fm's API, paginating up to 200 items per endpoint.

originally built on Spotify until i found out their developer policy explicitly bans trivia games. pivoted to Last.fm.

still in progress.`,
        tech: ["Next.js", "TypeScript", "React", "WebSockets", "Last.fm API", "Railway"],
    github: null,
    live: "https://spotify-quiz-game-production.up.railway.app/",
    media: [{ type: "image", src: "/images/MQhomepage.png" },],
  },
  {
    title: "HAP Customer Intent Engine",
    summary: "a data analytics web app built for Health Alliance Plan to help call center reps train using insights from historical customer calls.",
    description: `for my senior capstone, our team of 6 partnered with Health Alliance Plan (HAP), a Michigan-based health insurance provider, to build a customer intent engine and training tool for their call center.

the app analyzes transcripts from past customer calls, identifies intent categories, and displays the findings across interactive dashboards. my contributions were on the frontend and data analysis side: i designed the web interface, analyzed call data to surface peak call times by topic (both daily and yearly) and speaking duration breakdowns: how much the rep vs. customer spoke and how long each intent category typically took to resolve. i also built a PDF export of all graphs and tables so reps could download reports for each inquiry category.

the other half of the team handled the AI side, including intent classification and the chatbot built with Hugging Face.`,
    tech: ["Python", "Flask", "Plotly Dash", "Pandas"],
    github: null,
    live: "https://capstone.cse.msu.edu/2025-01/projects/hap/",
    media: [{ type: "image", src: "/images/HAPdhomepage.png" }, { type: "image", src: "/images/HAPCV.png" }, { type: "image", src: "/images/HAPVD.png" }, { type: "image", src: "/images/HAPd.png" }],
  },
  {
    title: "Pet Cues",
    summary: "a computer vision tool to help first-time dog owners read their pet's body language and emotions, built with a team of 7 as part of MSU's AI club.",
    description: `i came up with pet cues after noticing how often dog behavior gets misread. a prevailing misconception is that dogs are easier to interact with than animals like cats with clearer boundaries. crossed boundaries and misunderstood cues are a pretty common source of harm that just doesn't get talked about enough. i pitched it to my university's AI club and ended up leading a team of 7 students to build it out.

    the core idea: upload or take a photo/video of your dog, and the web app analyzes body language using pose estimation to infer emotional state. we used DeepLabCut to extract skeletal orientation data and trained a regression model with sklearn that hit 66% accuracy and a 60% F1-score. not bad for a domain where labeled data is genuinely hard to find. we were also experimenting with audio analysis via libROSA and Edge Impulse to classify emotion from pitch, though the two pipelines never got connected (also finding audio data was devastatingly hard).

    leading this was its own challenge. it's a niche research area, data was sparse and often unlabeled in ways that didn't fit our use case, and keeping a volunteer club team on track is different from a class project. by the end i had 7 people who genuinely cared and showed up. one of my neuroscience professors got pretty excited about the DeepLabCut approach too, which felt like a good sign.`,
    tech: ["Python", "React", "Next.js", "DeepLabCut", "sklearn", "libROSA", "Edge Impulse"],
    github: null,
    live: null,
    media: [{ type: "image", src: "/images/PetCuesWebsite.png" },{ type: "video", src: "/videos/PetCuesPE.mp4", caption: "pose estimation overlay" },
  { type: "video", src: "/videos/websitedemoPetCues.mp4", caption: "model predicted sitting/waiting — dog is clearly just waiting for a treat" },],
  },
  {
    title: "Traffic Jam Assist Simulation",
    summary: "a Unity simulation of Traffic Jam Assist, an automotive safety feature that extends adaptive cruise control for stop-and-go highway traffic, built for a retired Ford engineer.",
    description: `for my intro to software engineering class, our team of 5 worked with a retired Ford engineer as our client to spec out and simulate Traffic Jam Assist: an extension of adaptive cruise control designed for congested highway conditions. while the rest of the team handled client communication, requirements planning, and system diagrams, i built the simulation itself in Unity using C#.

    the simulation covers 6 scenarios: highway detection (TJA only engages on limited access highways), speed-based following, automatic disengagement above 65 km/h, full stop-and-go behavior, adjustable following distance (10/15/20m), and radar obstruction handling. each scenario has its own screen with interactive controls and dashboard feedback like warning icons and chime sequences.`,
    tech: ["Unity", "C#"],
    github: null,
    live: "https://www.cse.msu.edu/~cse435/Projects/F2024/TJA1/prototype.html",
    media: [{ type: "image", src: "/images/TJAstart.png" }, { type: "image", src: "/images/TJA4.png" }, { type: "video", src: "/videos/TJAdemo.mp4", caption: "TJA demo" }],
  },
];

export default function ProjectModal() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <>
      {/* Cards */}
      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <div
            key={project.title}
            onClick={() => { setSelected(project); setImageIndex(0); }}
            className="border border-[#b9cfe8] rounded-lg p-5 flex flex-col gap-2 cursor-pointer hover:border-gray-400 transition-colors"
          >
            <h3 className="font-medium">{project.title}</h3>
            <p className="text-sm text-gray-600">{project.summary}</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {project.tech.map((t) => (
                <span key={t} className="text-xs border border-[#b9cfe8] rounded-full px-3 py-1">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-12 flex flex-col gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-y-auto flex flex-col gap-6 modal-scroll">
            {/* Header */}
            <div className="flex items-start justify-between">
              <h2 className="text-3xl font-semibold">{selected.title}</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            {/* Image carousel */}
            {selected.media && selected.media.length > 0 && (
              <div className="relative w-full">
                {selected.media[imageIndex].type === "image" ? (
                  <Image
                    src={selected.media[imageIndex].src}
                    alt={`${selected.title} screenshot ${imageIndex + 1}`}
                    width={800}
                    height={500}
                    quality={100}
                    className="w-full rounded-lg border border-gray-100 object-cover"
                  />
                ) : (
                  <video
                    key={selected.media[imageIndex].src}
                    controls
                    className="w-full rounded-lg border border-gray-100"
                  >
                    <source src={selected.media[imageIndex].src} type="video/mp4" />
                  </video>
                )}

                {selected.media[imageIndex].caption && (
                  <p className="text-xs text-gray-400 mt-1">{selected.media[imageIndex].caption}</p>
                )}

                {selected.media.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
                    <button
                      onClick={() => setImageIndex((i) => (i - 1 + selected.media!.length) % selected.media!.length)}
                      className="pointer-events-auto bg-white/80 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center shadow text-gray-700"
                    >
                      ‹
                    </button>
                    <button
                      onClick={() => setImageIndex((i) => (i + 1) % selected.media!.length)}
                      className="pointer-events-auto bg-white/80 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center shadow text-gray-700"
                    >
                      ›
                    </button>
                  </div>
                )}

                {selected.media.length > 1 && (
                  <p className="text-center text-xs text-gray-400 mt-2">
                    {imageIndex + 1} / {selected.media.length}
                  </p>
                )}
              </div>
            )}

            {/* Description */}
            <p className="text-base text-gray-700 leading-loose whitespace-pre-line">{selected.description}</p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2">
              {selected.tech.map((t) => (
                <span key={t} className="text-xs border border-[#b9cfe8] rounded-full px-3 py-1">
                  {t}
                </span>
              ))}
            </div>

            {/* Links */}
            {(selected.github || selected.live) && (
              <div className="flex gap-4 text-sm">
                {selected.github && (
                  <a href={selected.github} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                    github
                  </a>
                )}
                {selected.live && (
                  <a href={selected.live} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                    link
                  </a>
                )}
              </div>
            )}
          </div>
          </div>
        </div>
      )}
    </>
  );
}