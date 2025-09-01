import { useState } from "react";
import '../assets.css'

export const AssetsListComponent = ({ assets, selectAssetHandler }) => {

    const [selectedAsset, setSelectedAsset] = useState(null);
    const activeStyle = "bg-[#a8ca38]";

    const selectAsset = (asset)=>{
        setSelectedAsset(asset);
        selectAssetHandler(asset);
    }   

    if (assets === null) {
        return <div>No assets available</div>;
    }   

    return (
        <div className="space-y-2 scroll-list asset-list-component">
            {assets.map((asset) => (  		    
                <div className={`px-4 py-2 rounded-md hover:bg-[#d1edff] hover:scale-105 cursor-pointer flex justify-between transition-all ${selectedAsset === asset ? activeStyle : 'bg-white'} shadow`}
                    onClick={() => selectAsset(asset)}>
                    <div className="flex gap-2">
                        <div className="border-r-2 pr-3"> 		    		    
                            <div className="text-sm font-semibold text-gray-700 font-mono tracking-wider">{asset.id}</div>  		    		    
                            <div className="text-xs">{asset.longitude} -  {asset.latitude}</div>
                        </div>
                        <div className="text-sm font-medium text-gray-500">
                            <div className="text-[#0d69a5]">John Doe</div>
                            <div className="text-xs">{asset.address}</div>
                        </div>
                    </div>
                    <div className="text-xs">
                        {asset.type != null ? asset.type.toLowerCase().replace('field_intervention', 'escalated') : ''}
                    </div>    		    
                </div>  		
            ))}
        </div>
    );
}