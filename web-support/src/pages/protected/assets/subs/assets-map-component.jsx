import { useSelector } from "react-redux"
import AppMap from "../../../../components/app-map/app-map"
import { useRef } from "react"

export const AssetsMapComponent = ({asset}) => {

    const mapRef = useRef()

    const assetsState = useSelector((state) => state.assets)

    if(asset === null) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-gray-500">Select asset to view on map</div>
            </div>
        );
    }

    return (
        <div className="h-[85vh] overflow-hidden w-full">
            <AppMap
                    ref={mapRef}
			    	center={asset == null ? [0, 0] : [asset.latitude, asset.longitude]} /* Yaoundé-ish */
			    	zoom={200}
			    	markers={assetsState.assets.map((asset) => {
						return (
							{ 
                                position: [asset.latitude, asset.longitude],
                                popup: <div className="font-bold">{asset.address}</div>,
                                object: asset
                            }
						)
					})}
                    labelClickHandler={(object) => {setSelectedAsset(object); console.log(object);
                    }}
			    />
        </div>
    )
}