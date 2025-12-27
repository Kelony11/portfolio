import { useMemo, useState } from "react";
import Bio from "./sections/Bio";
import Work from "./sections/Work";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

type SectionKey = "bio" | "work" | "projects" | "contact";

const SECTIONS: { key: SectionKey; label: string }[] = [
  { key: "bio", label: "BIO" },
  { key: "work", label: "WORK" },
  { key: "projects", label: "PROJECTS" },
  { key: "contact", label: "CONTACT" },
];

const PURPLE = "border-fuchsia-500/70";

function Monitor({ active }: { active: SectionKey | null }) {
  // Blank monitor until a button is clicked (per your requirement)
  if (!active) {
    return (
      <div className="grid h-full place-items-center px-6 text-center">
        <div className="max-w-3xl">
          <p className="text-neutral-400 text-sm">( C ) Monitor - Scrollable Page</p>
          <h2 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight text-neutral-100">
            Select a section to view details
          </h2>
          <p className="mt-4 text-neutral-300 text-base sm:text-xl leading-relaxed">
            Function: View the contents of whatever button in the section is pressed.
          </p>
        </div>
      </div>
    );
  }

  // Render selected content (scrollable)
  return (
    <div className="h-full overflow-y-auto pr-6">
      <div className="px-8 py-8">
        {active === "bio" && <Bio />}
        {active === "work" && <Work />}
        {active === "projects" && <Projects />}
        {active === "contact" && <Contact />}
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState<SectionKey | null>(null);

  const buttonBase = useMemo(
    () =>
      [
        "rounded-2xl",
        "border",
        "px-10 py-5",
        "text-xl sm:text-2xl",
        "font-semibold tracking-wide",
        "bg-neutral-700/60",
        "hover:bg-neutral-600/60",
        "transition",
        PURPLE,
      ].join(" "),
    []
  );

  const buttonSelected = useMemo(
    () => ["bg-neutral-200/10", "text-white"].join(" "),
    []
  );

  return (
    <div className="h-screen w-screen bg-black text-white">
      {/* Desktop layout: left rail + main area */}
      <div className="h-full w-full px-6 py-6 lg:px-10 lg:py-8">
        <div className="h-full w-full grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
          {/* LEFT RAIL (A + D) */}
          <aside className="relative hidden lg:flex flex-col items-center pt-6">
            {/* (A) Profile */}
            <div className="w-full">
              <p className="text-sm text-neutral-300 tracking-wide">(A) LOGO OR PROFILE PICTURE</p>
              <div className="mt-4 h-56 w-56 rounded-full border border-neutral-300/40 overflow-hidden bg-neutral-800 grid place-items-center">
                {/* Replace with your image later */}
                <span className="text-neutral-300 text-sm">Profile Image</span>
              </div>
            </div>

            {/* (D) Resume bubble (left side) */}
            <div className="mt-auto pb-10 w-full">
              <p className="text-sm text-neutral-300 tracking-wide">(D) RESUME FLOATING BUBBLE</p>
              <button
                onClick={() => window.open("/resume.pdf", "_blank")}
                className="mt-4 h-28 w-28 rounded-full border border-neutral-300/40 bg-neutral-100/10 hover:bg-neutral-100/20 transition"
                title="Open Resume"
              />
            </div>
          </aside>

          {/* MAIN AREA: Buttons + Monitor */}
          <section className="h-full w-full flex flex-col">
            {/* TOP: Section Buttons (B) */}
            <div className="w-full">
              <p className="hidden lg:block text-sm text-neutral-300 tracking-wide text-center">
                (B) SECTION BUTTONS
              </p>

              {/* Desktop: centered buttons in a row */}
              <div className="hidden lg:flex justify-center gap-10 mt-4">
                {SECTIONS.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setActive(s.key)}
                    className={`${buttonBase} ${active === s.key ? buttonSelected : ""}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Mobile: centered profile + 2x2 buttons */}
              <div className="lg:hidden flex flex-col items-center gap-6">
                <p className="text-sm text-neutral-300 tracking-wide">(A) Centered LOGO OR PROFILE PICTURE</p>
                <div className="h-44 w-44 rounded-full border border-neutral-300/40 overflow-hidden bg-neutral-800 grid place-items-center">
                  <span className="text-neutral-300 text-sm">Profile Image</span>
                </div>

                <div className="w-full max-w-xl">
                  <p className="text-sm text-neutral-300 tracking-wide text-center">(B) SECTION BUTTONS</p>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {SECTIONS.map((s) => (
                      <button
                        key={s.key}
                        onClick={() => setActive(s.key)}
                        className={`${buttonBase} ${active === s.key ? buttonSelected : ""}`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile resume bubble (top-left like your mock) */}
                <button
                  onClick={() => window.open("/resume.pdf", "_blank")}
                  className="fixed left-6 top-6 z-50 h-16 w-16 rounded-full border border-neutral-300/40 bg-neutral-100/10"
                  title="Resume"
                />
              </div>
            </div>

            {/* MONITOR AREA (C) */}
            <div className="flex-1 mt-8 lg:mt-10">
              {/* Outer purple monitor border */}
              <div className={`relative h-full w-full rounded-2xl border ${PURPLE} bg-black`}>
                {/* Label C */}
                <div className="absolute left-6 top-4 text-neutral-300/90 hidden lg:block">
                  <span className="text-sm tracking-wide">(C) Monitor - Scrollable Page.</span>
                </div>

                {/* (F) Scroll rail on the right (visual) */}
                <div className="absolute right-4 top-4 bottom-4 w-10 border border-neutral-300/30 rounded-md hidden lg:block" />

                {/* Actual scrollable content area */}
                <div className="absolute inset-0 pt-14">
                  <Monitor active={active} />
                </div>
              </div>

              {/* (E) background note (optional label) */}
              <p className="hidden lg:block mt-4 text-sm text-neutral-300 tracking-wide">
                (E) DARK BACKGROUND (NON SCROLLABLE PAGE)
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Desktop: resume bubble fixed on left side (like your mock D) */}
      <button
        onClick={() => window.open("/resume.pdf", "_blank")}
        className="hidden lg:block fixed left-10 top-1/2 -translate-y-1/2 z-50 h-24 w-24 rounded-full border border-neutral-300/40 bg-neutral-100/10 hover:bg-neutral-100/20 transition"
        title="Resume"
      />
    </div>
  );
}
