import React from 'react';
import Carousel from 'react-native-snap-carousel';

const CarousselItem = ({entries, sliderWidth, itemWidth, renderItem}) => {
  return (
    <Carousel
      testID="Caroussel"
      data={entries}
      renderItem={renderItem}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
    />
  );
};

export default CarousselItem;
