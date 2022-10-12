import React from 'react';
import axios from 'axios';
import FormProduct from '../../../components/FormProducts';

import { useRouter } from 'next/router';
import endpoints from '../../../services/api/index';


export default function Edit() {
  const [product, setProduct] = React.useState({})
  const [notFound, setNotFound] = React.useState(false)

  const router = useRouter();

  React.useEffect(() => {
    const { id } = router.query;
    if (!router.isReady) return;

    async function getProduct() {
      try {
        const response = await axios.get(endpoints.products.selectProduct(id));
        setProduct(response.data);
      } catch (error) {
        setNotFound(true);
      }
    };
    getProduct();
  }, [router?.isReady])


  return notFound
    ? <p>This product does not exist.</p>
    : <FormProduct product={product}/>
}