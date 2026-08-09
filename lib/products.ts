// Single source of truth for all product data

export type Product = {
  title: string;
  description: string;
  image: string;
  price: string;
  fullDescription?: string;
  ingredients?: string[];
  weight?: string;
  deliveryTime?: string;
};

export type Category =
  | "All Items"
  | "Regular Flavours"
  | "Nutty Flavours"
  | "Cheesecakes"
  | "Cookies";

export type RangeItem = Product & {
  category: Exclude<Category, "All Items">;
};

export type ProductWithSlug = Product & {
  slug: string;
  category?: string;
};

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ── Featured products (homepage) ──

export const featuredProducts: Product[] = [
  {
    title: "London Viral Whipped Caramel Cream Cake",
    description: "Whipped cream caramel cake with rich gold caramel drip",
    image: "/images/cake_london_caramel.webp",
    price: "Rs 700",
    fullDescription:
      "A viral sensation! Light whipped cream frosting layered with soft vanilla sponge, featuring a rich, dripping golden caramel top coat. Smooth, sweet, and perfectly balanced.",
    ingredients: [
      "Caramel",
      "Whipped cream",
      "Vanilla",
      "Milk",
      "Butter",
      "Flour",
    ],
    weight: "1 Pound",
    deliveryTime: "24 hours",
  },
  {
    title: "Tiramisu Cake",
    description:
      "Dusted with dark cocoa, layered with espresso-soaked ladyfingers",
    image: "/images/cake_tiramisu.webp",
    price: "Rs 600",
    fullDescription:
      "Classic Italian coffee dessert cake. Sponge layers soaked in rich espresso, filled with velvety mascarpone cream and finished with a dusting of premium dark cocoa powder.",
    ingredients: [
      "Espresso",
      "Mascarpone",
      "Cocoa powder",
      "Cream",
      "Flour",
      "Sugar",
    ],
    weight: "1 Pound",
    deliveryTime: "24 hours",
  },
  {
    title: "Coffee Mocha Cake",
    description: "Round chocolate espresso cake with mocha swirl frosting",
    image: "/images/cake_mocha.webp",
    price: "Rs 500",
    fullDescription:
      "For coffee lovers. A rich chocolate cake infused with freshly brewed espresso, covered in a smooth mocha buttercream swirl and topped with coffee bean accents.",
    ingredients: [
      "Espresso",
      "Dark chocolate",
      "Mocha cream",
      "Flour",
      "Butter",
      "Sugar",
    ],
    weight: "1 Pound",
    deliveryTime: "24 hours",
  },
];

// ── Full product range (ExploreRange) ──

export const categories: Category[] = [
  "All Items",
  "Regular Flavours",
  "Nutty Flavours",
  "Cheesecakes",
  "Cookies",
];

export const allProducts: RangeItem[] = [
  // Regular flavours
  {
    title: "Vanilla Cake",
    price: "Rs 400",
    image: "/images/hero_paris_cake_1781078465181.webp",
    category: "Regular Flavours",
    description: "Simple vanilla sponge with a clean and classic design.",
    fullDescription:
      "A classic vanilla sponge layered with velvety vanilla fresh cream. Light, fluffy, and decorated elegantly.",
    ingredients: ["Vanilla extract", "Fresh cream", "Milk", "Butter", "Flour"],
    weight: "1 Pound",
    deliveryTime: "24 hours",
  },
  {
    title: "Butterscotch Cake",
    price: "Rs 500",
    image: "/images/cake_caramel_1781078507737.webp",
    category: "Regular Flavours",
    description: "Vanilla sponge with butterscotch chunks and gold caramel.",
    fullDescription:
      "Vanilla sponge cake loaded with crunchy butterscotch pieces and layered with homemade caramel sauce.",
    ingredients: [
      "Butterscotch nuts",
      "Caramel sauce",
      "Cream",
      "Butter",
      "Flour",
    ],
    weight: "1 Pound",
    deliveryTime: "24 hours",
  },
  {
    title: "Regular Chocolate Cake",
    price: "Rs 450",
    image: "/images/gallery_6_1781078622372.webp",
    category: "Regular Flavours",
    description: "Rich cocoa layers frosted with smooth chocolate cream.",
    fullDescription:
      "Deliciously soft chocolate sponge frosted with smooth milk chocolate cream. A crowd favorite.",
    ingredients: ["Cocoa powder", "Chocolate cream", "Milk", "Butter", "Flour"],
    weight: "1 Pound",
    deliveryTime: "24 hours",
  },
  {
    title: "Chocolate Truffle Cake",
    price: "Rs 550",
    image: "/images/cake_chocolate_1781078477202.webp",
    category: "Regular Flavours",
    description: "Dense chocolate sponge finished with a dark ganache glaze.",
    fullDescription:
      "Rich, dense chocolate cake layered with dark chocolate ganache and finished with a glossy glaze.",
    ingredients: [
      "Belgian chocolate",
      "Dark ganache",
      "Cocoa",
      "Butter",
      "Flour",
    ],
    weight: "1 Pound",
    deliveryTime: "24 hours",
  },
  {
    title: "Red Velvet Cake",
    price: "Rs 420",
    image: "/images/cake_red_velvet_1781078520528.webp",
    category: "Regular Flavours",
    description: "Soft velvet sponge with cream cheese layers and crumbs.",
    fullDescription:
      "Classic cocoa-infused red velvet sponge layered with smooth cream cheese frosting and red velvet crumbs.",
    ingredients: ["Cocoa", "Cream cheese", "Vanilla", "Buttermilk", "Flour"],
    weight: "1 Pound",
    deliveryTime: "24 hours",
  },
  {
    title: "White & Black Forest Cake",
    price: "Rs 400",
    image: "/images/cake_berry_1781078487770.webp",
    category: "Regular Flavours",
    description:
      "Creamy forest classic loaded with cherries and chocolate curls.",
    fullDescription:
      "A mixed forest cake combining layers of white vanilla and dark chocolate sponge, whipped cream, cherries, and chocolate shavings.",
    ingredients: [
      "Cherries",
      "Chocolate shavings",
      "Whipped cream",
      "Flour",
      "Sugar",
    ],
    weight: "1 Pound",
    deliveryTime: "24 hours",
  },
  {
    title: "Fresh Fruit Cake",
    price: "Rs 500",
    image: "/images/gallery_3_1781078577823.webp",
    category: "Regular Flavours",
    description:
      "Fresh fruit-topped whipped cream cake based on customer preferences.",
    fullDescription:
      "Seasonal fresh fruit pieces layered inside and outside with light whipped vanilla cream and soft sponge.",
    ingredients: [
      "Seasonal fruits",
      "Whipped cream",
      "Vanilla sponge",
      "Sugar",
    ],
    weight: "1 Pound",
    deliveryTime: "24 hours",
  },

  // Nutty flavours
  {
    title: "Almond Pistachio Cream Cake",
    price: "Rs 550",
    image: "/images/cake_pistachio.webp",
    category: "Nutty Flavours",
    description:
      "Light green cake coated with pistachio chunks and sliced almonds.",
    fullDescription:
      "An elegant nutty cake featuring pistachio cream layers, toasted slivered almonds, and crushed green pistachios.",
    ingredients: [
      "Pistachios",
      "Almonds",
      "Pistachio cream",
      "Flour",
      "Butter",
    ],
    weight: "1 Pound",
    deliveryTime: "24 hours",
  },
  {
    title: "Walnut Fudge Brownie Cake",
    price: "Rs 500",
    image: "/images/cake_walnut_brownie.webp",
    category: "Nutty Flavours",
    description: "Thick fudge brownie layers topped with toasted walnuts.",
    fullDescription:
      "Fudge chocolate brownie base layered with rich dark chocolate fudge frosting and loaded with toasted walnuts.",
    ingredients: ["Walnuts", "Fudge chocolate", "Cocoa", "Butter", "Flour"],
    weight: "1 Pound",
    deliveryTime: "24 hours",
  },
  {
    title: "Hazelnut Cream Cake",
    price: "Rs 520",
    image: "/images/cake_hazelnut.webp",
    category: "Nutty Flavours",
    description: "Hazelnut cream base with roasted hazelnut pieces on top.",
    fullDescription:
      "Rich hazelnut cream layered inside a moist sponge and topped with roasted hazelnut crumbs.",
    ingredients: ["Hazelnuts", "Hazelnut cream", "Milk", "Butter", "Flour"],
    weight: "1 Pound",
    deliveryTime: "24 hours",
  },
  {
    title: "Dryfruits Cream Cake",
    price: "Rs 650",
    image: "/images/cake_dryfruits.webp",
    category: "Nutty Flavours",
    description:
      "Loaded with saffron cream and crushed almonds, cashews, and pistachios.",
    fullDescription:
      "Traditional Indian dessert fusion cake with cardamon and saffron infused cream, topped with rich dried fruits.",
    ingredients: [
      "Almonds",
      "Cashews",
      "Pistachios",
      "Saffron",
      "Cardamom cream",
    ],
    weight: "1 Pound",
    deliveryTime: "24 hours",
  },

  // Cheesecakes
  {
    title: "New York Style Cheesecake",
    price: "Rs 750",
    image: "/images/cake_cheesecake_classic.webp",
    category: "Cheesecakes",
    description: "Traditional baked cream cheese on a crunchy graham crust.",
    fullDescription:
      "Rich, dense, and velvety baked cream cheese on a buttery graham cracker biscuit crust.",
    ingredients: ["Cream cheese", "Graham crackers", "Butter", "Sugar"],
    weight: "1 Pound",
    deliveryTime: "24 hours",
  },
  {
    title: "Biscoff Cheesecake",
    price: "Rs 800",
    image: "/images/cake_cheesecake_biscoff.webp",
    category: "Cheesecakes",
    description:
      "Baked cheesecake covered with speculoos Biscoff cookie spread.",
    fullDescription:
      "Baked cheesecake topped with a generous spread of melted Lotus Biscoff cookie butter and a Biscoff biscuit.",
    ingredients: [
      "Lotus Biscoff spread",
      "Biscoff biscuits",
      "Cream cheese",
      "Butter",
    ],
    weight: "1 Pound",
    deliveryTime: "24 hours",
  },
  {
    title: "Nutella Cheesecake",
    price: "Rs 800",
    image: "/images/cake_cheesecake_nutella.webp",
    category: "Cheesecakes",
    description:
      "Smooth cheesecake topped with a rich layer of Nutella spread.",
    fullDescription:
      "Creamy baked cheesecake covered with a thick, glossy layer of rich chocolate hazelnut Nutella spread.",
    ingredients: ["Nutella", "Cream cheese", "Biscuits", "Butter", "Hazelnuts"],
    weight: "1 Pound",
    deliveryTime: "24 hours",
  },
  {
    title: "Blueberry Cheesecake",
    price: "Rs 770",
    image: "/images/cake_cheesecake_blueberry.webp",
    category: "Cheesecakes",
    description:
      "Creamy cheesecake topped with a sweet, glossy blueberry compote.",
    fullDescription:
      "Classic baked cheesecake topped with a rich, glossy sweet blueberry compote flowing over the edges.",
    ingredients: ["Blueberries", "Cream cheese", "Biscuits", "Butter", "Sugar"],
    weight: "1 Pound",
    deliveryTime: "24 hours",
  },
  {
    title: "Strawberry Cheesecake",
    price: "Rs 770",
    image: "/images/cake_berry_1781078487770.webp",
    category: "Cheesecakes",
    description:
      "Creamy cheesecake topped with a sweet, glossy strawberry compote.",
    fullDescription:
      "Classic baked cheesecake topped with a rich, glossy sweet strawberry compote flowing over the edges.",
    ingredients: [
      "Strawberries",
      "Cream cheese",
      "Biscuits",
      "Butter",
      "Sugar",
    ],
    weight: "1 Pound",
    deliveryTime: "24 hours",
  },

  // Cookies
  {
    title: "Chocolate Cookies",
    price: "Rs 220",
    image: "/images/cookies_premium_1781081328320.webp",
    category: "Cookies",
    description: "Thick double-chocolate chip cookies baked with pure butter.",
    fullDescription:
      "Thick, chewy chocolate chip cookies loaded with dark chocolate chunks and baked using pure butter.",
    ingredients: ["Chocolate chips", "Butter", "Flour", "Sugar", "Vanilla"],
    weight: "250g box",
    deliveryTime: "Same day",
  },
  {
    title: "Hazelnut Nutella Cookies",
    price: "Rs 250",
    image: "/images/cookies_hazelnut_nutella.webp",
    category: "Cookies",
    description:
      "Golden cookies filled with Nutella and topped with chopped hazelnuts.",
    fullDescription:
      "Deliciously golden cookies filled with a molten Nutella center and topped with chopped hazelnuts.",
    ingredients: ["Nutella", "Hazelnuts", "Butter", "Flour", "Sugar"],
    weight: "250g box",
    deliveryTime: "Same day",
  },
  {
    title: "Biscoff Cookies",
    price: "Rs 250",
    image: "/images/cookies_biscoff.webp",
    category: "Cookies",
    description:
      "Chewy speculoos cookies infused with crunchy Lotus biscuit bits.",
    fullDescription:
      "Chewy cookie dough infused with Lotus Biscoff cookie butter spread and topped with crunchy biscuit pieces.",
    ingredients: [
      "Biscoff spread",
      "Biscoff biscuits",
      "Butter",
      "Flour",
      "Sugar",
    ],
    weight: "250g box",
    deliveryTime: "Same day",
  },
  {
    title: "Coconut Cookies",
    price: "Rs 220",
    image: "/images/cookies_premium_1781081328320.webp",
    category: "Cookies",
    description:
      "Toasted shredded coconut cookies baked golden with ghee/butter.",
    fullDescription:
      "Crispy toasted coconut cookies baked golden with premium ghee/butter and organic sugar.",
    ingredients: ["Shredded coconut", "Ghee/Butter", "Flour", "Sugar"],
    weight: "250g box",
    deliveryTime: "Same day",
  },
  {
    title: "Coffee Cookies",
    price: "Rs 220",
    image: "/images/cookies_premium_1781081328320.webp",
    category: "Cookies",
    description: "Infused with rich coffee grounds for an aromatic baked bite.",
    fullDescription:
      "Aromatically rich cookies infused with premium coffee espresso grounds and chocolate chips.",
    ingredients: [
      "Coffee grounds",
      "Chocolate chips",
      "Butter",
      "Flour",
      "Sugar",
    ],
    weight: "250g box",
    deliveryTime: "Same day",
  },
];

// Every product (featured + full range) with a stable URL slug.
// Dedup by slug so sitemap/params never emit a URL twice.
export const allProductsWithSlugs: ProductWithSlug[] = [
  ...[...featuredProducts, ...allProducts]
    .map((p) => ({
      ...p,
      slug: slugify(p.title),
      category: "category" in p ? (p as RangeItem).category : undefined,
    }))
    .filter((p, i, arr) => arr.findIndex((x) => x.slug === p.slug) === i),
];

export function productBySlug(slug: string): ProductWithSlug | undefined {
  return allProductsWithSlugs.find((p) => p.slug === slug);
}
