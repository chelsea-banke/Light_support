import { AppButton } from "../../../../components/app-button/app-button"

export const DetailsComponent = ({width, request, client}) => {
    return(
        <div className="bg-gray-800 text-white p-6 text-sm space-y-4 overflow-y-auto ml-1 flex flex-col justify-between" style={{ width: `${width}%` }}>	
            <div className='space-y-3'>
                <div className='flex justify-between'>
			    	<div className="font-semibold">First Name</div>
                    <div className='flex-1 mx-1 border-b border-dotted mb-[5px]' />
                    <div>John</div> 
			    </div>              
			    <div className='flex justify-between'>
			    	<div className="font-semibold">Last Name</div>
                    <div className='flex-1 mx-1 border-b border-dotted mb-[5px]' />
                    <div>Doe</div> 
			    </div>
			    <div className='flex justify-between'>
			    	<div className="font-semibold">Contact</div>
                    <div className='flex-1 mx-1 border-b border-dotted mb-[5px]' />
                    <div>612-345-678</div>
			    </div>
			    <div className='flex justify-between'>
			    	<div className="font-semibold">Reported At</div>
                    <div className='flex-1 mx-1 border-b border-dotted mb-[5px]' />
                    <div>20-06-25</div> 
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
                        <AppButton text={'save'} />
                        <AppButton text={'escalate'} />
                    </div>
			    </div>
            </div>
		</div>
    )
} 