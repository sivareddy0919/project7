import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Todayrecord = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.heading}>Yesterday Record</Text>
      </View>
      <View style={styles.container1}>
        <View style={styles.innerContainer1A}>
          <Text style={styles.boxText}>Breakfast :</Text>
        </View>
      </View>
      <View style={styles.container2}>
        <View style={styles.innerContainer2A}>
          <Text style={styles.boxText}>Lunch :</Text>
        </View>
      </View>
      <View style={styles.container3}>
        <View style={styles.innerContainer3A}>
          <Text style={styles.boxText}>Dinner :</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: windowWidth * 0.05,
    paddingTop: windowHeight * 0.02,
  },
  topContainer: {
    paddingVertical: windowHeight * 0.03,
    paddingHorizontal: windowWidth * 0.1,
    backgroundColor: '#603F83FF',
    borderBottomColor: 'black',
    height: windowHeight * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 1.0,
    right:windowWidth*0.05,
    marginTop:windowHeight*-0.020
  },
  heading: {
    fontSize: windowWidth * 0.06,
    left:windowWidth*0.02,
    bottom:windowHeight *-0.02,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  container1: {
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: windowWidth * 0.1,
    height: windowHeight * 0.24,
    marginTop: windowHeight * 0.04,
    borderRadius: windowHeight * 0.03,
    width: windowWidth * 0.9,
    marginBottom: windowHeight * 0.03,
  },
  container2: {
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
    height: windowHeight * 0.24,
    marginTop: windowHeight * 0.02,
    borderRadius: windowHeight * 0.03,
    width: windowWidth * 0.9,
    marginBottom: windowHeight * 0.03,
  },
  container3: {
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: windowHeight * 0.02,
    height: windowHeight * 0.24,
    borderRadius: windowHeight * 0.03,
    width: windowWidth * 0.9,
  },
  innerContainer1A: {
    backgroundColor: '#603F83FF',
    padding: windowWidth * 0.03,
    margin: windowWidth * 0.01,
    borderRadius: windowWidth * 0.02,
    width: '120%',
    alignItems: 'center',
    marginBottom:windowHeight*0.15,
  },
  innerContainer2A: {
    backgroundColor: '#603F83FF',
    padding: windowWidth * 0.03,
    margin: windowWidth * 0.01,
    borderRadius: windowWidth * 0.03,
    width: '93%',
    alignItems: 'center',
    marginBottom:windowHeight*0.15,
  },
  innerContainer3A: {
    backgroundColor: '#603F83FF',
    padding: windowWidth * 0.03,
    margin: windowWidth * 0.01,
    borderRadius: windowWidth * 0.03,
    width: '93%',
    alignItems: 'center',
    marginBottom:windowHeight*0.15,
  },
  boxText: {
    fontSize: windowWidth * 0.04,
    color: '#FFFFFF',
  },
});

export default Todayrecord;
