import React, { useEffect } from "react";
import Cart from "src/components/Cart";
import Profile from "./Profile";
import Footer from "./Footer";
import NavBar from "src/components/NavBar";
import {useSelector, useDispatch} from 'react-redux'
import {uiActions} from '../store/slices/uiSlice'

import {AnimatePresence} from "framer-motion"
import {signIn} from '../store/slices/userSlice'
import {getItems} from '../store/slices/itemsSlice'


function Layout({ children }) {

  const cartShow = useSelector(state => state.ui.cartShow)
  const profileShow = useSelector(state => state.ui.profileShow)

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getItems())
  }, [])

  useEffect(()=>{
    const userData = localStorage.getItem("account")
    if(userData){
      const userDataP = JSON.parse(userData)
      dispatch(signIn(userDataP.email, userDataP.password))
    }
  },[])

  return (
    <>

        <header className="relative">
            <NavBar/>
            <AnimatePresence>{cartShow && <Cart setShow={()=> dispatch(uiActions.showCart())} />}</AnimatePresence>
            <AnimatePresence>{profileShow && <Profile setShow={()=> dispatch(uiActions.showProfile())} />}</AnimatePresence>
        </header>
        <main>
            {children}
        </main>
        <footer>
          <Footer />
        </footer>

    </>
  );
}

export default Layout;
