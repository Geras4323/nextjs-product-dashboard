import React from 'react';

import endpoints from '../../services/api/index'
import { useFetch } from '../../hooks/useFetch';

import { Pagination } from '../../components/Pagination';
import { Chart } from '../../common/Chart';

const PRODUCTS_LIMIT = 5;
const PRODUCTS_OFFSET = 0;

export default function Dashboard() {
  const [offset, setOffset] = React.useState(PRODUCTS_OFFSET)

  const products = useFetch(endpoints.products.getFromAllProducts(PRODUCTS_LIMIT, offset));
  const totalProducts = useFetch(endpoints.products.getFromAllProducts(0, 0)).length;


  const categories = products?.map((product) => product.category);
  const categoryNames = categories?.map((category) => category.name);

  function categoryCount(arr) {
    return arr.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {});
  } // => {others: 5, books: 1, cars: 3, glasses: 1} ...

  // console.log(categories);
  // console.log(categoryNames);

  const data = {
    datasets: [
      {
        label: 'Categories',
        data: categoryCount(categoryNames),
        backgroundColor: ['#ffbb11', '#c0c0c0', '#50af95', '#b02883', '#2a71d0'],
        categoryPercentage: 0.8,
        borderRadius: {
          topLeft: 10,
          topRight: 10,
        },
      },
    ]
  }

  return (
    <>
      <div className="my-4 h-96">
        <Chart chartData={data} />
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
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2 items-center mt-4">
        <Pagination
          totalProducts={totalProducts}
          limit={PRODUCTS_LIMIT}
          offset={offset}
          setOffset={setOffset}
        />
      </div>
    </>
  );
}