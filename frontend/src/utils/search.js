import { CATEGORIES } from '../data/categories.js';

/**
 * Intelligent Multi-Field Product Search Algorithm for LAX360 PVT LTD
 * 
 * Performs case-insensitive, weighted search across:
 * 1. Exact/Partial Product Name (Highest weight)
 * 2. Brand name
 * 3. Tags & Keywords
 * 4. Category & Subcategory
 * 5. Material, Colors, Room Types, Skin Types, Forms, and Attributes
 * 6. Product Description
 * 
 * @param {Array} products - List of products to search within
 * @param {string} query - Raw search query from user
 * @returns {Array} Sorted list of matching products
 */
export const searchProducts = (products = [], query = '') => {
  if (!query || typeof query !== 'string' || !query.trim()) {
    return products;
  }

  const rawQuery = query.trim().toLowerCase();
  const queryTokens = rawQuery.split(/\s+/).filter(Boolean);

  const scored = [];

  for (const product of products) {
    let score = 0;
    const name = (product.name || '').toLowerCase();
    const brand = (product.brand || '').toLowerCase();
    const category = (product.category || '').toLowerCase();
    const categorySlug = (product.categorySlug || '').toLowerCase();
    const subcategory = (product.subcategory || '').toLowerCase();
    const description = (product.description || '').toLowerCase();
    const material = (product.material || '').toLowerCase();
    const fit = (product.fit || '').toLowerCase();
    const tags = Array.isArray(product.tags)
      ? product.tags.map((t) => String(t).toLowerCase())
      : [];
    const colors = Array.isArray(product.colors)
      ? product.colors.map((c) => String(c).toLowerCase())
      : [];
    const roomTypes = Array.isArray(product.roomTypes)
      ? product.roomTypes.map((r) => String(r).toLowerCase())
      : [];
    const skinTypes = Array.isArray(product.skinTypes)
      ? product.skinTypes.map((st) => String(st).toLowerCase())
      : [];
    const forms = Array.isArray(product.forms)
      ? product.forms.map((f) => String(f).toLowerCase())
      : [];

    // 1. Exact or starts-with in Product Name
    if (name === rawQuery) {
      score += 150;
    } else if (name.startsWith(rawQuery)) {
      score += 90;
    } else if (name.includes(rawQuery)) {
      score += 60;
    }

    // 2. Token matches in Product Name
    const allTokensInName = queryTokens.every((tok) => name.includes(tok));
    if (allTokensInName) {
      score += 45;
    } else {
      const matchedTokensCount = queryTokens.filter((tok) => name.includes(tok)).length;
      score += matchedTokensCount * 15;
    }

    // 3. Brand Matching
    if (brand === rawQuery) {
      score += 60;
    } else if (brand.includes(rawQuery)) {
      score += 35;
    }

    // 4. Tags & Keyword Matching
    for (const tag of tags) {
      if (tag === rawQuery) {
        score += 50;
      } else if (tag.startsWith(rawQuery)) {
        score += 35;
      } else if (tag.includes(rawQuery) || rawQuery.includes(tag)) {
        score += 25;
      } else {
        for (const tok of queryTokens) {
          if (tag.includes(tok) || tok.includes(tag)) {
            score += 12;
          }
        }
      }
    }

    // 5. Category & Subcategory Matching
    if (category === rawQuery || categorySlug === rawQuery) {
      score += 30;
    } else if (category.includes(rawQuery) || categorySlug.includes(rawQuery)) {
      score += 20;
    }
    if (subcategory.includes(rawQuery)) {
      score += 25;
    }

    // 6. Colors, Material & Attributes Matching (e.g. "black", "linen", "silk", "wood", "kids")
    for (const col of colors) {
      if (col.includes(rawQuery) || rawQuery.includes(col)) {
        score += 30;
      }
    }
    if (material.includes(rawQuery)) {
      score += 30;
    }
    if (fit.includes(rawQuery)) {
      score += 15;
    }
    for (const rt of roomTypes) {
      if (rt.includes(rawQuery)) score += 20;
    }
    for (const st of skinTypes) {
      if (st.includes(rawQuery)) score += 20;
    }
    for (const f of forms) {
      if (f.includes(rawQuery)) score += 20;
    }

    // 7. Description Matching
    if (description.includes(rawQuery)) {
      score += 15;
    } else {
      const descMatches = queryTokens.filter((tok) => description.includes(tok)).length;
      score += descMatches * 4;
    }

    if (score > 0) {
      scored.push({ product, score });
    }
  }

  // Sort descending by score, then by rating
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return (b.product.rating || 0) - (a.product.rating || 0);
  });

  return scored.map((item) => item.product);
};

/**
 * Matching Categories Search Utility
 */
export const searchCategories = (query = '', categories = CATEGORIES) => {
  if (!query || !query.trim()) return [];
  const clean = query.trim().toLowerCase();
  return categories
    .filter(
      (c) =>
        c.name.toLowerCase().includes(clean) ||
        c.slug.toLowerCase().includes(clean) ||
        clean.includes(c.slug.toLowerCase())
    )
    .slice(0, 2);
};
