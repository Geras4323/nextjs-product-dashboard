const API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const endpoints = {
  products: {
    getAllProducts: (limit, offset) => `${API}/api/${VERSION}/products?limit=${limit}&offset=${offset}`,
    postProducts: `${API}/api/${VERSION}/products`,
    getProduct: (id) => `${API}/api/${VERSION}/products/${id}`,
  },
  users: {
    getUsers: (limit) => `${API}/api/${VERSION}/users?limit=${limit}`,
    postUsers: `${API}/api/${VERSION}/users`,
    available: `${API}/api/${VERSION}/users/is-available`,
  },
  auth: {
    login: `${API}/api/${VERSION}/auth/login`,
    profile: `${API}/api/${VERSION}/auth/profile`,
  },
  categories: {
    getAllCategories: (limit) => `${API}/api/${VERSION}/categories?limit=${limit}`,
    postCategories: `${API}/api/${VERSION}/categories`,
    getCategory: (id) => `${API}/api/${VERSION}/categories/${id}`,
    getCategoryProducts: (id, limit, offset) => `${API}/api/${VERSION}/categories/${id}/products?limit=${limit}&offset=${offset}`,
  },
  files: {
    postFiles: `${API}/api/${VERSION}/files/upload`,
    getFile: (filename) => `${API}/api/${VERSION}/files/${filename}`,
  }
}

export default endpoints;