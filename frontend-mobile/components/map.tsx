import React, {
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
    ForwardedRef,
} from 'react';
import { View, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import {
    MapView,
    Camera,
    PointAnnotation,
    RasterSource,
    RasterLayer,
    ShapeSource,
    LineLayer,
    CameraRef,
    Images,
    SymbolLayer,
} from '@maplibre/maplibre-react-native';
import { Position, FeatureCollection, GeoJsonProperties } from 'geojson';
import { Entypo } from '@expo/vector-icons';

type Props = {
    targetLocation?: [number, number];
    focusLocation?: [number, number];
    zoom?: number;
    showDirections?: boolean;
    onDistanceChange?: (distance: number) => void;
    onUserLocationChange?: (location: [number, number]) => void;
};

type RouteFeature = {
    properties?: {
        summary?: {
            distance?: number;
        };
    };
};

export function makeMarkerGeoJSON(
    assetLocation: [number, number],
    userLocation: [number, number] | null
) {
    return {
        type: 'FeatureCollection' as const,
        features: [
            {
                type: 'Feature' as const,
                id: 'asset',
                properties: { icon: 'asset-icon' },
                geometry: {
                    type: 'Point' as const,
                    coordinates: assetLocation,
                },
            },
            // only add the user feature if we have its coords
            ...(
                userLocation
                    ? [
                        {
                            type: 'Feature' as const,
                            id: 'user',
                            properties: { icon: 'user-icon' },
                            geometry: {
                                type: 'Point' as const,
                                coordinates: userLocation,
                            },
                        },
                    ]
                    : []
            ),
        ],
    };
}

async function fetchRouteGET(
    start: [number, number],
    end: [number, number]
): Promise<GeoJSON.FeatureCollection | null> {
    const apiKey = 'YOUR_ORS_API_KEY'; // ← make sure this is correct
    const url =
        `https://api.openrouteservice.org/v2/directions/foot-walking` +
        `?api_key=${'5b3ce3597851110001cf62489691df91744541eeb78d908b084ad38c'}` +
        `&start=${start[0]},${start[1]}` +
        `&end=${end[0]},${end[1]}`;

    try {
        // console.log('Fetching ORS GET URL:', url);
        const resp = await fetch(url);
        // console.log('HTTP status:', resp.status, resp.statusText);

        const text = await resp.text();
        // console.log('Response body:', text);

        if (!resp.ok) {
            throw new Error(`ORS GET failed ${resp.status}: ${text}`);
        }

        const json = JSON.parse(text);
        // console.log('Parsed GeoJSON keys:', Object.keys(json));
        return json;
    } catch (err) {
        console.error('fetchRouteGET error:', err);
        return null;
    }
}

export const MapComponent = (
    ({
        targetLocation,
        focusLocation,
        zoom = 15,
        showDirections = true,
        onDistanceChange,
        onUserLocationChange,
    }: Props) => {
        const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
        const [routeGeoJSON, setRouteGeoJSON] = useState<FeatureCollection>({
            type: 'FeatureCollection',
            features: [],
        });
        const [zoomLevel, setZoomLevel] = useState<number>(zoom);
        const cameraRef = useRef<CameraRef>(null);

        const markerGeoJSON = targetLocation
            ? makeMarkerGeoJSON(targetLocation, userLocation)
            : null;

        // helper to change zoom
        const changeZoom = (delta: number) => {
            const newZoom = Math.max(0, Math.min(22, zoomLevel + delta));
            setZoomLevel(newZoom);
            cameraRef.current?.zoomTo(newZoom, 500);
        };

        useEffect(() => {
            (async () => {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert(
                        'Permission denied',
                        'Location access is required to show your location.'
                    );
                    return;
                }
                const location = await Location.getCurrentPositionAsync();
                const userCoords: [number, number] = [
                    location.coords.longitude,
                    location.coords.latitude,
                ];
                setUserLocation(userCoords);

                if (targetLocation) {
                    try {
                        const route = await fetchRouteGET(userCoords, targetLocation);
                        if (route) {
                            setRouteGeoJSON(route);

                            // Extract distance from routeGeoJSON and call callback
                            const feature = route.features[0] as RouteFeature;
                            const distance =
                                feature?.properties?.summary?.distance ?? null;
                            if (
                                typeof distance === 'number' &&
                                onDistanceChange
                            ) {
                                onDistanceChange(distance);
                            }
                        }
                    } catch (e) {
                        // Optionally handle error
                        console.log(e);
                    }
                } else {
                    console.log('no target');
                }

                onUserLocationChange?.(userCoords);
            })();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return (
            <View style={styles.container}>
                <MapView style={styles.map} compassEnabled={true}>
                    <Camera
                        ref={cameraRef}
                        centerCoordinate={focusLocation}
                        zoomLevel={zoom}
                        animationMode="easeTo"
                        animationDuration={5000}
                    />

                    <RasterSource
                        id="osm"
                        tileUrlTemplates={['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png']}
                        tileSize={256}
                    >
                        <RasterLayer id="osmLayer" sourceID="osm" />
                    </RasterSource>

                    {/* register your marker images */}
                    <Images
                        images={{
                            'asset-icon': require('@/assets/icons/target.png'),
                            'user-icon': require('@/assets/icons/location.png'),
                        }}
                    />

                    {/* draw both asset & user markers */}
                    {markerGeoJSON && (
                        <ShapeSource id="markerSource" shape={markerGeoJSON}>
                            <SymbolLayer
                                id="markerLayer"
                                style={{
                                    iconImage: ['get', 'icon'],
                                    iconSize: 0.07,
                                    iconAllowOverlap: true,
                                    iconIgnorePlacement: true,
                                }}
                            />
                        </ShapeSource>
                    )}

                    {routeGeoJSON.features.length > 0 && showDirections && (
                        <ShapeSource id="route" shape={routeGeoJSON}>
                            <LineLayer
                                id="routeLine"
                                style={{
                                    lineColor: '#007AFF',
                                    lineWidth: 5,
                                    lineJoin: 'round',
                                    lineCap: 'round',
                                }}
                            />
                        </ShapeSource>
                    )}
                </MapView>
                {/* Zoom Controls */}
                <View style={styles.zoomControls}>
                    <TouchableOpacity
                        style={styles.zoomButton}
                        onPress={() => changeZoom(1)}
                    >
                        <Text style={styles.zoomText}>＋</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.zoomButton, styles.zoomMinus]}
                        onPress={() => changeZoom(-1)}
                    >
                        <Text style={styles.zoomText}>－</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
);

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1, width: '100%', height: 700 },
    marker: {
        position: 'absolute',
        zIndex: 9999,
        elevation: 10,
        width: 20,
        height: 20,
        backgroundColor: '#FF3B30',
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
    },
    userMarker: {
        position: 'absolute',
        zIndex: 9999,
        elevation: 10,
        width: 16,
        height: 16,
        backgroundColor: '#4CD964',
        borderRadius: 8,
        borderColor: '#fff',
        borderWidth: 2,
    },
    zoomControls: {
        position: 'absolute',
        top: 60,
        right: 9,
        alignItems: 'center',
    },
    zoomButton: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 6,
    },
    zoomMinus: {
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    zoomText: {
        color: 'white',
        fontSize: 24,
        lineHeight: 24,
    },
});
