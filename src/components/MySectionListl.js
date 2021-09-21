import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View, Text, SectionList, Image, TouchableOpacity} from 'react-native';
import {getImageFilmFromApi} from '../api';

const MyCaroussel = ({films, ...props}) => {
  const navigation = useNavigation();
  const _renterItem = film => {
    const idFilm = film.item.id;
    return (
      <TouchableOpacity
        style={styles.content_container}
        onPress={() => navigation.navigate('FilmDetails', {idFilm})}>
        <Image
          style={styles.image}
          source={{uri: getImageFilmFromApi(film.item.backdrop_path)}}
        />
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={styles.title_text}>{film.item.title} </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SectionList
      sections={films}
      renderSectionHeader={({section: {title}}) => (
        <Text style={styles.header}>{title}</Text>
      )}
      renderItem={_renterItem}
      horizontal
    />
  );
};

const styles = {
  main_container: {
    height: 190,
    flexDirection: 'row',
  },
  image: {
    width: 300,
    height: 200,
    margin: 5,
    borderRadius: 5,
    backgroundColor: 'gray',
  },
  content_container: {
    flex: 1,
    margin: 5,
  },
  header_container: {
    flex: 3,
    flexDirection: 'row',
  },

  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5,
    position: 'absolute',
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666',
  },

  description_text: {
    fontStyle: 'italic',
    color: '#666666',
  },
  date_container: {
    flex: 1,
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14,
  },
};
export default MyCaroussel;
