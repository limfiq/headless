import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next App',
  description: 'Generated by create next app',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   <html lang="en">
   <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fetch Data Di Next</title>
   </head>
   <body>
      <header>
          <h1>CRUD Data Dari Strapi Ke Next.Js</h1>
          <p>Pilih Halaman Untuk metode yang dipakai</p>
          <hr />
      </header>
      <main>
          <ul>
            <li><link href="/fetch">Fetch</link></li>
            <li><link href="/axios">axios</link></li>
          </ul>
      </main>
      <footer>

      </footer>
   </body>
   </html>
  )
}
