import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {fetchCourseCategories} from "../../../../../services/operations/courseDetailsAPI" ;

import { HiOutlineCurrencyRupee } from "react-icons/hi"

const CourseInformationForm = () => {

  const {
    register, 
    handleSubmit,
    setValue,
    getValues,
    formState : {errors} , 
  } = useForm() ;

  const dispatch = useDispatch() ;
  const {course, editCourse} = useSelector((state)=> state.course);
  const [loading, setLoading] = useState(false) ;

  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(()=>{
    const getCategories = async () =>{
      setLoading(true);
      const categories = await fetchCourseCategories() ;

      if(categories.length > 0) {
        setCourseCategories(categories) ;
      }
      setLoading(false);
    }

    if(editCourse){
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }

    getCategories() ;

  }, [])

  

  const onSubmit = async(data) =>{

  }


  return(
    <div className="text-white">

      <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
      >

        {/* Course title below */}
        <div className="flex flex-col space-y-2">
          
          <label className="text-sm text-richblack-5" htmlFor="courseTitle">
            Course Title <sup className="text-pink-200">*</sup>
          </label>

          <input
            id="courseTitle"
            placeholder="Enter Course Title"
            {...register("courseTitle", { required: true })}
            className="form-style w-full"
          />
          {errors.courseTitle && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course title is required
            </span>
          )}
        </div>


        {/* Course description */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
              Course Short Description <sup className="text-pink-200">*</sup>
            </label>
            <textarea
              id="courseShortDesc"
              placeholder="Enter Description"
              {...register("courseShortDesc", { required: true })}
              className="form-style resize-x-none min-h-[130px] w-full"
            />
            {errors.courseShortDesc && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Course Description is required
              </span>
            )}
          </div>

          
          {/* course price section */}
          <div className="flex flex-col space-y-2">
              <label className="text-sm text-richblack-5" htmlFor="coursePrice">
                Course Price <sup className="text-pink-200">*</sup>
              </label>
              <div className="relative">
                <input
                  id="coursePrice"
                  placeholder="Enter Course Price"
                  {...register("coursePrice", {
                    required: true,
                    valueAsNumber: true,
                    pattern: {
                      value: /^(0|[1-9]\d*)(\.\d+)?$/,
                    },
                  })}
                  className="form-style w-full !pl-12"
                />
                <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
              </div>
              {errors.coursePrice && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Course Price is required
                </span>
              )}
          </div>


          {/* Course Category */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="courseCategory">
              Course Category <sup className="text-pink-200">*</sup>
            </label>
            <select
              {...register("courseCategory", { required: true })}
              defaultValue=""
              id="courseCategory"
              className="form-style w-full"
            >
              <option value="" disabled>
                Choose a Category
              </option>
              {!loading &&
                courseCategories?.map((category, indx) => (
                  <option key={indx} value={category?._id}>
                    {category?.name}
                  </option>
                ))}
            </select>
            {errors.courseCategory && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Course Category is required
              </span>
            )}
          </div>


        </form>

      


    </div>
  )

}

export default CourseInformationForm ;
