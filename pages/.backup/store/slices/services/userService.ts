import axios from 'axios'

const API_URL = '/api/users/'

// Create new goal
const createUser = async (userData:any) => {
 
  const response = await axios.post(API_URL+'register', userData)

  
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

 

// Login user
const login = async (userData:any) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

 

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

 
const userService = {
  createUser, login, logout
}

export default userService
