import { prisma } from "@/lib/prisma";
import DesktopTop from "./DesktopTop";
import MobileTop from "./MobileTop";

export default async function TopSections() {
  const [
    doctors,
    clinics,
    dentals,
    ophthalmology,
    cardiology,
    nutrition,
  ] = await Promise.all([
    prisma.homeFeatured.findMany({
      where: { type: "doctor" },
      orderBy: { order: "asc" },
      include: { doctor: true },
      take: 3,
    }),

    prisma.place.findMany({
      where: { type: "CLINIC" },
      take: 3,
    }),

    prisma.place.findMany({
      where: { type: "DENTAL" },
      take: 3,
    }),

    prisma.category.findFirst({
      where: { slug: "oftalmología" },
      include: { places: { include: { place: true } } },
    }),

    prisma.category.findFirst({
      where: { slug: "cardiología" },
      include: { places: { include: { place: true } } },
    }),

    prisma.category.findFirst({
      where: { slug: "nutricion" },
      include: { places: { include: { place: true } } },
    }),
  ]);

  const sections = {
    doctors: doctors.map((d) => ({
      id: d.id,
      name: d.doctor?.name,
      city: d.doctor?.city,
      image: d.doctor?.image,
      href: `/doctors/${d.doctor?.slug}`,
      slug: d.doctor?.slug ?? "", 
    })),

    clinics,
    dentals,
    ophthalmology:
      ophthalmology?.places.map((p) => p.place) ?? [],

    cardiology:
      cardiology?.places.map((p) => p.place) ?? [],

    nutrition:
      nutrition?.places.map((p) => p.place) ?? [],
  };

  return (
  <>
    {/* Desktop */}
    <div className="hidden md:block">
      <DesktopTop sections={sections} />
    </div>

    {/* Mobile */}
    <div className="block md:hidden">
      <MobileTop sections={sections} />
    </div>
  </>
);
}