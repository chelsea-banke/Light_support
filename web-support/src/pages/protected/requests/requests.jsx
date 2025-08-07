import React, { useState } from 'react';
import { RequestsListComponent } from './subs/requests-list-component';
import { ChatComponent } from './subs/chat-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppButton } from '../../../components/app-button/app-button';

export const Requests = () => {
	const [leftWidth, setLeftWidth] = useState(25); // in %
	const [middleWidth, setMiddleWidth] = useState(50); // in %
	const [rightWidth, setRightWidth] = useState(25); // in %

	// Handle resize drag
	const handleDrag = (e, section) => {
		e.preventDefault();
		document.body.style.cursor = 'col-resize';

		const startX = e.clientX;

		const onMouseMove = (event) => {
			const dx = event.clientX - startX;
			const screenWidth = window.innerWidth;
			const dxPercent = (dx / screenWidth) * 100;

			if (section === 'left') {
				let newLeft = Math.min(Math.max(10, leftWidth + dxPercent), 40);
				let newMiddle = 100 - newLeft - rightWidth;
				if (newMiddle >= 20) {
					setLeftWidth(newLeft);
					setMiddleWidth(newMiddle);
				}
			} else if (section === 'middle') {
				let newMiddle = Math.min(Math.max(20, middleWidth + dxPercent), 60);
				let newRight = 100 - leftWidth - newMiddle;
				if (newRight >= 20) {
					setMiddleWidth(newMiddle);
					setRightWidth(newRight);
				}
			}
		};

		const onMouseUp = () => {
			document.body.style.cursor = 'default';
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
		};

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	};

	return (
		<div className="flex h-full w-full overflow-hidden relative">
			{/* Left Column */}
			<div className="h-full overflow-y-auto ml-3 mr-1" style={{ width: `${leftWidth}%` }}>
                <div className='border-b mb-2' >
                    <select name="filter" id="" className='w-full py-2 text-gray-600'>
                        <option value="All">All</option>
                    </select>

                </div>
                <RequestsListComponent/>
			</div>

			{/* Dragger between Left and Middle */}
			<div
				onMouseDown={(e) => handleDrag(e, 'left')}
				className="w-1 hover:bg-gray-300 cursor-col-resize z-10"
			/>

			{/* Middle Column */}
			<div className="flex flex-col mx-1" style={{ width: `${middleWidth}%` }}>
                <div className='w-full py-2 flex bg-white px-4 mb-2 rounded-b-lg border-b-2'>
                    <FontAwesomeIcon icon={'magnifying-glass'} size='x' className='mt-1' />
                    <input type="text" placeholder="Search..." className='focus:outline-none focus:border-blue-500 w-full pl-2' />
                </div>
                <ChatComponent/>
			</div>

			{/* Dragger between Middle and Right */}
			<div
				onMouseDown={(e) => handleDrag(e, 'middle')}
				className="w-1 hover:bg-gray-300 cursor-col-resize z-10"
			/>

			{/* Right Column */}
			<div className="bg-gray-800 text-white p-6 text-sm space-y-4 overflow-y-auto ml-1 flex flex-col justify-between" style={{ width: `${rightWidth}%` }}>	
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
		</div>
	);
};
