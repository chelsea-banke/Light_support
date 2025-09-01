import { useSelector } from "react-redux"
import { AppButton } from "../../../../components/app-button/app-button"
import { AppModal } from "../../../../components/app-modal/app-modal"
import { useState } from "react"
import { TicketEditor } from "../modals/ticket-editor"
import { TicketCreator } from "../modals/ticket-creator"
import { FaultEditor } from "../modals/fault-editor"

export const DetailsComponent = ({request}) => {

	const faultState = useSelector((state) => state.fault)
	const clientState = useSelector((state) => state.client)
	const [ticketModalDisplay, setTicketModalDisplay] = useState(false)
	const [faultModalDisplay, setFaultModalDisplay] = useState(false)

	if (request === null) {
		return(
			<div className="text-center m-auto text-gray-400">Select a request to start chatting</div>
		)
	}
	
    return(
        <>	
            <div className='space-y-3'>
                <div className='flex justify-between'>
			    	<div className="font-semibold">First Name</div>
                    <div className='flex-1 mx-1 border-b border-dotted mb-[5px]' />
                    <div>{clientState.client.firstName}</div> 
			    </div>              
			    <div className='flex justify-between'>
			    	<div className="font-semibold">Last Name</div>
                    <div className='flex-1 mx-1 border-b border-dotted mb-[5px]' />
                    <div>{clientState.client.lastName}</div> 
			    </div>
			    <div className='flex justify-between'>
			    	<div className="font-semibold">Contact</div>
                    <div className='flex-1 mx-1 border-b border-dotted mb-[5px]' />
                    <div>{clientState.client.contact}</div>
			    </div>
			    <div className='flex justify-between'>
			    	<div className="font-semibold">Reported At</div>
                    <div className='flex-1 mx-1 border-b border-dotted mb-[5px]' />
                    <div>{faultState.fault.createdDate}</div> 
			    </div>
			    <div className='flex justify-between'>
			    	<div className="font-semibold">Status</div>
                    <div className='flex-1 mx-1 border-b border-dotted mb-[5px]' />
                    <div className='text-green-400'>{faultState.fault.status}</div> 
			    </div>
            </div>



            <div>
			    <div className="mt-20">
			    	<div className="font-semibold block mb-1">Description</div>
			    	<p className="text-gray-300 leading-relaxed text-justify">
			    		{faultState.fault.description}	
					</p>
			    </div>
			    <div className="gap-3 pt-4">
			    	<button className="px-4 py-2 border border-white rounded w-full" onClick={()=>{setFaultModalDisplay(true)}}>Edit Fault</button>
                    <div className='flex gap-2 mt-2'>
					{
						faultState.fault.type != "FIELD_INTERVENTION" ? 
						<>
							<AppButton text={'save'} />
                        	<AppButton action={()=>{setTicketModalDisplay(true)}} text={'escalate'} />
						</>
						:
                        	<AppButton action={()=>{setTicketModalDisplay(true)}} text={'Open Ticket'} />
					}
                    </div>
			    </div>
            </div>
			<AppModal
				id="ticket-editor"
				title="Ticket Editor"
				open={ticketModalDisplay}
				onClose={() => setTicketModalDisplay(false)}
			>
				{
					faultState.fault.type != "FIELD_INTERVENTION" ? 
					<>
						<TicketCreator fault={faultState.fault} handleClose={()=> {setTicketModalDisplay(false)}} />
					</>
					:
            	    	<TicketEditor fault={faultState.fault} handleClose={()=> {setTicketModalDisplay(false)}} />
					}
			</AppModal>
				<AppModal
				id="fault-editor"
				title="Fault Editor"
				open={faultModalDisplay}
				onClose={() => setFaultModalDisplay(false)}
			>
				<FaultEditor  handleClose={()=> {setFaultModalDisplay(false)}} />	
			</AppModal>
		</>
    )
} 