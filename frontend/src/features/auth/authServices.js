import axios from 'axios'

// const API_URL = '/api/users/';
const API_URL = 'http://localhost:5000/api/users/';


// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData);
    if (response.data) {
        console.log('login user auth service')
        console.log(response.data)
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user')
    console.log('inside logout auth service')
}


const updateProfile = async (userData, token) => {
    console.log('inside auth service')
    console.log(userData)
    for (let pair of userData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }
    console.log(token)
    const response = await axios.put(API_URL + 'profile', userData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    });
    if (response.data) {
        console.log('inside respone in update profile auth service')
        console.log(response.data)
        const updatedUserData = { ...response.data, token }
        console.log(updatedUserData)
        localStorage.setItem('user', JSON.stringify(updatedUserData));
    }
    return response.data;
};



const authService = {
    register,
    logout, login, updateProfile
};

export default authService;
