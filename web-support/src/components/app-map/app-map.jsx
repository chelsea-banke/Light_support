import { useRef, forwardRef, useImperativeHandle } from "react"
import {
	MapContainer,
	TileLayer,
	LayersControl,
	ZoomControl,
	useMap,
	Marker,
	Popup,
	Tooltip,
} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import L from "leaflet"
// import "leaflet.awesome-markers/dist/leaflet.awesome-markers.css"
// import "leaflet.awesome-markers"

const { BaseLayer } = LayersControl

// Reset button component
const ResetViewControl = ({ center, zoom }) => {
	const map = useMap()
	return (
		<div className="leaflet-control leaflet-bar" style={{ background: "white" }}>
			<a
				href="#"
				onClick={(e) => {
					e.preventDefault()
					map.setView(center, zoom, { animate: true })
				}}
			>
				<FontAwesomeIcon icon="crosshairs" size="lg" />
			</a>
		</div>
	)
}

const greenMarker = L.icon({
	iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
	shadowUrl:
		"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
})

const AppMap = forwardRef(function AppMap(
	{ center = [0, 0], zoom = 2, markers = [], labelClickHandler },
	ref
) {
	const mapRef = useRef(null)

	// Expose map controls to parent
	useImperativeHandle(ref, () => ({
		focusOnPoint: (lat, lng, zoomLevel = 13) => {
			if (mapRef.current) {
				mapRef.current.setView([lat, lng], zoomLevel, { animate: true })
			}
		},
	}))

	return (
		<div style={{ width: "100%", height: "100vh" }}>
			<MapContainer
				center={center}
				zoom={zoom}
				scrollWheelZoom
				zoomControl={false}
				style={{ width: "100%", height: "100%" }}
				ref={mapRef}
			>
				{/* Zoom control */}
				<ZoomControl position="topright" />

				{/* Reset button */}
				<div className="leaflet-top leaflet-right" style={{ marginTop: "135px" }}>
					<ResetViewControl center={center} zoom={zoom} />
				</div>

				{/* Base layers */}
				<LayersControl position="topright" style={{ marginTop: "0px" }}>
					<BaseLayer checked name="Street Map">
						<TileLayer
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							attribution='&copy; OpenStreetMap contributors'
						/>
					</BaseLayer>

					<BaseLayer name="Satellite (Carto)">
						<TileLayer
							url="https://basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png"
							attribution='&copy; <a href="https://www.carto.com/">CARTO</a>'
						/>
					</BaseLayer>

					<BaseLayer name="Satellite (Esri)">
						<TileLayer
							url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
							attribution="Tiles &copy; Esri"
						/>
					</BaseLayer>
				</LayersControl>

				{/* Render markers */}
				{markers.map((m, idx) => (
					<Marker
						key={idx+1}
						position={m.position}
						eventHandlers={{
							click: () => {
								labelClickHandler?.(m.object)
							},
						}}
					>
						<Popup>{m.popup}</Popup>
						<Tooltip direction="top" offset={[0, -10]} opacity={1}>
							{m.popup}
						</Tooltip>
					</Marker>
				))}
				<Marker
					key={0}
					position={center}
					icon={greenMarker}
				>
					<Popup>{"asset"}</Popup>
					<Tooltip direction="top" offset={[0, -10]} opacity={1}>
						{"asset"}
					</Tooltip>
				</Marker>
			</MapContainer>
		</div>
	)
})

export default AppMap