import React from 'react'
import Link from 'next/link'
export default function Home() {
  return (
    <div>
      <ul>
        <li><Link href="/fetch">Fetch</Link></li>
      </ul>
      <h2>Home</h2>
      <p>Welcome to the home page.</p>
  </div>
  )
}
