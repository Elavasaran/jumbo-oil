import coconutOilImg from '../assets/coconut_oil.jpg';
import groundnutOilImg from '../assets/groundnut_oil.jpg';
import gingellyOilImg from '../assets/gingelly_oil.jpg';
import jumboOilsImg from '../assets/jumbo_trades_oils.jpg';

export const products = [
  {
    id: "coconut-oil",
    name: "Coconut Oil",
    slug: "coconut-oil",
    description: "100% pure and natural cold-pressed coconut oil extracted from hand-picked fresh coconuts. Retains natural aroma, rich nutrients, and authentic taste for delicious everyday cooking.",
    image: coconutOilImg,
    galleryImages: [
      coconutOilImg,
      jumboOilsImg
    ],
    category: "Edible Oil",
    tagline: "Cold Pressed • 100% Pure • Traditional Aroma",
    rating: 4.9,
    reviewCount: 142,
    ingredients: ["100% Pure Cold-Pressed Coconut Oil"],
    usage: "Ideal for daily sautéing, deep frying, baking, traditional South Indian dishes, as well as natural skin moisturization and hair care nourishment.",
    productInformation: "Extracted from fresh sun-dried coconut copra using traditional low-temperature cold pressing to lock in natural lauric acid, healthy fats, and aromatic sweetness.",
    manufacturingInformation: "Processed and bottled under stringent FSSAI-guided hygienic standards in food-grade packaging.",
    nutrition: [
      { label: "Energy", value: "898 kcal" },
      { label: "Total Fat", value: "99.9g" },
      { label: "Lauric Acid", value: "50.2g" },
      { label: "Saturated Fat", value: "91.8g" },
      { label: "Trans Fat", value: "0g" },
      { label: "Cholesterol", value: "0mg" }
    ],
    storage: "Store in a cool, dry place away from direct sunlight. Solidifies naturally below 24°C without altering quality.",
    packaging: "Premium UV-protected food-grade PET bottle & heavy-duty canister.",
    benefits: [
      { title: "Natural Goodness", desc: "Rich in Medium Chain Triglycerides (MCTs) and Lauric Acid for clean metabolic energy." },
      { title: "Healthy Cooking", desc: "High smoke point ensures stability for deep frying and high-heat sautéing." },
      { title: "Hair & Skin Care", desc: "Deeply hydrates scalp, conditions hair, and acts as a natural skin barrier." },
      { title: "Authentic Taste", desc: "Lends a rich traditional coconut aroma to South Indian chutneys and curries." }
    ],
    variants: [
      { id: "var-1-500", size: "500 ml", sku: "JT-CO-500ML", price: 150, stock: 45, lowStockThreshold: 10, status: "In Stock" },
      { id: "var-1-1", size: "1 L", sku: "JT-CO-1L", price: 250, stock: 120, lowStockThreshold: 20, status: "In Stock" },
      { id: "var-1-2", size: "2 L", sku: "JT-CO-2L", price: 490, stock: 60, lowStockThreshold: 10, status: "In Stock" },
      { id: "var-1-5", size: "5 L", sku: "JT-CO-5L", price: 1200, stock: 25, lowStockThreshold: 5, status: "In Stock" },
      { id: "var-1-15", size: "15 L", sku: "JT-CO-15L", price: 3500, stock: 8, lowStockThreshold: 2, status: "In Stock" }
    ]
  },
  {
    id: "groundnut-oil",
    name: "Groundnut Oil",
    slug: "groundnut-oil",
    description: "100% pure and natural cold-pressed groundnut oil extracted from premium handpicked peanuts. Its rich nutty aroma and high smoke point preserve the authentic taste of your ingredients.",
    image: groundnutOilImg,
    galleryImages: [
      groundnutOilImg,
      jumboOilsImg
    ],
    category: "Edible Oil",
    tagline: "Cold Pressed • 100% Pure • Rich Nutty Aroma",
    rating: 4.8,
    reviewCount: 112,
    ingredients: ["100% Pure Cold-Pressed Groundnut Oil"],
    usage: "Perfect for deep frying, stir-frying, traditional Indian curries, and everyday cooking where a natural nutty aroma is desired.",
    productInformation: "Extracted from top-quality handpicked peanuts using traditional low-temperature cold pressing to retain fresh taste and high nutritional value.",
    manufacturingInformation: "Refined and packed under advanced automated FSSAI-certified hygienic lines to retain fresh taste.",
    nutrition: [
      { label: "Energy", value: "900 kcal" },
      { label: "Total Fat", value: "100g" },
      { label: "Monounsaturated Fat", value: "48g" },
      { label: "Polyunsaturated Fat", value: "32g" },
      { label: "Vitamin E", value: "38mg" },
      { label: "Cholesterol", value: "0mg" }
    ],
    storage: "Store in a cool and dry place. Keep away from direct light and heat sources.",
    packaging: "Food-grade PET bottle & ergonomic 5L/15L handle jars.",
    benefits: [
      { title: "Heart Friendly", desc: "High in unsaturated fatty acids that support healthy cholesterol levels." },
      { title: "Vitamin E Enriched", desc: "Natural antioxidants help protect body cells from oxidative stress." },
      { title: "High Smoke Point", desc: "Stays stable under high heat, perfect for deep frying traditional snacks." },
      { title: "Rich Aroma", desc: "Enhances everyday dishes with an authentic, wholesome groundnut flavor." }
    ],
    variants: [
      { id: "var-2-500", size: "500 ml", sku: "JT-GO-500ML", price: 120, stock: 200, lowStockThreshold: 20, status: "In Stock" },
      { id: "var-2-1", size: "1 L", sku: "JT-GO-1L", price: 230, stock: 350, lowStockThreshold: 30, status: "In Stock" },
      { id: "var-2-2", size: "2 L", sku: "JT-GO-2L", price: 450, stock: 150, lowStockThreshold: 15, status: "In Stock" },
      { id: "var-2-5", size: "5 L", sku: "JT-GO-5L", price: 1100, stock: 80, lowStockThreshold: 10, status: "In Stock" },
      { id: "var-2-15", size: "15 L", sku: "JT-GO-15L", price: 3200, stock: 15, lowStockThreshold: 5, status: "In Stock" }
    ]
  },
  {
    id: "gingelly-oil",
    name: "Gingelly Oil",
    slug: "gingelly-oil",
    description: "Authentic cold-pressed sesame oil extracted using traditional wooden chekku methods with natural jaggery. Renowned for its rich nutty aroma, warm flavor, and rich antioxidant profile.",
    image: gingellyOilImg,
    galleryImages: [
      gingellyOilImg,
      jumboOilsImg
    ],
    category: "Edible Oil",
    tagline: "Mara Chekku Cold Pressed • Nutty Flavor • Rich Antioxidants",
    rating: 4.95,
    reviewCount: 186,
    ingredients: ["100% Sesame Seed Extract", "Palm Jaggery (used during traditional pressing)"],
    usage: "Excellent for South Indian traditional gravies, pickle preparation, tempering, body massages, and oil pulling practices.",
    productInformation: "Extracted from choice black and white sesame seeds crushed slowly at room temperature to preserve natural Sesamol and Sesamin antioxidants.",
    manufacturingInformation: "Slow-pressed in traditional wooden mills, naturally settled, and unrefined for maximum purity.",
    nutrition: [
      { label: "Energy", value: "898 kcal" },
      { label: "Total Fat", value: "99.9g" },
      { label: "Monounsaturated Fat", value: "40g" },
      { label: "Polyunsaturated Fat", value: "42g" },
      { label: "Sesamol & Antioxidants", value: "High" },
      { label: "Cholesterol", value: "0mg" }
    ],
    storage: "Store in a cool, dark place. Keep container tightly sealed after each use.",
    packaging: "Traditional leak-proof food-grade bottle & 5L/15L tin/jar.",
    benefits: [
      { title: "Authentic Aroma", desc: "Imparts an unmistakable nutty richness to pickles, podis, and traditional curries." },
      { title: "Cold Pressed Purity", desc: "No solvents or artificial heat used; 100% natural extraction method." },
      { title: "Antioxidant Power", desc: "Naturally rich in Sesamol which helps resist oxidation and preserves freshness." },
      { title: "Wellness & Oil Pulling", desc: "Traditional Ayurvedic staple for daily oral hygiene and body warm-ups." }
    ],
    variants: [
      { id: "var-3-500", size: "500 ml", sku: "JT-GO-500ML", price: 150, stock: 50, lowStockThreshold: 10, status: "In Stock" },
      { id: "var-3-1", size: "1 L", sku: "JT-GO-1L", price: 280, stock: 85, lowStockThreshold: 15, status: "In Stock" },
      { id: "var-3-2", size: "2 L", sku: "JT-GO-2L", price: 540, stock: 40, lowStockThreshold: 10, status: "In Stock" },
      { id: "var-3-5", size: "5 L", sku: "JT-GO-5L", price: 1350, stock: 10, lowStockThreshold: 5, status: "In Stock" },
      { id: "var-3-15", size: "15 L", sku: "JT-GO-15L", price: 3900, stock: 5, lowStockThreshold: 2, status: "Low Stock" }
    ]
  }
];
