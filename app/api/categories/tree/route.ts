import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { CategoryType } from "@prisma/client"

export async function GET(req: Request) {

  try {
    const { searchParams } = new URL(req.url)

    const rawType = searchParams.get("type")
    const locale = searchParams.get("locale") || "es";

    const type =
      rawType === CategoryType.BLOG || rawType === CategoryType.DOCTOR
        ? rawType
        : undefined

  // const categories = await prisma.category.findMany({
  //   where: {
  //     parentId: null,
  //     ...(type ? { type } : {})
  //   },
  //   include: {
  //     children: true
  //   }
  // })
    // const categories = await prisma.category.findMany({
    //   where: {
    //     parentId: null,
    //     ...(type ? { type } : {})
    //   },
    //   include: {
    //     children: true,
    //     _count: {
    //       select: {
    //         doctors: true
    //       }
    //     }
    //   },
    //   orderBy: {
    //     name: "asc"
    //   }
    // })

    const categories = await prisma.category.findMany({
      where: {
        parentId: null,

        ...(type ? { type } : {}),

        translations: {
          some: {
            locale,
          },
        },
      },

      select: {
        id: true,

        translations: {
          where: {
            locale,
          },
          select: {
            name: true,
            slug: true,
          },
        },

        _count: {
          select: {
            doctors: {
              where: {
                doctor: {
                  isActive: true,
                  translations: {
                    some: {
                      locale,
                    },
                  },
                },
              },
            },
          },
        },

        children: {
          where: {
            translations: {
              some: {
                locale,
              },
            },
          },

          select: {
            id: true,

            translations: {
              where: {
                locale,
              },
              select: {
                name: true,
                slug: true,
              },
            },

            _count: {
              select: {
                doctors: {
                  where: {
                    doctor: {
                      isActive: true,
                      translations: {
                        some: {
                          locale,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },

      orderBy: {
        name: "asc",
      },
    });

    const result = categories.map((category) => {
      const translation = category.translations[0];

      return {
        id: category.id,
        name: translation?.name ?? "",
        slug: translation?.slug ?? "",

        _count: category._count,

        children: category.children.map((child) => {
          const childTranslation = child.translations[0];

          return {
            id: child.id,
            name: childTranslation?.name ?? "",
            slug: childTranslation?.slug ?? "",
            _count: child._count,
          };
        }),
      };
    });

  // console.log(categories)
  return NextResponse.json(result)

  } catch (error) {
    console.error("CATEGORIES TREE ERROR:", error);

    return NextResponse.json(
      {
        error: "Error cargando categorías",
      },
      {
        status: 500,
      }
    );
  }
}

