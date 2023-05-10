import { MdSportsBasketball, MdSportsFootball, MdSportsGolf, MdSportsHandball, MdSportsRugby, MdSportsGymnastics } from "react-icons/md";

export default function sportssearch(){
    return (
        <div className="overflow-auto flex flex-row justify-center border-t-2 border-b-2 border-{#0a248f} space-x-4 mt-6 mb-6 pt-4 pb-4 ">
            <a href="#"><MdSportsBasketball size={50} color="#b430a6"/></a>
            <a href="#"><MdSportsFootball size={50} color="#b430a6"/></a>
            <a href="#"><MdSportsGolf size={50} color="#b430a6"/></a>
            <a href="#"><MdSportsHandball size={50} color="#b430a6"/></a>
            <a href="#"><MdSportsRugby size={50} color="#b430a6" /></a>
            <a href="#"><MdSportsGymnastics size={50} color="#b430a6" /></a>
            

        </div>
    )
}