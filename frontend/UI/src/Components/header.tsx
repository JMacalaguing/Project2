import { CalendarDays, LayoutDashboardIcon } from 'lucide-react'


function Header() {
const currentDate = new Date().toLocaleDateString();

  return (
    <header className="top-bar border-b border-gray-200 px-2 py-4 fixed w-full">
    <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <LayoutDashboardIcon className="h-6 w-6 text-black" />
          <span className="text-xl font-semibold text-black">Form</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays color="black" fill="white" />
          <span className="font-medium text-black">{currentDate}</span>
        </div>
      </div>

    </header>
  )
}

export default Header
