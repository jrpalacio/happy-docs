import { defineCollection, z } from "astro:content";

const productos = defineCollection({
  type: "content",
  schema: z.object({
    nombre: z.string(),
    contenido: z.string(),
    ingredientes: z.array(z.string()),
    puntos: z.number(),
    precio_publico: z.number(),
    tipo: z.number(),
    img: z.string(),
    precio_distribuidor: z.array(
      z.object({
        descuento: z.string(),
        precio: z.number()
      })
    ),
    category: z.string(),
    tags: z.array(z.string()),
    description: z.string(),

    // NUEVOS CAMPOS OPCIONALES
    modo_de_uso: z.string().optional(),
    recomendado_para: z.array(z.string()).optional(),
    testimonios: z.array(z.string()).optional(),
    advertencias: z.array(z.string()).optional(),
    sabor: z.string().optional(),
  }),
});

export const collections = {
  productos: productos,
};
