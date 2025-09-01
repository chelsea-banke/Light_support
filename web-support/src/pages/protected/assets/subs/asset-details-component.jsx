import React from "react";
import { AppProperty } from "../../../../components/app-property/app-property";

export const AssetDetailsComponent = ({asset}) => {

    if(asset === null) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-gray-500">Select asset to view on map</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col space-y-4">
            <AppProperty name={"asset id"} value={asset.id} />
            <AppProperty name={"longitude"} value={asset.longitude} />
            <AppProperty name={"latitude"} value={asset.latitude} />
            <AppProperty name={"address"} value={asset.address} />
            <AppProperty name={"type"} value={asset.type} />
        </div>
    );
}