import { useState } from 'react'
import SortDropDown from '../SortDropDown/SortDropDown'
import { FaListUl, FaThLarge, FaFilter, FaArrowDown } from 'react-icons/fa'

const Options = ({mode, setMode}) => {

  const switchToGrid = () => {
    if(mode === "list") setMode("grid");
    localStorage.setItem("mode", mode);
  }

  const switchToList = () => {
    if(mode === "grid") setMode("list");
    localStorage.setItem("mode", mode);
  }
  
  return (
    <div className='flex flex-row justify-between items-center h-20 px-10'>
        <div className='flex flex-row justify-center items-center gap-4 text-2xl'>
            <span className={mode === "grid" ?'cursor-pointer border-2 bg-slate-200 rounded-sm w-12 h-12 flex justify-center items-center' : 'cursor-pointer w-12 h-12 flex justify-center items-center'} onClick={switchToGrid}><FaThLarge/></span>
            <span className={mode === "list" ?'cursor-pointer border-2 bg-slate-200 rounded-sm w-12 h-12 flex justify-center items-center' : 'cursor-pointer w-12 h-12 flex justify-center items-center'} onClick={switchToList}><FaListUl/></span>
        </div>
        <span className='flex flex-row justify-center items-center gap-4 text-xl'>Sort by: <SortDropDown/></span>
    </div>
  )
}

export default Options