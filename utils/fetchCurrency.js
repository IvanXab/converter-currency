import axios from "axios";

export const getConvertedCurrency = async (from, to, amount) => {
  const response = await axios.get('https://api.exchangerate.host/convert', {
    params: {
      from,
      to,
      amount,
    }
  });

  return response.data.result;
};

export const getCurrencyLatest = async () => {
  const response = await axios.get('https://api.exchangerate.host/latest?base=USD');
  const date = new Date(response.data.date) ;

  return {
    currentDate: date.toDateString(),
    rates: Object.entries(response.data.rates)
  };
};

export const getCurrencyCode = async () => {
  const response = await axios.get('https://api.exchangerate.host/latest');

  return Object.keys(response.data.rates);
};
