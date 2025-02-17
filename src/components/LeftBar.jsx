import React from 'react'
import { Link } from 'react-router-dom'

const LeftBar = () => {
  return (
    <div id='bodi' className='w-[20%] text-white text-xl font-bold shadow-lg py-3  absolute '>
         
        <Link to={'/dashboard'} className='flex  items-start w-full mx-[90px] justify-start pt-20 space-x-2'>
        <i className="fa-solid fa-house"></i>
        <h1>Dashboard</h1>
        </Link>
        <Link to={'/Calculator'} className='flex  items-start w-full mx-[90px] justify-start pt-12 space-x-2'>
        <i className="fa-solid fa-calculator"></i>
        <h1>Calculator</h1>
        </Link>
        <Link to={'/Map'} className='flex  items-start w-full mx-[90px] justify-start pt-12 space-x-2'>
        <i className="fa-solid fa-map-location-dot"></i>
        <h1>Map</h1>
        </Link>
        <Link to={'/EcoScore'} className='flex  items-start w-full mx-[90px] justify-start pt-12 space-x-2'>
        <i className="fa-solid fa-star"></i>
        <h1>Eco Score</h1>
        </Link>
        <Link to={'/Quiz'} className='flex  items-start w-full mx-[90px] justify-start pt-12 space-x-2'>
        <i className="fa-solid fa-question"></i>
        <h1>Quiz</h1>
        </Link>
        <Link to={'/Project'} className='flex  items-start w-full mx-[90px] justify-start pt-12 space-x-2'>
        <i className="fa-solid fa-people-group"></i>
        <h1>Collab</h1>
        </Link>
        <Link to={'/Game'} className='flex  items-start w-full mx-[90px] justify-start pt-12 space-x-2'>
        <i className="fa-solid fa-gamepad"></i>
        <h1>Game</h1>
        </Link>
        <Link to={'/Tracker'} className='flex  items-start w-full mx-[90px] justify-start pt-12 space-x-2'>
        <i className="fa-solid fa-truck-moving"></i>
        <h1>Tracker</h1>
        </Link>
        <Link to={'/reminder'} className='flex  items-start w-full mx-[90px] justify-start pt-12 space-x-2'>
        <i className="fa-solid fa-bell"></i>
        <h1>Green Alert</h1>
        </Link>

        

    </div>
  )
}

export default LeftBar