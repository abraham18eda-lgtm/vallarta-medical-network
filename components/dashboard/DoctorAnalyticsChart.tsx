"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

interface ChartItem {
  date: string
  views: number
  whatsapp: number
  contacts: number
  searches: number
}

interface DoctorAnalyticsChartProps {
  data: ChartItem[]

  translations: {
    title: string
    description: string
    views: string
    whatsapp: string
    contacts: string
    searches: string
  }
}

export default function DoctorAnalyticsChart({
  data,
  translations,
}: DoctorAnalyticsChartProps) {

  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        p-6
        md:p-8
        shadow-sm
      "
    >

      {/* HEADER */}

      <div className="mb-6">

        <h2 className="text-xl font-bold text-slate-900">
          {translations.title}
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          {translations.description}
        </p>

      </div>


      {/* GRAPH */}

      <div className="h-[320px] w-full">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 5,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
            />

            <XAxis
              dataKey="date"
              tick={{
                fontSize: 11,
                fill: "#64748b",
              }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              allowDecimals={false}
              tick={{
                fontSize: 11,
                fill: "#64748b",
              }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.08)",
              }}
            />

            <Legend />


            {/* VISITAS */}

            <Line
              type="monotone"
              dataKey="views"
              name={translations.views}
              stroke="#2563eb"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
              }}
            />


            {/* WHATSAPP */}

            <Line
              type="monotone"
              dataKey="whatsapp"
              name={translations.whatsapp}
              stroke="#22c55e"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
              }}
            />


            {/* CONTACTOS */}

            <Line
              type="monotone"
              dataKey="contacts"
              name={translations.contacts}
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
              }}
            />


            {/* BÚSQUEDAS */}

            <Line
              type="monotone"
              dataKey="searches"
              name={translations.searches}
              stroke="#06b6d4"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}
