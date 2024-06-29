import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './Welcome';
import Interphase from './Interphase';
import Patientlogin from './Patientlogin';
import Patientsignup from './Patientsignup';
import Doctorlogin from './Doctorlogin';
import Duplicate from './Duplicate';
import Todayrecord from './Todayrecord';
import Yesterdayrecord from './Yesterdayrecord';
import DateScreen from './DateScreen';
import Patientprofile from './Patientprofile';
import GlucoseEntry from './GlucoseEntry';
import GlucoseTracker from './GlucoseTracker';
import PatientNotification from './PatientNotification';
import Doctordashboard from './Doctordashboard';
import Patientlist from './Patientlist';
import Doctorprofile from './Doctorprofile';
import DoctorSearch from './DoctorSearch';
import Patientdetails from './Patientdetails';
import Patientexcelrecord from './Patientexcelrecord';
import Patientgraphrecord from './Patientgraphrecord';
import Patientgraph from './Patientgraph';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Interphase"
          component={Interphase}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Patientlogin"
          component={Patientlogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Patientsignup"
          component={Patientsignup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Doctorlogin"
          component={Doctorlogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Duplicate"
          component={Duplicate}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Todayrecord"
          component={Todayrecord}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Yesterdayrecord"
          component={Yesterdayrecord}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DateScreen"
          component={DateScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Patientprofile"
          component={Patientprofile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GlucoseEntry"
          component={GlucoseEntry}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GlucoseTracker"
          component={GlucoseTracker}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PatientNotification"
          component={PatientNotification}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Doctordashboard"
          component={Doctordashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Patientlist"
          component={Patientlist}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Doctorprofile"
          component={Doctorprofile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DoctorSearch"
          component={DoctorSearch}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Patientdetails"
          component={Patientdetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Patientexcelrecord"
          component={Patientexcelrecord}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Patientgraphrecord"
          component={Patientgraphrecord}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Patientgraph"
          component={Patientgraph}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
