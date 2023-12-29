import React from 'react'
import logoLight from '../../assets/Logo/Logo-Full-Light.png'
import '../../App.css'
import {FooterLink2} from '../../data/footer-links'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='flex flex-col w-full mx-auto bg-richblack-800 py-5'>
      {/* upperSection */}
      <div className='flex flex-row w-[100%] border-b-2 border-richblack-400 mx-auto pb-5'>
        {/* upScection-1 */}
        <div className='lg:flex flex-row gap-24 w-[50%] border-r-2 border-richblack-400 mx-auto'>
          <div className=' gap-11'>
              <ul>
                <li><img src={logoLight} alt='logoLight' className='pb-2'/></li>
                <li className=' text-richblack-100 text-lg'>Company</li>
                <li className='footer-link'>About</li>
                <li className='footer-link'>Career</li>
                <li className='footer-link'>Affiliation</li>
                <li className='footer-link'>Facebook | Google | Twitter | Youtube</li>
              </ul>
          </div>
          <div className='flex flex-col gap-11'>
              <ul>
                <li className=' text-richblack-100 text-lg'>Articles</li>
                <li className='footer-link'>Blog</li>
                <li className='footer-link'>Chart Sheet</li>
                <li className='footer-link'>Code Challenges</li>
                <li className='footer-link'>Docs</li>
                <li className='footer-link'>Projects</li>
                <li className='footer-link'>Video</li>
                <li className='footer-link'>Workspaces</li>
              </ul>
              <ul>
                <li className=' text-richblack-100 text-lg'>Support</li>
                <li className='footer-link'>Help Center</li>
              </ul>
          </div>
          <div className='flex flex-col gap-11'>
              <ul>
                <li className=' text-richblack-100 text-lg'>Plans</li>
                <li className='footer-link'>Paid membership</li>
                <li className='footer-link'>For students</li>
                <li className='footer-link'>Bussiness Solutions</li>
              </ul>
              <ul>
                <li className=' text-richblack-100 text-lg'>Community</li>
                <li className='footer-link'>Forums</li>
                <li className='footer-link'>Chapters</li>
                <li className='footer-link'>Events</li>
              </ul>
          </div>
        </div>
        {/* upSection-2 */}
        <div className='flex flex-row mx-auto gap-14'>
          {FooterLink2.map((element,index)=>{
            return(
              <ul key={index}>
                <th className='text-richblack-100 text-lg'>{element?.title}</th>
                {element?.links?.map((links,index)=>{
                  return(
                    <Link to={links?.link} key={index}><li className='footer-link'>{links?.title}</li></Link>
                  )
                })}
              </ul>
            )
          })}
        </div>
      </div>

      {/* waterMark */}
      <div className='flex flex-row justify-between'>
        <div>
            <ul className='flex flex-row text-richblack-300'>
              <li className=' border-r-2 border-r-richblack-400 px-4'>Privacy Policy</li>
              <li className=' border-r-2 border-richblack-400 px-4'>Cookie Policy</li>
              <li className='px-4'>Terms</li>
            </ul>
        </div>
        <div>
          <p className='text-richblack-300  mr-10'>Made With #CODEHELP @studyNotion(2023)</p>
        </div>
      </div>

    </div>
  )
}

export default Footer