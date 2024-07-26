import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/spinner'
import { adminLogin, reset} from '../features/admin/adminSlice'

function AdminLogin() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { email, password} = formData
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {admin,isLoading,isError,isSuccess,message} = useSelector((state)=>state.admins)

    useEffect(()=>{
        if(isError){
          toast.error(message)
        }
        if(isSuccess || admin){
          navigate('/admin/dashboard')
        }
        dispatch(reset())
      },[isError,isSuccess,message,navigate,dispatch])


    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const adminData = {
            email,password
        }
        dispatch(adminLogin(adminData))
    }
    if(isLoading){
        return <Spinner/>
    }

    return (
        <>
            <section className='heading'>
                <h1>
                Admin Login
                </h1>
               
            </section>

            <section className='form'>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '60ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={onSubmit}
                >

                    <TextField
                        id="Email"
                        type='text'
                        label="Email"
                        variant="outlined"
                        name='email'
                        value={email}
                        placeholder='Enter your Email'
                        onChange={onChange}
                    />
                    <TextField
                        id="Password"
                        type='password'
                        label="Password"
                        variant="outlined"
                        name='password'
                        value={password}
                        placeholder='Enter your Password'
                        onChange={onChange}
                    />

                <div className='mt-4'>
                    <Button variant="outlined"
                        color='info'
                        type='submit'
                        size='large'
                    >Login
                    </Button>
                </div>
                </Box>

            </section>
        </>
    )
}

export default AdminLogin