import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DashBoard from './pages/dashBoard'
import Login from './pages/login'
import Register from './pages/register'
import Profile from './pages/Profie'
import Header from './components/Headers'
import AdminLogin from './pages/adminLogin'
import AdminDashboard from './pages/adminDashboard'
import { ToastContainer } from 'react-toastify'
import AdminHeader from './components/adminHeader'
import 'react-toastify/dist/ReactToastify.css'


function App() {
    return (
        <Router>
            <div className='container'>
                {/* Common headers */}
                <Routes>
                    <Route path='*' element={<Header />} />
                    <Route path='/admin/*' element={<AdminHeader />} />
                </Routes>

                {/* Main content routes */}
                <Routes>
                    <Route path='/' element={<DashBoard />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/profile' element={<Profile />} />

                    {/* admin routes */}

                    <Route path='/admin' element={<AdminLogin />} />
                    <Route path='/admin/dashboard' element={<AdminDashboard />} />
                </Routes>
            </div>
            <ToastContainer />
        </Router>
    );
}

export default App;
