import axios from 'axios';

export async function getPrices() {
  const res = await axios.get('https://api.raydium.io/coin/price') 
  return res.data as {[key: string]: number};
}
