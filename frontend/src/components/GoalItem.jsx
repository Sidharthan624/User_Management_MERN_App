import React from 'react'
import { useDispatch } from 'react-redux'
import {deleteGoal} from '../features/goals/goalSlice'
import Button from '@mui/material/Button'

function GoalItem({ goal }) {
    const dispatch = useDispatch()
    return (
        <div>
            <div className='goal '>
                {new Date(goal.createdAt).toISOString('en-Us').slice(0,10)}
            </div>
                <h1>{goal.text}</h1>
                <Button variant="outlined"
                        onClick={()=>dispatch(deleteGoal(goal._id))} className="Close"
                        color='error'                        
                        size='large'
                    >Delete
                    </Button>
        </div>

    )
}

export default GoalItem