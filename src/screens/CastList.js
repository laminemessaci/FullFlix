import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';

import {getCastList, getImageFilmFromApi} from '../api';

export default class CastList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cast: [],
      id: props.route.params.idFilm,
      isLoading: true,
      acteurName: 'Acteur name',
    };
  }

  async _loadCastLIst() {
    await getCastList(this.state.id).then(resp =>
      this.setState({cast: resp, isLoading: false}),
    );
  }
  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }

  onItemPress = name => {
    this.setState({
      acteurName: name,
    });
  };

  renderItem = item => {
    //console.log(item);
    const name = item.item.name;

    return (
      <TouchableOpacity
        onPress={() =>
          this.setState({
            acteurName: name,
          })
        }>
        <View style={styles.main_container}>
          <Image
            style={styles.image}
            source={{uri: getImageFilmFromApi(item.item.profile_path)}}
          />
          <View style={styles.header_container}>
            <Text style={styles.title_text}>{item.item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  componentDidMount() {
    this._loadCastLIst();

    this.setState({});
  }

  render() {
    //console.log(this.state.cast);

    return (
      <>
        <View style={{top: 20, marginBottom: 20, alignItems: 'flex-end'}}>
          <Text
            style={{
              fontSize: 18,
              color: 'white',
              margin: 20,
              backgroundColor: 'gray',
              borderRadius: 5,
            }}>
            {this.state.acteurName}{' '}
          </Text>
        </View>

        <FlatList
          data={this.state.cast}
          keyExtractor={item => item.id.toString()}
          renderItem={this.renderItem}
        />
        {this._displayLoading}
      </>
    );
  }
}

const styles = {
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
  },

  main_container: {
    height: 190,
    flexDirection: 'row',
    justufyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 150,
    margin: 5,
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  content_container: {
    flex: 1,
    margin: 5,
  },
  header_container: {
    flex: 3,
    flexDirection: 'row',
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
    //paddingRight: 5,
  },
};
