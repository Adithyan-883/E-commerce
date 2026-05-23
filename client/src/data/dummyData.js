export const products = [
  {
    id: 'plain-banana-chips',
    title: 'Banana Chips',
    category: 'Snacks',
    price: 150,
    oldPrice: 200,
    image: '/images/Banana Chips 1.jpeg',
    images: ['/images/Banana Chips 1.jpeg', '/images/Banana Chips  2.jpeg', '/images/Banana Chips 3.jpeg'],
    description: 'Classic thin and crispy Kerala banana chips.',
    rating: 4.9,
    packs: [
      { label: '250g', save: 50, oldPrice: 200, price: 150 },
      { label: '500g', save: 120, oldPrice: 400, price: 280 },
      { label: '1kg', save: 300, oldPrice: 800, price: 500 },
    ]
  },
  {
    id: 'sharkara-varatti',
    title: 'Sharkara Varatti',
    category: 'Snacks',
    price: 9.50,
    image: '/images/Sharkara Varatti.jpeg',
    description: 'Thick cut banana pieces coated in jaggery and ginger.',
    rating: 4.8,
    packs: [
      { label: '250g', save: 50, oldPrice: 200, price: 150 },
      { label: '500g', save: 120, oldPrice: 400, price: 280 },
      { label: '1kg', save: 300, oldPrice: 800, price: 500 },
    ]
  },
  {
    id: 'jackfruit-chips',
    title: 'Jackfruit Chips',
    category: 'Snacks',
    price: 10.00,
    image: '/images/Jackfruit Chips.jpeg',
    description: 'Crispy and naturally sweet chips made from ripe jackfruit.',
    rating: 4.7,
    packs: [
      { label: '250g', save: 50, oldPrice: 200, price: 150 },
      { label: '500g', save: 120, oldPrice: 400, price: 280 },
      { label: '1kg', save: 300, oldPrice: 800, price: 500 },
    ]
  },
  {
    id: 'banana-chips',
    title: 'Spicy Banana Chips',
    category: 'Snacks',
    price: 8.99,
    image: '/images/Spicy Banana Chips.jpeg',
    description: 'Crunchy Kerala banana chips with a touch of chili and turmeric.',
    rating: 4.8,
    packs: [
      { label: '250g', save: 50, oldPrice: 200, price: 150 },
      { label: '500g', save: 120, oldPrice: 400, price: 280 },
      { label: '1kg', save: 300, oldPrice: 800, price: 500 },
    ]
  },
  {
    id: 'tapioca-chips',
    title: 'Crispy Tapioca Chips',
    category: 'Snacks',
    price: 6.5,
    image: '/images/Tapioca Chips.jpeg',
    description: 'Thinly sliced and perfectly fried kappa (tapioca) chips seasoned with salt.',
    rating: 4.7,
    packs: [
      { label: '250g', save: 50, oldPrice: 200, price: 150 },
      { label: '500g', save: 120, oldPrice: 400, price: 280 },
      { label: '1kg', save: 300, oldPrice: 800, price: 500 },
    ]
  },
  {
    id: 'Combo',
    title: 'KERALA CHIPS COMBO - BANANA, JACKFRUIT & TAPIOCA',
    category: 'Snacks',
    price: 599,
    oldPrice: 1400,
    image: '/images/Combo 4.jpeg',
    description: 'A classic Kerala snack trio featuring crispy banana chips, naturally sweet jackfruit chips, and crunchy tapioca chips, all fried in pure coconut oil. Made using traditional methods and simple ingredients, this preservative-free combo delivers a perfect mix of flavors and textures in every bite.',
    rating: 4.7,
    packs: [
      { label: '120g + 180g + 100g', save: 801, oldPrice: 1400, price: 599 },
      { label: '300g + 400g + 200g', save: 51, oldPrice: 950, price: 899 },
      { label: '600g + 400g + 400g', save: 401, oldPrice: 1400, price: 999 },
    ]
  },
]

export const categories = [
  {
    id: 'snacks',
    title: 'Snacks',
    description: 'Savory treats made from traditional recipes.',
    image: '/images/Banana Chips 1.jpeg',
  },
]

export const testimonials = [
  {
    id: 'testimonial-1',
    name: 'Amala Nair',
    role: 'Home Chef',
    quote: 'The Royal Bakery brings spices and warmth directly into my kitchen. Every order feels luxurious.',
  },
  {
    id: 'testimonial-2',
    name: 'Ravi Menon',
    role: 'Cafe Owner',
    quote: 'The tea blends are wonderfully balanced and full of aroma. The packaging feels premium and beautiful.',
  },
  {
    id: 'testimonial-3',
    name: 'Priya Haridas',
    role: 'Food Blogger',
    quote: 'This site has a rich Kerala personality, with elegant colors and smooth experience from browsing to checkout.',
  },
]
