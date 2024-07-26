
import { useState } from 'react';
import { updateUser } from '../features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { InputLabel, Input } from '@mui/material';

function EditProfile({ toggle }) {
    const { user } = useSelector((state) => state.auth)
    const [name, setName] = useState(user ? user.name : '');
    const [email, setEmail] = useState(user ? user.email : '');
    const [profileImage, setProfileImage] = useState(null)
    const dispatch = useDispatch()
    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleProfileImageChange = (e) => {
        setProfileImage(e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('file', profileImage);
        console.log(formData)
        for (let pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        console.log('User:', user);
        dispatch(updateUser(formData));
        toggle()
    }
    return (
        <>
            {/* <section>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <label htmlFor='name'>Name:</label>
                            <input type='text' id='name' value={name} onChange={handleNameChange} />
                        </div>
                        <div>
                            <label htmlFor='email'>Email:</label>
                            <input type='email' id='email' value={email} onChange={handleEmailChange} />
                        </div>
                        <label htmlFor='profileImage'>Profile Image:</label>
                        <input type='file' id='profileImage' onChange={handleProfileImageChange} />
                        <button className='border rounded-md bg-emerald-400 p-2' type='submit'>Save</button>
                    </div>
                </form>
            </section> */}
            <section>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '34ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >

                    <TextField
                        id="name"
                        type='text'
                        label="Name"
                        variant="outlined"
                        name='name'
                        value={name}
                        onChange={handleNameChange}
                    />
                    <TextField
                        id="email"
                        type='email'
                        label="Email"
                        variant="outlined"
                        name='email'
                        value={email}
                        onChange={handleEmailChange}
                    />
                    {/* <TextField
                        id="profileImage"
                        type='file'
                        variant="outlined"
                        label='Image'                      
                        onChange={handleProfileImageChange}
                    /> */}
                    <InputLabel className='p-2' htmlFor='profileImage'>Profile Image:</InputLabel>
                    <Input className='border rounded-lg p-3' type='file' id='profileImage' onChange={handleProfileImageChange} />
                    <div className='mt-4'>
                        <Button variant="contained"
                            color='success'
                            type='submit'
                            size='medium'
                        >Save
                        </Button>
                    </div>
                </Box>
            </section>
        </>
    )
}

export default EditProfile