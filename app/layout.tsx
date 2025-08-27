import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "VisionaryIQ - Where Vision Meets Intelligence | AI Startup",
  description:
    "VisionaryIQ is a pioneering AI startup specializing in AI-powered platforms, predictive analytics, and interactive dashboards. Transform your business with cutting-edge artificial intelligence solutions.",
  keywords:
    "AI startup, artificial intelligence, machine learning, predictive analytics, interactive dashboards, business intelligence, VisionaryIQ",
  authors: [{ name: "Jarnil Patel", url: "https://visionaryiq.com" }],
  creator: "VisionaryIQ",
  publisher: "VisionaryIQ",
  openGraph: {
    title: "VisionaryIQ - Where Vision Meets Intelligence",
    description: "Transform your business with AI-powered platforms and intelligent solutions",
    url: "https://visionaryiq.com",
    siteName: "VisionaryIQ",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // You can add this image later
        width: 1200,
        height: 630,
        alt: "VisionaryIQ - AI Startup",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VisionaryIQ - Where Vision Meets Intelligence",
    description: "Transform your business with AI-powered platforms and intelligent solutions",
    creator: "@VisionaryIQ", // Update with actual Twitter handle
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add when you set up Google Search Console
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
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
