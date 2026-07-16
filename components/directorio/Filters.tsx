"use client";

type Props = {
  categories: any[];
  selectedCategory?: string;
  onCategoryChange?: (slug: string) => void;
  search?: string;
  onSearchChange?: (value: string) => void;
};

export default function Filters({
  categories,
  selectedCategory = "",
  onCategoryChange,
  search = "",
  onSearchChange,
}: Props) {

  return (

    // <aside>

    //   <div
    //     className="
    //       sticky
    //       top-24
    //       rounded-2xl
    //       border
    //       bg-white
    //       shadow-sm
    //       p-5
    //     "
    //   >

    //     <h2 className="text-lg font-bold text-slate-800">
    //       Filtros
    //     </h2>


    //     {/* BUSCADOR */}

    //     <div className="mt-5">

    //       {/* <input
    //         type="text"
    //         placeholder="Buscar doctor..."
    //         value={search}
    //         onChange={(e)=>setSearch(e.target.value)}
    //         className="
    //           w-full
    //           rounded-xl
    //           border
    //           px-4
    //           py-3
    //           bg-slate-50
    //           outline-none
    //           focus:border-[#0F4C81]
    //         "
    //       /> */}
    //       <input
    //         type="text"
    //         placeholder="Buscar doctor..."
    //         value={search}
    //         onChange={(e)=> {
    //             onSearchChange?.(e.target.value)
    //         }}
    //         className="
    //             w-full
    //             rounded-xl
    //             border
    //             border-slate-200
    //             bg-slate-50
    //             px-4
    //             py-3
    //             outline-none
    //             focus:border-[#0F4C81]
    //             focus:ring-2
    //             focus:ring-[#0F4C81]/20
    //         "
    //         />

    //     </div>



    //     {/* CATEGORIAS */}

    //     <div className="mt-8">


    //       <h3
    //         className="
    //           mb-3
    //           text-sm
    //           font-semibold
    //           uppercase
    //           text-slate-500
    //         "
    //       >
    //         Especialidades
    //       </h3>



    //       <div className="space-y-2">


    //       {categories.map((cat:any)=>(


    //         <label
    //           key={cat.id}
    //           className="
    //             flex
    //             items-center
    //             gap-3
    //             cursor-pointer
    //             rounded-xl
    //             p-2
    //             hover:bg-slate-50
    //           "
    //         >

    //           <input

    //             type="radio"

    //             name="category"

    //             checked={
    //               selectedCategory === cat.slug
    //             }

    //             onChange={()=>{

    //               onCategoryChange?.(
    //                 cat.slug
    //               );

    //             }}

    //             className="
    //               h-4
    //               w-4
    //               accent-[#0F4C81]
    //             "

    //           />


    //           <span className="text-sm text-slate-700">
    //             {cat.name}
    //           </span>


    //         </label>


    //       ))}


    //       </div>


    //     </div>


    //   </div>


    // </aside>
    <aside>
      <div className="rounded-2xl border bg-white p-5 shadow-sm">

        <h2 className="text-lg font-bold">
          Filtros por Doctor
        </h2>

        <input
          type="text"
          placeholder="Buscar doctor..."
          value={search}
          onChange={(e) =>
            onSearchChange?.(e.target.value)
          }
          className="mt-5 w-full rounded-xl border px-4 py-3"
        />


        <div className="mt-8 space-y-2">

          {categories.map((cat:any)=>(
            <label
              key={cat.id}
              className="flex items-center gap-3 cursor-pointer"
            >

              {/* <input
                type="radio"
                name="category"
                checked={selectedCategory === cat.slug}
                onChange={() =>
                  onCategoryChange?.(cat.slug)
                }
              /> */}
              <input
                type="checkbox"
                checked={selectedCategory === cat.slug}
                onChange={() => {

                  if (selectedCategory === cat.slug) {
                    // quitar filtro
                    onCategoryChange?.("")
                  } else {
                    // aplicar filtro
                    onCategoryChange?.(cat.slug)
                  }

                }}
                className="h-4 w-4 accent-[#0F4C81]"
              />

              <span>
                {cat.name}
              </span>

            </label>
          ))}

        </div>

      </div>
    </aside>
  );
}