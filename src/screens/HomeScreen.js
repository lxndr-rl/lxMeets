/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  View,
  StatusBar,
} from 'react-native';
import TableController from './TableController';
import Icon from 'react-native-vector-icons/FontAwesome';

const phoneWidth = Dimensions.get('window').width;

// eslint-disable-next-line no-undef
export default Main = ({route, navigation}) => {
  const [shouldShow, setShouldShow] = useState(false);
  const [notasAvailables, setNotasAvailables] = useState(false);
  const {
    params: {dia},
  } = route;
  React.useEffect(() => {
    fetch('https://lxmeets.lxndr.dev/latest.php')
      .then(res => res.json())
      .then(resJson => {
        if (resJson.examen) {
          setShouldShow(true);
        } else {
          setShouldShow(false);
        }
        if (resJson.notas) {
          setNotasAvailables(true);
        } else {
          setNotasAvailables(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const _onNavigate = () => {
    navigation.navigate('Horario', {page: 1});
  };
  const _onNavigate2 = () => {
    navigation.navigate('Examen', {page: 1});
  };
  const _onNavigate3 = () => {
    navigation.navigate('Notas', {page: 1});
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar animated={true} backgroundColor="black" hidden={false} />
      {notasAvailables ? (
        <TouchableOpacity style={styles.buttonNotas} onPress={_onNavigate3}>
          <View style={{alignItems: 'center'}}>
            <Icon name="list-alt" style={styles.buttonText} />
          </View>
        </TouchableOpacity>
      ) : null}

      <TableController dia={dia} />
      <TouchableOpacity style={styles.button} onPress={_onNavigate}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.buttonText}>
            <Icon name="calendar-o" style={styles.buttonText} /> Horario de
            Clases
          </Text>
        </View>
      </TouchableOpacity>

      {shouldShow ? (
        <TouchableOpacity style={styles.button} onPress={_onNavigate2}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.buttonText}>
              <Icon name="calendar-plus-o" style={styles.buttonText} /> Horario
              de Examenes
            </Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 54,
    backgroundColor: '#934f96',
    margin: 5,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  buttonNotas: {
    backgroundColor: '#934f96',
    borderRadius: 33,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    top: 10,
    left: phoneWidth - 60,
  },
});
