/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Keyboard,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalSelector from 'react-native-modal-selector';
import {Picker} from 'react-native-windows';

const phoneWidth = Dimensions.get('window').width;
let data;
let pickerItems;
let index = 0;
// eslint-disable-next-line no-undef
export default Main = ({route, navigation}) => {
  const {
    params: {cedula, aniolect},
  } = route;
  const [showAnio, onClickShow] = useState(false);
  const [value, onChangeText] = useState('Cédula');
  const [value2, onChangeAnio] = useState('Año Lectivo');
  const [state, changeState] = useState(false);
  const [indicator, setIndicator] = useState(false);

  // eslint-disable-next-line no-shadow
  const _picker = cedula => {
    Keyboard.dismiss();
    if (!cedula || cedula === 'Cédula' || isNaN(cedula) || cedula.length < 9) {
      setIndicator(false);
      changeState(false);
      return Alert.alert(
        'Error',
        'Ingrese un número de cédula válido',
        [{text: 'Aceptar', onPress: () => null}],
        {cancelable: true},
      );
    }
    var url = `https://api.lxndr.dev/uae/notas/anioLect.php?ced=${cedula}`;
    setIndicator(true);
    changeState(true);
    onClickShow(false);
    fetch(url)
      .then(res => res.json())
      .then(resJson => {
        Keyboard.dismiss();
        setIndicator(false);
        changeState(false);
        if (resJson.error) {
          Alert.alert(
            'Error',
            resJson.message,
            [{text: 'Aceptar', onPress: () => null}],
            {cancelable: true},
          );
          return;
        }
        Alert.alert(
          'Estudiante Encontrado',
          `${resJson.apellidos} ${resJson.nombres}\n\nCarrera:\n${resJson.carrera}\n\nSede:\n${resJson.unidadAcad}`,
        );
        setIndicator(false);
        changeState(false);
        data = [{key: index++, section: true, label: 'Año Lectivo'}];
        for (let i = 0; i < resJson.anioLect.length; i++) {
          data.push({key: index++, label: resJson.anioLect[i]});
        }
        pickerItems = resJson.anioLect.map(i => (
          <Picker.Item label={i.toString()} value={i} />
        ));
        onClickShow(true);
      })
      .catch(error => {
        Alert.alert(
          'Error',
          error.toString(),
          [{text: 'Aceptar', onPress: () => null}],
          {cancelable: true},
        );
        setIndicator(false);
        changeState(false);
      });
  };

  const _consulta = cedula => {
    Keyboard.dismiss();
    if (!cedula || cedula === 'Cédula' || isNaN(cedula) || cedula.length < 9) {
      setIndicator(false);
      changeState(false);
      return Alert.alert(
        'Error',
        'Ingrese un número de cédula válido',
        [{text: 'Aceptar', onPress: () => null}],
        {cancelable: true},
      );
    }
    const format = /^[2][0][0-9]{2}\-[2][0][0-9]{2}?$/;
    var url = `https://api.lxndr.dev/uae/notas/?ced=${cedula}`;
    if (format.test(value2)) {
      url = `https://api.lxndr.dev/uae/notas/?ced=${cedula}&alectivo=${value2}`;
    }
    setIndicator(true);
    changeState(true);
    fetch(url)
      .then(res => res.json())
      .then(resJson => {
        Keyboard.dismiss();
        setIndicator(false);
        changeState(false);
        if (resJson.error) {
          Alert.alert(
            'Error',
            resJson.message,
            [{text: 'Aceptar', onPress: () => null}],
            {cancelable: true},
          );
          return;
        }
        navigation.navigate('Vista de Notas', {page: 1, json: resJson});
        setIndicator(false);
        changeState(false);
      })
      .catch(error => {
        console.log(error);
        this.setState({error, loading: false});
      });
  };

  return (
    <View style={styles.safeArea}>
      <View style={{alignContent: 'center'}}>
        <View style={{alignSelf: 'center'}}>
          <Text
            style={{
              paddingBottom: 5,
              paddingTop: 20,
              alignSelf: 'flex-start',
              color: '#fff',
              fontSize: 18,
            }}>
            {' '}
            <Icon
              name="user-o"
              style={{
                paddingBottom: 5,
                paddingTop: 20,
                color: '#fff',
                fontSize: 18,
              }}
            />{' '}
            Cédula
          </Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Cédula"
            value={cedula}
            onChangeText={text => onChangeText(text)}
          />
        </View>
        <View style={{alignSelf: 'center'}}>
          {showAnio || aniolect ? (
            <Text
              style={{
                paddingBottom: 5,
                paddingTop: 20,
                color: '#fff',
                fontSize: 18,
              }}>
              {' '}
              <Icon
                name="calendar-o"
                style={{
                  paddingBottom: 5,
                  paddingTop: 20,
                  color: '#fff',
                  fontSize: 18,
                }}
              />{' '}
              Año Lectivo
            </Text>
          ) : null}
          {showAnio || aniolect ? (
            Platform.OS === 'windows' ? (
              <Picker
                style={{width: 300, alignSelf: 'center'}}
                selectedValue={aniolect ?? value2}
                onValueChange={(itemValue, itemIndex) =>
                  onChangeAnio(itemValue)
                }>
                {pickerItems}
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
                style={{width: 200, alignSelf: 'center'}}
                backdropPressToClose
                initValue={aniolect ?? value2}
                onChange={option => {
                  onChangeAnio(option.label);
                  Keyboard.dismiss();
                }}
                cancelText="Cancelar"
              />
            )
          ) : null}
        </View>
        <ActivityIndicator animating={indicator} size="large" color="#934f96" />
      </View>
      <View>
        <TouchableOpacity
          style={styles.buttonSearchAnio}
          disabled={state}
          onPress={() => _picker(value)}>
          <View style={{top: 10, left: 13}}>
            <Text style={styles.buttonText}>Cargar Años Lectivos</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSearch}
          disabled={state}
          onPress={() => _consulta(value)}>
          <View style={{top: 15, left: 15}}>
            <Icon name="search" style={styles.buttonText} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    alignSelf: 'stretch',
    flex: 1,
    alignContent: 'center',
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: '35%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    width: Platform.OS === 'windows' ? 300 : phoneWidth - 70,
    color: '#555555',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    height: 50,
    borderColor: '#6E5BAA',
    borderWidth: 1,
    borderRadius: 2,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  buttonSearch: {
    backgroundColor: '#934f96',
    borderRadius: 20,
    alignSelf: 'center',
    width: 50,
    height: 50,
    top: 10,
  },
  buttonSearchAnio: {
    backgroundColor: '#934f96',
    borderRadius: 5,
    alignSelf: 'center',
    width: 200,
    height: 50,
  },
});
