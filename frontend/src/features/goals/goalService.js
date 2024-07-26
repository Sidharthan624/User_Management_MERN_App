import axios from 'axios'

// const API_URL = '/api/goals/'
const API_URL = 'http://localhost:5000/api/goals/';
 //Create new Goal

 const createGoal = async (goalData,token)=>{
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, goalData,config)

    return response.data

    
 }
//  get user goals
 const getGoals = async (token)=>{
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL,config)
    return response.data
 }
// const getGoals = async (token)=>{
//     const config = {
//         headers : {
//             Authorization : `Bearer ${token}`
//         }
//     }
//     const response = await axios.get(API_URL,config)
//     console.log(response.status)
//     if(response.status === 200){
//         console.log('status 200')
//         return response.data
//     } else if(response.status === 302){
//         console.log('status 201')
//         localStorage.removeItem('user')
//         return response.data
//     }
//  }





 //delete user goal
 const deleteGoal = async (goalId,token)=>{

    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + goalId,config)
    return response.data
 }

 const goalService = {
    createGoal,
    getGoals,
    deleteGoal
 }

 export default goalService