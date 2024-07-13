import React from 'react';
import { PropsWithChildren, useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/Firebase'

import { Provider } from 'react-redux';
import store from './Redux/store';

// Import Screens from Screen directory..
import Login from './screens/Login';
import SignUP from './screens/SignUP';
import Home from './screens/Home';
import UserProfile from './screens/UserProfile';
import Details from './screens/Details';

// Import colors..
import colors from './constants/colors';


const IntroScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.intro}>
      <Image
        source={require('./assets/GoT.png')}
        style={styles.logo}
      />
      <Text
        style={styles.appNameText}
      >
        GALLARY
      </Text>

    </View>
  );
}

const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [showIntro, setShowIntro] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 1500); // 1.5 seconds

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, [initializing]);

  if (initializing) return null; // Optionally return a loading spinner

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : colors.Red,
    flex: 1,
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        {showIntro ? (
          <IntroScreen />
        ) : (
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              {user ? (
                <>
                  {/* HomeScreen */}
                  <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                  />
                  {/* Details Screen */}
                  <Stack.Screen
                    name="Details"
                    component={Details}
                    options={{
                      headerStyle: { backgroundColor: colors.Slate },
                      headerTintColor: colors.White,
                      headerTitleAlign: 'center'
                    }}
                  />
                  {/* Profile Screen */}
                  <Stack.Screen
                    name="Profile"
                    component={UserProfile}
                    options={{
                      headerStyle: { backgroundColor: colors.Slate },
                      headerTintColor: colors.White,
                      headerTitleAlign: 'center'
                    }}
                  />
                </>
              ) : (
                <>
                  {/* Login Screen */}
                  <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                  />
                  {/* SignUp screen */}
                  <Stack.Screen
                    name="SignUP"
                    component={SignUP}
                    options={{ headerShown: false }}
                  />
                </>
              )}

            </Stack.Navigator>
          </NavigationContainer>
        )}
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  intro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.Slate,
  },
  logo: {
    width: 300,
    height: 150,
  },
  appNameText: {
    textAlign: 'center',
    fontSize: 40,
    color: colors.Red,
    fontFamily: 'Game of Thrones',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
