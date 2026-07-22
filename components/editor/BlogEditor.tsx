"use client"

import { useEffect } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"

import { createLowlight } from "lowlight"
import ts from "highlight.js/lib/languages/typescript"
import javascript from "highlight.js/lib/languages/javascript"

import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code2,
  Link as LinkIcon,
  Underline as UnderlineIcon
} from "lucide-react"


interface Props {
  name: string
  value?: string
  onChange?: (html: string) => void
}


export default function BlogEditor({
  name,
  value = "",
  onChange
}: Props) {

  const lowlight = createLowlight()

  lowlight.register("ts", ts)
  lowlight.register("js", javascript)

  const editor = useEditor({

    extensions:[
      StarterKit.configure({
        codeBlock:false,
      }),

      Underline,

      Link.configure({
        openOnClick:false,
      }),

      Image,

      CodeBlockLowlight.configure({
        lowlight,
      })
    ],


    content:value,

    editorProps:{
      attributes:{
        class:
          "prose prose-lg max-w-none min-h-[350px] p-6 focus:outline-none"
      }
    }, 

    onUpdate({editor}){

      onChange?.(
        editor.getHTML()
      )

    }

  })


  useEffect(()=>{

    if(editor && value){
      editor.commands.setContent(value)
    }

  },[value])


  if(!editor)
    return null



  return (

    <div>


      {/* ESTE ES EL QUE ENVIA AL FORM */}
      <input
        type="hidden"
        name={name}
        value={editor.getHTML()}
      />


      {/* TOOLBAR */}

      <div
        className="
          flex
          gap-2
          border-b
          bg-gray-50
          p-3
        "
      >


        <button
          type="button"
          onClick={() =>
            editor.chain()
            .focus()
            .toggleBold()
            .run()
          }
          className="
            p-2
            rounded-lg
            hover:bg-gray-200
          "
        >
          <Bold size={18}/>
        </button>


        <button
          type="button"
          onClick={() =>
            editor.chain()
            .focus()
            .toggleItalic()
            .run()
          }
          className="
            p-2
            rounded-lg
            hover:bg-gray-200
          "
        >
          <Italic size={18}/>
        </button>



        <button
          type="button"
          onClick={() =>
            editor.chain()
            .focus()
            .toggleHeading({
              level:1
            })
            .run()
          }
          className="
            p-2
            rounded-lg
            hover:bg-gray-200
          "
        >
          <Heading1 size={18}/>
        </button>



        <button
          type="button"
          onClick={() =>
            editor.chain()
            .focus()
            .toggleHeading({
              level:2
            })
            .run()
          }
          className="
            p-2
            rounded-lg
            hover:bg-gray-200
          "
        >
          <Heading2 size={18}/>
        </button>



        <button
          type="button"
          onClick={() =>
            editor.chain()
            .focus()
            .toggleBulletList()
            .run()
          }
          className="
            p-2
            rounded-lg
            hover:bg-gray-200
          "
        >
          <List size={18}/>
        </button>



        <button
          type="button"
          onClick={() =>
            editor.chain()
            .focus()
            .toggleOrderedList()
            .run()
          }
          className="
            p-2
            rounded-lg
            hover:bg-gray-200
          "
        >
          <ListOrdered size={18}/>
        </button>



        <button
          type="button"
          onClick={() =>
            editor.chain()
            .focus()
            .toggleBlockquote()
            .run()
          }
          className="
            p-2
            rounded-lg
            hover:bg-gray-200
          "
        >
          <Quote size={18}/>
        </button>

        <button
          type="button"
          onClick={()=>
          editor.chain()
          .focus()
          .toggleUnderline()
          .run()
          }
          className="p-2 rounded-lg hover:bg-gray-200"
          >
          <UnderlineIcon size={18}/>
        </button>

        <button
          type="button"
          onClick={()=>{

          const url =
          window.prompt(
          "Ingrese URL"
          )

          if(url){

          editor
          .chain()
          .focus()
          .setLink({
          href:url
          })
          .run()

          }

          }}
          className="p-2 rounded-lg hover:bg-gray-200"
          >
          <LinkIcon size={18}/>
        </button>



        <button
          type="button"
          onClick={()=>
          editor.chain()
          .focus()
          .toggleCode()
          .run()
          }
          className="p-2 rounded-lg hover:bg-gray-200"
          >
          <Code2 size={18}/>
        </button>  

        <button
          type="button"
          onClick={()=>
          editor.chain()
          .focus()
          .toggleCodeBlock()
          .run()
          }
          className="p-2 rounded-lg hover:bg-gray-200"
          >
          {"</>"}
        </button>


      </div>
      



      {/* EDITOR */}

      <EditorContent
        editor={editor}
      />


    </div>

  )
}
