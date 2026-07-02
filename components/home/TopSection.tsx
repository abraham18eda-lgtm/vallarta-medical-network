// import { prisma } from "@/lib/prisma";

// export default async function TopSection() {
//   const featured = await prisma.homeFeatured.findMany({
//     orderBy: { order: "asc" },
//     include: {
//       doctor: true,
//       place: true,
//     },
//   });

//   return (
//     <section className="py-10">
//       <h2 className="text-2xl font-bold mb-6">
//         Top 3 destacados
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//         {featured.map((item) => (
//         <a
//             key={item.id}
//             href={
//             item.type === "doctor"
//                 ? `/doctors/${item.doctor?.slug}`
//                 : `/places/${item.place?.slug}`
//             }
//             className="block border rounded-xl overflow-hidden"
//         >
//             <img
//             src={
//                 item.type === "doctor"
//                 ? item.doctor?.image || ""
//                 : item.place?.image || ""
//             }
//             className="w-full h-40 object-cover"
//             />

//             <div className="p-3">
//             <h3 className="font-semibold">
//                 {item.type === "doctor"
//                 ? item.doctor?.name
//                 : item.place?.name}
//             </h3>

//             <p className="text-sm text-gray-500">
//                 {item.type === "doctor"
//                 ? item.doctor?.city
//                 : item.place?.city}
//             </p>
//             </div>
//         </a>
//         ))} 
       
//       </div>
//     </section>
//   );
// }

import { prisma } from "@/lib/prisma";
import TopSelector from "@/components/ui/TopSelector"

export default async function TopSection() {
  const doctors = await prisma.homeFeatured.findMany({
    where: {
      type: "doctor",
    },
    take: 3,
    orderBy: {
      order: "asc",
    },
    include: {
      doctor: true,
    },
  });

  const clinics = await prisma.place.findMany({
    where: {
      type: "CLINIC",
    },
    take: 3,
    orderBy: {
      name: "asc",
    },
  });

  return (
    <section className="py-2">
      <TopSelector
        doctors={doctors}
        clinics={clinics}
      />
    </section>
  );
}