
import React from 'react'
import Link from 'next/link'
export default function AxiosPage() {
  return (
    <div>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/fetch">Fetch</Link></li>
        <li><Link href="/axios">Axios</Link></li>
      </ul>
     
      <h1>Ini Halaman Axios</h1>
    </div>
  )
}
