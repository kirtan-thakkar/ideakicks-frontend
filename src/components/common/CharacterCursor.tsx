import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

interface CursorCharacter {
  name: string;
  role: string;
  svg: string;
}

const ROUTE_CHARACTERS: Record<string, CursorCharacter> = {
  "/start": {
    name: "Navi",
    role: "The Creator",
    svg: "/characters/octopus.svg",
  },
  "/creators": {
    name: "Navi",
    role: "The Creator",
    svg: "/characters/octopus.svg",
  },
  "/backers": {
    name: "Myrme",
    role: "The Backer",
    svg: "/characters/ant.svg",
  },
  "/partners": {
    name: "Mimi",
    role: "The Partner",
    svg: "/characters/bee.svg",
  },
  "/vendors": {
    name: "Mimi",
    role: "The Partner",
    svg: "/characters/bee.svg",
  },
};

export function CharacterCursor() {
  const { pathname } = useLocation();
  const character = ROUTE_CHARACTERS[pathname];
  const cursorRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!character) return;

    // Check fine pointer (mouse / desktop only)
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    // Add cursor-none class to documentElement
    document.documentElement.classList.add("character-cursor-active");

    let isClicking = false;
    let isHovering = false;
    let isOverText = false;

    const updateInnerTransform = () => {
      if (!innerRef.current) return;
      if (isClicking) {
        innerRef.current.style.transform = "scale(0.85) rotate(-6deg)";
      } else if (isHovering) {
        innerRef.current.style.transform = "scale(1.22) rotate(6deg)";
      } else {
        innerRef.current.style.transform = "scale(1) rotate(0deg)";
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorRef.current) return;

      cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

      // Target element inspection
      const target = e.target;
      if (target && target instanceof Element) {
        isOverText =
          Boolean(
            target.tagName === "INPUT" &&
              (target as HTMLInputElement).type !== "button" &&
              (target as HTMLInputElement).type !== "submit"
          ) ||
          target.tagName === "TEXTAREA" ||
          (target as HTMLElement).isContentEditable;

        const isClickable = Boolean(
          target.closest("a, button, [role='button'], input[type='button'], input[type='submit']")
        );

        if (isClickable !== isHovering) {
          isHovering = isClickable && !isOverText;
          updateInnerTransform();
        }
      } else {
        isOverText = false;
        if (isHovering) {
          isHovering = false;
          updateInnerTransform();
        }
      }

      cursorRef.current.style.opacity = isOverText ? "0" : "1";
    };

    const handleMouseDown = () => {
      isClicking = true;
      updateInnerTransform();
    };

    const handleMouseUp = () => {
      isClicking = false;
      updateInnerTransform();
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (!e.relatedTarget && cursorRef.current) {
        cursorRef.current.style.opacity = "0";
      }
    };

    const handleMouseEnter = () => {
      if (cursorRef.current && !isOverText) {
        cursorRef.current.style.opacity = "1";
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.documentElement.classList.remove("character-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [character]);

  if (!character) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-150"
      style={{
        willChange: "transform",
        transform: "translate3d(-100px, -100px, 0)",
        opacity: 0,
      }}
      aria-hidden="true"
    >
      <div
        ref={innerRef}
        className="relative -top-2 -left-2 flex items-center justify-center transition-transform duration-150 ease-out"
        style={{ transform: "scale(1) rotate(0deg)" }}
      >
        {/* Precision targeting dot at hotspot (0, 0) */}
        <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-[#6FD179] ring-2 ring-white shadow-[0_0_8px_rgba(111,209,121,0.8)] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none" />

        {/* Mascot Character Illustration */}
        <div className="relative w-10 h-10 sm:w-11 sm:h-11 ml-2 mt-2">
          <img
            src={character.svg}
            alt={character.name}
            className="w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(8,45,77,0.35)] select-none pointer-events-none"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
