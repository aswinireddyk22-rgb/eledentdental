// SEO UTILITIES & STRUCTURED DATA MANAGER
// Handles dynamic document titles, meta descriptions, canonical URLs, Open Graph tags, and JSON-LD schemas

export function updatePageSEO({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  ogImage = 'https://eledenthospitals.com/wp-content/uploads/eledent-logo.png',
  breadcrumbs = [],
  article = null
}) {
  // Update document title
  if (title) {
    document.title = title;
  }

  // Helper to set or create meta tag
  const setMeta = (attr, key, content) => {
    if (!content) return;
    let tag = document.querySelector(`meta[${attr}="${key}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attr, key);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  // Standard Meta Tags
  if (description) setMeta('name', 'description', description);
  if (keywords) setMeta('name', 'keywords', Array.isArray(keywords) ? keywords.join(', ') : keywords);
  setMeta('name', 'robots', 'index, follow');

  // Open Graph / Social Tags
  if (title) setMeta('property', 'og:title', title);
  if (description) setMeta('property', 'og:description', description);
  if (canonical) setMeta('property', 'og:url', canonical);
  setMeta('property', 'og:type', ogType);
  if (ogImage) setMeta('property', 'og:image', ogImage);
  setMeta('property', 'og:site_name', 'Eledent Dental Hospital');

  // Twitter Card Tags
  setMeta('name', 'twitter:card', 'summary_large_image');
  if (title) setMeta('name', 'twitter:title', title);
  if (description) setMeta('name', 'twitter:description', description);
  if (ogImage) setMeta('name', 'twitter:image', ogImage);

  // Canonical Link Tag
  if (canonical) {
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonical);
  }

  // Remove existing dynamic JSON-LD tags
  const existingDynamicSchemas = document.querySelectorAll('script[data-dynamic-schema="true"]');
  existingDynamicSchemas.forEach(node => node.remove());

  // Inject LocalBusiness / Dentist Schema
  injectJsonLd({
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": "https://aswini.aswinireddykadapagunta.workers.dev/#dentist",
    "name": "Eledent Dental Hospital",
    "description": "Advanced dental hospital in Banjara Hills, Hyderabad providing specialist root canal treatment, dental implants, Invisalign, pediatric dentistry, and CEREC CAD/CAM digital restorations.",
    "telephone": "+917799619994",
    "email": "contact@eledenthospitals.com",
    "url": "https://aswini.aswinireddykadapagunta.workers.dev/",
    "priceRange": "₹300",
    "image": ogImage,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Raichandani Construction, Road No. 12, Sri Ram Nagar Colony",
      "addressLocality": "Banjara Hills, Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500034",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "17.4175",
      "longitude": "78.4385"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "09:30",
      "closes": "21:00"
    }
  });

  // Inject BreadcrumbList Schema
  if (breadcrumbs.length > 0) {
    injectJsonLd({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": crumb.name,
        "item": crumb.url
      }))
    });
  }

  // Inject Article / BlogPosting Schema if on article page
  if (article) {
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": article.canonical
      },
      "headline": article.title,
      "description": article.metaDescription || article.excerpt,
      "image": [article.featuredImage],
      "datePublished": article.publishedDate,
      "dateModified": article.modifiedDate,
      "author": {
        "@type": "Organization",
        "name": "Eledent Dental Hospital Editorial Team",
        "url": "https://aswini.aswinireddykadapagunta.workers.dev/"
      },
      "reviewedBy": {
        "@type": "Person",
        "name": article.reviewer.name,
        "jobTitle": article.reviewer.role,
        "worksFor": {
          "@type": "Dentist",
          "name": "Eledent Dental Hospital"
        }
      },
      "publisher": {
        "@type": "Organization",
        "name": "Eledent Dental Hospital",
        "logo": {
          "@type": "ImageObject",
          "url": "https://eledenthospitals.com/wp-content/uploads/eledent-logo.png"
        }
      }
    };
    injectJsonLd(articleSchema);

    // Inject FAQPage Schema if article has FAQs
    if (article.faqs && article.faqs.length > 0) {
      injectJsonLd({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": article.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      });
    }
  }
}

function injectJsonLd(schemaObj) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-dynamic-schema', 'true');
  script.textContent = JSON.stringify(schemaObj);
  document.head.appendChild(script);
}
