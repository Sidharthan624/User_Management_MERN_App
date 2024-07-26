import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'

function Headers() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        // navigate('/')
    }
    const imageURL = user ? `http://localhost:5000/images/${user.avatar}` : null;
    return (
        <>
        
        <header className='header'>
            <div className='logo'>
                <Link to='/'>Report</Link>
            </div>
            <ul>
                {user ? (
                    <ul>

                        <li>

                            <Button variant='outlined'
                                onClick={onLogout}
                                color='info'
                            >Logout
                            </Button>
                        </li>
                        <li>
                            <Link to='/profile'>
                                {user.avatar ? <Avatar className='p-1' alt="Profile picture" src={imageURL} /> : <FaUser />}
                                Profile
                            </Link>

                        </li>
                    </ul>

                ) : (
                    <>
                        <li>
                            <Link to='/login'>
                                <FaSignInAlt />
                                Login
                            </Link>
                        </li>
                        <li >
                            <Link to='/register'>
                                <FaUser />
                                Register
                            </Link>
                        </li>
                    </>
                )}

            </ul >

        </header >
        </>
    )
}

export default Headers