"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function MenuCategories() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(setCategories)
  }, [])

  return (
    <nav className="bg-white shadow-sm border-b relative z-50">
      <div className="flex gap-6 px-6 py-4 overflow-visible">
        <div>
          <Link 
            href="/directorio"
            className="cursor-pointer font-medium text-gray-700 hover:text-blue-600"
            >Directorio
          </Link>
        </div>
        {categories.map((cat: any) => (
          <div key={cat.id} className="group relative">
            <span className="cursor-pointer font-medium text-gray-700 hover:text-blue-600">
              {cat.name}
            </span>

            {cat.children.length > 0 && (
              <div className="absolute left-0 top-full pt-2 hidden group-hover:block bg-white shadow-lg rounded-xl p-4 min-w-[200px]">
                {cat.children.map((sub: any) => (
                  <a
                    key={sub.id}
                    href={`/es/especialidades/${sub.slug}`}
                    className="block py-2 text-sm hover:text-blue-600"
                  >
                    {sub.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  )
}