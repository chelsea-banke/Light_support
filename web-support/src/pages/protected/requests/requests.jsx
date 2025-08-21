import React, { useEffect, useState } from 'react'
import { RequestsListComponent } from './subs/requests-list-component'
import { ChatComponent } from './subs/chat-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppButton } from '../../../components/app-button/app-button'
import { useDispatch, useSelector } from 'react-redux'
import { getFaults } from '../../../redux/middleware/faults-middleware'
import { DetailsComponent } from './subs/details-component'
import axiosInstance from '../../../utils/axiosInstance'
import { getClient } from '../../../redux/middleware/client-middleware'

export const Requests = () => {
	const [leftWidth, setLeftWidth] = useState(25) // in %
	const [middleWidth, setMiddleWidth] = useState(50) // in %
	const [rightWidth, setRightWidth] = useState(25) // in %
	const [selectedRequest, setSelectedRequest] = useState(null)
	const clientState = useSelector((state) => state.client)

	const dispatch = useDispatch()
	const requests = useSelector((state) => state.faults)

	useEffect(() => {
		dispatch(getFaults())
	}, [])

	const selectRequestHandler = (request) => {
		dispatch(getClient(request.id))
		setSelectedRequest(request)
	}

	// Handle resize drag
	const handleDrag = (e, section) => {
		e.preventDefault()
		document.body.style.cursor = 'col-resize'

		const startX = e.clientX

		const onMouseMove = (event) => {
			const dx = event.clientX - startX
			const screenWidth = window.innerWidth
			const dxPercent = (dx / screenWidth) * 100

			if (section === 'left') {
				let newLeft = Math.min(Math.max(10, leftWidth + dxPercent), 40)
				let newMiddle = 100 - newLeft - rightWidth
				if (newMiddle >= 20) {
					setLeftWidth(newLeft)
					setMiddleWidth(newMiddle)
				}
			} else if (section === 'middle') {
				let newMiddle = Math.min(Math.max(20, middleWidth + dxPercent), 60)
				let newRight = 100 - leftWidth - newMiddle
				if (newRight >= 20) {
					setMiddleWidth(newMiddle)
					setRightWidth(newRight)
				}
			}
		}

		const onMouseUp = () => {
			document.body.style.cursor = 'default'
			document.removeEventListener('mousemove', onMouseMove)
			document.removeEventListener('mouseup', onMouseUp)
		}

		document.addEventListener('mousemove', onMouseMove)
		document.addEventListener('mouseup', onMouseUp)
	}

	return (
		<div className="flex h-full w-full overflow-hidden relative">
			{/* Left Column */}
			<div className="h-full overflow-y-auto ml-3 mr-1" style={{ width: `${leftWidth}%` }}>
                <div className='border-b mb-2' >
                    <select name="filter" id="" className='w-full py-2 text-gray-600'>
                        <option value="All">All</option>
                    </select>

                </div>
                <RequestsListComponent requests={requests.faults} selecRequestHandler={request => {selectRequestHandler(request)}} />
			</div>

			{/* Dragger between Left and Middle */}
			<div
				onMouseDown={(e) => handleDrag(e, 'left')}
				className="w-1 hover:bg-gray-300 cursor-col-resize z-10"
			/>

			{/* Middle Column */}
			<div className="flex flex-col mx-1 h-full" style={{ width: `${middleWidth}%` }}>
                <div className='w-full py-2 flex bg-white px-4 mb-2 rounded-b-lg border-b-2'>
                    <FontAwesomeIcon icon={'magnifying-glass'} size='x' className='mt-1' />
                    <input type="text" placeholder="Search..." className='focus:outline-none focus:border-blue-500 w-full pl-2' />
                </div>
                <ChatComponent request={selectedRequest} />
			</div>

			{/* Dragger between Middle and Right */}
			<div
				onMouseDown={(e) => handleDrag(e, 'middle')}
				className="w-1 hover:bg-gray-300 cursor-col-resize z-10"
			/>

			{/* Right Column */}
			<DetailsComponent width={rightWidth} request={selectedRequest} />
		</div>
	)
}
