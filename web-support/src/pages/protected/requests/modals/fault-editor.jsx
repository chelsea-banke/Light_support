import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useRef, useState } from "react"
import { AppButton } from "../../../../components/app-button/app-button"
import { AppProperty } from "../../../../components/app-property/app-property"
import { useDispatch, useSelector } from "react-redux"
import { getAssets } from "../../../../redux/middleware/assets-middleware"
import ticketService from "../../../../services/ticket-service"
import { getFault } from "../../../../redux/middleware/fault-middleware"
import StageStepper from "../../../../components/stage-stepper/stage-stepper"
import faultService from "../../../../services/fault-service"

export const FaultEditor = ({handleClose})=>{

    const dispatch = useDispatch()
    const assetsState = useSelector((state) => state.assets)
    const faultState = useSelector((state) => state.fault)
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("ACTIVE")

    useEffect(()=>{
        dispatch(getAssets())
        dispatch(getFault(faultState.fault.id))
        setDescription(faultState.fault.description)
    }, [])

    const stages = [
        { id: 1, label: "Active" },
        { id: 2, label: "Pending" },
        { id: 3, label: "Completed" }
    ];

    const handleSaveChanges = () => {
        const updatedData = {
            id: faultState.fault.id,
            description,
            status
        };
        faultService.updateFault(updatedData).then(response => {
            dispatch(getFault(faultState.fault.id))
            handleClose()
        })
    };

    return (
        <div className="bg-white text-gray-600 overflow-hidden rounded-xl flex w-[50vw] h-[80vh]">
            <div className="flex flex-col justify-between w-full p-8">
                <div className="w-full">
                    <div className='flex gap-x-10 justify-between gap-8 w-full'>
                        <div className="flex flex-col gap-2 w-1/2">
                            <AppProperty name={"client id"} value={"xxxx-xxxx-xxxx"} />
                            <AppProperty name={"first name"} value={"John"} />
                            <AppProperty name={"last name"} value={"Doe"} />
                            <AppProperty name={"contact"} value={"123-456-567"} />
                        </div>
                        <div className="flex flex-col gap-2 w-1/2">
                            <AppProperty name={"fault id"} value={"xxxx-xxxx-xxxx"} />
                            <AppProperty name={"date created"} value={"12//12/2025"} />
                            <AppProperty name={"status"} value={"active"} />
                            <AppProperty name={"desk support id"} value={"xxxx-xxxx-xxxx"} />
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-y-8 mt-10">
                        <div>
                            <label htmlFor="matricule" className="block text-sm text-gray-500 font-bold">Description<span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={description}
                                rows={3}
                                className="mt-1 text-sm block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                onChange={(e)=>{setDescription(e.target.value)}}
                            />
                        </div>
                        <StageStepper stages={stages} activeStage={faultState.fault.status === "ACTIVE" ? 0 : faultState.fault.status === "PENDING" ? 1 : 2} handleChange={(stage) => {
                            setStatus(stage.label.toUpperCase())
                        }} />
                    </div>
                </div>
                <div className="flex justify-between gap-2">
                    <AppButton text={"Save Changes"} action={() => handleSaveChanges()} />
                </div>
            </div>
        </div>
    )
}