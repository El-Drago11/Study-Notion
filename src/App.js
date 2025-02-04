import React, { useEffect } from 'react'
import { Route, Routes, useLocation, useParams } from 'react-router-dom'
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
import MyCourses from './components/core/Dashboard/MyCourses'
import EditCourse from './components/core/Dashboard/EditCourse'
import Catalog from './Pages/Catalog'
import CourseDetails from './Pages/CourseDetails'
import SupportDesk from './Pages/SupportDesk'
import Message from './components/core/Chat/Message'
import { getToken,onMessage } from 'firebase/messaging'
import { messaging } from './Services/firebase/firebase'
import toast from 'react-hot-toast'
import LoadindScreen from './components/common/LoaderScreen'
const logoUrl = 'https://res.cloudinary.com/djkivlxss/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1737476485/rzp_logo_gkzv4q.png';

const App = () => {
  const {user,loading } = useSelector((store) => store.profile)
  const signUploading = useSelector((store)=>store.auth.loading)

  async function notificationPermission() {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const firebaseToken = await getToken(messaging, {
          vapidKey: process.env.REACT_APP_FIREBASE_NOTIFICATION_KEY,
        });
        localStorage.setItem('deviceToken', firebaseToken);
      } else if (permission === "denied") {
        toast.error("Notifications are disabled. Please enable notifications for better experience.");
      }
    } catch (error) {
      console.error("Error requesting notification permission or fetching token:", error);
      toast.error("Failed to enable notifications.");
    }
  }
  
  const location = useLocation();  
  !(location.pathname.includes('/userChat')) && onMessage(messaging, (payload) => {
    if (payload.notification) {
      const { title, body} = payload.notification;
      const notificationOptions = {
        body: body || "You have a new Message.",
        icon: logoUrl,
      };
      new Notification(title || "Notification", notificationOptions);
    }
  });
  

  useEffect(()=>{
    notificationPermission();
  },[])

  return (
    <div className='w-screen min-h-screen  bg-richblack-900 flex flex-col font-inter'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="catalog/:catalogName/:catalogId" element={<Catalog />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
        <Route path='update-password/:id' element={<UpdatePassword />} />
        <Route path='verify-email' element={<VerifyEmail />} />
        <Route path='About-us' element={<About />} />
        <Route element={
          <PrivateRoute>
            <DashBoard />
          </PrivateRoute>
        }
        >
          <Route path='dashboard/my-profile' element={<MyProfile />} />
          <Route path='dashboard/settings' element={<Settings />} />
          {user?.accountType === "Student" && (<>
            <Route path='dashboard/enrolled-courses' element={<EnrolledCourses />} />
            <Route path='dashboard/cart' element={<Cart />} />
          </>)}
          {user?.accountType === "Instructor" && (<>
            <Route path='dashboard/add-course' element={<AddCourses />} />
            <Route path='dashboard/my-courses' element={<MyCourses />} />
            <Route path='dashboard/edit-course/:courseId' element={<EditCourse />} />
          </>)}
          <Route path='/supportDesk' element={<SupportDesk/>}/>
          <Route path='userChat/:userId' element={<Message/>}/>
        </Route>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      {
        (loading || signUploading) && <LoadindScreen/>
      }
    </div>
  )
}

export default App