const config = {
  screens: {
    Main: {
      path: 'Main/:dia',
      parse: {
        dia: (dia) => dia,
      },
    },
    Notas: {
      initialRouteName: 'Main',
      screens: {
        Notas: 'Notas/:cedula/:aniolect',
        parse: {
          cedula: (cedula) => cedula,
          aniolect: (aniolect) => aniolect,
        },
      },
    },
    Horario: {
      initialRouteName: 'Main',
      screens: {
        Horario: 'Horario',
      },
    },
    Examen: {
      initialRouteName: 'Main',
      screens: {
        Examen: 'Examen',
      },
    },
  },
};

const linking = {
  prefixes: ['lxmeets://'],
  config,
};

export default linking;
