import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './components/common/Navbar'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import ForgotPassword from './Pages/ForgotPassword'
import UpdatePassword from './Pages/UpdatePassword'
import VerifyEmail from './Pages/VerifyEmail'
import { About } from './Pages/About'
import DashBoard from './Pages/DashBoard'
import MyProfile from './components/core/Dashboard/MyProfile'
import PrivateRoute from './components/core/Dashboard/PrivateRoute'
import ErrorPage from './Pages/ErrorPage'
import Settings from './components/core/Dashboard/Settings'
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses'
import Cart from './components/core/Dashboard/Cart'
import { useSelector } from 'react-redux'
import AddCourses from './components/core/Dashboard/AddCourses'

const App = () => {
  const {user} = useSelector((store)=>store.profile)
  return (
    <div className='w-screen min-h-screen  bg-richblack-900 flex flex-col font-inter'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="signup" element={<Signup/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path='forgot-password' element={<ForgotPassword/>}/>
        <Route path='update-password/:id' element={<UpdatePassword/>}/>
        <Route path='verify-email' element={<VerifyEmail/>}/>
        <Route path='About-us' element={<About/>}/>
        <Route element={
                        <PrivateRoute>
                          <DashBoard/>
                        </PrivateRoute>
                      }
        >
          <Route path='dashboard/my-profile' element={<MyProfile/>}/>
          <Route path='dashboard/settings' element={<Settings/>}/>
          {user?.accountType === "Student" && (<>
            <Route path='dashboard/enrolled-courses' element={<EnrolledCourses/>}/>
            <Route path='dashboard/cart' element={<Cart/>}/>
          </>)}
          {user?.accountType === "Instructor" && (<>
            <Route path='dashboard/add-course' element={<AddCourses/>}/>
          </>)}
        </Route>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </div>
  )
}

export default App