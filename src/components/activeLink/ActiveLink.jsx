'use client'

import Link from "next/link"

export default function ActiveLink({text, href}) {
  return (
   <>
    <div className="div">
        <Link href={href}>{text}</Link>
    </div>
   </>
  )
}
