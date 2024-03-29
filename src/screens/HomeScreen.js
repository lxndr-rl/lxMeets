/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  View,
  ActivityIndicator,
  Linking,
  Platform,
} from "react-native";
import Item from "../components/itemList";
import AwesomeAlert from "react-native-awesome-alerts";
import { StatusBar } from "expo-status-bar";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import ModalSelector from "react-native-modal-selector";

const phoneWidth =
  Platform.OS == "web"
    ? Dimensions.get("window").width < 800
      ? Dimensions.get("window").width
      : Dimensions.get("window").width / 2.5
    : Dimensions.get("window").width;

const ver = require("../version.json");
const f = new Date();
let index = 0;
const dias = [
  { key: index++, section: true, label: "Días" },
  { key: index++, label: "Lunes" },
  { key: index++, label: "Martes" },
  { key: index++, label: "Miércoles" },
  { key: index++, label: "Jueves" },
  { key: index++, label: "Viernes" },
];
// eslint-disable-next-line no-undef
const HomeScreen = ({ navigation }) => {
  const [mostrarExamen, setMostrarExamen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dia, setDia] = useState(
    f.getDay() === 0
      ? "Domingo"
      : f.getDay() === 1
      ? "Lunes"
      : f.getDay() === 2
      ? "Martes"
      : f.getDay() === 3
      ? "Miércoles"
      : f.getDay() === 4
      ? "Jueves"
      : f.getDay() === 5
      ? "Viernes"
      : "Sábado"
  );
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({});
  const [data, setData] = useState(null);

  React.useEffect(() => {
    _getData();
    fetch("https://lxmeets.lxndr.dev/latest.php")
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.examen) {
          setMostrarExamen(true);
        } else {
          setMostrarExamen(false);
        }
        if (Platform.OS != "web") {
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
                { text: json.cancelMensaje, onPress: () => null },
              ],
              { cancelable: true }
            );
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const _getData = () => {
    setLoading(true);
    fetch(
      "https://api.lxndr.dev/uae/meets/?dia=" +
        dia.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    )
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.error) {
          Platform.OS == "web"
            ? alert(resJson.message)
            : Alert.alert(
                resJson.error,
                resJson.message,
                [{ text: "OK", onPress: () => null }],
                { cancelable: true }
              );
          setLoading(false);
          return;
        }
        setData(resJson);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const pressButton = (url, materia, hora) => {
    setAlertData({ url, materia, hora });
    setAlertVisible(true);
  };

  const navigateHorario = () => {
    navigation.navigate("Horario", { page: 1 });
  };
  const navigateExamen = () => {
    navigation.navigate("Examen", { page: 1 });
  };
  const _goToNotas = () => {
    Platform.OS == "web"
      ? window.open(`https://sicau.lxndr.dev/`, "_blank")
      : Linking.openURL(`https://sicau.lxndr.dev/`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        style="light"
        animated={true}
        backgroundColor="black"
        hidden={false}
      />
      <View style={{ paddingTop: 30 }}>
        <Text
          style={{
            color: "white",
            alignSelf: "center",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Seleccione día
        </Text>
        <View style={styles.selectionSection}>
          <ModalSelector
            data={dias}
            style={{ width: 100, height: 40 }}
            sectionTextStyle={{
              color: "#BFBCBC",
            }}
            optionTextStyle={{
              color: "lightblue",
            }}
            optionContainerStyle={{
              borderRadius: 5,
              flexShrink: 1,
              marginBottom: 8,
              width: phoneWidth - 50,
              alignSelf: "center",
              padding: 8,
              backgroundColor: "#171717",
            }}
            cancelStyle={{
              borderRadius: 5,
              backgroundColor: "#171717",
              padding: 8,
            }}
            cancelContainerStyle={{
              width: phoneWidth - 50,
              alignSelf: "center",
            }}
            cancelTextStyle={{
              textAlign: "center",
              color: "#BFBCBC",
              fontSize: 16,
            }}
            optionStyle={{
              padding: 8,
              borderBottomWidth: 1,
              borderBottomColor: "#818181",
            }}
            cancelText="Cancelar"
            backdropPressToClose
            animationType="fade"
            initValue={dia}
            onChange={(option) => {
              setDia(option.label);
              _getData();
            }}
          />
          <TouchableOpacity
            style={styles.reloadButton}
            onPress={() => _getData()}
            key={"reload"}
          >
            <LinearGradient
              colors={["#2b2b2b", "#414345"]}
              style={styles.reloadButton}
            >
              <Text style={styles.buttonText}>
                <Icon name="refresh" style={styles.buttonText} />
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{ marginTop: 20, marginBottom: 10 }}>
        {data
          ? data.map((item, index) =>
              item.materia === "No hay nada por ahora" ? (
                <Icon
                  name="smile-o"
                  color={"white"}
                  style={{ alignSelf: "center" }}
                  size={40}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    pressButton(item.url, item.materia, item.hora);
                  }}
                  key={index}
                  style={{ alignSelf: "center" }}
                >
                  <Item materia={item.materia} horas={item.hora} />
                </TouchableOpacity>
              )
            )
          : null}
        {loading ? <ActivityIndicator size="large" color="white" /> : null}
      </ScrollView>
      <AwesomeAlert
        show={alertVisible}
        showProgress={false}
        title={alertData.materia}
        message={alertData.hora}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancelar"
        confirmText="Abrir URL"
        cancelButtonTextStyle={{ fontSize: 16 }}
        confirmButtonTextStyle={{ fontSize: 16 }}
        confirmButtonColor="green"
        cancelButtonColor="#DD6B55"
        actionContainerStyle={{ backgroundColor: "#2B2B2B" }}
        contentContainerStyle={{ backgroundColor: "#2B2B2B" }}
        titleStyle={{ color: "white", fontSize: 24, fontWeight: "bold" }}
        messageStyle={{ color: "white", fontSize: 18 }}
        onCancelPressed={() => {
          setAlertVisible(false);
        }}
        onConfirmPressed={() => {
          setAlertVisible(false);
          Platform.OS != "web"
            ? Linking.openURL(alertData.url)
            : window.open(alertData.url, "_blank");
        }}
      />
      <TouchableOpacity style={styles.button} onPress={navigateHorario}>
        <LinearGradient colors={["#2b2b2b", "#414345"]} style={styles.button}>
          <Text style={styles.buttonText}>
            <Icon name="calendar-o" style={styles.buttonText} /> Horario de
            Clases
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      {mostrarExamen ? (
        <TouchableOpacity style={styles.button} onPress={navigateExamen}>
          <LinearGradient colors={["#2b2b2b", "#414345"]} style={styles.button}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.buttonText}>
                <Icon name="calendar-plus-o" style={styles.buttonText} />{" "}
                Horario de Examenes
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity style={styles.button} onPress={_goToNotas}>
        <LinearGradient colors={["#2b2b2b", "#414345"]} style={styles.button}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.buttonText}>
              <Icon name="list-alt" style={styles.buttonText} /> Consulta de
              Notas
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "black",
  },
  button: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    height: 54,
    margin: 5,
    borderRadius: 8,
    width: phoneWidth,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  selectionSection: {
    paddingTop: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  reloadButton: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    height: 40,
    margin: 5,
    borderRadius: 8,
    width: 40,
  },
});

export default HomeScreen;
