import Link from 'next/link'
import { Imprima } from 'next/font/google'
import React from 'react'

export default function Fetchpage() {
  return (
    <div>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/fetch">Fetch</Link></li>
        <li><Link href="/axios">Axios</Link></li>
      </ul>
      <h1>Ini Halaman Fetch</h1>
      
    </div>
  )
}
