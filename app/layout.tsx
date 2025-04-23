import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lisbon - Lisbon Fleet Manager',
  description: 'Lisbon Business Portal'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
