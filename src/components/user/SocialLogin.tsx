import React, {useState, useEffect} from 'react'
import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db} from "@/config/firebase-config";
import { addDoc, collection } from 'firebase/firestore';
import {useSelector} from 'react-redux'
import { signIn } from '@/store/slices/userSlice';
import {useDispatch} from 'react-redux';
import {useRouter} from 'next/navigation';


function SocialLogin({setLogin,setSignup}) {
  const dispatch = useDispatch()
  const router = useRouter();
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [PError, setPError] = useState(false)
const [username, setUsername] = useState('')
const [EError, setEError] = useState(false)
const [UError, setUError] = useState(false)
const userConnected = useSelector(state=>state.user.connected)

useEffect(()=>{
  if(userConnected){
     router.replace("/")
  }
}, [userConnected])
  function createAccount(e){
    e.preventDefault()
if( username != ''){
  setUError(false)
  if( email != '' && email.includes('.')){
    setEError(false)
    if(password != '' && password.length >= 6){
      createUserWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
    // Signed in
    const user = userCredential.user;

       const userCol = collection(db, "users")
       await addDoc(userCol, {uid : user.uid, username : username, email : user.email, wishlist :[]})
       dispatch(signIn(email, password))


    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
    // ..
  });
    } else {
      setPError(true)
    }

  }else {
    setEError(true)
  }
}else {
  setUError(true)
}

  }



  return (
    <div className='w-full text-black flex justify-center items-center '>
    <div className='px-5 flex  w-full justify-center items-center'>
        <div className='flex-1'>
            <h1 className='text-3xl font-bold mb-2'>Login </h1>
            <p className='text-gray-500 mb-4'>Login to complete your order </p>
            <div className='space-y-4'>
               <button className='flex items-center font-bold text-white bg-primary px-8 py-3 rounded-full'>
                   <img src="/images/svg/google.svg" className='mr-2' alt="google"/>
                   <span>Continue with Google</span>
               </button>
               <button className='flex items-center font-bold text-white bg-primary px-8 py-3 rounded-full'>
                   <img src="/images/svg/facebook.svg" className='mr-2' alt="google"/>
                   <span>Continue with Facebook</span>
               </button>
                <p className='text-gray-500'>Or use your password to <span  className='font-bold underline text-gray-700' onClick={()=>setSignup()}>sign up</span> or <span className='font-bold underline text-gray-700 '  onClick={()=>setLogin()}>login</span></p>
            </div>
        </div>
    </div>
</div>
  )
}

export default SocialLogin
