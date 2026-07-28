"use client"

import { useEffect } from "react"


export default function BlogViewCounter({
  slug
}:{
  slug:string
}) {


  useEffect(()=>{

    fetch("/api/blog/view",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        slug
      })
    })

  },[slug])


  return null
}