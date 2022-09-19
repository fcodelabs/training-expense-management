const formatToCurrency = (amount: number): string => {
  if (amount) {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }
  return "0.00";
};

export default formatToCurrency;
