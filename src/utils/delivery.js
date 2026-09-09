/**
 * Centralized Delivery Utility for Jumbo Trades
 * Determines delivery estimates for the checkout flow.
 */

/**
 * Calculates the estimated delivery date range based on the current date.
 * Excludes weekends (Saturday, Sunday).
 * @param {number} minDays - Minimum business days for delivery
 * @param {number} maxDays - Maximum business days for delivery
 * @returns {Object} { minDate: Date, maxDate: Date }
 */
export const getDeliveryDateRange = (minDays = 3, maxDays = 5) => {
  const addBusinessDays = (date, daysToAdd) => {
    let current = new Date(date);
    let added = 0;
    while (added < daysToAdd) {
      current.setDate(current.getDate() + 1);
      // Skip weekends
      if (current.getDay() !== 0 && current.getDay() !== 6) {
        added++;
      }
    }
    return current;
  };

  const today = new Date();
  const minDate = addBusinessDays(today, minDays);
  const maxDate = addBusinessDays(today, maxDays);

  return { minDate, maxDate };
};

/**
 * Formats a given date to a readable string (e.g., "12 September")
 * @param {Date} date 
 * @returns {string}
 */
export const formatDeliveryDate = (date) => {
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long'
  });
};

/**
 * Returns a formatted string for the estimated delivery range.
 * @returns {string} e.g. "12 - 14 September" or "12 September - 14 September"
 */
export const calculateEstimatedDelivery = () => {
  const { minDate, maxDate } = getDeliveryDateRange();
  
  if (minDate.getMonth() === maxDate.getMonth()) {
    return `${minDate.getDate()} - ${formatDeliveryDate(maxDate)}`;
  } else {
    return `${formatDeliveryDate(minDate)} - ${formatDeliveryDate(maxDate)}`;
  }
};

/**
 * Returns the estimated delivery time window.
 * @returns {string}
 */
export const getDeliveryTimeWindow = () => {
  return "10:00 AM - 6:00 PM";
};
