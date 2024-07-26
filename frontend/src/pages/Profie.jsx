import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button'
import { reset } from '../features/auth/authSlice';
import Spinner from '../components/spinner'
import EditProfile from '../components/EditProfile';

function Profile() {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [show, setShow] = useState(false)
  const { isLoading, isError, message, isSuccess } = useSelector((state) => state.auth)
  const toggleShow = () => {
    setShow(!show)
  }
  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (!user) {
      navigate('/login')
    
    }
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])
  if (isLoading) {
    return <Spinner />
  }

  const imageURL = user? `http://localhost:5000/images/${user.avatar}` : null;
  return (
    <section className=' '>
      <div className='flex justify-center p-3'>
        <Avatar
          alt="profile-pic"
          src={imageURL}
          style={{ width: '100px', height: '100px' }}
        />
      </div>
      <h2>{user?.name}</h2>
      <h2>{user?.email}</h2>
      {show && <EditProfile toggle={toggleShow} />}
      {!show && <Button variant="outlined"
        onClick={() => setShow(!show)}
        size='small'
      >Edit Profile
      </Button>}
    </section>
  )
}

export default Profile
