import { useNavigate } from "react-router-dom"
import { AppButton } from "../../components/app-button/app-button"
import { AppInput } from "../../components/app-input/app-input"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/middleware/user-auth";

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [matricule, setMatricule] = useState("");
    const [password, setPassword] = useState("");
    const userState = useSelector((state) => state.user)
    const authState = useSelector((state) => state.auth)

    const handleLogin = async () => {
        if (!matricule || !password) {
            console.log("invalid fields");
        }
        else{
            const results = await dispatch(loginUser({ matricule, password }))
            if(loginUser.fulfilled.match(results)) {
                navigate("/user/dashboard")
            }
            else{
                console.error("Login failed:", results.error.message);
            }
        }
    }

    return (
        <div className="min-h-screen bg-[#d1edff] flex flex-col items-center justify-center">
            <div className="text-center w-full px-8 max-w-md flex justify-end mt-[-100px]">
                <img src="eneo-logo.png" alt="" className="w-40 h-fit mt-4" />
                <img src="light-logo.png" alt="" className="w-20 ml-[-20px]"/>
            </div>

            <div className="max-w-md w-full mt-5">
                <form className="bg-white rounded-lg py-10 px-8 space-y-4 w-10/12 mx-auto">
                    <AppInput label={"Matricule"} placeholder={"xxxx-xxxx-xxxx"} value={matricule} onChangehandler={setMatricule} />
                    <AppInput label={"Password"} placeholder={". . . . . . . . ."} type="password" value={password} onChangehandler={setPassword} />
                    <AppButton text={"Login"} className={"w-full rounded-full mt-8"} action={()=>{handleLogin()}} />
                </form>
            </div>
            <div className="w-screen py-10 bg-white absolute bottom-0 border-t border-[#0d69a5]"></div>
        </div>
    )
}