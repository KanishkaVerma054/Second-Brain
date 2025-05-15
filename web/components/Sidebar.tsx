import React from 'react'
import SidebarItem from './SidebarItem'
import Twitter from '@/public/icons/Tweet'
import { Brain, FileText } from 'lucide-react'
import Videos from '@/public/icons/Videos'
import Documents from '@/public/icons/Documents'
import Link from '@/public/icons/Link'
import Tags from '@/public/icons/Tags'

const Sidebar = () => {
  return (
    <div className='w-72 h-screen border-r bg-white border-gray-300'>
      <div className="flex items-center gap-2 p-6">
        <Brain className="h-8 w-8 text-primary text-indigo-600" />
        <span className="text-2xl font-semibold">Second Brain</span>
      </div>
      <div className='pt-8 pl-4 flex flex-col space-y-3'>
        <SidebarItem text='Tweets' icon={<Twitter/>}/>
        <SidebarItem text='Videos' icon={<Videos/>}/>
        <SidebarItem text='Documents' icon={<Documents/>}/>
        <SidebarItem text='Link' icon={<Link/>}/>
        <SidebarItem text='Tags' icon={<Tags/>}/>
      </div>
    </div>
  )
}

export default Sidebar