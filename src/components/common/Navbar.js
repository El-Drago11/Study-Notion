import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../Services/apiConnector'
import { categories } from '../../Services/apis'
import { IoIosArrowDropdown } from "react-icons/io"
import { setSideBarOpen } from '../../Store/profileReducer'

const Navbar = () => {
    // fetch data from the store
    const totalItems = useSelector((store) => store.cart.totalItems)
    const token = useSelector((store) => store.auth.token)
    const user = useSelector((store) => store.profile.user)
    const dispatch = useDispatch();

    //-----------------------> api calls <--------------------------------
    const [subLinks, setSubLinks] = useState([]);
    const fetchSublinks = async () => {
        try {
            const result = await apiConnector("GET", categories?.CATEGORIES_API)
            setSubLinks(result?.data?.data)

        } catch (error) {
            throw new Error(error)
        }
    }

    useEffect(() => {
        fetchSublinks()
    }, [])
    // -----------------------------------------------------------------

    const location = useLocation()
    // to check if the path matchor not
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    return (
        <div className=' w-full h-auto flex flex-col mx-auto'>
            <div className='w-full flex h-[10vh] items-center justify-center border-b-2 border-b-richblack-100 '>
                <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

                    <Link to={'/'}>
                        <img src={logo} alt='Logo' loading='lazy' className='w-24 md:w-48' />
                    </Link>

                    <nav>
                        <ul className='hidden lg:flex gap-x-4 text-richblack-25 mb-auto'>
                            {NavbarLinks?.map((element, index) => (
                                <li key={index}>
                                    {
                                        element?.title === "Catalog" ? (
                                            <div className='group relative flex gap-2 items-center'>
                                                <p>{element?.title}</p>
                                                <IoIosArrowDropdown />
                                                <div className='invisible absolute left-[50%] top-[50%] translate-y-5 p-4 flex flex-col rounded-md bg-richblack-25 text-richblack-800 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 w-[12rem] z-20'>
                                                    <div className='absolute top-0 left-3 -translate-y-2 rotate-45 h-6 w-6 rounded bg-richblack-25'>

                                                    </div>
                                                    <ul>
                                                        {subLinks?.map((element, index) => (
                                                            <Link to={`catalog/${element?.name}/${element?._id}`} key={index}>
                                                                <li className='font-semibold border-b-2 border-richblack-100 py-2 hover:bg-richblack-200 rounded-full p-2 mb-2'>{element?.name}</li>
                                                            </Link>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        ) : (
                                            <Link to={element?.path}>
                                                <p className={`${matchRoute(element?.path) ? "text-yellow-5" : "text-richblack-25"}`}>
                                                    {element?.title}
                                                </p>
                                            </Link>
                                        )
                                    }
                                </li>
                            )
                            )}
                        </ul>
                    </nav>

                    {/* login/signup/dashboard */}
                    <div className='flex gap-x-2 md:gap-x-4 items-center'>
                        {/* {
                            user && user?.accountType != "Instructor" && (
                                <Link to="/dashboard/cart" className='relative text-richblack-5 text-xl md:text-3xl'>
                                    <AiOutlineShoppingCart />
                                    {totalItems > 0 && (
                                        <span>{totalItems}</span>
                                    )
                                    }
                                </Link>
                            )
                        } */}

                        {/* if Token is null than user is not LoggedIn  than show login and signUp button*/}
                        {
                            token === null && (
                                <Link to="/login" className='border border-richblack-700 bg-richblack-800 px-2 md:px-5 py-0 md:py-1 text-richblack-50 rounded-full hover:bg-richblack-900'>
                                    <button>Login</button>
                                </Link>
                            )
                        }
                        {
                            token === null && (
                                <Link to="/signup" className='border border-richblack-700 bg-richblack-800 px-2 md:px-5 py-0 md:py-1 text-richblack-50 rounded-full hover:bg-richblack-900'>
                                    <button>Sign Up</button>
                                </Link>
                            )
                        }
                        {token != null && <Link to="/supportDesk" className='border border-richblack-700 bg-richblack-800 px-2 md:px-5 py-0 md:py-1 text-richblack-50 rounded-full hover:bg-richblack-900' >
                            <button className='capitalize' onClick={() => dispatch(setSideBarOpen())}>supportDesk</button>
                        </Link>}

                        {/* if token is NOT null than show User details */}
                        {
                            token !== null && <ProfileDropDown />
                        }
                    </div>

                </div>
            </div>
            <ul className='flex lg:hidden gap-x-4 text-richblack-25 mx-auto my-2'>
                {NavbarLinks?.map((element, index) => (
                    <li key={index}>
                        {
                            element?.title === "Catalog" ? (
                                <div className='group relative flex gap-2 items-center'>
                                    <p>{element?.title}</p>
                                    <IoIosArrowDropdown />
                                    <div className='invisible absolute left-[50%] top-[50%] translate-y-5 p-4 flex flex-col rounded-md bg-richblack-25 text-richblack-800 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 w-[12rem] z-20'>
                                        <div className='absolute top-0 left-3 -translate-y-2 rotate-45 h-6 w-6 rounded bg-richblack-25'>

                                        </div>
                                        <ul>
                                            {subLinks?.length && subLinks?.map((element, index) => (
                                                <Link to={`catalog/${element?.name}/${element?._id}`} key={index}>
                                                    <li className='font-semibold border-b-2 border-richblack-100 py-2 hover:bg-richblack-200 rounded-full p-2 mb-2'>{element?.name}</li>
                                                </Link>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <Link to={element?.path}>
                                    <p className={`${matchRoute(element?.path) ? "text-yellow-5" : "text-richblack-25"}`}>
                                        {element?.title}
                                    </p>
                                </Link>
                            )
                        }
                    </li>
                )
                )}
            </ul>
        </div>
    )
}

export default Navbar