import Image from "next/image";
import ProjectModal from "@/components/ProjectModal";

export default function Home() {
  return (
<div className="max-w-5xl mx-auto flex gap-8 p-6">
  
  {/* <!-- Left: sticky sidebar --> */}
  <aside className="w-64 shrink-0 sticky top-6 self-start h-fit flex flex-col gap-4">
    
    {/* Profile picture */}
    <Image
      src="/images/me100.jpg"
      alt="Karoline Yashin"
      width={160}
      height={160}
      className="rounded-full w-20 h-20 object-cover"
      style={{ width: "10rem", height: "10rem" }}
    />

    {/* Name */}
    <h2 className="font-semibold text-lg">Karoline Yashin</h2>

    {/* Links */}
    <div className="flex gap-3 text-sm">
      <a href="https://github.com/kayashin" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">github</a>
      <a href="https://www.linkedin.com/in/yashinka/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">linkedin</a>
      <a href="mailto:k@yashin.com" className="underline underline-offset-2">email</a>
      <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">resume</a>
    </div>

    {/* Bio */}
    <p className="mb-3">hi, i&#39;m karoline! i&#39;m a full-stack engineer :D</p>
    <p className="mb-3">i love building things people interact with, playing with data, and pondering. right now i&#39;m working on a multiplayer music trivia app that pulls from your last.fm listening history.</p>
    <p>outside of coding i&#39;m doing some sort of craft (knitting, felting, paper miniatures), drinking too much coffee and tea, and listening to music. i also enjoy strength training and long walks :p</p>
  </aside>

  {/* <!-- Right: scrollable content feed --> */}
  <main className="flex-1 min-w-0">
      <h3 className="text-xl font-semibold mb-6">projects</h3>
      <ProjectModal />
  </main>

</div>
  );
}