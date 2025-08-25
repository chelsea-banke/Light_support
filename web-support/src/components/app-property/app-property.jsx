export const AppProperty = ({ name, value }) => {
    return (
	    <div className='flex justify-between'>
	    	<div className="font-semibold">{name}</div>
            <div className='flex-1 mx-1 border-b border-dotted mb-[5px]' />
            <div>{value}</div>
	    </div>
    )
}