import axios from 'axios'
// const API_URL = '/api/admin/';
const API_URL = 'http://localhost:5000/api/admin/';

// admin login
const login = async (adminData) => {
    const response = await axios.post(API_URL, adminData);
    if (response.data) {
        localStorage.setItem('admin', JSON.stringify(response.data));
    }
    return response.data;
};

//logout
const logout = () => {
    localStorage.removeItem('admin')
    console.log('inside logout admin service')
}

//fetch all users
const getAllUsers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'dashboard', config)
    return response.data
}

//handle block/unblock user
const handleBlock = async (token, userId) => {
    console.log('inside block service')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(`${API_URL}user/block-unblock?_id=${userId}`, {}, config);
    console.log({response})
    return response.data
}

//Edit user
export const editUser = async (token, userId, name, email) => {
    const config = {
      headers: {
        Athorization: `bearer ${token}`
      }
    }
    return await axios.put(API_URL + 'editUser', { userId, name, email }, config)
  
  }

const adminService = {
    logout, login, getAllUsers, handleBlock,editUser
};

export default adminService;