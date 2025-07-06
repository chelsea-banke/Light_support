// components/ImageCarousel.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
} from 'react-native';

interface ImageSource {
  uri?: string;
}
interface ImageCarouselProps {
  images: (ImageSource | number)[];
  maxHeight?: number; // optional maximum height constraint
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const DEFAULT_MAX_HEIGHT = SCREEN_HEIGHT * 0.5; // default to half the screen height

export default function ImageCarousel({
  images,
  maxHeight = DEFAULT_MAX_HEIGHT,
}: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [heights, setHeights] = useState<number[]>([]);
  const scrollRef = useRef<ScrollView>(null);

  // Measure each image and compute its display height, clamped to maxHeight
  useEffect(() => {
    images.forEach((src, i) => {
      if (typeof src === 'number') {
        const { width: w, height: h } = Image.resolveAssetSource(src);
        const displayH = Math.min((SCREEN_WIDTH / w) * h, maxHeight);
        setHeights((prev) => {
          const next = [...prev];
          next[i] = displayH;
          return next;
        });
      } else {
        Image.getSize(
          src.uri!,
          (w, h) => {
            const displayH = Math.min((SCREEN_WIDTH / w) * h, maxHeight);
            setHeights((prev) => {
              const next = [...prev];
              next[i] = displayH;
              return next;
            });
          },
          (err) => console.warn('Could not get image size', err)
        );
      }
    });
  }, [images, maxHeight]);

  // Determine container height based on active image size, fallback to maxHeight
  const containerHeight = heights[activeIndex] || maxHeight;

  // Update active index on scroll
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setActiveIndex(idx);
  };

  return (
    <View style={[styles.container, { height: containerHeight/2 }]}>  
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {images.map((src, i) => (
          <Image
            key={i}
            source={typeof src === 'number' ? src : { uri: src.uri }}
            style={{ width: SCREEN_WIDTH, height: containerHeight, aspectRatio: 1 }}
            resizeMode="contain"
          />
        ))}
      </ScrollView>

      <View style={styles.dotsContainer}>
        {images.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              activeIndex === i && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    backgroundColor: '#000',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#fff',
  },
});
