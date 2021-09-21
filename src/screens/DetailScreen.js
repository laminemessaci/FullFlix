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

const DetailScreen = ({route, navigation}) => {
  const idFilm = route.params.idFilm;
  const nativon = useNavigation();
  const [state, setState] = useState({
    film: undefined,
    isLoading: true,
  });

  const filmTitle = state.film ? state.film.title : 'title';
  useEffect(() => {
    getFilmDetailFromApi(idFilm).then(data => {
      setState({
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

  const _displayLoading = () => {
    if (state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  };

  const _displayFilm = () => {
    //console.log(film);
    if (state.film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={{uri: getImageFilmFromApi(state.film.backdrop_path)}}
          />
          <View
            style={{
              alignContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              margin: 5,
            }}>
            <Text style={styles.title_text}>{state.film.title}</Text>
            <AppButton title={'Cast'} onPress={handlClick} />
          </View>
          <Text style={styles.description_text}>{state.film.overview}</Text>
          <Text style={styles.default_text}>
            Sorti le{' '}
            {moment(new Date(state.film.release_date)).format('DD/MM/YYYY')}
          </Text>
          <Text style={styles.default_text}>
            Note : {state.film.vote_average} / 10
          </Text>
          <Text style={styles.default_text}>
            Nombre de votes : {state.film.vote_count}
          </Text>
          <Text style={styles.default_text}>
            Budget : {numeral(state.film.budget).format('0,0[.]00 $')}
          </Text>
          <Text style={styles.default_text}>
            Genre(s) :{' '}
            {state.film.genres
              .map(function (genre) {
                return genre.name;
              })
              .join(' / ')}
          </Text>
          <Text style={styles.default_text}>
            Companie(s) :{' '}
            {state.film.production_companies
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
      {_displayLoading()}
      {_displayFilm()}
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
};

export default DetailScreen;
