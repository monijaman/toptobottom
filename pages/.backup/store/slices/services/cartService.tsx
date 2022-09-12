import axios from 'axios'

const API_URL = '/api/users/'

// Create new goal
const getProducts = async () => {
  
  const response = await axios.get('https://jsonplaceholder.typicode.com/photos/1')
  // const response = await axios.get('https://dummyjson.com/products/7')
  return response.data
}

  

 
const cartService = {
    getProducts 
}

export default cartService
