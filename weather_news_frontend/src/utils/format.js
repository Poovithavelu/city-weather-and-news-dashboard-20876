 /**
  * Normalize a raw city input string to a neat query value.
  * Trims whitespace and collapses spaces and commas.
  * @param {string} input
  * @returns {string}
  */
 // PUBLIC_INTERFACE
 export function formatCityQuery(input) {
   if (!input || typeof input !== 'string') return '';
   const t = input.trim();
   if (!t) return '';
   // Collapse multiple spaces and tidy commas
   return t.replace(/\s*,\s*/g, ', ').replace(/\s+/g, ' ');
 }
