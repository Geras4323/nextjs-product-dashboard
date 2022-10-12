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

async function deleteProduct(id) {
  const response = await axios.delete(endpoints.products.selectProduct(id));
  return response.data;
}

export { addProduct, deleteProduct };