import { useSelector } from "react-redux"
import { AppButton } from "../../../../components/app-button/app-button"
import { AppModal } from "../../../../components/app-modal/app-modal"
import { useState } from "react"
import { TicketEditor } from "../modals/ticket-editor"
import { TicketCreator } from "../modals/ticket-creator"

export const DetailsComponent = ({request}) => {

	const faultState = useSelector((state) => state.fault)
	const clientState = useSelector((state) => state.client)
	const [modalDisplay, setModalDisplay] = useState(false)

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
                    <div className='text-green-400'>Active</div> 
			    </div>
            </div>
            <div>
			    <div className="mt-20">
			    	<div className="font-semibold block mb-1">Description</div>
			    	<p className="text-gray-300 leading-relaxed text-justify">
			    		Prioritize readability and accessibility: Choose fonts with clear letterforms, balanced spacing (kerning), and distinct characters to ensure readability for a wide range of users, including those with visual impairments...
			    	</p>
			    </div>
			    <div className="gap-3 pt-4">
			    	<button className="px-4 py-2 border border-white rounded w-full">Generate Description</button>
                    <div className='flex gap-2 mt-2'>
					{
						faultState.fault.type != "FIELD_INTERVENTION" ? 
						<>
							<AppButton text={'save'} />
                        	<AppButton action={()=>{setModalDisplay(true)}} text={'escalate'} />
						</>
						:
                        	<AppButton action={()=>{setModalDisplay(true)}} text={'Open Ticket'} />
					}
                    </div>
			    </div>
            </div>
			<AppModal
				id="example"
				title="Ticket Editor"
				open={modalDisplay}
				onClose={() => setModalDisplay(false)}
			>
				{
					faultState.fault.type != "FIELD_INTERVENTION" ? 
					<>
						<TicketCreator fault={faultState.fault} handleClose={()=> {setModalDisplay(false)}} />
					</>
					:
            	    	<TicketEditor fault={faultState.fault} handleClose={()=> {setModalDisplay(false)}} />
					}
			</AppModal>
		</>
    )
} 