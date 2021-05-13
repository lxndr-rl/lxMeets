/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, View, Text, Platform} from 'react-native';
import {Table, Rows, Row} from 'react-native-table-component';

// eslint-disable-next-line no-undef
export default Main = ({route}) => {
  const {json} = route.params;
  let apellidos = json.apellidos;
  let nombres = json.nombres;
  let carrera = json.carrera;
  let facultad = json.facultad;
  let uAcademica = json.unidadAcad;
  let parciales = json.parciales;
  let promedios = json.promedios;
  let headerPromedio = promedios[0];
  let headerParciales = parciales[0];
  promedios[0] = '';
  parciales[0] = '';
  return (
    <View
      style={{flex: 1, padding: 15, paddingTop: 30, backgroundColor: 'black'}}>
      <ScrollView>
        <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
          {apellidos + ' ' + nombres + '\n\n'}
        </Text>
        <Text style={{color: 'white', fontSize: 15}}>
          {carrera + '\n' + uAcademica + ' ~ ' + facultad}
        </Text>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
          {'\n'}Promedios
        </Text>
        {Platform.OS === 'windows' ? (
          <View style={{backgroundColor: 'white', alignItems: 'center'}}>
            <Table
              borderStyle={{
                borderWidth: 3,
                borderColor: '#934f96',
              }}>
              <Row
                data={headerPromedio}
                widthArr={[90, 90, 300, 90]}
                textStyle={{
                  color: 'white',
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  padding: 4,
                }}
              />
              <Rows data={promedios} widthArr={[90, 90, 300, 90]} />
            </Table>
          </View>
        ) : (
          <ScrollView horizontal={true}>
            <Table borderStyle={{borderWidth: 3, borderColor: '#934f96'}}>
              <Row
                data={headerPromedio}
                widthArr={[90, 90, 300, 90]}
                textStyle={{
                  color: 'white',
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  padding: 4,
                }}
              />
              <Rows
                data={promedios}
                widthArr={[90, 90, 300, 90]}
                textStyle={{
                  color: 'white',
                  alignSelf: 'center',
                  fontWeight: '100',
                  padding: 4,
                }}
              />
            </Table>
          </ScrollView>
        )}
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
          {'\n'}Notas parciales
        </Text>

        {Platform.OS === 'windows' ? (
          <View style={{backgroundColor: 'white', alignItems: 'center'}}>
            <Table borderStyle={{borderWidth: 3, borderColor: '#934f96'}}>
              <Row
                data={headerParciales}
                widthArr={[80, 300, 90, 90, 105, 95]}
                textStyle={{
                  color: 'white',
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  padding: 4,
                }}
              />
              <Rows
                data={parciales}
                widthArr={[80, 300, 90, 90, 105, 95]}
                textStyle={{
                  color: 'white',
                  alignSelf: 'center',
                  fontWeight: '100',
                  padding: 4,
                }}
              />
            </Table>
          </View>
        ) : (
          <ScrollView horizontal={true}>
            <Table borderStyle={{borderWidth: 3, borderColor: '#934f96'}}>
              <Row
                data={headerPromedio}
                widthArr={[90, 90, 300, 90]}
                textStyle={{
                  color: 'white',
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  padding: 4,
                }}
              />
              <Rows
                data={promedios}
                widthArr={[90, 90, 300, 90]}
                textStyle={{
                  color: 'white',
                  alignSelf: 'center',
                  fontWeight: '100',
                  padding: 4,
                }}
              />
            </Table>
          </ScrollView>
        )}
      </ScrollView>
    </View>
  );
};
