import React, { useState } from 'react';

const gearData = [
  {
    category: "Helmets",
    categoryImage: "data:image/jpeg;base64,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", // Specific image for helmets
    brands: [
      { name: "LS2", url: "https://ls2helmets.com/in/", logo: "https://ls2helmets.com/images/LS2-logo.svg?v=1" },
      { name: "MT Helmets", url: "https://mthelmets.com/en/", logo: "https://mthelmets.com/cdn/shop/files/Recurso_1.svg?v=1760004131&width=90" },
      { name: "AGV", url: "https://www.agv.com/", logo: "https://www.agv.com/on/demandware.static/Sites-agv-row-Site/-/default/dw375ee20e/images/logo.svg" },
      { name: "Shoei", url: "https://www.shoei-helmets.com/", logo: "https://d1o0i0v5q5lp8h.cloudfront.net/helmet/live/assets/shoei/24-01-09_shoei_logo_white.png" },
      { name: "HJC", url: "https://hjchelmets.com/", logo: "https://www.hjchelmets.com/wp-content/uploads/2019/04/hjc-logo2.png" },
      { name: "Arai", url: "https://www.araihelmet.eu/en", logo: "https://www.araihelmet.eu/img/arai-logo.png" },
    ]
  },
  {
    category: "Jackets",
    categoryImage: "data:image/jpeg;base64,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", // Specific image for jackets
    brands: [
      { name: "Rynox", url: "https://rynoxgears.com/", logo: "https://rynoxgear.com/cdn/shop/files/website_2.0_header_logo-01-01_83688c85-48c2-47f0-a708-acb6e5cc1f54_400x.png?v=1622184816" },
      { name: "Alpinestars", url: "https://www.alpinestars.com/", logo: "https://www.alpinestars.com/cdn/shop/files/logo1_white__cut2.png?v=1713437455&width=80" },
      { name: "Dainese", url: "https://www.dainese.com/", logo: "https://www.dainese.com/on/demandware.static/Sites-dainese-row-Site/-/default/dw599ae185/images/logo.svg" },
      { name: "REV'IT!", url: "https://www.revitsport.com/en/", logo: "https://revitsport.com/cdn/shop/files/Revit_Logo_Zwart.svg?v=1722445022&width=260" },
      { name: "Viaterra", url: "https://viaterragear.com/?srsltid=AfmBOoqrEHEjEbl_tEambKjIbpn5bcxsEiyBM2oda5TY7yhxv8bI3e1-", logo: "https://viaterragear.com/cdn/shop/files/logo_210x.png?v=1661780083" },
    ]
  },
  {
    category: "Gloves",
    categoryImage: "https://viaterragear.com/cdn/shop/files/Meets_CE_Level_1_exceeds_Level_2_for_01_1024x1024.webp?v=1727589627", // Specific image for gloves
    brands: [
      { name: "Rynox", url: "https://rynoxgears.com/", logo: "https://rynoxgear.com/cdn/shop/files/website_2.0_header_logo-01-01_83688c85-48c2-47f0-a708-acb6e5cc1f54_400x.png?v=1622184816" },
      { name: "Alpinestars", url: "https://www.alpinestars.com/", logo: "https://www.alpinestars.com/cdn/shop/files/logo1_white__cut2.png?v=1713437455&width=80" },
      { name: "Dainese", url: "https://www.dainese.com/", logo: "https://www.dainese.com/on/demandware.static/Sites-dainese-row-Site/-/default/dw599ae185/images/logo.svg" },
      { name: "Viaterra", url: "https://viaterragear.com/?srsltid=AfmBOoqrEHEjEbl_tEambKjIbpn5bcxsEiyBM2oda5TY7yhxv8bI3e1-", logo: "https://viaterragear.com/cdn/shop/files/logo_210x.png?v=1661780083" },

    ]
  },
  {
    category: "Boots",
    categoryImage: "https://www.tcxboots.com/on/demandware.static/-/Sites-tcx-storefront-catalog/default/dw07ca08d8/categories/tcx_racing_1080x1080.jpg", // Specific image for boots
    brands: [
      { name: "TCX", url: "https://www.tcxboots.com/en/", logo: "https://www.tcxboots.com/on/demandware.static/Sites-tcx-row-Site/-/default/dw490c340c/images/logo.svg" },
      { name: "Alpinestars", url: "https://www.alpinestars.com/", logo: "https://www.alpinestars.com/cdn/shop/files/logo1_white__cut2.png?v=1713437455&width=80" },
      { name: "Sidi", url: "https://www.sidi.com/en/", logo: "https://sidi.com/cdn/shop/files/e11b59d0-33d9-4a37-a24d-65da18a4e944.png?v=1751026015&width=110" },
      { name: "Forma", url: "https://www.formaboots.com/", logo: "https://www.formaboots.com/wp-content/uploads/2024/03/forma-boots-logo-2.png" },
      { name: "Clan", url: "https://clanshoes.com/?srsltid=AfmBOopufDn-K73-6gGpnmUZFkoHjV3-9_KaBPLuOQT4nSIPX3NjCKtt", logo: "https://clanshoes.com/cdn/shop/files/Clan_Bold_Logo_White.svg?v=1736401033&width=220" },

    ]
  },
  {
    category: "Kneeguards & Pants",
    categoryImage: "https://cdn.shopify.com/s/files/1/1947/9551/t/7/assets/acf.Bastion-Bionic-Knee-Guards-Hard-Shell-Slider.jpg?v=1629802026", // Specific image for kneeguards/pants
    brands: [
      { name: "Rynox", url: "https://rynoxgears.com/", logo: "https://rynoxgear.com/cdn/shop/files/website_2.0_header_logo-01-01_83688c85-48c2-47f0-a708-acb6e5cc1f54_400x.png?v=1622184816" },
      { name: "Alpinestars", url: "https://www.alpinestars.com/", logo: "https://www.alpinestars.com/cdn/shop/files/logo1_white__cut2.png?v=1713437455&width=80" },
      { name: "Dainese", url: "https://www.dainese.com/", logo: "https://www.dainese.com/on/demandware.static/Sites-dainese-row-Site/-/default/dw599ae185/images/logo.svg" },
    ]
  },
  {
    category: "Rainwear",
    categoryImage: "https://cdn.shopify.com/s/files/1/1947/9551/t/7/assets/acf.Made-for-motercycling.jpg?v=1688722663", // Specific image for rainwear
    brands: [
      { name: "Rynox", url: "https://rynoxgears.com/", logo: "https://rynoxgear.com/cdn/shop/files/website_2.0_header_logo-01-01_83688c85-48c2-47f0-a708-acb6e5cc1f54_400x.png?v=1622184816" },
      { name: "Zeel", url: "https://zeelretail.com/", logo: "https://zeelretail.com/cdn/shop/files/ZEEL_LOGO_BLACK_-_512_x_128_512bce9b-a960-4c23-a191-f36eac6d85bf_200x.png?v=1710831502" },
    ]
  }
];

const bikeData = [
  { 
    brandName: "KTM",
    brandUrl: "https://www.ktm.com/en-in.html",
    brandLogo: "https://cdn.bajajauto.com/-/media/images/ktm-logo-webp.webp",
    popularBikes: [
      { name: "Duke 390", url: "https://www.ktmindia.com/ktm-bikes/naked-bike/ktm-390-duke", image: "https://www.ktmindia.com/-/media/images/ktm/ktm-bikes/naked-bike/ktm-390-duke/website/product-page/ktm_390_duke_new_banner_website-adapts_1440-x-559.webp" },
      { name: "RC 390", url: "https://www.ktmindia.com/ktm-bikes/supersport/ktm-rc-390", image: "https://www.ktmindia.com/-/media/ktm/ktm-bikes-webp/ktm-im-webp/ktm-img-webp/390_banner_w.webp" },
      { name: "390 Adventure", url: "https://www.ktmindia.com/ktm-bikes/travel/ktm-390-adventure", image: "https://www.ktmindia.com/-/media/images/ktm/ktm-bikes/travel/2025-ktm-390-adv/spotlights/ktm-390-adventure_desktop-banner_1440x559_1.webp" },
      { name: "Duke 250", url: "https://www.ktmindia.com/ktm-bikes/naked-bike/ktm-250-duke", image: "https://www.ktmindia.com/-/media/images/ktm/ktm-bikes/naked-bike/ktm-gen-250-duke-2024/250-duke-new/banner/250web.webp" },
      { name: "250 Adventure", url: "https://www.ktmindia.com/ktm-bikes/travel/ktm-250-adventure", image: "https://www.ktmindia.com/-/media/images/ktm/ktm-bikes/travel/2025-ktm-250-adv/spotlights/ktm-250-adventure_product-page_desktop-banner_1440x559_1.webp" },
      { name: "Duke 200", url: "https://www.ktmindia.com/ktm-bikes/naked-bike/ktm-200-duke", image: "https://www.ktmindia.com/-/media/images/ktm/ktm-bikes/naked-bike/ktm-200-duke-2024/200-duke-new/banner/200-duke-web.webp" },
      { name: "RC 200", url: "https://www.ktmindia.com/ktm-bikes/supersport/ktm-rc-200", image: "https://www.ktmindia.com/-/media/ktm/ktm-bikes-webp/ktm-im-webp/ktm-img-webp/200_banner_w.webp" },
      { name: "Duke 160", url: "https://www.ktmindia.com/ktm-bikes/naked-bike/ktm-160-duke", image: "https://www.ktmindia.com/-/media/images/ktm/ktm-bikes/naked-bike/ktm-160-duke/pdp/banner/ktm_160-duke_product-page_desktop_1440x559_2.webp" },

    ]
  },
  { 
    brandName: "Royal Enfield",
    brandUrl: "https://www.royalenfield.com/in/en/home/",
    brandLogo: "https://www.royalenfield.com/content/dam/RE-Platform-Revamp/re-revamp-commons/logo.webp",
    popularBikes: [
      { name: "Classic 350", url: "https://www.royalenfield.com/in/en/motorcycles/classic-350/", image: "https://www.royalenfield.com/content/dam/royal-enfield/motorcycles/new-classic-350/configure-now.png" },
      { name: "Himalayan", url: "https://www.royalenfield.com/in/en/motorcycles/new-himalayan/", image: "https://www.royalenfield.com/content/dam/royal-enfield/motorcycles/himalayan/gallery/webp/thumbnail/gallery-1.webp" },
      { name: "Interceptor 650", url: "https://www.royalenfield.com/in/en/motorcycles/interceptor/", image: "https://www.royalenfield.com/content/dam/royal-enfield/motorcycles/interceptor/banner/new/desktop/interceptor-650-motorcycle.jpg" },
    ]
  },
  { 
    brandName: "Triumph",
    brandUrl: "https://www.triumphmotorcycles.in/",
    brandLogo: "https://media.triumphmotorcycles.co.uk/image/upload/f_auto/q_auto:eco/sitecoremedialibrary/media-library/misc/misc-images/logo.svg?la=en-IN&hash=E17E2246CD7E080DCAEAF7230C22FFDD0E46356B",
    popularBikes: [
      { name: "Speed 400", url: "https://www.triumphmotorcycles.in/motorcycles/classic/speed-400/speed-400-2025", image: "https://media.triumphmotorcycles.co.uk/image/upload/f_auto/q_auto:eco/sitecoremedialibrary/media-library/images/motorcycles/modern-classics/t%20series/speed%20400/speed%20400%20family%20page/speed-400-my24-family-accessories-card-500x500.jpg" },
      { name: "Street Triple R", url: "https://www.triumphmotorcycles.in/motorcycles/roadsters/street-triple-765/street-triple-765-r-2023", image: "https://media.triumphmotorcycles.co.uk/image/upload/f_auto/q_auto:eco/sitecoremedialibrary/media-library/images/motorcycles/street%20triple%20765%20r%202025/street-triple-765-r-my25-04-1920x1080.jpg" },
      { name: "Tiger 900", url: "https://www.triumphmotorcycles.in/motorcycles/adventure/tiger-900/tiger-900-gt-2024", image: "https://media.triumphmotorcycles.co.uk/image/upload/f_auto/q_auto:eco/sitecoremedialibrary/media-library/images/motorcycles/adventure-touring/my24/tiger%20900%202024/family%20page/tiger-900-accessories-1340x893.jpg" },
    ]
  },
  { 
    brandName: "Ducati",
    brandUrl: "https://www.ducati.com/in/en/home",
    brandLogo: "https://assets.prd.site.awsducati.com/dist/0.37.1/assets/img/ducati_id.png",
    popularBikes: [
      { name: "Panigale V4", url: "https://www.ducati.com/in/en/bikes/panigale/panigale-v4", image: "https://images.ctfassets.net/x7j9qwvpvr5s/2kT0kWOWmAsCzRornEwfuJ/a7873eae139508dda9509397dac72c82/Ducati-MY25-Panigale-V4-overview-hero-1600x1000.01.jpg" },
      { name: "Monster", url: "https://www.ducati.com/in/en/bikes/monster/monster-937", image: "https://images.ctfassets.net/x7j9qwvpvr5s/7bmD3hgfGpxgavOjCRGOmk/877041060db50fdf5e43ae60ef1e0850/2025-04-18_Monster-hero-1600x1000.jpg" },
      { name: "Multistrada V4", url: "https://www.ducati.com/in/en/bikes/multistrada/multistrada-v4-2025", image: "https://images.ctfassets.net/x7j9qwvpvr5s/7qH7t2TShAqd8SEs64dCCF/cb1cc3ccfce6327ddf34b6f06e237b0e/Ducati-MY25-Multistrada-V4-overview-carousel-hero-link-1600x650-01.jpg" },
    ]
  },
  {
    brandName: "Yamaha",
    brandUrl: "https://www.yamaha-motor-india.com/",
    brandLogo: "https://www.yamaha-motor-india.com/theme/v4/images/yamaha_logo-black.webp?v=5",
    popularBikes: [
      { name: "R15 V4", url: "https://www.yamaha-motor-india.com/yamaha-r15v4.html", image: "https://www.yamaha-motor-india.com/theme/v4/images/webp_images/r_series_all/r15v4/r15v4-pc.webp?v=50" },
      { name: "MT-15 V2", url: "https://www.yamaha-motor-india.com/yamaha-mt-15-v2.html", image: "https://www.yamaha-motor-india.com/theme/v4/images/webp_images/mt_series/mt15v2/gallery/silver_cyan.webp" },
      { name: "FZS-FI V4", url: "https://www.yamaha-motor-india.com/yamaha-fzs-fi-v4-new.html", image: "https://www.yamaha-motor-india.com/theme/v4/images/webp_images/fz_series_all/fzs-fi-v4-std/fzs-fi-v4-std-pc.webp?v=15" },
    ]
  },
  {
    brandName: "Kawasaki",
    brandUrl: "httpsD://www.kawasaki-india.com/",
    brandLogo: "https://www.kawasaki-india.com/en/_jcr_content/root/header/logo.coreimg.png/1721042064437/new-vi-logo.png",
    popularBikes: [
      { name: "Ninja 300", url: "https://www.kawasaki-india.com/en/motorcycles/ninja/Ninja-300-2025.html", image: "https://www.kawasaki-india.com/content/dam/products/pim/studio/Resource_320568_25EX300G_395GN1DRFIND.jpg/_jcr_content/renditions/cq5dam.thumbnail.600.600.png" },
      { name: "Z900", url: "https://www.kawasaki-india.com/en/motorcycles/z/Z900-2025.html", image: "https://www.kawasaki-india.com/content/dam/products/pim/gallery/Resource_317544_25ZR900S_40SGN1ALFA2CG_A.jpg/jcr:content/renditions/cq5dam.web.1280.1280.png" },
      { name: "Versys 650", url: "https://www.kawasaki-india.com/en/motorcycles/versys/versys-650-2025.html", image: "https://www.kawasaki-india.com/content/dam/products/pim/gallery/Resource_316012_25KLE650J_44SGY1IRF2CG_C.jpg/jcr:content/renditions/cq5dam.web.1280.1280.png" },
    ]
  },
  
];


function BrandCard({ name, url, logo }) {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      style={{
        textDecoration: 'none',
        color: '#cbd5e1',
        background: '#0f1724',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '120px' 
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.4)";
      }}
    >
      <img 
        src={logo} 
        alt={`${name} logo`}
        style={{ height: '40px', maxWidth: '100%', objectFit: 'contain', marginBottom: '15px' }}
        onError={(e) => { e.currentTarget.src = `https://placehold.co/100x40/334155/f59e0b?text=${name.split(' ')[0]}`; e.currentTarget.alt = `${name} logo fallback`; }}
      />
      <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem' }}>{name}</p>
    </a>
  );
}

function BikeCard({ name, url, image }) {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      style={{
        textDecoration: 'none',
        color: '#cbd5e1',
        background: '#1e293b', 
        borderRadius: '8px',
        padding: '15px',
        textAlign: 'center',
        transition: 'background 0.2s ease, transform 0.2s ease',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#334155";
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#1e293b";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <img
        src={image}
        alt={name}
        style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' }}
        onError={(e) => { e.currentTarget.src = `https://placehold.co/200x100/334155/f59e0b?text=${name}`; e.currentTarget.alt = `${name} image fallback`; }}
      />
      <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.95rem' }}>{name}</p>
    </a>
  );
}

export default function Wiki() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGearData = gearData.map(section => ({
    ...section,
    brands: section.brands.filter(brand =>
      brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.brands.length > 0);

  const filteredBikeData = bikeData.map(brand => ({
    ...brand,
    popularBikes: brand.popularBikes.filter(bike =>
      bike.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(brand => 
    brand.brandName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    brand.popularBikes.length > 0
  );

  return (
    <section style={{ padding: "100px 24px 80px", background: "#070816", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        
        {/* Title */}
        <h1 style={{ fontFamily: "Orbitron, sans-serif", color: "#f06a10ff", marginBottom: '40px' }}>
          Riders' Wiki: Gear & Rides
        </h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search gear or bike brands/models..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 15px',
            marginBottom: '40px',
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '8px',
            color: 'white',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '1rem',
            outline: 'none',
          }}
        />

        {/* --- Section 1: Riding Gear --- */}
        <h2 style={{ fontFamily: "Orbitron, sans-serif", color: "#ee6414ff", marginBottom: '20px', borderBottom: '2px solid #334155', paddingBottom: '10px' }}>
          Riding Gear Essentials
        </h2>
        
        {filteredGearData.length === 0 && <p style={{color: '#cbd5e1', marginBottom: '40px'}}>No matching gear found.</p>}
        {filteredGearData.map((section) => (
          <div key={section.category} style={{ marginBottom: '40px', background: '#0f1724', borderRadius: '12px', padding: '25px' }}>
            <h3 style={{ 
              color: 'white', 
              fontFamily: 'Poppins, sans-serif', 
              marginBottom: '20px', 
              fontSize: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <img src={section.categoryImage} alt={section.category} style={{ height: '50px', objectFit: 'contain', borderRadius: '8px' }} onError={(e) => e.currentTarget.style.display='none'} />
              {section.category}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '20px' }}>
              {section.brands.map((brand) => (
                <BrandCard key={brand.name} {...brand} />
              ))}
            </div>
          </div>
        ))}

        {/* --- Section 2: Trusted Bike Brands --- */}
        <h2 style={{ fontFamily: "Orbitron, sans-serif", color: "#fbbf24", marginBottom: '20px', marginTop: '60px', borderBottom: '2px solid #334155', paddingBottom: '10px' }}>
          Trusted Bike Brands
        </h2>

        {filteredBikeData.length === 0 && <p style={{color: '#cbd5e1', marginBottom: '40px'}}>No matching bike brands or models found.</p>}
        {filteredBikeData.map((brand) => (
          <div key={brand.brandName} style={{ background: '#0f1724', borderRadius: '12px', padding: '25px', marginBottom: '30px' }}>
            {/* Brand Header */}
            <a href={brand.brandUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <h3 style={{ color: 'white', fontFamily: 'Orbitron, sans-serif', fontSize: '1.8rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px', transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#f59e0b"}
                onMouseLeave={(e) => e.currentTarget.style.color = "white"}
              >
                <img 
                  src={brand.brandLogo} 
                  alt={`${brand.brandName} logo`}
                  style={{ height: '40px', objectFit: 'contain' }}
                  onError={(e) => { e.currentTarget.src = `https://placehold.co/100x40/334155/f59e0b?text=${brand.brandName.split(' ')[0]}`; e.currentTarget.alt = `${brand.brandName} logo fallback`; }}
                />
                {brand.brandName}
              </h3>
            </a>

            {/* Popular Bikes Grid */}
            <h4 style={{ color: '#9ca3af', fontFamily: 'Poppins, sans-serif', marginBottom: '15px', fontWeight: 400 }}>
              Popular Models:
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
              {brand.popularBikes.map((bike) => (
                <BikeCard key={bike.name} {...bike} />
              ))}
            </div>
          </div>
        ))}
        
      </div>
    </section>
  );
}