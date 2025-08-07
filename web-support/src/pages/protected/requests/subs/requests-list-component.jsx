export const RequestsListComponent = () => {

	const requests = new Array(100).fill("XXXX-XXXX-XXXX");

  return (
    <div className="space-y-2 scroll-list h-[85vh]">
      	{requests.map((req, index) => (
					<div key={index} className="px-4 py-2 rounded-md hover:bg-[#d1edff] cursor-pointer bg-white flex gap-2 transition-all">
            <div className="border-r-2 pr-3">
						  <div className="text-sm font-semibold text-gray-700 font-mono tracking-wider">{req}</div>
						  <div className="text-xs">10:30pm - <span className="text-green-600 font-semibold"> ongoing</span></div>
            </div>
            <div className="text-sm font-medium text-gray-500">
              <div className="text-[#0d69a5]">John Doe</div>
              <div className="text-xs">612-345-678</div>
            </div>
					</div>
				))}
    </div>
  );
}