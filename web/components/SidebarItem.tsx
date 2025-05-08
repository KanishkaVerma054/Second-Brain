import React, { ReactElement } from 'react'

const SidebarItem = ({ text, icon }:{ text: string, icon: ReactElement }) => {
  return (
    <div className='flex text-gray-700 cursor-pointer hover:bg-gray-200 rounded max-w-64 pl-4 transition items-center'>
      <div className='pr-2'>{icon}</div>
      <div>{text}</div>
    </div>
  )
}

export default SidebarItem