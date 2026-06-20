import React, { useEffect } from 'react';

export const SEO: React.FC = () => {
  useEffect(() => {
    // 1. Set Title & Meta Description
    document.title = "Best Homemade Andhra Pickles Online | VANTILLU AVAKAYA RUCHULU";
    
    // Update or create meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Order authentic homemade Andhra pickles online. Freshly prepared Avakaya, Gongura, Tomato, Lemon, Garlic, Chicken, and Prawn Pickles delivered across India.');

    // 2. Open Graph Tags
    const ogTags = {
      'og:title': 'Best Homemade Andhra Pickles Online | VANTILLU AVAKAYA RUCHULU',
      'og:description': 'Order authentic homemade Andhra pickles online. Freshly prepared Avakaya, Gongura, Tomato, Lemon, Garlic, Chicken, and Prawn Pickles delivered across India.',
      'og:image': window.location.origin + '/logo.jpg',
      'og:type': 'website',
      'og:url': window.location.href,
      'og:site_name': 'Vantillu Avakaya Ruchulu'
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    // 3. Twitter Card Tags
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:title': 'Best Homemade Andhra Pickles Online | VANTILLU AVAKAYA RUCHULU',
      'twitter:description': 'Order authentic homemade Andhra pickles online. Freshly prepared Avakaya, Gongura, Tomato, Lemon, Garlic, Chicken, and Prawn Pickles delivered across India.',
      'twitter:image': window.location.origin + '/logo.jpg'
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    // 4. JSON-LD Schemas injection
    const schemas = [
      // Local Business Schema
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Vantillu Avakaya Ruchulu",
        "image": window.location.origin + "/logo.jpg",
        "@id": window.location.href,
        "url": window.location.href,
        "telephone": "+918886355125",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "67-9-3/2, Darsipeta-2, Patamata",
          "addressLocality": "Vijayawada",
          "addressRegion": "Andhra Pradesh",
          "postalCode": "520010",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 16.3067,
          "longitude": 80.4365
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "09:00",
          "closes": "19:00"
        }
      },
      // Food Product & Schema Catalog
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Vantillu Avakaya Ruchulu Pickles Menu",
        "numberOfItems": 7,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "FoodProduct",
              "name": "Andhra Avakaya Pickle",
              "image": window.location.origin + "/avakaya.png",
              "description": "Traditional Guntur sour mango pickle cured in cold-pressed sesame oil and handmade mustard mix.",
              "offers": {
                "@type": "Offer",
                "price": "299",
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock"
              }
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "FoodProduct",
              "name": "Tangy Gongura Pickle",
              "image": window.location.origin + "/gongura.png",
              "description": "Tangy sorrel leaves cooked with spices and garlic flakes.",
              "offers": {
                "@type": "Offer",
                "price": "279",
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock"
              }
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@type": "FoodProduct",
              "name": "Andhra Special Chicken Pickle",
              "image": window.location.origin + "/chicken_pickle.png",
              "description": "Fried boneless premium chicken cubes seasoned in traditional ginger-garlic pickle gravies.",
              "offers": {
                "@type": "Offer",
                "price": "399",
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock"
              }
            }
          }
        ]
      }
    ];

    // Inject schema scripts
    const scriptTags: HTMLScriptElement[] = [];
    schemas.forEach((schemaObj) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schemaObj);
      document.body.appendChild(script);
      scriptTags.push(script);
    });

    // Cleanup on unmount
    return () => {
      scriptTags.forEach((tag) => {
        if (document.body.contains(tag)) {
          document.body.removeChild(tag);
        }
      });
    };
  }, []);

  return null; // SEO is a head/script side-effect provider
};
