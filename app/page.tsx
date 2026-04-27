import  HomePage  from '@/components/home/HomePage';
import { redirect } from "next/navigation";

export default function Page() {
  redirect('/es'); // tu locale por defecto
}