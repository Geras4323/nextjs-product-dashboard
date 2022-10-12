import React from 'react';
import axios from 'axios';
import Link from 'next/link';

import { PlusIcon } from '@heroicons/react/20/solid';
import { XCircleIcon } from '@heroicons/react/24/solid';

import Header from '../../components/Header';
import Modal from '../../common/Modal';
import FormProduct from '../../components/FormProducts';
import endpoints from '../../services/api/index';
import Alert from '../../common/Alert';
import { useAlert } from '../../hooks/useAlert';
import { deleteProduct } from '../../services/api/product';


export default function Products() {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [products, setProducts] = React.useState([]);

  const {
    alert,
    setAlert,
    toggleAlert
  } = useAlert()


  React.useEffect(() => {
    async function getProducts() {
      const response = await axios.get(endpoints.products.allProducts)
      setProducts(response.data)
    }
    try {
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }, [alert])


  function handleDelete(id) {
    deleteProduct(id)
      .then(() => {
        setAlert({
          active: true,
          message: 'Product deleted successfully',
          type: 'success',
          autoClose: true,
        })
      })
      .catch(error => {
        setAlert({
          active: true,
          message: error.message,
          type: 'error',
          autoClose: false,
        })
      })
  }


  return (
    <>
      <Header />

      <Alert alert={alert} handleClose={toggleAlert} />

      <div className="lg:flex lg:items-center lg:justify-between my-8">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            List of Products
          </h2>

        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">

          <span className="sm:ml-3">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => setIsModalOpen(true)}
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Add product
            </button>
          </span>

        </div>
      </div>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products?.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={product.images[0]} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.category.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-sm leading-5 font-semibold">
                          {`$ ${product.price}`}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`/dashboard/edit/${product.id}`}>
                          <a className="text-indigo-600 hover:text-indigo-900">
                            Edit
                          </a>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <XCircleIcon
                          className="flex-shrink-0 w-6 h-6 text-gray-400 cursor-pointer"
                          aria-hidden="true"
                          onClick={() => handleDelete(product.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Modal open={isModalOpen} setOpen={setIsModalOpen}>
        <FormProduct setOpen={setIsModalOpen} setAlert={setAlert}/>
      </Modal>
    </>
  );
}