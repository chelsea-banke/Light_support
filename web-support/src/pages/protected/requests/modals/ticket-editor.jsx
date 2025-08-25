import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import { AppButton } from "../../../../components/app-button/app-button"
import { AppInput } from "../../../../components/app-input/app-input"
import AppMap from "../../../../components/app-map/app-map"
import { AppProperty } from "../../../../components/app-property/app-property"
import ticketService from "../../../../services/ticket-service"
import { useSelector } from "react-redux"

export const TicketEditor = ({ticketId})=>{

    const [ticket, setTicket] = useState(null)
    const faultState = useSelector((state) => state.fault)
    const clientState = useSelector((state) => state.client)
    const assetsState = useSelector((state) => state.assets)
    const [description, setDescription] = useState("")
    const [asset, setAsset] = useState(null)

    useEffect(()=>{
        ticketService.getTicket(faultState.fault.id).then( res => {
            setTicket(res)
            setDescription(res.description)
            const ass = assetsState.assets.filter(asset => asset.id == res.assetId)[0]
            setAsset(ass)
        })
    }, [ticketId])

    if(ticket == null){
        return(
            <>fetching ticket...</>
        )
    }

    return (
        <div className="bg-white text-gray-600 overflow-hidden rounded-xl flex w-[80vw] h-[80vh]">
            <div className="w-2/3 flex flex-col justify-between  p-8">
                <div className="flex gap-x-10 justify-between w-full">
                    <div className='flex flex-col gap-8 w-full'>
                        <div className="flex flex-col gap-2">
                            <AppProperty name={"client id"} value={clientState.client.id} />
                            <AppProperty name={"first name"} value={clientState.client.firstName} />
                            <AppProperty name={"last name"} value={clientState.client.lastName} />
                            <AppProperty name={"contact"} value={clientState.client.contect} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <AppProperty name={"fault id"} value={faultState.fault.id} />
                            <AppProperty name={"date created"} value={faultState.fault.createdDate} />
                            <AppProperty name={"status"} value={faultState.fault.status} />
                            <AppProperty name={"type"} value={faultState.fault.type} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <AppProperty name={"ticket id"} value={ticket.id} />
                            <AppProperty name={"priority"} value={ticket.priority} />
                            <AppProperty name={"status"} value={ticket.status} />
                            <AppProperty name={"field support id"} value={ticket.fieldSupportId} />
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-y-8">
                        <div>
                            <label htmlFor="matricule" className="block text-sm font-medium text-gray-500">Description<span className="text-red-500">*</span>
                            </label>
                            <textarea
                                rows={7}
                                className="mt-1 text-sm block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                value={description}
                            />
                        </div>
                        <div className="p-4 bg-gray-100 flex flex-col gap-2">
                            <AppProperty name={"asset id"} value={asset.id} />
                            <AppProperty name={"longitude"} value={asset.longitude} />
                            <AppProperty name={"lattitude"} value={asset.latitude} />
                            <AppProperty name={"address"} value={asset.address} />
                            <AppProperty name={"type"} value={asset.type} />
                        </div>
                    </div>
                </div>
                <div className="flex justify-between gap-2">
                    <AppButton text={"cancel changes"} />
                    <AppButton text={"save changes"} />
                </div>
            </div>
            <div className="w-1/3">
                <AppMap
			    	center={[asset.latitude, asset.longitude]} /* Yaoundé-ish */
			    	zoom={200}
			    	markers={[
			    		{ position: [3.861, 11.518], popup: <div>Marker A</div> },
			    		{ position: [3.847, 11.506], popup: <b>Marker B</b> }
			    	]}
			    />
            </div>
            <div className='absolute w-[32.5%] right-4 z-400 py-2 flex back-blur px-4 rounded-b-lg border-b-2'>
                <FontAwesomeIcon icon={'magnifying-glass'} size='x' className='mt-1' />
                <input type="text" placeholder="Search..." className='focus:outline-none focus:border-blue-500 w-full pl-2' />
            </div>
        </div>
    )
}