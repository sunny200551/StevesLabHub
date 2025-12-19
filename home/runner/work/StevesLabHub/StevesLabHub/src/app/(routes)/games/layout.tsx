"use client"

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex-1 w-full relative bg-background">
      {children}
    </div>
  )
}
