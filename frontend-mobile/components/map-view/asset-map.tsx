import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { MapView, setAccessToken } from '@maplibre/maplibre-react-native';

setAccessToken && setAccessToken("");

export const assets = [
  {
    id: 'asset-1',
    name: 'Transformer Alpha',
    coordinate: [11.506, 3.866],
  },
  {
    id: 'asset-2',
    name: 'Pole Beta',
    coordinate: [11.508, 3.867],
  },
];

export default function AssetMap() {
  useEffect(() => {
    // MapboxGL.setTelemetryEnabled(false);
  }, []);

  return (
    <View style={styles.mapContainer}>
      <MapView style={styles.map} />
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: { flex: 1 },
  map: { flex: 1 },
  marker: {
    width: 20,
    height: 20,
    backgroundColor: '#00f',
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 2,
  }
});
