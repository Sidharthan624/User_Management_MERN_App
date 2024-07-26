import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { reset, fetchAllUsers, handleBlockAndUnblock, editUser } from '../features/admin/adminSlice'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Spinner from '../components/spinner'


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function AdminDashboard() {
  const navigate = useNavigate()
  const { admin, users,isLoading } = useSelector((state) => state.admins)
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  if (!admin) {
    navigate('/admin')
  }
  useEffect(() => {
    // if (!admin) {
    //   navigate('/admin')
    //   return
    // } else {
    // }
    dispatch(fetchAllUsers())
    return () => {
      dispatch(reset())
    }
  }, [])

  const filteredUser = users?.filter(user => {
    const userName = user.name.toLowerCase()
    const userEmail = user.email.toLowerCase()
    const findUser = search.toLowerCase()
    return userName.includes(findUser) || userEmail.includes(findUser)
  })

  const handleBlock = (userId) => {
    dispatch(handleBlockAndUnblock(userId))
  }

  const handleEdit = (userId, name, email) => {
    const newName = prompt("Enter your New Name :", name);
    const newEmail = prompt("Enter your new Email :", email)

    if (newName === null || newEmail === null) {
      return;
    }
    if (newName && newEmail) {
      dispatch(editUser({ userId, name: newName, email: newEmail }))
    }
  }
  if(isLoading){
    return <Spinner/>
  }

  return (
    <>
      <h1>AdminDashboard</h1>
      <div className='m-4 '>
        <TextField
          className='userSearch'
          onChange={(e) => setSearch(e.target.value)}
          varient="outline"
          size="Large"
          label="Search input"
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700, marginBottom: 10 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">#</StyledTableCell>
              <StyledTableCell align="left">Profie Picture</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Edit</StyledTableCell>
              <StyledTableCell align="left">Block/Unblock</StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUser.length > 0 ? filteredUser.map((user, index) => {
              const imageURL = `http://localhost:5000/images/${user.avatar}`;
              return (
                <StyledTableRow key={user._id}>
                  <StyledTableCell align="left">{index + 1}</StyledTableCell>
                  <StyledTableCell align="left">
                    <Avatar alt="Profile picture" src={imageURL} />
                  </StyledTableCell>
                  <StyledTableCell align="left">{user.name}</StyledTableCell>
                  <StyledTableCell align="left">{user.email}</StyledTableCell>
                  <StyledTableCell align="left">
                    <Button variant="outlined"
                      color='info'
                      onClick={() => handleEdit(user._id, user.name, user.email)}
                    >Edit
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Button
                      variant={!user.isBlocked ? 'outlined' : 'contained'}
                      color={!user.isBlocked ? 'error' : 'success'}
                      style={{ width: '100px' }}
                      onClick={() => handleBlock(user._id)}
                    >
                      {!user.isBlocked ? 'Block' : 'Unblock'}
                    </Button>

                  </StyledTableCell>

                </StyledTableRow>
              );
            }) :
              <StyledTableRow>
                <StyledTableCell align="left">
                  <h3>No User Found!</h3>
                </StyledTableCell>
              </StyledTableRow>}
          </TableBody>

        </Table>
      </TableContainer>
    </>
  )
}

export default AdminDashboard