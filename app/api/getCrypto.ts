import axios from 'axios';

export interface CryptoRate {
  value: string;
  label: string;
  rate: number;
}

export const fetchCrypto = async (): Promise<CryptoRate[]> => {
  try {
    const response = await axios.get('https://api.binance.com/api/v3/ticker/price');
    const data = response.data;
    
    return data
      .filter((crypto: { symbol: string }) => crypto.symbol.endsWith('USDT'))
      .map((crypto: { symbol: string; price: string }) => ({
        value: crypto.symbol,
        label: crypto.symbol,
        rate: parseFloat(crypto.price),
      }));
  } catch (error) {
    console.error('Error fetching crypto rates:', error);
    return [];
  }
};