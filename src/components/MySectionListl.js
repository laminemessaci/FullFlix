import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {SectionList, TouchableOpacity, Image, View, Text} from 'react-native';

import {getImageFilmFromApi} from '../api';
import {MEDIA} from '../contatnts';

import {connect} from 'react-redux';

const MyCaroussel = ({films, ...props}) => {
  const navigation = useNavigation();
  //console.log(films[0].data);

  const displayFavoriteImage = () => {
    let sourceImage = MEDIA.IMAGE_NO_FAV;
    if (
      props.favoritesFilm.findIndex(
        item =>
          item.id ===
          films[0].data.map(item => {
            console.log(item);
            return item.id;
          }),
      ) !== -1
    ) {
      // movie in our favorites
      sourceImage = MEDIA.IMAGE_FAV;
    }
    return <Image style={styles.favorite_image} source={sourceImage} />;
  };
  const _renterItem = film => {
    const idFilm = film.item.id;
    return (
      <TouchableOpacity
        style={styles.content_container}
        onPress={() => navigation.navigate('FilmDetails', {idFilm})}>
        {displayFavoriteImage()}
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
      rrenderSectionHeader={({section: {title}}) => (
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
  favorite_image: {
    width: 20,
    height: 20,
    marginHorizontal: 15,
  },
};

const mapStateToProps = state => {
  console.log(state);
  return {
    favoritesFilm: state.favoritesFilm,
  };
};

export default connect(mapStateToProps)(MyCaroussel);
