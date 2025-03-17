// helper function to convert rating into needed format
export const fixRatingValue = (rating) => {
  //converts from string to number
  const numericRating = parseFloat(rating);

  // gets first and second parts of rating
  const integerPart = Math.floor(numericRating);
  const decimalPart = numericRating - integerPart;

  if (decimalPart >= 0.75) return integerPart + 1;
  if (decimalPart >= 0.35 && decimalPart < 0.75) return integerPart + 0.5;
  return integerPart;
};
