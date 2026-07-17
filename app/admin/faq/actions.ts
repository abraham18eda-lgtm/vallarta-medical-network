"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function createFaq(
  formData: FormData
) {

  await prisma.faq.create({
    data:{
      question: formData.get("question") as string,
      answer: formData.get("answer") as string,
      locale: formData.get("locale") as string,
      order: Number(formData.get("order")),
      isActive: formData.get("isActive") === "on",
    }
  });


  revalidatePath("/admin/faq");
  redirect("/admin/faq");

}



export async function updateFaq(
  id:string,
  formData:FormData
){

  await prisma.faq.update({
    where:{
      id
    },
    data:{
      question: formData.get("question") as string,
      answer: formData.get("answer") as string,
      locale: formData.get("locale") as string,
      order:Number(formData.get("order")),
      isActive:formData.get("isActive")==="on",
    }
  });


  revalidatePath("/admin/faq");
  redirect("/admin/faq");

}