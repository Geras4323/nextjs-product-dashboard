import axios from 'axios';
import endpoints from '.';

async function addProduct(body) {
  const config = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    }
  };

  const response = await axios.post(endpoints.products.postProducts, body, config);
  return response.data;
}

export { addProduct };