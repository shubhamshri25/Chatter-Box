import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import animationData from "@/assets/lottie-json";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const colors = [
  "bg-[#00668a21] text-[#00668a] border-[1px] border-[#00668aba]",
  "bg-[#ac66f02a] text-[#ac66f0] border-[1px] border-[#ac66f0bb]",
  "bg-[#ff6662a] text-[#ff6600a] border-[1px] border-[#ff6600ba]",
  "bg-[#f112c5a7] text-[#ff006e] border-[1px] border-[#ff0066ba]",
];

export const getColor = (color) => {
  if (color >= 0 && color < colors.length) {
    return colors[color];
  }
  return colors[0]; // Fallback to the first color if out of range
};

export const animationDefaultOptions = {
  loop: true,
  autoPlay: true,
  animationData,
};
