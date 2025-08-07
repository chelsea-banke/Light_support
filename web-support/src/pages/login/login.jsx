import { useNavigate } from "react-router-dom"
import { AppButton } from "../../components/app-button/app-button"
import { AppInput } from "../../components/app-input/app-input"

export const Login = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-[#d1edff] flex flex-col items-center justify-center">
            <div className="text-center w-full px-8 max-w-md flex justify-end mt-[-100px]">
                <img src="eneo-logo.png" alt="" className="w-40 h-fit mt-4" />
                <img src="light-logo.png" alt="" className="w-20 ml-[-20px]"/>
            </div>

            <div className="max-w-md w-full mt-5">
                <form className="bg-white rounded-lg py-10 px-8 space-y-4 w-10/12 mx-auto">
                    <AppInput label={"Matricule"} placeholder={"xxxx-xxxx-xxxx"}/>
                    <AppInput label={"Password"} placeholder={". . . . . . . . ."} type="password"/>
                    <AppButton text={"Login"} className={"w-full rounded-full mt-8"} action={()=>{navigate("/user/dashboard")}} />
                </form>
            </div>
            <div className="w-screen py-10 bg-white absolute bottom-0 border-t border-[#0d69a5]"></div>
        </div>
    )
}