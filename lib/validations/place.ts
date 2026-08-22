import { z } from "zod"

// TEXTOS OPCIONALES

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .or(z.literal(""))

// TELÉFONO
const phoneSchema = z
  .string()
  .trim()
  .refine(
    (value) => {
      if (value === "") return true

      const digits = value.replace(/\D/g, "")

      return digits.length === 10
    },
    {
      message: "El teléfono debe tener 10 dígitos"
    }
  )
  .optional()
  .or(z.literal(""))



// URL

const urlSchema = z
  .string()
  .trim()
  .url("Ingresa una URL válida")
  .optional()
  .or(z.literal(""))

// PLACE

export const placeSchema = z.object({

  // ----------------------------------------------
  // INFORMACIÓN GENERAL
  // ----------------------------------------------

  name: z
    .string()
    .trim()
    .min(
      3,
      "El nombre debe tener al menos 3 caracteres"
    )
    .max(
      150,
      "El nombre no puede superar los 150 caracteres"
    ),

  type: z.enum(
    [
      "HOSPITAL",
      "CLINIC",
      "LAB",
      "DENTAL",
      "OFTALMOLOGY"
    ],
    {
      message:
        "Selecciona un tipo de establecimiento válido"
    }
  ),

  description: z
    .string()
    .trim()
    .min(
      20,
      "La descripción debe tener al menos 20 caracteres"
    )
    .max(
      3000,
      "La descripción no puede superar los 3000 caracteres"
    ),

  // ----------------------------------------------
  // UBICACIÓN
  // ----------------------------------------------

  city: z
    .string()
    .trim()
    .min(
      2,
      "La ciudad es obligatoria"
    )
    .max(
      100,
      "La ciudad no puede superar los 100 caracteres"
    ),

  state: z
    .string()
    .trim()
    .min(
      2,
      "El estado es obligatorio"
    )
    .max(
      100,
      "El estado no puede superar los 100 caracteres"
    ),

  address: z
    .string()
    .trim()
    .min(
      5,
      "La dirección es obligatoria"
    )
    .max(
      250,
      "La dirección no puede superar los 250 caracteres"
    ),

  postalCode: z
    .string()
    .trim()
    .regex(
      /^\d{5}$/,
      "El código postal debe tener 5 números"
    ),

  // ----------------------------------------------
  // CONTACTO
  // ----------------------------------------------

  phone: phoneSchema,

  phone2: phoneSchema,

  mobile: phoneSchema,

  email: z
    .string()
    .trim()
    .email(
      "Ingresa un email válido"
    )
    .optional()
    .or(z.literal("")),

  // ----------------------------------------------
  // REDES SOCIALES
  // ----------------------------------------------

  website: urlSchema,

  facebook: urlSchema,

  instagram: urlSchema,

  youtube: urlSchema,

  twitter: urlSchema,

  // ----------------------------------------------
  // IMAGEN
  // ----------------------------------------------

  image: urlSchema,

  // ----------------------------------------------
  // RELACIONES
  // ----------------------------------------------

  doctorIds: z
    .array(z.string())
    .default([]),

  categoryIds: z
    .array(z.string())
    .default([]),

  treatmentIds: z
    .array(z.string())
    .default([]),

  // ----------------------------------------------
  // CONFIGURACIÓN
  // ----------------------------------------------

  locale: z
    .string()
    .trim()
    .min(
      2,
      "El idioma debe tener al menos 2 caracteres"
    )
    .max(
      10,
      "El idioma no puede superar los 10 caracteres"
    )
    .default("es"),

  isActive: z
    .boolean()
    .default(true),

  showInNavbar: z
    .boolean()
    .default(false),

  navbarOrder: z
    .number()
    .int()
    .nonnegative()
    .optional()
    .nullable()

})
