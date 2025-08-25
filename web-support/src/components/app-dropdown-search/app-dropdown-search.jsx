import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

export default function AppDropdownSearch({ items = [], onSelect }) {
	const [query, setQuery] = useState("")
	const [open, setOpen] = useState(false)

	// Filter items based on query
	const filteredItems = items.filter((item) =>
		item.toLowerCase().includes(query.toLowerCase())
	)

	return (
		<div className="relative w-full flex p-2 px-4">
			{/* Input field */}
			{query.length == 0 ? 
				<FontAwesomeIcon icon={'magnifying-glass'} size='x' className='mt-1' />
			:
				<button className="cursor-pointer" onClick={() => setQuery("")}>
					<FontAwesomeIcon icon={'xmark'} size='x' className='mt-1' />
				</button>
			}
			<input
				type="text"
				value={query}
				onChange={(e) => {
					setQuery(e.target.value)
					setOpen(true)
				}}
				onFocus={() => setOpen(true)}
				placeholder="Search..."
				className="w-full rounded outline-0 ml-2"
			/>

			{/* Dropdown */}
			{open && filteredItems.length > 0 && (
				<ul className="absolute mt-7 right-0 w-[99%] max-h-60 overflow-y-auto back-blur rounded-b shadow-md z-50" >
					{filteredItems.map((item, idx) => (
						<li
							key={idx}
							className="px-3 py-2 cursor-pointer hover:bg-gray-100"
							onClick={() => {
								onSelect?.(item)
								setQuery(item)
								setOpen(false)
							}}
						>
							{item}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
