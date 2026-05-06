import type { SVGProps } from "react"

export function PawIcon (props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <ellipse cx="6" cy="9" rx="2" ry="2.6" />
      <ellipse cx="18" cy="9" rx="2" ry="2.6" />
      <ellipse cx="9" cy="5.5" rx="1.8" ry="2.4" />
      <ellipse cx="15" cy="5.5" rx="1.8" ry="2.4" />
      <path d="M12 11c-3.3 0-6 2.7-6 5.6 0 2.2 1.7 3.4 3.7 3.4 1 0 1.6-.3 2.3-.3s1.3.3 2.3.3c2 0 3.7-1.2 3.7-3.4 0-2.9-2.7-5.6-6-5.6Z" />
    </svg>
  )
}

export function CatHeadIcon (props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 4l3 5" />
      <path d="M20 4l-3 5" />
      <path d="M4 4c1 4 .5 7 0 9 0 4 4 7 8 7s8-3 8-7c-.5-2-1-5 0-9l-4 5h-8L4 4Z" />
      <circle cx="9.5" cy="13" r=".8" fill="currentColor" />
      <circle cx="14.5" cy="13" r=".8" fill="currentColor" />
      <path d="M11 16c.5.5 1.5.5 2 0" />
    </svg>
  )
}

export function FishIcon (props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 12c2-4 6-6 10-6s7 2 8 6c-1 4-4 6-8 6s-8-2-10-6Z" />
      <path d="M21 12l-4-3v6l4-3Z" fill="currentColor" />
      <circle cx="9" cy="11" r=".8" fill="currentColor" />
    </svg>
  )
}
