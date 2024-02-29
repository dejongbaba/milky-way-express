import React, {useEffect, useState} from 'react'
import {signIn} from '@/store/slices/userSlice'
import {useDispatch, useSelector} from 'react-redux'
import {useRouter} from 'next/navigation'


function LogIn({setSocialLogin}) {
    const dispatch = useDispatch()
    const router = useRouter()
const [email, setEmail] = useState('')
const [PError, setPError] = useState(false)
const [EError, setEError] = useState(false)

const [password, setPassword] = useState('')
const userConnected = useSelector(state=>state.user.connected)
const connectionError = useSelector(state=>state.user.connectionError)

useEffect(()=>{
    if(userConnected){
       router.replace("/")
    }
}, [userConnected])

async function  signin(e){

    e.preventDefault()
  if(email != '' && email.includes('.')){
    setEError(false)
    if(password != '' && password.length >= 6){
        dispatch(signIn(email, password))

    }else {
        setPError(true)
    }
  }else {
    setEError(true)
  }



  }



  return (
    <div className='min-h-screen w-full  flex justify-center items-center '>

    <div className='md:px-52 px-5 gap-3 flex md:gap-20 w-full justify-center'>

        <div className='flex-1'>
        <h1 className='text-4xl'>Login</h1>
            <p className='text-gray-500'>Login to complete your order</p>
            <form className='w-full flex flex-col md:text-xl md:mt-20 mt-10 md:gap-10 gap-5 md:w-[470px]'>
            {userConnected && <div className='w-full py-3 bg-green-200 text-green-600 flex justify-center items-center'>
    You have successfully logged in !
</div>}
            {connectionError && <div className='w-full py-3 bg-red-200 text-red-600 flex justify-center items-center'>
    This account could not be found.
</div>}
                <div className='relative'>

                <input placeholder='Email' type="email" name="email" id="email" className={`border border-1 border-gray-300 rounded-xl focus:bg-gray-200 hover:bg-gray-200 pl-12 py-3 outline-none  w-full ${EError && 'border-[0.7px] border-red-500'}`} onChange={(e)=>setEmail(e.target.value)}/>
                {EError && <p className='text-red-500'>this email is invalid !</p>}

                <img className='w-6 absolute top-10 left-3' src="/icons/mail-icon-black.svg" alt="" />
                </div>
               <div className='relative'>
                <input placeholder='Password' type="password" name="pass" id="pass" className={`border border-1 border-gray-300 rounded-xl focus:bg-gray-200 hover:bg-gray-200 pl-12 py-3 outline-none w-full ${PError && 'border-[0.7px] border-red-500'}`} onChange={(e)=>setPassword(e.target.value)}/>
                {PError && <p className='text-red-500'>Password must contain at least 6 characters !</p>}

                <img className='w-6 absolute top-10 left-3' src="/icons/lock-icon-black.svg" alt="" />
               </div>

                <button onClick={signin} type="submit" className='bg-primary rounded-xl px-6 py-3 text-white hover:bg-[#5d6c50]'>Login</button>
            </form>
            <p className='pt-5 font-normal underline cursor-pointer text-gray-500 text-center ' onClick={()=>setSocialLogin()}>Continue with Google or Facebook</p>
        </div>
    </div>
</div>
  )
}

export default LogIn
