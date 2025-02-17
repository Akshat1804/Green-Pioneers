import React from 'react'
import { useStreakPoints } from '../Context/StreakPointsContext';
import { Link } from 'react-router-dom';
const NavBar = () => {

  const { streak, points, increaseStreak, increasePoints } = useStreakPoints(); // access context values
  const [showDetails, setShowDetails] = React.useState(false); // State to control card visibility




  return (
    
    <div>
        <nav id='nav' className='w-full text-white font-bold  h-[10%] flex justify-between items-center p-5    shadow-lg'>

            <Link to={'/'} className='text-2xl px-[75px]'>CO <sub>2</sub> Scope</Link>

            <div className='flex items-center space-x-5'>

            <div 
          className="relative flex items-center  p-2 rounded-full space-x-2 cursor-pointer"
          onMouseEnter={() => setShowDetails(true)} // Show details on hover
          onMouseLeave={() => setShowDetails(false)} // Hide details on mouse leave
        >
          <span className="font-semibold">🔥  {streak} Days</span>
          <div className="w-[1px] h-4 bg-white "></div>
          <span className="font-semibold">🏆  {points}</span>

          {/* Card with details on hover */}
          {showDetails && (
            <div className="absolute top-[100%] left-0  w-[250px] p-4 bg-white shadow-xl rounded-lg text-black">
              <h4 className="font-bold">Your Progress</h4>
              <p>🔥 Streak: {streak} Days</p>
              <p>🏆 Points: {points}</p>
              <Link
                to="/game"
                className="text-[#01b598] mt-2 block font-semibold"
              >
                Go to Game
              </Link>
            </div>
          )}
        </div>

                <i className="fa-solid fa-bell"> <label ></label></i>
                <h1>User <i className="fa-solid fa-profile"></i></h1>
                <i className="fa-solid fa-angle-down"></i>
            </div>

       
        </nav>

    </div>
  )
}

export default NavBar