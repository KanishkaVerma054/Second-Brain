import React, { ReactElement } from 'react'

const SidebarItem = ({ text, icon }:{ text: string, icon: ReactElement }) => {
  return (
    <div className='flex text-gray-700 cursor-pointer gap-4 hover:bg-gray-200  rounded max-w-64 pl-4  items-center py-3'>
      <div>{icon}</div>
      <div>{text}</div>
    </div>
  )
}

export default SidebarItem