import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import adminService from './adminServices'

//get admin from local storage
const admin = JSON.parse(localStorage.getItem('admin'))
const initialState = {
    admin: admin || null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    users: []
}

//Login admin
export const adminLogin = createAsyncThunk('admins/login', async (admin, thunkAPI) => {
    try {

        return await adminService.login(admin)
    } catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//logout
export const adminLogout = createAsyncThunk('admins/logout', async () => {
    console.log('inside admin slice logout')
    await adminService.logout()
})

//Fetch all users
export const fetchAllUsers = createAsyncThunk('admins/fetchAll', async (_, thunkAPI) => {
    try {

        const token = await thunkAPI.getState().admins.admin.token
        const response = await adminService.getAllUsers(token);
        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(message)
    }
})


//Block / unBLock user
export const handleBlockAndUnblock = createAsyncThunk('admins/handleBlock', async (userId, thunkAPI) => {
    try {
        console.log('admin slice block')
        const token = await thunkAPI.getState().admins.admin.token
        const response = await adminService.handleBlock(token, userId)
        console.log({response})
        return response
    } catch (error) {
        return thunkAPI.rejectWithValue(message)
    }
})

//edit User
export const editUser = createAsyncThunk('admins/editUser', async ({ userId, name, email }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().admins.admin.token;
        const response = await adminService.editUser(token, userId, name, email)
        return response.data
    } catch (error) {
        const message = (error.response && error.response.data.message) || error.message
            || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

export const adminSlice = createSlice({
    name: 'admins',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminLogin.pending, (state) => {
                state.isLoading = true
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.admin = action.payload
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.admin = null
            })
            .addCase(adminLogout.fulfilled, (state) => {
                state.admin = null
            })
            .addCase(fetchAllUsers.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.isLoading= false
                state.users = action.payload
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(handleBlockAndUnblock.pending, (state) => {
                // state.isLoading = true
            })
            .addCase(handleBlockAndUnblock.fulfilled,(state, action) => {
                console.log(action.payload)
                state.isLoading = false
                state.isSuccess = true
                // state.users = action.payload
                const updatedUser = action.payload;
                state.users = state.users.map(user =>
                    user._id === updatedUser._id ? updatedUser : user
                );
            })
            .addCase(handleBlockAndUnblock.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(editUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users = action.payload.users
            })
            .addCase(editUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.users
            })
    }
})

export const { reset } = adminSlice.actions
export default adminSlice.reducer
