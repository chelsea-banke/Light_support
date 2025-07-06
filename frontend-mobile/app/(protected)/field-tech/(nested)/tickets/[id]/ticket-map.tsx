import React, { useEffect, useRef, useState } from 'react';
import {
View,
Text,
Switch,
ScrollView,
Image,
TouchableOpacity,
StyleSheet,
Dimensions,
} from 'react-native';
import { Entypo, Foundation, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';
import LeafletMap from '@/components/leaflet-map';
import { MapComponent } from '@/components/map';
import ImageCarousel from '@/components/image-carousel';
import { useLocalSearchParams } from 'expo-router';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SHEET_PEEK = 150;

export default function TicketMapScreen() {
  const modalizeRef = useRef<Modalize>(null);

  const { ticket } = useLocalSearchParams();
  const parsedTicket = JSON.parse(ticket as string);
  console.log(parsedTicket);
  

  const [showDirections, setShowDirections] = useState(true);
  const [userLocation, setUserLocation] = useState<[number, number]>([0, 0]);
  const [focusLocation, setFocusLocation] = useState<[number, number]>([parsedTicket.longitude, parsedTicket.latitude]);
  const [distance, setDistance] = useState(0);

  const openSheet = () => modalizeRef.current?.open();
  const closeSheet = () => modalizeRef.current?.close();

  useEffect(()=>{
    console.log(parsedTicket);
  }, [])

  return (
    <>
      <ScrollView style={styles.screen}>
        <MapComponent
          targetLocation={[parsedTicket.longitude, parsedTicket.latitude]}
          focusLocation={focusLocation}
          onDistanceChange={setDistance}
          onUserLocationChange={setUserLocation}
          showDirections={showDirections}
        />
        {/* If you had other content above the sheet, it goes here */}
      </ScrollView>

      {/* Modalize Bottom Sheet */}
      <Modalize
        ref={modalizeRef}
        modalHeight={SCREEN_HEIGHT * 0.6}   // full expanded height (60% of screen)
        handleStyle={styles.sheetHandle}
        adjustToContentHeight={false}
        openAnimationConfig={{ timing: { duration: 100 } }}
        panGestureEnabled
        withHandle
        modalStyle={styles.sheet}
        alwaysOpen={SHEET_PEEK}           // peek height
      >
        {/* Sheet Content */}
        <View style={styles.sheetContent}>
          {/* Drag Indicator */}
          <View style={styles.dragIndicator} />

          {/* Distance Indicator */}
          <View style={styles.distanceContainer}>
            <TouchableOpacity onPress={() => setFocusLocation(userLocation)}>
              <Entypo name="location" size={24} color="#a6c936" />
            </TouchableOpacity>
            <Text style={styles.distanceText}>
            {'———————'.slice(0, (15-distance.toString().length))}
            { ` ${distance}km ` }
            {'———————'.slice(0, (15-distance.toString().length))}
            </Text>
            <TouchableOpacity onPress={() => setFocusLocation([parsedTicket.longitude, parsedTicket.latitude])}>
              <Foundation name="target-two" size={28} color="#a6c936" />
            </TouchableOpacity>
          </View>
          <View style={styles.labelsRow}>
            <Text style={styles.label}>You...</Text>
            <Text style={[styles.label, styles.activeBadge]}>{}</Text>
            <Text style={styles.label}>Ticket</Text>
          </View>

          {/* Show Directions Toggle */}
          <View style={styles.toggleRow}>
            <View style={styles.toggleLabel}>
              <MaterialIcons name="directions" size={24} color="white" />
              <Text style={styles.toggleText}>Show Directions</Text>
            </View>
            <Switch
              value={showDirections}
              onChange={() => setShowDirections(!showDirections)} 
              thumbColor="#fff"
              trackColor={{ true: '#8ED1FC', false: '#ccc' }}
              style={styles.switch}
            />
          </View>
          
          {/* <View style={styles.galleryRow}>
            <ImageCarousel
              images={[
                require('@/tickets/images/no-requests.png'),
                require('@/tickets/images/no-requests.png'),
                require('@/tickets/images/no-requests.png'),
              ]}
            />
          </View> */}

          {/* Info Text */}
          <Text style={styles.infoText}>
            make sure your location sharing is turned on under settings
          </Text>
        </View>
      </Modalize>
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0f6da9' },

  // Bottom sheet container
  sheet: {
    backgroundColor: '#cae6fd',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderWidth: 4,
    borderBottomWidth: 0,
    borderColor: "white"
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    marginTop: 8,
  },
  sheetContent: {
    paddingTop: 8,
  },
  dragIndicator: {
    alignSelf: 'center',
    width: 60,
    height: 4,
    backgroundColor: '#888',
    borderRadius: 2,
    marginBottom: 12,
  },

  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 8,
    marginHorizontal: 16
  },
  distanceText: {
    color: 'gray',
    fontWeight: '600',
  },

  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
    marginHorizontal: 16
  },
  label: {
    color: 'gray',
    fontSize: 12,
  },
  activeBadge: {
    backgroundColor: '#c2e600',
    borderRadius: 8,
    paddingHorizontal: 8,
    color: 'gray',
    fontWeight: "bold"
  },

  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#468fbc',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 24,
    marginBottom: 16,
  },
  toggleLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  switch: {
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
  },

  galleryRow: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    marginBottom: 16,
    marginHorizontal: 4
  },
  galleryItemLarge: {
    flex: 1,
    backgroundColor: '#ccc',
    height: 140,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryItemSmall: {
    width: 80,
    backgroundColor: '#ccc',
    height: 140,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryLabel: {
    fontSize: 12,
    color: '#444',
    marginTop: 6,
  },

  infoText: {
    color: 'gray',
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 32,
  },
});