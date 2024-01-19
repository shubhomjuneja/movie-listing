"use client"

export default function Home() {
  if (typeof window !== "undefined") {
    window.location.href = '/signin';
  }
  return <div></div>
}
