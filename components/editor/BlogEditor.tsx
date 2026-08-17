"use client"

import { useEffect, useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"

import { createLowlight } from "lowlight"
// import ts from "highlight.js/lib/languages/typescript"
// import javascript from "highlight.js/lib/languages/javascript"

import html from "highlight.js/lib/languages/xml"
import css from "highlight.js/lib/languages/css"

import Placeholder from "@tiptap/extension-placeholder"

interface Props {
  name: string
  value?: string
  onChange?: (html: string) => void
}

import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3, 
  List,
  ListOrdered,  
  Quote,
  Code2,
  Link as LinkIcon,
  Underline as UnderlineIcon,
  Minus,
  Undo2,
  Redo2,
  Braces, 
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
  const [htmlContent, setHtmlContent] = useState(value)

  const lowlight = createLowlight()

    // lowlight.register("ts", ts)
    // lowlight.register("js", javascript)
    lowlight.register("html", html)
    lowlight.register("css", css)
  
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
      }),

      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "codeBlock") {
            return "Escribe tu código aquí..."
          }

          return "Escribe el contenido..."
        },
      }),
    ],

    
    content:value,

    editorProps: {
      attributes: {
        class: [
          "min-h-[350px]",
          "p-6",
          "focus:outline-none",

          // títulos
          "[&_h1]:text-4xl",
          "[&_h1]:font-bold",
          "[&_h1]:tracking-tight",
          "[&_h1]:text-sky-900",

          "[&_h3]:text-xl",
          "[&_h2]:md:text-2xl",
          "[&_h2]:font-semibold",
          "[&_h3]:leading-tight",
          "[&_h2]:text-slate-600",

          "[&_h3]:text-xl",
          "[&_h3]:md:text-xl",
          "[&_h3]:font-semibold",
          "[&_h3]:leading-tight",
          "[&_h3]:text-slate-600",
          "[&_h3]:mb-3",

          // párrafos
          "[&_p]:my-4",
          "[&_p]:leading-relaxed",
          "[&_p]:text-slate-600",

          // listas
          "[&_ul]:list-disc",
          "[&_ul]:ml-6",

          "[&_ol]:list-decimal",
          "[&_ol]:ml-6",

          // inline code
          "[&_code]:rounded-md",
          "[&_code]:bg-sky-50",
          "[&_code]:px-1.5",
          "[&_code]:py-0.5",
          "[&_code]:text-sky-700",

          // quote
          "[&_blockquote]:border-l-4",
          "[&_blockquote]:border-sky-400",
          "[&_blockquote]:pl-4",
          "[&_blockquote]:italic",

          // código inline
          "[&_pre]:my-6",
          "[&_pre]:rounded-2xl",
          "[&_pre]:bg-slate-900",
          "[&_pre]:p-5",
          "[&_pre]:overflow-x-auto",
          "[&_pre]:shadow-lg",
          "[&_pre]:border",
          "[&_pre]:border-slate-700",
          "[&_pre]:text-left",


          "[&_pre_code]:bg-transparent",
          "[&_pre_code]:text-slate-100",
          "[&_pre_code]:font-mono",
          "[&_pre_code]:text-sm",
          "[&_pre_code]:leading-relaxed",

        ].join(" ")
      }
    },   

    onUpdate({ editor }) {
      const html = editor.getHTML()
      setHtmlContent(html)
      onChange?.(html)
    }

  })



  useEffect(() => {
    if (!editor) return

    editor.commands.setContent(value || "", {
      emitUpdate: false,
    })

    setHtmlContent(value || "")
  }, [editor, value])


  if(!editor)
    return null


  return (

    <div>


      {/* ESTE ES EL QUE ENVIA AL FORM */}
      <input
        type="hidden"
        name={name}
        value={htmlContent}
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
          className={`
            p-2
            rounded-lg
            transition
            hover:bg-sky-50
            hover:text-sky-600

            ${
              editor.isActive("heading", { level: 1 })
                ? "bg-sky-500 text-white"
                : "text-slate-600"
            }
          `}
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
            editor
              .chain()
              .focus()
              .toggleHeading({
                level: 3,
              })
              .run()
          }
          className={`
            p-2
            rounded-lg
            transition
            hover:bg-gray-200
            hover:text-sky-600
          `}
          title="Título 3"
        >
          <Heading3 size={18} />
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
          onClick={() =>
            editor
              .chain()
              .focus()
              .setHorizontalRule()
              .run()
          }
          className="p-2 rounded-xl hover:bg-sky-50 hover:text-sky-600 transition active:scale-95"
        >
          <Minus size={18}/>
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .undo()
              .run()
          }
          disabled={
            !editor.can()
              .undo()
          }
          className="
            p-2
            rounded-xl
            hover:bg-sky-50
            hover:text-sky-600
            transition
            active:scale-95

            disabled:opacity-30
            disabled:cursor-not-allowed
          "
        >
          <Undo2 size={18}/>
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .redo()
              .run()
          }
          disabled={
            !editor.can()
              .redo()
          }
          className="
            p-2
            rounded-xl
            hover:bg-sky-50
            hover:text-sky-600
            transition
            active:scale-95

            disabled:opacity-30
            disabled:cursor-not-allowed
          "
        >
          <Redo2 size={18}/>
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
          onClick={() => {
            if (editor.isActive("codeBlock")) {
              editor
                .chain()
                .focus()
                .toggleCodeBlock()
                .run()

              return
            }

            editor
              .chain()
              .focus()
              .toggleCodeBlock()
              .run()

            setTimeout(() => {
              editor.commands.updateAttributes("codeBlock", {
                language: "html",
              })
            }, 0)
          }}
          className={`
            p-2
            rounded-xl
            transition
            hover:bg-sky-50
            hover:text-sky-600

            ${
              editor.isActive("codeBlock")
                ? "bg-sky-500 text-white"
                : "text-slate-600"
            }
          `}
          title="Bloque de código HTML"
        >
          <Braces size={18} />
        </button>


        {/* <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleCode()
              .run()
          }
          className={`
            p-2
            rounded-xl
            transition
            hover:bg-sky-50
            hover:text-sky-600

            ${
              editor.isActive("code")
                ? "bg-sky-500 text-white"
                : "text-slate-600"
            }
          `}
        >
          <Code2 size={18}/>
        </button> */}



      </div>
      



      {/* EDITOR */}

      <EditorContent
        editor={editor}        
      />

    </div>

  )
}
