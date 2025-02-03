const BASE_URL = process.env.REACT_APP_BASE_URL

export const categories= {
    CATEGORIES_API: BASE_URL+"/course/showAllCategories"
}

export const settingsEndpoints = {
    RESETPASSWORDTOKEN_API : BASE_URL+"/auth/reset-password-token",
    RESETPASSWORD_API : BASE_URL+"/auth/reset-password",
    SIGNUP_API : BASE_URL+"/auth/signup",
    SENDOTP_API : BASE_URL+"/auth/sendotp",
    LOGIN_API: BASE_URL + "/auth/login",
    CHANGEPASSWORD_API : BASE_URL+"/auth/changepassword"
}

export const profileEndpoints = {
    UPDATEDISPLAYPICTURE_API : BASE_URL +"/profile/updateDisplayPicture",
    GET_ENROLLED_COURSES_API : BASE_URL +"/profile/getEnrolledCourses",
    GET_USERDETAILS_BY_ID_API : BASE_URL+"/profile/getUserDetailById",
    USER_INSTRUCTOR: BASE_URL + "/course/userInstructor",
    INSTRUCTOR_ENROLLED_STUDENT: BASE_URL+"/course/getEnrolledStudents",
    UPDATE_USER_PROFILE : BASE_URL+"/profile/updateProfile"
}

// CONTACT-US API
export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/reach/contact",
}

// COURSE ENDPOINTS
export const courseEndpoints = {
    GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
    COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
    CREATE_COURSE_API: BASE_URL + "/course/createCourse",
    CREATE_SECTION_API: BASE_URL + "/course/addSection",
    CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
    UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
    DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
    DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED:BASE_URL + "/course/getFullCourseDetails",
    LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
    CREATE_RATING_API: BASE_URL + "/course/createRating",
}

// CATALOG PAGE DATA
export const catalogData = {
    CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
}

// Payment ENDPOINTS
export const paymentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}

export const adminEndPoints = {
    ADMIN_DETAILS_API : BASE_URL + "/admin/adminDetail",
    REGISTRED_STUDENT_API : BASE_URL + "/admin/getRegistredStudents",
    REGISTRED_INSTRUCTOR_API : BASE_URL+"/admin/getRegisterInstructor"
}

//Chat ENDPOINTS
export const chatEndPoints = {
    USERCHAT_BYID_API : BASE_URL + "/chat/getUserMessage",
}