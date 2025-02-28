import { CalendarDays, LayoutDashboardIcon } from 'lucide-react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


function Header() {
const currentDate = new Date().toLocaleDateString();

  return (
    <header className="top-bar border-b border-gray-200 px-2 py-4 fixed w-full">
    <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <LayoutDashboardIcon className="h-6 w-6 text-white" />
          <span className="text-xl font-semibold text-white">Dashboard</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarMonthIcon className='text-white'/>
          <span className="font-medium text-white">{currentDate}</span>
        </div>
      </div>

    </header>
  )
}

export default Header
