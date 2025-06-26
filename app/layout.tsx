import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TAG3 Presentation',
  description: 'TAG3 Presentation deployed on GitHub Pages',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}