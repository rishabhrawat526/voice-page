import React from 'react'
import {useSelector} from "react-redux"
import { Link,NavLink } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import LogoutBtn from './LogoutBtn';
function Header() {
    const authStatus = useSelector((state)=>state.auth.status);
    const navigate = useNavigate();
    const navitems = [
        {
            name: 'Home',
            slug: "/",
            active: true
          }, 
          {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]
  return (
    <header className='py-3 shadow bg-purple-500'>
        <nav className='flex'>
            <div className='m-4 text-white'>
                Logo
            </div>
            <ul className='flex ml-auto'>
                {navitems.map((item)=>{
                    return item.active ?(<li key={item.name} ><NavLink to={item.slug} className={({isActive}) =>`inline-bock px-6 py-2 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} hover:bg-blue-100 rounded-full`}>{item.name}</NavLink></li>):null;
                })}
                {authStatus && (<li><LogoutBtn/></li>)}
            </ul>

        </nav>
    </header>
  )
}

export default Header