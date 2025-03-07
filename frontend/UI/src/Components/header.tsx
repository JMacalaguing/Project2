import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


function Header() {
const currentDate = new Date().toLocaleDateString();

  return (
    <header className="top-bar border-b border-gray-200 px-2 py-4 fixed w-full" style={{backgroundImage: "url('/bg9.svg')", backgroundSize: "", backgroundPosition: "right"}}>
    <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Welcome Illustration" className="w-10 mx-auto shadow-2xl rounded-full mr-2 ml-3" />
          <span className="text-xl font-semibold text-white font-serif">Department of Budget and Management</span>
        </div>
        <div className="flex items-center gap-2 mr-3">
          <CalendarMonthIcon className='text-white'/>
          <span className="font-medium text-white">{currentDate}</span>
        </div>
      </div>

    </header>
  )
}

export default Header
