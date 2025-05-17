type produtoHappyLive = "Happy Drop" | "Happy Sleep" | "Happy Focus" | "Happy Pet" | "Happy Oil" | "Happy Oil 250ml" | "Happy Oil 60ml" | "Happy Face Day" | "Happy Face Night" | "Happy Gummies";

interface testimonio {
    producto: produtoHappyLive;
    usuario: string;
    descripcion: string;
    img?: string;
}

export const testimonios: testimonio[] = [
  {
    producto: "Happy Drop",
    usuario: "Edson",
    descripcion: "Me ayudó a reducir el dolor siático y a dormir mejor.",
    img: "/profiles/edson.webp"
  },
  {
    producto: "Happy Sleep",
    usuario: "Lucy Ramos",
    descripcion: "Me ayuda a mejorar mis horas de sueño, a descansar mejor y tener un día más activo! Me encantan porque son de frutos rojos y saben rico 😋",
    img: "/profiles/lucy-ramos.webp"
  },
  {
    producto: "Happy Focus",
    usuario: "Lucy Ramos",
    descripcion: "Me mantiene más concentrada y me ayuda a tener más rendimiento en el trabajo, también me ha ayudado a reducir mis antojos de alimentos durante el día.",
    img: "/profiles/lucy-ramos.webp"
  },
  {
    producto: "Happy Pet",
    usuario: "Lucy Ramos",
    descripcion: "Tengo un labrador de 10 años, sufría de ansiedad, como es adoptado le costaba trabajo adaptarse a nosotros, era muy uraño y poco a poco con el consumo progresivo de CBD Pet cambió y ahora se comporta mucho mejor, y es más sociable.",
    img: "/profiles/lucy-ramos.webp"
  },
  {
    producto: "Happy Oil 250ml",
    usuario: "Lucy Ramos",
    descripcion: "Me ayuda a relajarme mucho durante la noche, incluso me ayuda a disminuir los dolores de migraña.",
    img: "/profiles/lucy-ramos.webp"
  },
  {
    producto: "Happy Face Day",
    usuario: "Lucy Ramos",
    descripcion: "Tengo Rosácea y ha sido la única crema que me ha ayudado a disminuir el síntoma de ardor, manchas y acné.",
    img: "/profiles/lucy-ramos.webp"
  },
  {
    producto: "Happy Face Night",
    usuario: "Lucy Ramos",
    descripcion: "Relaja mucho mi piel durante la noche y por la mañana amanece muy humectada.",
    img: "/profiles/lucy-ramos.webp"
  },
  {
    producto: "Happy Gummies",
    usuario: "Lucy Ramos",
    descripcion: "Me ayuda a relajarme por las noches en días de mucho estrés por el trabajo.",
    img: "/profiles/lucy-ramos.webp"
  },
  {
    producto: "Happy Gummies",
    usuario: "José Reyes",
    descripcion: "Me ayuda a bajar los niveles de estres y mantenerme relajado despues de varias horas de trabajo en el escritorio.",
    img: "/profiles/jose-reyes.png"
  },
  {
    producto: "Happy Drop",
    usuario: "José Reyes",
    descripcion: "No queria tomar medicamentos para controlar episodios de ansiedad, dolor crónico y dolor muscular, por eso decido probar Happy Drop y me resulto excelente.",
    img: "/profiles/jose-reyes.png"
  },
  {
    producto: "Happy Focus",
    usuario: "José Reyes",
    descripcion: "Me ayuda a controlar el estrés, a mantenerme concentrado en el trabajo y a mejorar la recuperación de mis músculos después de entrenar.",
    img: "/profiles/jose-reyes.png"  
  },
  {
    producto: "Happy Oil 250ml",
    usuario: "José Reyes",
    descripcion: "Me ayuda a reducir dolores por golpes, contracturas y desvanece moretones super rápido.",
    img: "/profiles/jose-reyes.png" 
  },
  {
    producto: "Happy Drop",
    usuario: "Jovanna Bernal",
    descripcion: "Me ayudo a tener un mejor estado de animo y energía durante el día.",
    img: "/profiles/jovanna-bernal.webp"
  },
  {
    producto: "Happy Drop",
    usuario: "Lucy Ramos",
    descripcion: "Me ayudó a quitar el dolor de hombro después de una contractura muscular 100% recomendable",
    img: "/profiles/lucy-ramos.webp"
  }
]