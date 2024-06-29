import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const DateScreen = () => {
  const route = useRoute();
  const { selectedDate } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Selected Date</Text>
      <Text style={styles.dateText}>{selectedDate}</Text>
      {/* Additional logic to display data for the selected date */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dateText: {
    fontSize: 18,
  },
});

export default DateScreen;
