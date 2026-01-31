import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env vars from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Dynamic imports will be used inside run()


const seedProducts = [
  {
    name: "Labial Mate Velvet",
    slug: "labial-mate-velvet",
    description: "Labial de larga duración con acabado mate aterciopelado. Hidrata y no reseca los labios.",
    price: 45.90,
    images: ["https://images.unsplash.com/photo-1586776977607-310e9c725c37?w=500&q=80"],
    category: { name: "Maquillaje", slug: "maquillaje" },
    tags: ["mate", "larga duracion", "best seller"],
    isActive: true
  },
  {
    name: "Base Serum Radiant",
    slug: "base-serum-radiant",
    description: "Base de maquillaje con acabado natural y efecto serum iluminador. Cobertura media construible.",
    price: 89.00,
    images: ["https://images.unsplash.com/photo-1631214500115-598fc2cb882e?w=500&q=80"],
    category: { name: "Rostro", slug: "rostro" },
    tags: ["base", "iluminador"],
    isActive: true
  },
  {
    name: "Mascara Pestañas Infinitas",
    slug: "mascara-pestanas-infinitas",
    description: "Mascara de pestañas que alarga y define sin dejar grumos. Resistente al agua.",
    price: 35.50,
    images: ["https://images.unsplash.com/photo-1631214499520-7a1ed93a206f?w=500&q=80"],
    category: { name: "Ojos", slug: "ojos" },
    tags: ["pestañas", "waterproof"],
    isActive: true
  },
  {
    name: "Sombra de Ojos Palette Gold",
    slug: "sombra-ojos-palette-gold",
    description: "Paleta de 12 sombras en tonos dorados y tierra. Alta pigmentación y fácil difuminado.",
    price: 120.00,
    images: ["https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&q=80"],
    category: { name: "Ojos", slug: "ojos" },
    tags: ["paleta", "glitter", "best seller"],
    isActive: true
  },
  {
    name: "Serum Vitamina C",
    slug: "serum-vitamina-c",
    description: "Serum facial con 10% de vitamina C pura para iluminar y unificar el tono de la piel.",
    price: 75.00,
    images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80"],
    category: { name: "Skincare", slug: "skincare" },
    tags: ["serum", "vitamina c"],
    isActive: true
  },
  {
    name: "Crema Hidratante Aqua",
    slug: "crema-hidratante-aqua",
    description: "Gel-crema hidratante ultra ligera para todo tipo de piel. Hidratación 24 horas.",
    price: 55.00,
    images: ["https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80"],
    category: { name: "Skincare", slug: "skincare" },
    tags: ["hidratacion", "gel"],
    isActive: true
  },
  {
    name: "Delineador Precision Black",
    slug: "delineador-precision-black",
    description: "Delineador líquido punta felt para trazos precisos y color negro intenso.",
    price: 28.90,
    images: ["https://images.unsplash.com/photo-1617345637251-872f2dc52331?w=500&q=80"],
    category: { name: "Ojos", slug: "ojos" },
    tags: ["delineador", "negro"],
    isActive: true
  },
  {
    name: "Iluminador Sun Kissed",
    slug: "iluminador-sun-kissed",
    description: "Iluminador en polvo con reflejos dorados para un brillo natural y saludable.",
    price: 49.90,
    images: ["https://images.unsplash.com/photo-1599733594230-6b823276abcc?w=500&q=80"],
    category: { name: "Rostro", slug: "rostro" },
    tags: ["iluminador", "polvo", "best seller"],
    isActive: true
  },
  {
    name: "Lip Gloss Brillo de Espejo",
    slug: "lip-gloss-brillo",
    description: "Labial líquido con acabado brillante y efecto volumen. No pegajoso.",
    price: 32.00,
    images: ["https://images.unsplash.com/photo-1591360236480-4497a8e2d681?w=500&q=80"],
    category: { name: "Maquillaje", slug: "maquillaje" },
    tags: ["gloss", "volumen"],
    isActive: true
  }
];

async function run() {
  try {
    console.log('Connecting to DB...');
    // Dynamic imports to ensure env vars are loaded first
    const { default: connectDB } = await import("../lib/db");
    const { default: Product } = await import("../models/Product");

    await connectDB();
    console.log('Connected to MongoDB');

    // Limpia la colección (opcional)
    console.log('Clearing old products...');
    await Product.deleteMany({});

    // Inserta
    console.log('Inserting new products...');
    await Product.insertMany(seedProducts);

    console.log(`✅ Seed listo: ${seedProducts.length} productos insertados`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seed:", error);
    process.exit(1);
  }
}

run();
