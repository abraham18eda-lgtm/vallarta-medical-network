"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import TextAlign from "@tiptap/extension-text-align"
import Underline from "@tiptap/extension-underline"

import { useEffect, useState } from "react"

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Image as ImageIcon,
  Link as LinkIcon,
  Code,
} from "lucide-react"

export default function RichEditor({
  name,
  defaultValue = "",
}: {
  name: string
  defaultValue?: string
}) {

  const [showHTML,setShowHTML] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      Link,
      TextAlign.configure({
        types:["heading","paragraph"]
      })
    ],
    content: defaultValue,
    immediatelyRender:false
  })

  useEffect(()=>{
    if(!editor) return

    const update = ()=>{
      const html = editor.getHTML()
      const input = document.getElementById(name) as HTMLInputElement
      if(input) input.value = html
    }

    editor.on("update",update)

    return ()=>{
      editor.off("update",update)
    }

  },[editor,name])

  if(!editor) return null

  const btn="p-2 hover:bg-slate-200 rounded"

  // subir imagen
  const addImage = ()=>{
    const url = prompt("URL de la imagen")
    if(url){
      editor.chain().focus().setImage({src:url}).run()
    }
  }

  // agregar link
  const addLink = ()=>{
    const url = prompt("URL del link")
    if(url){
      editor.chain().focus().setLink({href:url}).run()
    }
  }

  return(

    <div className="border rounded-xl shadow-sm overflow-hidden">

      {/* TOOLBAR */}

      <div className="flex flex-wrap gap-2 border-b bg-slate-50 p-2">

        <button type="button" onClick={()=>editor.chain().focus().toggleBold().run()} className={btn}>
          <Bold size={18}/>
        </button>

        <button type="button" onClick={()=>editor.chain().focus().toggleItalic().run()} className={btn}>
          <Italic size={18}/>
        </button>

        <button type="button" onClick={()=>editor.chain().focus().toggleUnderline().run()} className={btn}>
          <UnderlineIcon size={18}/>
        </button>

        <button type="button" onClick={()=>editor.chain().focus().toggleHeading({level:1}).run()} className={btn}>
          <Heading1 size={18}/>
        </button>

        <button type="button" onClick={()=>editor.chain().focus().toggleHeading({level:2}).run()} className={btn}>
          <Heading2 size={18}/>
        </button>

        <button type="button" onClick={()=>editor.chain().focus().toggleBulletList().run()} className={btn}>
          <List size={18}/>
        </button>

        <button type="button" onClick={()=>editor.chain().focus().toggleOrderedList().run()} className={btn}>
          <ListOrdered size={18}/>
        </button>

        <button type="button" onClick={()=>editor.chain().focus().setTextAlign("left").run()} className={btn}>
          <AlignLeft size={18}/>
        </button>

        <button type="button" onClick={()=>editor.chain().focus().setTextAlign("center").run()} className={btn}>
          <AlignCenter size={18}/>
        </button>

        <button type="button" onClick={()=>editor.chain().focus().setTextAlign("right").run()} className={btn}>
          <AlignRight size={18}/>
        </button>

        <button type="button" onClick={addImage} className={btn}>
          <ImageIcon size={18}/>
        </button>

        <button type="button" onClick={addLink} className={btn}>
          <LinkIcon size={18}/>
        </button>

        <button type="button" onClick={()=>setShowHTML(!showHTML)} className={btn}>
          <Code size={18}/>
        </button>

      </div>

      {/* EDITOR */}

      {!showHTML && (
        <div className="p-4 min-h-[250px] prose max-w-none bg-white">
          <EditorContent editor={editor}/>
        </div>
      )}

      {/* HTML MODE */}

      {showHTML && (
        <textarea
          className="w-full h-[250px] p-4 font-mono text-sm border-t"
          defaultValue={editor.getHTML()}
          onChange={(e)=>{
            editor.commands.setContent(e.target.value)
          }}
        />
      )}

      <input type="hidden" id={name} name={name}/>

    </div>
  )
}