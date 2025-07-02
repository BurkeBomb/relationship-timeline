import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Relationship Timeline',
  description: 'Explore, analyze, and understand your love story through chat history.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
