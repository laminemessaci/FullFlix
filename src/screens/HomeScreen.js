import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';

import {getFilmDetailFromApi, getFilms, getImageFilmFromApi} from '../api';
import CarousselItem from '../components/CarousselItem';
import MySectionList from '../components/MySectionListl';
import {MEDIA} from '../contatnts';

const {width, height} = Dimensions.get('window');
export default function HomeScreen(props) {
  //console.log('Device width: ' + width + '  Device height:  ' + height);
  const [movies, setMovies] = useState([]);
  const nativon = useNavigation();

  const DATA = [
    {
      data: movies.splice(5, 20),
    },
  ];

  const getList = async () => {
    const listFilms = await getFilms();
    //console.log(listFilms.results)
    setMovies(listFilms.results);
    return listFilms.results;
  };

  const getImage = async name => {
    const image = await getFilmDetailFromApi(name);
    setImageFilm(image);
  };

  const _renderItem = ({item, index}) => {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{uri: getImageFilmFromApi(item.poster_path)}}
          resizeMode="cover"
        />
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  };
  useEffect(() => {
    getList();
  }, []);

  if (!movies) {
    return <ActivityIndicator style={styles.loading_container} />;
  }

  return (
    <SafeAreaView style={{top: 40, flex: 1}}>
      <View
        style={{
          flex: 0.25,
          alignItems: 'center',
          margin: 5,
          backgroundColor: 'grey',
          borderRadius: 5,
        }}>
        <Image
          style={{flex: 1, width: 300, height: 150}}
          source={MEDIA.IMAGE_SCREEN}
        />
      </View>
      <View style={{bottom: 0, flex: 0.5}}>
        <CarousselItem
          testID="Caroussel"
          entries={movies}
          renderItem={_renderItem}
          sliderWidth={400}
          itemWidth={400}
          number={5}
        />
      </View>
      <Text style={{fontSize: 20, margin: 15, fontWeight: 'bold'}}>
        {' '}
        TOP FILMS{' '}
      </Text>

      <View style={styles.container}>
        <MySectionList films={DATA} />
      </View>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'floralwhite',
    borderRadius: 5,
    padding: 5,
  },

  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    flex: 1,
    margin: 5,
    justifyContent: 'center',
    borderRadius: 10,
  },
  title: {
    color: 'white',
    fontSize: 20,
    lineHeight: 84,
    fontWeight: 'bold',
    position: 'absolute',
    marginLeft: 120,
    bottom: 10,
  },

  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  titleS: {
    fontSize: 24,
  },
};
