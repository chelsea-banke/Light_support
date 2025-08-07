import { NavLink } from "react-router-dom"
import './app-button.css'

export const AppButton = ({text, className, style='1', type='button', action=()=>{}})=>{
    return(
        <button type={type} className={`
                app-button border-2 px-4 rounded-full w-full font-semibold text-sm h-10 flex items-center justify-center hover:cursor-pointer
                ${
                    style == '1' ? 'border-summer-sky bg-[#0d69a5] text-white' : 
                    style == '2' ? 'border-summer-sky bg-white text-summer-sky' : 
                    style == '3' ? 'border-red-600 bg-white text-red-600' : `${style}`
                } ${className}`} onClick={() => action()} >
            {text}
        </button>
    )
}