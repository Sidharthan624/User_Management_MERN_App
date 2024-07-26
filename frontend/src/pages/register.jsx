import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/spinner'
import { register, reset } from '../features/auth/authSlice'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


function Register() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { name, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }


  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== password2) {
      toast.error('Password do not match')
    } else if (!name || !email || !password || !password2) {
      toast.error("All Fields mustbe filled");
    }
    else if (password.length < 8) {
      toast.error('Password must be 8 char')
    } else if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      toast.error("Please enter a valid email address!");
    }
    else {
      const userData = {
        name, email, password
      }
      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '34ch' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={onSubmit}
        >
          <TextField
            id="Name"
            type='text'
            label="Name"
            variant="outlined"
            name='name'
            value={name}
            placeholder='Enter your name'
            onChange={onChange}
          />
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
          <TextField
            id="Password2"
            type='password'
            label="Confirm Password"
            variant="outlined"
            name='password2'
            value={password2}
            placeholder='Re enter Your Password'
            onChange={onChange}
          />
          <div className='mt-4'>
            <Button variant="contained"
              color='success'
              type='submit'
              size='large'
            >Register
            </Button>
          </div>
        </Box>

      </section>
    </>
  )
}
export default Register