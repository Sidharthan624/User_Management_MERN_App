import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/spinner'
import { login, reset } from '../features/auth/authSlice'


function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { email, password} = formData
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)


    useEffect(()=>{
        if(isError){
          toast.error(message)
        }
        if(isSuccess || user){
          navigate('/')
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
        const userData = {
            email,password
        }
        dispatch(login(userData))
    }
    if(isLoading){
        return <Spinner/>
    }

    return (
        <>
            <section className='heading'>
                <h1>
                    Login
                </h1>
                <p>Welcome to your Account</p>
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

export default Login