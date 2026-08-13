import { prisma } from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"
import BlockEditForm from "@/components/admin/BlockEditForm"


export default async function EditBlockAd({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params
  // console.log(id);
  const numericId = Number(id)

  if (isNaN(numericId)) {
    return notFound()
  }


  const block = await prisma.block.findUnique({
    where: {
      id: numericId,
    },
  })


  if (!block) {
    return notFound()
  }



  const data = block.data as {
    title?: string
    description?: string
    image?: string
    link?: string
    alt?: string
    locale?: string
  }



  async function updateBlock(
    formData: FormData
  ) {

    "use server"


    const imagePath =
      (formData.get("image") as string) ||
      data.image ||
      ""



    await prisma.block.update({
      where: {
        id: numericId,
      },
      data: {
        locale:
          (formData.get("locale") as string) ||
          data.locale ||
          "",

        order:
          Number(formData.get("order")) || 0,

        isActive:
          formData.get("isActive") === "true" ||
          formData.get("isActive") === "on",

        startAt:
          formData.get("startAt")
            ? new Date(
                formData.get("startAt") as string
              )
            : null,

        endAt:
          formData.get("endAt")
            ? new Date(
                formData.get("endAt") as string)
            : null,


        data: {

          title:
            (formData.get("title") as string) ||
            "",


          description:
            (formData.get("description") as string) ||
            "",


          image: imagePath,


          alt:
            (formData.get("alt") as string) ||
            "",


          link:
            (formData.get("link") as string) ||
            "",

        },

      },

    })



    redirect("/admin/block-ads")
  }



  return (

    <BlockEditForm

      block={block}

      data={data}

      updateBlock={updateBlock}

    />

  )
}