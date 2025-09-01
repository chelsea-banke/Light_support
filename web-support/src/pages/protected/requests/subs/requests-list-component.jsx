import { useState } from "react";
import '../requests.css'

export const RequestsListComponent = ({ requests, selecRequestHandler }) => {

  const [selectedRequest, setSelectedRequest] = useState(null);
  const activeStyle = "bg-[#a8ca38]";

  const selectRequest = (request)=>{
    setSelectedRequest(request);
    selecRequestHandler(request);
  }

  if (requests === null) {
    return <div>No requests available</div>;
  }

  return (
    <div className="space-y-2 scroll-list request-list-component">
      	{requests.map((request) => (
					<div className={`px-4 py-2 rounded-md hover:bg-[#d1edff] hover:scale-105 cursor-pointer flex justify-between transition-all ${selectedRequest === request ? activeStyle : 'bg-white'} shadow`}
            onClick={() => selectRequest(request)}>
              <div className="flex gap-2">
                <div className="border-r-2 pr-3">
					  	    <div className="text-sm font-semibold text-gray-700 font-mono tracking-wider">{request.id.slice(0, 13)}...</div>
					  	    <div className="text-xs">{request.createdDate.slice(0, 10)} - <span className="text-green-600 font-semibold"> {request.status.toLowerCase()}</span></div>
                </div>
                <div className="text-sm font-medium text-gray-500">
                  <div className="text-[#0d69a5]">John Doe</div>
                  <div className="text-xs">612-345-678</div>
                </div>
              </div>
              <div className="text-xs">
                {request.type != null ? request.type.toLowerCase().replace('field_intervention', 'escalated') : ''}
              </div>
					</div>
				))}
    </div>
  );
}