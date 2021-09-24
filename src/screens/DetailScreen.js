import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {getFilmDetailFromApi, getImageFilmFromApi} from '../api';
import moment from 'moment';
import numeral from 'numeral';
import AppButton from '../components/AppButton';
import {connect} from 'react-redux';
import {MEDIA} from '../contatnts';

const DetailScreen = ({route, navigation, ...props}) => {
  console.log(props);
  const idFilm = route.params.idFilm;
  const nativon = useNavigation();
  const [detailsState, setDetailsState] = useState({
    film: undefined,
    isLoading: true,
  });

  const filmTitle = detailsState.film ? detailsState.film.title : 'title';
  useEffect(() => {
    getFilmDetailFromApi(idFilm).then(data => {
      setDetailsState({
        film: data,
        isLoading: false,
      });
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: filmTitle,
    });
  }, [filmTitle]);

  const handlClick = () => {
    navigation.navigate('CastList', {idFilm});
  };
  const handlFavoritesClick = film => {
    console.log('add to favorites!!');
    const action = {type: 'ADD_FAVORITES', value: detailsState.film};
    props.dispatch(action);
  };

  const displayFavoriteImage = () => {
    let sourceImage = MEDIA.IMAGE_NO_FAV;
    if (
      props.favoritesFilm.findIndex(
        item => item.id === detailsState.film.id,
      ) !== -1
    ) {
      // movie in our favorites
      sourceImage = MEDIA.IMAGE_FAV;
    }
    return <Image style={styles.favorite_image} source={sourceImage} />;
  };

  const displayLoading = () => {
    if (detailsState.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  };

  const displayFilm = () => {
    if (detailsState.film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={{uri: getImageFilmFromApi(detailsState.film.backdrop_path)}}
          />
          <View
            style={{
              marginHorizontal: 100,
              marginVertical: 20,
              flexDirection: 'row',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            {displayFavoriteImage()}
            <AppButton
              title={'+ to Favorites'}
              colors={['#060', '#0AE']}
              onPress={handlFavoritesClick}
            />
          </View>

          <View
            style={{
              alignContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              margin: 5,
            }}>
            <Text style={styles.title_text}>{detailsState.film.title}</Text>
            <AppButton
              title={'Cast'}
              colors={['#004d40', '#009688']}
              onPress={handlClick}
            />
          </View>
          <Text style={styles.description_text}>
            {detailsState.film.overview}
          </Text>
          <Text style={styles.default_text}>
            Sorti le{' '}
            {moment(new Date(detailsState.film.release_date)).format(
              'DD/MM/YYYY',
            )}
          </Text>
          <Text style={styles.default_text}>
            Note : {detailsState.film.vote_average} / 10
          </Text>
          <Text style={styles.default_text}>
            Nombre de votes : {detailsState.film.vote_count}
          </Text>
          <Text style={styles.default_text}>
            Budget : {numeral(detailsState.film.budget).format('0,0[.]00 $')}
          </Text>
          <Text style={styles.default_text}>
            Genre(s) :{' '}
            {detailsState.film.genres
              .map(function (genre) {
                return genre.name;
              })
              .join(' / ')}
          </Text>
          <Text style={styles.default_text}>
            Companie(s) :{' '}
            {detailsState.film.production_companies
              .map(function (company) {
                return company.name;
              })
              .join(' / ')}
          </Text>
        </ScrollView>
      );
    }
  };

  return (
    <View style={styles.main_container}>
      {displayLoading()}
      {displayFilm()}
    </View>
  );
};

const styles = {
  main_container: {
    flex: 1,
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
  scrollview_container: {
    flex: 1,
  },
  image: {
    height: 169,
    margin: 5,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'green',
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center',
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15,
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },

  favorite_image: {
    width: 20,
    height: 20,
    marginHorizontal: 15,
  },
};
const mapStateToProps = state => {
  return {
    favoritesFilm: state.favoritesFilm,
    isFavorite: state.isFavorite,
  };
};

export default connect(mapStateToProps)(DetailScreen);
