import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { getCatalogPageDetails } from '../Services/operations/getPageAndComponentDetails';
import CourseCard from '../components/core/Catalog/CourseCard';

const Catalog = () => {

    const {catalogName,catalogId} = useParams();
    const [catalogPageData,setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");

    // fetch the all catagory
    useEffect(()=>{
        setCategoryId(catalogId)
        const getCategoryDetails = async()=>{
            console.log("CategoryId : ",catalogId);
            try {
                const res = await getCatalogPageDetails(catalogId);
                console.log("getCatalogPageDetails : ", res)
                setCatalogPageData(res);
            } catch (error) {
                console.lof(error)
            }
        }
        getCategoryDetails()
    },[catalogId])


  return (
    <div className=' text-richblack-5'>
        {/* HeroSection */}
        <div className='m-10 flex flex-col gap-2 p-6 bg-richblack-600 ml-4 w-auto rounded-lg'>
            <p className='text-xl font-bold'>{`Home / Catalog / `}<span className=' text-xl font-semibold text-yellow-100'>{catalogName}</span></p>
            <p className='text-md'>{catalogPageData?.data?.selectedCategory?.description?.toUpperCase()}</p>
        </div>
        <div className='mt-1 p-2'>
            {/* SECTION: 1 */}
            <div className='mt-1 p-5'>
                <div className='text-3xl font-bold'> Courses to get you started</div>
                <div className='flex gap-x-8 mt-4 border-b-2 border-richblack-100'>
                    <p className='text-lg font-bold hover:text-yellow-100'>Most Popular</p>
                    <p className='text-lg font-bold hover:text-yellow-100'>New</p>
                    <p className='text-lg font-bold hover:text-yellow-100'>Trending</p>
                </div>
                <div className='grid lg:grid-cols-4 gap-4 sm:grid-cols-3 mt-4'>
                    {
                        catalogPageData?.data?.selectedCategory?.courses?.map((course,index)=>(
                            <CourseCard course={course} key={index} height={'h-[200px]'}/>
                        ))                            
                    }
                </div>
            </div>

            {/* section:2 */}
            <div className='mt-1  p-5'>
                <p className='text-2xl font-bold'>Top Courses {catalogPageData?.data?.differentCategory?.name?.toLocaleLowerCase()}</p>
                <div className='grid lg:grid-cols-4 gap-4 sm:grid-cols-3 mt-4'>
                    {
                        catalogPageData?.data?.differentCategory?.courses?.slice(0,4)?.map((course,index)=>(
                            <CourseCard course={course} key={index} height={'h-[200px]'}/>
                        ))                            
                    }
                </div>
            </div>

            {/* section: 3 */}
            <div className=' mt-1  p-5'>
                <div className='text-2xl font-bold'>Frequently Bought</div>
                <div className=' py-8'>
                    <div className=' grid lg:grid-cols-4 gap-1 sm:grid-cols-3'>
                        {
                            catalogPageData?.data?.mostSellingCourses?.slice(0,4)?.map((course,index)=>(
                                <CourseCard course={course} key={index} height={'h-[200px]'}/>
                            ))                            
                        }
                    </div>
                </div>
            </div>
        </div>
        <div className=' mt-28'>
            <Footer/>
        </div>
    </div>
  )
}

export default Catalog