import React, { useEffect, useState } from 'react'
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import {  useForm } from 'react-hook-form';
import { GiSkullCrossedBones } from "react-icons/gi";
import {database} from "../firebase"
import { collection, doc, addDoc,deleteDoc, updateDoc,getDoc, getDocs } from "firebase/firestore";
import Spinner from './Spinner';
import { toast } from 'react-toastify';
function StudentDashboard() {

const [openModal, setOpenModal] = useState(false)
const [editModal, setEditModal] = useState(false);
const [deleteModal, setDeleteModal] = useState(false)
const [allStudent, setAllStudent] = useState([])
const [loading, setLoading] = useState(false)
const [updateId,setUpdateId] = useState("")
const {register:register1,handleSubmit:handleSubmitForm1,reset:reset1,formState: { errors:errors1 }} = useForm();
const {register:register2,handleSubmit:handleSubmitForm2,reset:reset2} = useForm();

const modal = ()=>{
    setOpenModal(!openModal)
  }

  const editModalHandler = (id)=>{
      setUpdateId(id)
    setEditModal(!editModal)
  }

  const getStudentData = async ()=>{
    try{
        setLoading(true)
        const result = await getDocs(collection(database, "students"));
        const studentArray = result.docs.map((doc) => ({
            id: doc.id, 
            ...doc.data(), 
          }));
        setAllStudent(studentArray);
        setLoading(false)
    }
    catch(error){
        setLoading(false)
        toast.error(error?.message)
    }
  }

  useEffect(()=>{
    getStudentData()
  },[openModal, editModal,deleteModal])

  const addStudent =async (data)=>{
    try {
        setLoading(true)
        await addDoc(collection(database, "students"), data); 
        toast.success("Student added successfully");
        setLoading(false)
        reset1();
        modal();
      } 
      catch (error) {
        setLoading(false)
        toast.error(error?.message);
        return;
      }
  }

  const data = import.meta.env.FIREBASE_apiKey
  console.log("Data :",data)

  const editStudentRecord =async (data)=>{
    try{

        const updateValue = {};
        if(data.name !== "") updateValue.name = data.name;
        if(data.rollNo !== "") updateValue.rollNo = data.rollNo;
        if(data.class !== "") updateValue.class = data.class;
        if(data.section !== "") updateValue.section = data.section;
        if(data.gender !== "") updateValue.gender = data.gender;
        if(data.stream !== "") updateValue.stream = data.stream;
        if(data.phoneNo !== "") updateValue.phoneNo = data.phoneNo;
        if(data.dateOfBirth !== "") updateValue.dateOfBirth = data.dateOfBirth;
        console.log("updaated value : ", updateValue)

        setLoading(true)
        const docRef = doc(database, "students", updateId);

        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
        console.error("No such document found!");
        setLoading(false)
        return;
        }

        // Update only the valid fields
        await updateDoc(docRef, updateValue);
        setLoading(false)
        toast.success("Student record updated successfully!");
        reset2();
        editModalHandler();
    }
    catch(error){
        setLoading(false)
        toast.error(error?.message);
        return ;

    }
  }

  const deleteStudent = async (id) => {
        try {
            setLoading(true)
            const docRef = doc(database, "students", id); // Replace "students" with your collection name
            await deleteDoc(docRef);
            toast.success("Student Record deleted")
            setLoading(false)
            setDeleteModal(!deleteModal);
        } 
        catch (error) {
            setLoading(false)
            toast.error(error?.message)
        }
    }

  return (
    <div className='px-2 pb-4'>

        {loading && <Spinner/>}

        <div className=' py-3 flex justify-between px-2 items-center'>
            <p className='font-semibold text-3xl'>Student Details </p>
            <button onClick={modal} className='cursor-pointer bg-yellow-400 font-semibold px-4 py-2 rounded-lg '>Add Student</button>
        </div>

        <div className='flex border justify-between py-2 px-2 font-semibold mt-4'>
            <p className='w-[7%]'>ID</p>
            <p className='w-[17%]'>Name</p>
            <p className='w-[5%]'>Class</p>
            <p className='w-[6%]'>Section</p>
            <p className='w-[6%]'>Roll No.</p>
            <p className='w-[9%]'>Phone No.</p>
            <p className='w-[8%]'>Stream</p>
            <p className='w-[6%]'>Gender</p>
            <p className='w-[10%]'>Date of Birth</p>
            <p className='w-[7%]'>Actions</p>
        </div>

        {/* All student  */}
        <div className='border mt-4 flex flex-col'>

            {
                allStudent.length <= 0 ? <div className='py-2 text-center'>No Students </div> :
                allStudent?.map ((student,index)=>{
                    return <div key={student.id} className='flex  justify-between py-3 px-2 border-b border-[#c5c5c5]'>
                                <p className=' w-[7%]'>{index+1}.</p>
                                <p className=' w-[17%]'>{student?.name}</p>
                                <p className=' w-[5%]'>{student?.class}</p>
                                <p className=' w-[6%]'>{student?.section}</p>
                                <p className=' w-[6%]'>{student?.rollNo}</p>
                                <p className=' w-[9%]'>{student?.phoneNo}</p>
                                <p className=' w-[8%]'>{student?.stream}</p>
                                <p className=' w-[6%]'>{student?.gender}</p>
                                <p className=' w-[10%]'>{student?.dateOfBirth}</p>
                                <div className=' w-[7%] flex gap-6 text-2xl'>
                                    <p onClick={()=>editModalHandler(student?.id)} className='cursor-pointer'><CiEdit/></p>
                                    <p onClick={()=>deleteStudent(student.id)} className='cursor-pointer'><MdDeleteOutline/></p>
                                </div>
                            </div>
                })
            }

            {/* <div className='flex  justify-between py-3 px-2 border-b border-[#c5c5c5]'>
                <p className=' w-[7%]'>2.</p>
                <p className=' w-[17%]'>Priya Singh</p>
                <p className=' w-[5%]'>10</p>
                <p className=' w-[6%]'>B</p>
                <p className=' w-[6%]'>46</p>
                <p className=' w-[9%]'>9824564341</p>
                <p className=' w-[8%]'>Arts</p>
                <p className=' w-[6%]'>Female</p>
                <p className=' w-[10%]'>2008-07-20</p>
                <div className=' w-[7%] flex gap-6 text-2xl'>
                    <p className='cursor-pointer'><CiEdit/></p>
                    <p className='cursor-pointer'><MdDeleteOutline/></p>
                </div>
            </div> */}

        </div>


        {/* Add Student modal  */}
        {
          openModal &&

          <div className=' fixed inset-0  bg-opacity-55 backdrop-blur-xs  flex items-center justify-center  transition ease-in-out duration-300'>
            <div className='bg-white border border-black min-h-[510px]  w-[500px]  px-6 py-2 rounded-2xl'>
                <div className='flex justify-between items-center mt-4'>
                  <h1 className='text-3xl font-semibold  '>Student Details</h1>
                  <p  onClick={modal} className='text-2xl cursor-pointer'><GiSkullCrossedBones/></p>
                </div>
                
                <form onSubmit={handleSubmitForm1(addStudent)} className='mt-5 flex flex-col gap-3'>

                    <div className='flex flex-col gap-2'>
                      <label htmlFor="">Name* </label>
                      <input {...register1('name',{required:true})} type="text" placeholder='Name' className='border px-4 py-2 rounded-lg outline-none' />
                      {errors1.name && <p className='text-red-500 -mt-2'>*Name is important</p>}
                    </div>

                    <div className='flex gap-6'>

                        <div className='flex flex-col gap-2'>
                        <label htmlFor="">Class* </label>
                        <input {...register1('class',{required:true})}  type="text" placeholder='Class' className='border px-4 py-2 rounded-lg outline-none' />
                        {errors1.class && <p className='text-red-500 -mt-2'>*Class is important</p>}
                        </div>

                        <div className='flex flex-col gap-2'>
                        <label htmlFor="">Section* </label>
                        <input type="text" {...register1('section',{required:true})}  placeholder='Section' className='border px-4 py-2 rounded-lg outline-none' />
                        {errors1.section && <p className='text-red-500 -mt-2'>*Section is important</p>}
                        </div>

                    </div>


                    
                    <div className='flex gap-6'>

                        
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="">Roll No.* </label>
                            <input type="text" {...register1('rollNo',{required:true})}  placeholder='Roll No.' className='border px-4 py-2 rounded-lg outline-none' />
                            {errors1.rollNo && <p className='text-red-500 -mt-2'>*Roll No. is important</p>}
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="">Phone No.* </label>
                            <input type="text" {...register1('phoneNo',{required:true})}  placeholder='Phone No.' className='border px-4 py-2 rounded-lg outline-none' />
                            {errors1.phoneNo && <p className='text-red-500 -mt-2'>*Phone No. is important</p>}
                        </div>

                    </div>

                    

                    <div className='flex flex-col gap-2'>
                      <label htmlFor="">Stream* </label>
                      <input type="text" {...register1('stream',{required:true})}  placeholder='e.g. Science, Commerce, Arts, or branch like CSE, IT, ECE' className='border px-4 py-2 rounded-lg outline-none' />
                      {errors1.stream && <p className='text-red-500 -mt-2'>*Stream is important</p>}
                    </div>

                    
                    <div className='flex gap-6 justify-between'>

                        <div className='flex flex-col gap-2'>
                        <label htmlFor="">Gender* </label>
                        <select name="" {...register1("gender",{required:true})} id="" className='outline-none border rounded-lg px-4 py-2 w-[215px]'>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors1.gender && <p className='text-red-500 -mt-2'>*Gender is important</p>} 
                        </div>

                        <div className='flex flex-col gap-2'>
                        <label htmlFor="">Date of Birth* </label>
                        <input type="date" {...register1('dateOfBirth',{required:true})}  placeholder='2010-04-10' className='border px-4 py-2 rounded-lg outline-none w-[215px]' />
                        {errors1.dateOfBirth && <p className='text-red-500 -mt-2'>*DOB is important</p>}
                        </div>

                    </div>
                    
                    <div className='flex gap-6 justify-between'>

                        <div className='flex flex-col gap-2'>
                        <label htmlFor="">Role* </label>
                        <select name=""  id="" className='outline-none border rounded-lg px-4 py-2 w-[215px]'>
                            <option value="Student">Student</option>
                            <option value="Admin">Admin</option>
                            <option value="Instructor">Instructor</option>
                        </select>
                        </div>

                        <div className='flex flex-col gap-2'>
                        <label htmlFor="">Blood Group* </label>
                        <input type="text"   placeholder='grp A, grp B etc' className='border px-4 py-2 rounded-lg outline-none w-[215px]' />
                        </div>

                    </div>



                    <button type="submit" className='bg-blue-400 mb-3 cursor-pointer  text-white font-semibold px-4 py-2 rounded-lg'>Submit</button>
                </form>
            </div>
          </div>
        }


        {/* Edit student Record Modal  */}
        {/* Edit hotel  */}
        {
          editModal &&

          <div className=' fixed inset-0  bg-opacity-55 backdrop-blur-xs  flex items-center justify-center'>
            <div className='bg-white border border-black min-h-[510px]  w-[500px]  px-6 py-2 rounded-2xl'>
                <div className='flex justify-between items-center mt-4'>
                  <h1 className='text-3xl font-semibold  '>Edit Student Details</h1>
                  <p  onClick={editModalHandler} className='text-2xl cursor-pointer'><GiSkullCrossedBones/></p>
                </div>
                
                <form onSubmit={handleSubmitForm2(editStudentRecord)} className='mt-5 flex flex-col gap-4'>

                    <div className='flex flex-col gap-2'>
                      <label htmlFor="">Name* </label>
                      <input {...register2('name')} type="text" placeholder='Name' className='border px-4 py-2 rounded-lg outline-none' />
                    </div>

                    <div className='flex gap-6'>

                        <div className='flex flex-col gap-2'>
                        <label htmlFor="">Class* </label>
                        <input {...register2('class')}  type="text" placeholder='Class' className='border px-4 py-2 rounded-lg outline-none' />
                        </div>

                        <div className='flex flex-col gap-2'>
                        <label htmlFor="">Section* </label>
                        <input type="text" {...register2('section')}  placeholder='Section' className='border px-4 py-2 rounded-lg outline-none' />
                        </div>

                    </div>


                    
                    <div className='flex gap-6'>

                        
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="">Roll No.* </label>
                            <input type="text" {...register2('rollNo')}  placeholder='Roll No.' className='border px-4 py-2 rounded-lg outline-none' />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="">Phone No.* </label>
                            <input type="text" {...register2('phoneNo')}  placeholder='Phone No.' className='border px-4 py-2 rounded-lg outline-none' />
                        </div>

                    </div>

                    

                    <div className='flex flex-col gap-2'>
                      <label htmlFor="">Stream* </label>
                      <input type="text" {...register2('stream')}  placeholder='e.g. Science, Commerce, Arts, or branch like CSE, IT, ECE' className='border px-4 py-2 rounded-lg outline-none' />
                    </div>

                    
                    <div className='flex gap-6 justify-between'>

                        <div className='flex flex-col gap-2'>
                        <label htmlFor="">Gender* </label>
                        <select name="" {...register2("gender")} id="" className='outline-none border rounded-lg px-4 py-2 w-[215px]'>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        </div>

                        <div className='flex flex-col gap-2'>
                        <label htmlFor="">Date of Birth* </label>
                        <input type="date" {...register2('dateOfBirth')}  placeholder='2010-04-10' className='border px-4 py-2 rounded-lg outline-none w-[215px]' />
                        </div>

                    </div>
                    
                    <div className='flex gap-6 justify-between'>

                        <div className='flex flex-col gap-2'>
                        <label htmlFor="">Role* </label>
                        <select name=""  id="" className='outline-none border rounded-lg px-4 py-2 w-[215px]'>
                            <option value="Student">Student</option>
                            <option value="Admin">Admin</option>
                            <option value="Instructor">Instructor</option>
                        </select>
                        </div>

                        <div className='flex flex-col gap-2'>
                        <label htmlFor="">Blood Group* </label>
                        <input type="text"   placeholder='grp A, grp B etc' className='border px-4 py-2 rounded-lg outline-none w-[215px]' />
                        </div>

                    </div>



                    <button type="submit" className='bg-blue-400 mb-3 cursor-pointer  text-white font-semibold px-4 py-2 rounded-lg'>Submit</button>
                    
                </form>
            </div>
          </div>
        }





      
    </div>
  )
}

export default StudentDashboard
