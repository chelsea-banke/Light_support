import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useRef, useState } from "react"
import { AppButton } from "../../../../components/app-button/app-button"
import { AppInput } from "../../../../components/app-input/app-input"
import AppMap from "../../../../components/app-map/app-map"
import { AppProperty } from "../../../../components/app-property/app-property"
import { useDispatch, useSelector } from "react-redux"
import { getAssets } from "../../../../redux/middleware/assets-middleware"
import AppDropdownSearch from "../../../../components/app-dropdown-search/app-dropdown-search"
import ticketService from "../../../../services/ticket-service"
import { getFault } from "../../../../redux/middleware/fault-middleware"

export const TicketCreator = ({handleClose})=>{

    const dispatch = useDispatch()
    const assetsState = useSelector((state) => state.assets)
    const faultState = useSelector((state) => state.fault)
    const [selectedAsset, setSelectedAsset] = useState(null)
    const [description, setDescription] = useState("")
    const mapRef = useRef(null)

    useEffect(()=>{
        dispatch(getAssets())
        console.log(assetsState);
        
    }, [])

    const createTicketHandler = ()=>{
        ticketService.createTicket({
            description: description,
            faultId: faultState.fault.id,
            assetId: selectedAsset.id
        }).then((response) => {
            dispatch(getFault(faultState.fault.id))
            handleClose();
        })
    }

    return (
        <div className="bg-white text-gray-600 overflow-hidden rounded-xl flex w-[80vw] h-[80vh]">
            <div className="w-2/3 flex flex-col justify-between  p-8">
                <div className="flex gap-x-10 justify-between w-full">
                    <div className='flex flex-col gap-8 w-full'>
                        <div className="flex flex-col gap-2">
                            <AppProperty name={"client id"} value={"xxxx-xxxx-xxxx"} />
                            <AppProperty name={"first name"} value={"John"} />
                            <AppProperty name={"last name"} value={"Doe"} />
                            <AppProperty name={"contact"} value={"123-456-567"} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <AppProperty name={"fault id"} value={"xxxx-xxxx-xxxx"} />
                            <AppProperty name={"date created"} value={"12//12/2025"} />
                            <AppProperty name={"status"} value={"active"} />
                            <AppProperty name={"desk support id"} value={"xxxx-xxxx-xxxx"} />
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-y-8">
                        <div>
                            <label htmlFor="matricule" className="block text-sm font-medium text-gray-500">Description<span className="text-red-500">*</span>
                            </label>
                            <textarea
                                rows={7}
                                className="mt-1 text-sm block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                onChange={(e)=>{setDescription(e.target.value)}}
                            />
                        </div>
                        <div className="p-4 bg-gray-100 flex flex-col gap-2">
                            {selectedAsset == null ? 
                            <>no asset selected yet</>:
                            <>
                                <AppProperty name={"asset id"} value={selectedAsset.id} />
                                <AppProperty name={"longitude"} value={selectedAsset.longitude} />
                                <AppProperty name={"latitude"} value={selectedAsset.latitude} />
                                <AppProperty name={"address"} value={selectedAsset.address} />
                                <AppProperty name={"type"} value={selectedAsset.type} />
                            </>
                            }
                        </div>
                    </div>
                </div>
                <div className="flex justify-between gap-2">
                    <AppButton text={"Create Ticket"} action={()=>{createTicketHandler()}} />
                </div>
            </div>
            <div className="w-1/3">
                <AppMap
                    ref={mapRef}
			    	center={selectedAsset == null ? [0, 0] : [selectedAsset.longitude, selectedAsset.latitude]} /* Yaoundé-ish */
			    	zoom={200}
			    	markers={assetsState.assets.map((asset) => {
						return (
							{ 
                                position: [asset.latitude, asset.longitude],
                                popup: <div className="font-bold">{asset.address}</div>,
                                object: asset
                            }
						)
					})}
                    labelClickHandler={(object) => {setSelectedAsset(object); console.log(object);
                    }}
			    />
            </div>
            <div className='absolute w-[32.5%] right-4 z-400 flex back-blur rounded-b-lg border-b-2'>
                <AppDropdownSearch
			    	items={assetsState.assets.map((asset) => asset.id)}
			    	onSelect={(id) => {
                        const asset = assetsState.assets.find((a) => a.id === id)
                        setSelectedAsset(asset)
                        mapRef.current.focusOnPoint(selectedAsset.latitude, selectedAsset.longitude, 14)
                    }}
			    />
            </div>
        </div>
    )
}