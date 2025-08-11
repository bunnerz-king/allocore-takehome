import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout
 = () => {
  return (
    <div className="h-screen text-base max-h-screen flex flex-col  ">
        <div className='p-2 px-4 shadow  z-100 border-b border-slate-300 text-white font-bold bg-slate-700'>RootbeerFinder</div>
        <div className='flex flex-col flex-1 min-h-0 overflow-y-auto'>
        <Outlet />
        </div>
    </div>
  )
}

export default Layout
