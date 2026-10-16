import { Product } from '../types';

export const CDN_BASE = 'https://north-2hugdavp.myshopify.com/cdn';

export const PRODUCTS: Product[] = [
  // TOPS
  {
    id: 'off-grid-heavyweight-zip-jacket',
    title: '“OFF GRID” HEAVYWEIGHT ZIP JACKET',
    collection: 'Field Systems - 001',
    price: 128.0,
    originalPrice: 145.0,
    description: 'Ultra-heavy 480 GSM French terry zipper jacket engineered with dropped shoulders, custom matte hardware, and contour topographic back embroidery.',
    details: [
      '480 GSM 100% heavyweight loopback cotton',
      'Double-wash vintage tint treatment',
      'Industrial metal two-way zipper',
      'Topographic contour spine embroidery',
      'Ribbed hem and cuffs with relaxed tailored silhouette'
    ],
    materials: '100% Combed Heavyweight Cotton. Made in Portugal. Cold wash only.',
    category: 'tops',
    overlayImage: `${CDN_BASE}/shop/files/model-base_50b6c21e-cd79-4985-89a7-e05d8be650f9.png`,
    images: [
      `${CDN_BASE}/shop/files/model-base_50b6c21e-cd79-4985-89a7-e05d8be650f9.png`,
      `${CDN_BASE}/shop/files/oversizedheavyweightzip-upjacket-5.png`,
      `${CDN_BASE}/shop/files/oversizedheavyweightzip-upjacket-2.png`
    ],
    colors: [
      { name: 'Washed Olive', value: 'washed-olive', swatchHex: '#5e6353', imageIndex: 0 },
      { name: 'Dark Navy', value: 'dark-navy', swatchHex: '#1e2430', imageIndex: 1 },
      { name: 'Charcoal Grey', value: 'charcoal-grey', swatchHex: '#383838', imageIndex: 2 }
    ],
    sizes: [
      { name: 'S', available: true },
      { name: 'M', available: true },
      { name: 'L', available: true },
      { name: 'XL', available: true }
    ],
    variants: [
      { id: 'v1-1', size: 'S', color: 'Washed Olive', available: true, price: 128 },
      { id: 'v1-2', size: 'M', color: 'Washed Olive', available: true, price: 128 },
      { id: 'v1-3', size: 'L', color: 'Washed Olive', available: true, price: 128 },
      { id: 'v1-4', size: 'XL', color: 'Washed Olive', available: true, price: 128 }
    ]
  },
  {
    id: 'no-direction-tee',
    title: 'No Direction Tee',
    collection: 'Graphic Series · FW 2025',
    price: 48.0,
    description: 'Signature oversized 280 GSM heavyweight cotton tee with faded washed dye and high-definition compass back graphics with NØRTH coordinates.',
    details: [
      '280 GSM premium single jersey',
      'Distressed mineral wash finish',
      'Cracked-ink compass screenprint on back',
      'Miniature tonal chest logo',
      'Reinforced crewneck collar that never stretches'
    ],
    materials: '100% Organic Carded Cotton. Preshrunk. Machine wash cold.',
    category: 'tops',
    overlayImage: `${CDN_BASE}/shop/files/No_Direction_Tee_from_Biborne_Design_System.png`,
    images: [
      `${CDN_BASE}/shop/files/No_Direction_Tee_from_Biborne_Design_System.png`,
      `${CDN_BASE}/shop/files/NoDirectionTee-1.png`,
      `${CDN_BASE}/shop/files/NoDirectionTee-3.png`,
      `${CDN_BASE}/shop/files/NoDirectionTee-4.png`
    ],
    colors: [
      { name: 'Faded Black', value: 'faded-black', swatchHex: '#222222', imageIndex: 0 },
      { name: 'Chalk', value: 'chalk', swatchHex: '#ece9e4', imageIndex: 1 },
      { name: 'Dark Navy', value: 'dark-navy', swatchHex: '#1b2230', imageIndex: 2 }
    ],
    sizes: [
      { name: 'M', available: true },
      { name: 'L', available: true },
      { name: 'XL', available: true },
      { name: '2XL', available: true }
    ],
    variants: [
      { id: 'v2-1', size: 'M', color: 'Faded Black', available: true, price: 48 },
      { id: 'v2-2', size: 'L', color: 'Faded Black', available: true, price: 48 },
      { id: 'v2-3', size: 'XL', color: 'Faded Black', available: true, price: 48 },
      { id: 'v2-4', size: '2XL', color: 'Faded Black', available: true, price: 48 }
    ]
  },
  {
    id: 'out-of-frame-long-sleeve',
    title: 'Out of Frame Long Sleeve',
    collection: 'Graphic Series · FW 2025',
    price: 58.0,
    description: 'Heavyweight long sleeve skate shirt featuring intricate esoteric tribal sleeve artwork and centered geometric vector compass glyph.',
    details: [
      '300 GSM heavyweight combed cotton',
      'Full sleeve geometric discharge print',
      'Acid washed vintage pigment treatment',
      'Heavy ribbed cuffs for stacked styling'
    ],
    materials: '100% Heavy Combed Cotton. Crafted for durability.',
    category: 'tops',
    overlayImage: `${CDN_BASE}/shop/files/sweet.png`,
    images: [
      `${CDN_BASE}/shop/files/sweet.png`,
      `${CDN_BASE}/shop/files/Out_of_Frame_Long_Sleeve.png`,
      `${CDN_BASE}/shop/files/OutofFrameLongSleeve.png`,
      `${CDN_BASE}/shop/files/Out_of_Frame_Long_Sleeve_1.png`,
      `${CDN_BASE}/shop/files/Out_of_Frame_Long_Sleeve_2_60d236f4-1f99-4342-b314-8efef5effc00.png`
    ],
    colors: [
      { name: 'Faded Black', value: 'faded-black', swatchHex: '#222222', imageIndex: 0 },
      { name: 'Chalk', value: 'chalk', swatchHex: '#ece9e4', imageIndex: 3 },
      { name: 'Washed Olive', value: 'washed-olive', swatchHex: '#5e6353', imageIndex: 4 }
    ],
    sizes: [
      { name: 'S', available: true },
      { name: 'M', available: true },
      { name: 'L', available: true },
      { name: 'XL', available: true }
    ],
    variants: [
      { id: 'v3-1', size: 'S', color: 'Faded Black', available: true, price: 58 },
      { id: 'v3-2', size: 'M', color: 'Faded Black', available: true, price: 58 },
      { id: 'v3-3', size: 'L', color: 'Faded Black', available: true, price: 58 },
      { id: 'v3-4', size: 'XL', color: 'Faded Black', available: true, price: 58 }
    ]
  },
  {
    id: 'north-origin-copy',
    title: 'Vector Origin Hoodie',
    collection: 'CORE ESSENTIAL',
    price: 129.0,
    description: 'Layered hooded sweatshirt with raw edge double-sleeve design, oversized kangaroo pouch, and subtle distress detailing throughout.',
    details: [
      '500 GSM custom brushed fleece interior',
      'Double-sleeve layered illusion effect',
      'Seamless hood with clean crossover neckline',
      'Hand-distressed hems and pockets'
    ],
    materials: '100% Heavyweight Cotton Fleece. Pigment washed.',
    category: 'tops',
    overlayImage: `${CDN_BASE}/shop/files/model-base-6.png`,
    images: [
      `${CDN_BASE}/shop/files/model-base-6.png`,
      `${CDN_BASE}/shop/files/image1201.png`,
      `${CDN_BASE}/shop/files/image1202.png`
    ],
    colors: [
      { name: 'Gray', value: 'gray', swatchHex: '#5c5c5c', imageIndex: 0 }
    ],
    sizes: [
      { name: 'S', available: true },
      { name: 'M', available: true },
      { name: 'L', available: true },
      { name: 'XL', available: true }
    ],
    variants: [
      { id: 'v4-1', size: 'M', color: 'Gray', available: true, price: 129 }
    ]
  },

  // BOTTOMS
  {
    id: 'static-wash-denim',
    title: 'Static Wash Denim',
    collection: 'Graphic Series · FW 2025',
    price: 89.0,
    description: '14oz Japanese-style wide leg baggy denim with custom static acid wash pattern, metal grommet belt loops, and tonal side glyph print.',
    details: [
      '14oz non-stretch rigid denim',
      'Wide-leg flared stacked cut',
      'Custom silver engraved hardware',
      'Distressed knee details'
    ],
    materials: '100% Heavy Denim Cotton.',
    category: 'bottoms',
    overlayImage: `${CDN_BASE}/shop/files/pant.png`,
    images: [
      `${CDN_BASE}/shop/files/pant.png`
    ],
    colors: [
      { name: 'Washed Grey', value: 'washed-grey', swatchHex: '#3d3d3d', imageIndex: 0 }
    ],
    sizes: [
      { name: 'S', available: true },
      { name: 'M', available: true },
      { name: 'L', available: true },
      { name: 'XL', available: true }
    ],
    variants: [
      { id: 'v5-1', size: 'M', color: 'Washed Grey', available: true, price: 89 }
    ]
  },
  {
    id: 'north-off-route-denim',
    title: 'North Off-Route Denim',
    collection: 'Horizontal Collection',
    price: 125.0,
    description: 'Heavyweight baggy gradient denim fading into deep black cuffs with screenprinted navigational coordinates: 51.5074° N, 0.1278° W.',
    details: [
      '14.5oz premium cotton denim',
      'Dip-dye gradient wash transition',
      'Navigational OFF-ROUTE leg typography',
      'Deep front and rear utility pockets'
    ],
    materials: '100% Rigid Denim.',
    category: 'bottoms',
    overlayImage: `${CDN_BASE}/shop/files/North_Off-Route_Denim.png`,
    images: [
      `${CDN_BASE}/shop/files/North_Off-Route_Denim.png`,
      `${CDN_BASE}/shop/files/NORTH_OFF-ROUTE_DENIM_2.png`,
      `${CDN_BASE}/shop/files/NORTH_OFF-ROUTE_DENIM_3.png`
    ],
    colors: [
      { name: 'Gradient Charcoal', value: 'gradient-charcoal', swatchHex: '#2b2c30', imageIndex: 0 }
    ],
    sizes: [
      { name: 'M', available: true },
      { name: 'L', available: true },
      { name: 'XL', available: true }
    ],
    variants: [
      { id: 'v6-1', size: 'M', color: 'Gradient Charcoal', available: true, price: 125 }
    ]
  },
  {
    id: 'north-topographic-sweatpant',
    title: 'North Topographic Sweatpant',
    collection: 'Graphic Series · FW 2025',
    price: 90.0,
    description: 'Relaxed wide leg fleece sweatpants with high-density all-over topographic contour line illustration, raw edge cuffs, and thick cotton drawstring.',
    details: [
      '460 GSM heavyweight fleece',
      'All-over white discharge topographic map print',
      'Deep side pockets with contrast white welt',
      'Heavy duty braided drawcord waistband'
    ],
    materials: '100% Cotton Fleece.',
    category: 'bottoms',
    overlayImage: `${CDN_BASE}/shop/files/model-base_3eda3415-afc2-47ca-8b20-7c4134d44e71.png`,
    images: [
      `${CDN_BASE}/shop/files/model-base_3eda3415-afc2-47ca-8b20-7c4134d44e71.png`
    ],
    colors: [
      { name: 'Black / Contour', value: 'black-contour', swatchHex: '#181818', imageIndex: 0 }
    ],
    sizes: [
      { name: 'S', available: true },
      { name: 'M', available: true },
      { name: 'L', available: true },
      { name: 'XL', available: true }
    ],
    variants: [
      { id: 'v7-1', size: 'M', color: 'Black / Contour', available: true, price: 90 }
    ]
  },
  {
    id: 'terrain-wash',
    title: 'Terrain Wash',
    collection: 'Field Systems - 001',
    price: 85.0,
    description: 'Heavyweight garment-dyed relaxed cargo pants engineered for unpredictable terrain and urban utility.',
    details: [
      '380 GSM enzyme-washed heavy twill',
      'Adjustable toggle cinch hem',
      'Articulated knee darts for mobility',
      'Concealed hip zipper pocket'
    ],
    materials: '100% Heavy Twill Cotton.',
    category: 'bottoms',
    images: [
      `${CDN_BASE}/shop/files/TerrainWash.png`,
      `${CDN_BASE}/shop/files/Terrain_Wash6.png`,
      `${CDN_BASE}/shop/files/Terrain_Wash3.png`,
      `${CDN_BASE}/shop/files/Terrain_Wash1.png`
    ],
    colors: [
      { name: 'Dust Grey', value: 'dust-grey', swatchHex: '#9c9b97', imageIndex: 0 },
      { name: 'Faded Black', value: 'faded-black', swatchHex: '#252525', imageIndex: 3 }
    ],
    sizes: [
      { name: 'M', available: true },
      { name: 'L', available: false },
      { name: 'XL', available: false }
    ],
    variants: [
      { id: 'v8-1', size: 'M', color: 'Dust Grey', available: true, price: 85 }
    ]
  },

  // EXTRA RECOMMENDED ITEMS (for cart recommendations & lookbook)
  {
    id: 'vibration-oversized-tee',
    title: 'Standard Crew Sweat',
    collection: 'CORE ESSENTIAL',
    price: 68.0,
    description: 'Heavyweight clean boxy sweatshirt with tonal ribbing and dropped shoulders.',
    details: ['420 GSM French terry', 'Pre-shrunk boxy cut', 'Tonal stitch details'],
    materials: '100% Cotton.',
    category: 'tops',
    images: [
      `${CDN_BASE}/shop/files/model-base_920d2c29-8e3a-4077-9b69-74243920c302.png`
    ],
    colors: [
      { name: 'Charcoal', value: 'charcoal', swatchHex: '#333333', imageIndex: 0 }
    ],
    sizes: [{ name: 'M', available: true }, { name: 'L', available: true }],
    variants: [{ id: 'v9-1', size: 'M', color: 'Charcoal', available: true, price: 68 }]
  },
  {
    id: 'vibration-oversized-tee-1',
    title: 'Vibration \' Oversized Tee',
    collection: 'Graphic Series · FW 2025',
    price: 39.0,
    description: 'Chalk white heavyweight tee with optical vibration distortion graphic.',
    details: ['260 GSM single jersey', 'Water-based soft touch print', 'Double needle hem'],
    materials: '100% Cotton.',
    category: 'tops',
    images: [
      `${CDN_BASE}/shop/files/vibration0.png`
    ],
    colors: [
      { name: 'Chalk', value: 'chalk', swatchHex: '#f0ece1', imageIndex: 0 }
    ],
    sizes: [{ name: 'M', available: true }, { name: 'L', available: true }, { name: 'XL', available: true }],
    variants: [{ id: 'v10-1', size: 'M', color: 'Chalk', available: true, price: 39 }]
  },
  {
    id: 'no-single-tee',
    title: 'No Single Tee',
    collection: 'Products',
    price: 55.0,
    description: 'Minimalist heavyweight washed tee with dropped shoulder and subtle chest mark.',
    details: ['280 GSM premium cotton', 'Relaxed fit', 'Cold garment wash'],
    materials: '100% Cotton.',
    category: 'tops',
    images: [
      `${CDN_BASE}/shop/files/model-base-5.png`
    ],
    colors: [
      { name: 'Washed Black', value: 'washed-black', swatchHex: '#252525', imageIndex: 0 }
    ],
    sizes: [{ name: 'S', available: true }, { name: 'M', available: true }, { name: 'L', available: true }],
    variants: [{ id: 'v11-1', size: 'M', color: 'Washed Black', available: true, price: 55 }]
  }
];

export const INSTAGRAM_POSTS = [
  { id: '1', img: `${CDN_BASE}/shop/files/image_1235.png`, alt: 'Somewhere North - Mountain Pass' },
  { id: '2', img: `${CDN_BASE}/shop/files/image_1233.png`, alt: 'NØRTH Collar Label 3 por MOROCCO' },
  { id: '3', img: `${CDN_BASE}/shop/files/image_1234.png`, alt: 'Film 35mm Contact Sheet Morocco 2025' },
  { id: '4', img: `${CDN_BASE}/shop/files/image_1218.png`, alt: '01:17 AM Still Moving North' },
  { id: '5', img: `${CDN_BASE}/shop/files/image_1232.png`, alt: 'Compass Graphic Tee - Highland View' },
  { id: '6', img: `${CDN_BASE}/shop/files/image_1219.png`, alt: 'NØRTH Washed Tee Front Detail' },
  { id: '7', img: `${CDN_BASE}/shop/files/image_1217.png`, alt: 'People Move Differently - Night Session' },
  { id: '8', img: `${CDN_BASE}/shop/files/image_1237.png`, alt: 'Studio Lookbook - Layered Hoodie & Baggy Denim' },
  { id: '9', img: `${CDN_BASE}/shop/files/image_1231.png`, alt: 'Same Sky. Different Places. 31°37\'N 8°01\'W' },
  { id: '10', img: `${CDN_BASE}/shop/files/image_1236.png`, alt: 'Topographic Archive Contour 001' }
];

export const ASSETS = {
  heroVideo: `${CDN_BASE}/shop/t/5/assets/hero-bg.webm`,
  modelBaseTops: `${CDN_BASE}/shop/files/model-base.png`,
  modelBaseBottoms: `${CDN_BASE}/shop/files/model-base_1.png`,
  jacketLeft: `${CDN_BASE}/shop/t/5/assets/left.png`,
  jacketRight: `${CDN_BASE}/shop/t/5/assets/right.png`,
  jacketInside: `${CDN_BASE}/shop/t/5/assets/inside.png`
};
