import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { set, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Spinner from './Spinner';
import { database } from '../firebase';
import { collection,  getDocs } from "firebase/firestore";
function LoginPage() {

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const {register, handleSubmit, formState: { errors }} = useForm();

  const onsubmit = async(data)=>{

    try{
        setLoading(true)
        const result = await getDocs(collection(database, "users"));
        const studentArray = result.docs.map((doc) => ({
            id: doc.id, 
            ...doc.data(), 
        }));

        const user = studentArray.find(user => user.email === data.email);
        if(user){
            if(user.password !== data.password){
                toast.error("Password incorrect")
                setLoading(false);
                return;
            }
            setLoading(false)
            localStorage.setItem("token",user.email)
            toast.success("User logged in")
            navigate("/")
        }
        else{
            setLoading(false)
            toast.error("User is not registered");
            return ;
        }
        // console.log("Login data is : ", data)
        // navigate("/dashboard")

    }
    catch(error){
      setLoading(false)
      console.log("Erro is : ",error)
      return;
    }
  }


  return (
    <div className='flex lg:flex-row flex-col gap-4 lg:gap-0 lg:justify-between w-10/12 lg:w-9/12 mx-auto items-center mt-20  lg:mt-8 h-[85vh] '>
      {loading && <Spinner/>}
      <img src="https://static.vecteezy.com/system/resources/thumbnails/027/205/841/small_2x/login-and-password-concept-3d-illustration-computer-and-account-login-and-password-form-page-on-screen-3d-illustration-png.png" className='w-[500px]'  alt="" />

      <div className='lg:w-[400px] lg:px-8 px-2 py-6 rounded-lg  flex flex-col gap-2'>

        <h1 className='text-3xl font-semibold'>Login </h1>
        <p className=' font-semibold mt-2'>Enter your details below</p>
          <form action="" onSubmit={handleSubmit(onsubmit)} className='mt-6 flex flex-col gap-6'>

                <div>
                  <input type="email" name='email' {...register("email", {required:true})} id='email' placeholder='Email'  className=' outline-none border-b border-black border-l-none border-r-none border-t-none px-2 py-1  w-full'/>
                  {errors.email && <p className='text-red-600'>*email is required!</p>}
                </div>

                <div className='relative '>
                  <input type="text" {...register("password", {required:true})} name='password' id='password' placeholder='Password'  className=' outline-none border-b border-black border-l-none border-r-none border-t-none px-2 py-1 pr-12  w-full'/>
                  {errors.password && <p className='text-red-600'>*password is required!</p>}
                </div>

                <div className='flex justify-between items-center mt-2'>
                    <button type='submit' className='bg-[#fb641b] px-4 py-2 rounded-lg text-white cursor-pointer'>Login</button>
                    <button className='text-[#fb641b] cursor-pointer'>Forgot Password?</button>
                </div>
          </form>

          <button className='text-start mt-3 text-blue-600 cursor-pointer' onClick={()=>navigate("/signup")}>Create an account</button>
      </div>

    </div>
  )
}

export default LoginPage