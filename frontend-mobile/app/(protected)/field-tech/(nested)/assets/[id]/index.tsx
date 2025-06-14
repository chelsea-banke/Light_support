import React, { useRef, useState } from 'react';
import { View, Text, Switch, ScrollView, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesome, Entypo, Foundation, MaterialIcons } from '@expo/vector-icons';
import LeafletMap from '@/components/leaflet-map';
// import Carousel from 'react-native-snap-carousel';

export default function AssetMapScreen() {
  const [showDirections, setShowDirections] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  
  let carouselItems = [
    {
      title:"Item 1",
      text: "Text 1",
    },
    {
      title:"Item 2",
      text: "Text 2",
    },
    {
      title:"Item 3",
      text: "Text 3",
    },
    {
      title:"Item 4",
      text: "Text 4",
    },
    {
      title:"Item 5",
      text: "Text 5",
    },
  ];

  type CarouselItem = {
    title: string;
    text: string;
  };

  const renderItem = ({ item, index }: { item: CarouselItem; index: number }) => (
    <View className="bg-[floralwhite] rounded-md h-[250px] px-[50px] py-[50px] mx-[25px]">
      <Text className="text-[30px] font-bold">{item.title}</Text>
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-[#0f6da9]">
      {/* Map Section */}
      <LeafletMap latitude={6.5244} longitude={3.3792} zoom={14} />

      {/* Distance Indicator */}
      <View className="items-center mt-3">
        <View className="flex-row items-center space-x-2">
          <Entypo name="location" size={20} color="#c2e600" />
          <Text className="text-white font-semibold text">...................................125km...................................</Text>
          <Foundation name="target-two" size={24} color="#c2e600" />
        </View>
        <Text className="bg-lime-500 px-3 py-0.5 rounded-full text-xs mt-1 text-white font-medium">active</Text>
      </View>

      {/* Location Sharing */}
      <View className="flex-row items-center justify-between bg-[#468fbc] px-8 py-2 rounded-3xl mx-4 mt-4">
        <View className="flex-row items-center space-x-2 gap-1">
          <MaterialIcons name="directions" size={24} color="white" />
          <Text className="text-white text-base font-semibold">Show Directions</Text>
        </View>
        <Switch
          value={showDirections}
          onValueChange={setShowDirections}
          thumbColor="#fff"
          trackColor={{ true: '#8ED1FC', false: '#ccc' }}
          style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
        />
      </View>

      {/* <Carousel
        layout={'default'}
        ref={carouselRef}
        data={carouselItems}
        sliderWidth={300}
        itemWidth={300}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveIndex(index)}
      /> */}

      {/* Image Gallery */}
      <View className="flex-row mt-4 px-4 space-x-3">
        <View className="flex-1 bg-gray-200 h-36 rounded-xl items-center justify-center">
          <FontAwesome name="image" size={40} color="#aaa" />
          <Text className="text-xs text-gray-600 mt-1">1st</Text>
        </View>
        <View className="w-16 bg-gray-200 h-36 rounded-xl items-center justify-center">
          <FontAwesome name="image" size={20} color="#aaa" />
          <Text className="text-xs text-gray-600 mt-1">2nd</Text>
        </View>
      </View>
      {/* Location Info */}
      <Text className="text-white text-center text-sm mt-6 mb-10">
        make sure your location sharing is turned on under settings
      </Text>
    </ScrollView>
  );
}