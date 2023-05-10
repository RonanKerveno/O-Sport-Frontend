import { HiHome, HiUser } from 'react-icons/hi2'
import { HiSearch, HiPlus } from 'react-icons/hi'

export default function navbar() {
    return (
            
            <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-[#0a248f] rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
                <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
                    <button type="button" className=" border-r border-[#0a248f] bg-[#e5e6f6] inline-flex flex-col items-center justify-center px-5 rounded-l-full hover:bg-gray-50 dark:hover:bg-[#fffbf4] group ">
                        <HiSearch size={24} color="#b430a6"/>
                        <span className="sr-only">Search</span>
                    </button>
                    <button type="button" className="border-r border-[#0a248f] bg-[#e5e6f6] inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-[#fffbf4] group">
                        <HiHome size={24} color="#b430a6"/>
                        <span className="sr-only">Home</span>
                    </button>
                    <button type="button" className="border-r border-[#0a248f] bg-[#e5e6f6] inline-flex flex-col items-center justify-center px-5  hover:bg-gray-50 dark:hover:bg-[#fffbf4] group">
                        <HiUser size={24} color="#b430a6"/>
                        <span className="sr-only">Profil</span>
                    </button>
                    <button  type="button" className="bg-[#e5e6f6] inline-flex flex-col items-center justify-center px-5 rounded-r-full hover:bg-gray-50 dark:hover:bg-[#fffbf4] group">
                        <HiPlus size={24} color="#b430a6"/>
                        <span className="sr-only">Add</span>
                    </button>


                </div>
            </div>

    )
}