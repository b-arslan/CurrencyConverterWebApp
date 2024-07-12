import axios from 'axios';

const API_KEY = 'fca_live_RLe9HgQ4euNW9MK0EvzMsie1PPA1NoaAjy2WKALZ';

interface CurrencyRate {
  value: string;
  label: string;
  rate: number;
}

export const fetchCurrencies = async (): Promise<CurrencyRate[]> => {
  try {
    const response = await axios.get('https://api.freecurrencyapi.com/v1/latest', {
      headers: {
        'apikey': API_KEY
      }
    });
    const rates = response.data.data;
    
    return Object.keys(rates).map((currency: string) => ({
      value: currency,
      label: currency,
      rate: rates[currency],
    }));
  } catch (error) {
    console.error('Error fetching currency rates:', error);
    return [];
  }
};
