import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { getAssets } from '../../../redux/middleware/assets-middleware'
import { AssetsListComponent } from './subs/assets-list-component'
import { AssetsMapComponent } from './subs/assets-map-component'
import { AssetDetailsComponent } from './subs/asset-details-component'

export const Assets = () => {
	const [leftWidth, setLeftWidth] = useState(25) // in %
	const [middleWidth, setMiddleWidth] = useState(50) // in %
	const [rightWidth, setRightWidth] = useState(25) // in %
	const [selectedAsset, setSelectedAsset] = useState(null)

	const dispatch = useDispatch()
	const assetsState = useSelector((state) => state.assets)

	useEffect(() => {
		dispatch(getAssets())
		console.log(assetsState);
	}, [])

	const selectAssetHandler = (asset) => {
		setSelectedAsset(asset)
        console.log(asset);
        
	}

	const closeMap = () => {
		setSelectedAsset(null)
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
                <AssetsListComponent assets={assetsState.assets} selectAssetHandler={asset => {selectAssetHandler(asset)}} />
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
                <AssetsMapComponent asset={selectedAsset} />
			</div>

			{/* Dragger between Middle and Right */}
			<div
				onMouseDown={(e) => handleDrag(e, 'middle')}
				className="w-1 hover:bg-gray-300 cursor-col-resize z-10"
			/>

			{/* Right Column */}
			<div className='bg-gray-800 text-white p-6 text-sm space-y-4 overflow-y-auto ml-1 flex flex-col justify-between' style={{ width: `${rightWidth}%` }}>
                <AssetDetailsComponent asset={selectedAsset} />
			</div>
		</div>
	)
}