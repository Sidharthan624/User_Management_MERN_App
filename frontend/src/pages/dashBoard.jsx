import { useEffect } from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import Spinner from '../components/spinner'
import { getGoals } from '../features/goals/goalSlice'
import { reset } from '../features/goals/goalSlice'


import GoalItem from '../components/GoalItem'
import { toast } from 'react-toastify'

function dashBoard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message, isSuccess } = useSelector((state) => state.goals)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (!user) {
      navigate('/login')
      return
    }
      dispatch(getGoals());
     
    return () => {
      dispatch(reset())
    
    }
  }, [user,navigate, message, dispatch])


  // if(!user) return <Navigate to="/login" />

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard </p>

      </section>

      <GoalForm />
      <section className="content">
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (<h3>You have not set any goals</h3>)}
      </section>
     

    </>
  )
}

export default dashBoard