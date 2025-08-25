import { useMap } from "react-leaflet"

export const RotateControl = () => {
	const map = useMap()
	const rotate = (deg) => {
		if (map.setBearing) {
			map.setBearing(deg)
		}
	}
	return (
		<div className="leaflet-control leaflet-bar" style={{ background: "white", padding: "5px" }}>
			<button onClick={() => rotate(map.getBearing() - 15)}>⟲</button>
			<button onClick={() => rotate(map.getBearing() + 15)}>⟳</button>
		</div>
	)
}