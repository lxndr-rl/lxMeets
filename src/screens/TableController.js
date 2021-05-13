/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
import React, {Component} from 'react';
import {Container, ListItem, Text, List, Body} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalSelector from 'react-native-modal-selector';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight,
  Linking,
  Platform,
  Alert,
  Clipboard,
  StyleSheet,
} from 'react-native';
import _ from 'lodash';
import {Picker} from 'react-native-windows';

const ver = require('../version.json');
var f = new Date();

export default class TableController extends Component {
  state = {
    modalVisible: false,
    materia: '',
    hora: '',
    url: '',
    dia: '',
  };
  toggleModal(visible, materia, hora, url, dia) {
    this.setState({
      modalVisible: visible,
      materia: materia,
      hora: hora,
      url: url,
      dia: dia,
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      fullData: [],
      loading: false,
      error: null,
      query: '',
    };
  }

  pressBtn = (url, clase, hora) => {
    Alert.alert(
      clase,
      hora,
      [
        {text: 'Cerrar', onPress: () => null},
        {
          text: 'Abrir',
          onPress: () => Linking.openURL(url),
        },
        {text: 'Copiar enlace', onPress: () => Clipboard.setString(url)},
      ],
      {cancelable: true},
    );
  };

  actualizacion = () => {
    fetch('https://lxmeets.lxndr.dev/latest.php')
      .then(res => res.json())
      .then(resJson => {
        const json = resJson[Platform.OS];
        if (json.latest > ver.actual) {
          Alert.alert(
            json.type,
            json.cambios,
            [
              {
                text: json.okMensaje,
                onPress: () => Linking.openURL(json.URL),
              },
              {text: json.cancelMensaje, onPress: () => null},
            ],
            {cancelable: true},
          );
        }
      })
      .catch(error => {
        this.setState({error, loading: false});
      });
  };

  obtieneDia = dia => {
    if (dia === 1) {
      return 'Lunes';
    } else if (dia === 2) {
      return 'Martes';
    } else if (dia === 3) {
      return 'Miercoles';
    } else if (dia === 4) {
      return 'Jueves';
    } else if (dia === 5) {
      return 'Viernes';
    } else if (dia === 6) {
      return 'Sabado';
    } else if (dia === 7) {
      return 'Domingo';
    }
  };

  componentDidMount() {
    this.setState({modalVisible: false});
    this.setState({dia: this.props.dia ?? this.obtieneDia(f.getDay())});
    this.requestlxndrAPI();
    this.actualizacion();
  }

  requestlxndrAPI = _.debounce(() => {
    this.setState({loading: true});
    const apiLink = 'https://api.lxndr.dev/uae/meets?dia=' + this.state.dia;
    fetch(apiLink)
      .then(res => res.json())
      .then(resJson => {
        this.setState({
          loading: false,
          data: resJson,
          fullData: resJson,
        });
      })
      .catch(error => {
        this.setState({error, loading: false});
      });
  }, 250);

  renderFooter = () => {
    if (!this.state.loading) {
      return null;
    }
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE',
          backgroundColor: 'black',
        }}>
        <ActivityIndicator animating size="large" color="white" />
      </View>
    );
  };

  _renderItem = ({item, index}) => {
    if (item.materia === 'No hay nada por ahora') {
      return;
    }
    return (
      <ListItem style={{backgroundColor: 'black'}}>
        <TouchableOpacity
          style={{flex: 1, flexDirection: 'row', marginBottom: 3}}
          onPress={() => {
            this.pressBtn(item.url, item.materia, item.hora);
          }}>
          <Body>
            <Text style={{color: 'white'}}>{item.materia} </Text>
            <Text note>{item.hora}</Text>
          </Body>
        </TouchableOpacity>
      </ListItem>
    );
  };

  render() {
    let index = 0;
    const data = [
      {key: index++, section: true, label: 'Dias'},
      {key: index++, label: 'Lunes'},
      {key: index++, label: 'Martes'},
      {key: index++, label: 'Miercoles'},
      {key: index++, label: 'Jueves'},
      {key: index++, label: 'Viernes'},
    ];
    return (
      <Container style={{backgroundColor: 'black'}}>
        <View style={{alignItems: 'center', backgroundColor: 'black'}}>
          <Text style={{color: 'white'}}>Seleccione día</Text>
          <View>
            {Platform.OS === 'windows' ? (
              <Picker
                style={{
                  flexShrink: 1,
                }}
                mode={'dropdown'}
                selectedValue={this.state.dia}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({dia: itemValue});
                  this.requestlxndrAPI();
                }}>
                <Picker.Item label="Lunes" value="Lunes" />
                <Picker.Item label="Martes" value="Martes" />
                <Picker.Item label="Miercoles" value="Miercoles" />
                <Picker.Item label="Jueves" value="Jueves" />
                <Picker.Item label="Viernes" value="Viernes" />
              </Picker>
            ) : (
              <ModalSelector
                data={data}
                sectionTextStyle={{
                  color: '#BFBCBC',
                }}
                optionTextStyle={{
                  color: 'lightblue',
                }}
                optionContainerStyle={{
                  borderRadius: 5,
                  flexShrink: 1,
                  marginBottom: 8,
                  padding: 8,
                  backgroundColor: '#171717',
                }}
                cancelStyle={{
                  borderRadius: 5,
                  backgroundColor: '#171717',
                  padding: 8,
                }}
                cancelTextStyle={{
                  textAlign: 'center',
                  color: '#BFBCBC',
                  fontSize: 16,
                }}
                optionStyle={{
                  padding: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: '#818181',
                }}
                cancelText="Cancelar"
                backdropPressToClose
                initValue={this.state.dia}
                onChange={option => {
                  this.setState({dia: option.label});
                  this.requestlxndrAPI();
                }}
              />
            )}
          </View>
          <TouchableHighlight
            style={styles.buttonStyle}
            onPress={this.requestlxndrAPI}>
            <View style={{alignItems: 'center'}}>
              <Icon name="undo" style={styles.buttonTextStyle} />
              <Text style={styles.buttonTextStyle}>Recargar</Text>
            </View>
          </TouchableHighlight>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
            {this.state.dia}
          </Text>
        </View>
        <List style={{paddingBottom: 160, backgroundColor: 'black'}}>
          <FlatList
            data={this.state.data}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={this.renderFooter}
          />
        </List>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#ede3f2',
    padding: 100,
  },
  text: {
    color: '#3f2949',
    marginTop: 10,
  },
  buttonStyle: {
    backgroundColor: '#934f96',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 50,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 17,
  },
});
