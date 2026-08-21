export const DEMO_COUPONS = {
  SAVE10: {
    code: 'SAVE10',
    type: 'percentage',
    value: 10,
    description: '10% off your entire order',
  },
  FLAT500: {
    code: 'FLAT500',
    type: 'fixed',
    value: 500,
    description: '₹500 flat discount',
  },
  WELCOME15: {
    code: 'WELCOME15',
    type: 'percentage',
    value: 15,
    description: '15% welcome discount',
  },
};

export const TAX_RATE = 0.18; // 18% GST / luxury tax
export const FREE_SHIPPING_THRESHOLD = 2000;
export const STANDARD_SHIPPING_FEE = 99;

/**
 * Calculates the cart subtotal based on current item prices and quantities
 */
export function calculateSubtotal(items = []) {
  return items.reduce((sum, item) => {
    const price = item.product?.price ?? item.price ?? 0;
    const qty = item.quantity ?? 1;
    return sum + price * qty;
  }, 0);
}

/**
 * Calculates discount amount based on active coupon
 */
export function calculateDiscount(subtotal = 0, coupon = null) {
  if (!coupon || subtotal <= 0) return 0;
  if (coupon.type === 'percentage') {
    return Math.round((subtotal * coupon.value) / 100);
  }
  if (coupon.type === 'fixed') {
    return Math.min(coupon.value, subtotal);
  }
  return 0;
}

/**
 * Calculates shipping fee dynamically
 */
export function calculateShipping(subtotal = 0) {
  if (subtotal <= 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
}

/**
 * Calculates estimated taxes on taxable amount
 */
export function calculateTax(taxableAmount = 0, rate = TAX_RATE) {
  if (taxableAmount <= 0) return 0;
  return Math.round(taxableAmount * rate);
}

/**
 * Calculates final grand total
 */
export function calculateGrandTotal(subtotal = 0, discount = 0, shipping = 0, tax = 0) {
  return Math.max(0, subtotal - discount + shipping + tax);
}
