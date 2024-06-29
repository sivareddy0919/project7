import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, Image, Alert, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DoctorSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();

  const handleSearch = () => {
    const searchApiUrl = 'http://192.168.40.121/Database/Doctorsearch.php';

    fetch(searchApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: searchText }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('API Response:', data);
        if (data.status === 'error') {
          throw new Error(data.message);
        }
        setSearchResults(data.patients || []);
      })
      .catch(error => {
        console.error('Search Error:', error);
        Alert.alert('Search failed', error.message);
      });
  };

  const renderPatientItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Patientdetails', { patient: item })}>
      <View style={styles.patientContainer}>
        {item.image_path && (
          <Image source={{ uri: item.image_path }} style={styles.patientImage} />
        )}
        <View style={styles.patientInfo}>
          {item.username && (
            <Text style={styles.patientName}>Patient Name: {item.username}</Text>
          )}
          {item.gender && (
            <Text style={styles.patientDetails}>Gender: {item.gender}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.heading}>Search Patients</Text>
      </View>
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={windowWidth * 0.06} color="black" style={styles.searchIcon} />
        <TextInput
          placeholder="Search Patients..."
          style={styles.searchInput}
          value={searchText}
          onChangeText={text => setSearchText(text)}
          onSubmitEditing={handleSearch}
        />
      </View>
      {Array.isArray(searchResults) && searchResults.length > 0 && (
        <Text style={styles.resultsHeading}>Results</Text>
      )}
      <FlatList
        data={searchResults}
        renderItem={renderPatientItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.resultContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topContainer: {
    paddingTop: windowHeight * 0.02,
    paddingRight: windowWidth * 0.05,
    backgroundColor: '#603F83FF',
    height: windowHeight * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth,
  },
  heading: {
    fontSize: windowWidth * 0.07,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: windowHeight * 0.1,
    width: '80%',
    backgroundColor: '#DFDFDF',
    paddingHorizontal: windowWidth * 0.02,
    borderRadius: windowWidth * 0.07,
    top: windowHeight * -0.03,
    left: windowWidth * 0.12,
  },
  searchIcon: {
    marginLeft: windowWidth * 0.03,
  },
  searchInput: {
    fontSize: windowWidth * 0.05,
    paddingVertical: windowHeight * 0.015,
    marginLeft: windowWidth * 0.03,
    fontWeight: 'bold',
    flex: 1,
  },
  resultsHeading: {
    fontSize: windowWidth * 0.056,
    color: 'black',
    fontWeight: 'bold',
    marginVertical: windowHeight * 0.02,
    alignSelf: 'center',
  },
  patientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#603F83FF',
    borderRadius: 10,
    marginHorizontal: windowWidth * 0.05,
    marginBottom: windowHeight * 0.02,
    padding: 10,
  },
  patientImage: {
    width: windowWidth * 0.17,
    height: windowWidth * 0.17,
    borderRadius: windowWidth * 0.1,
    marginRight: windowWidth * 0.05,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: windowWidth * 0.05,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  patientDetails: {
    fontSize: windowWidth * 0.04,
    color: '#FFFFFF',
  },
  resultContainer: {
    paddingBottom: windowHeight * 0.05,
  },
});

export default DoctorSearch;
