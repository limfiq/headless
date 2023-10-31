import React from 'react'

export default function DetailData({params}: {params:{slug:string}}) {
  return (
      <div>
          Detail User : {params.slug}
    </div>
  )
}
