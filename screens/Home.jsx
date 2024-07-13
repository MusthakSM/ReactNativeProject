import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

// Importing Icons from Vector Icons
import Icons from 'react-native-vector-icons/Feather'

// Importing colors from constants
import colors from '../constants/colors';

const Home = (navigate) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('https://thronesapi.com/api/v2/Characters');
        const data = await response.json();
        setCharacters(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const renderCharacter = ({ item, index }) => (
    <TouchableOpacity 
      style={styles.characterCard}
      onPress={() => navigation.navigate('Details', { character: item })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.characterImage} />
      <Text style={styles.characterName}>
        {index + 1}. {item.fullName}
      </Text>
      <Text style={styles.characterTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.White} />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <Text style={styles.header}>GoT Characters</Text>

        <TouchableOpacity style={styles.profileIcn} onPress={()=>{navigation.navigate('Profile')}}>
          <Icons name='user' size={40} color={colors.White}/>
        </TouchableOpacity>
      </View>


      <FlatList
        data={characters}
        renderItem={renderCharacter}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Slate,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  header: {
    fontSize: 30,
    fontFamily: 'Outfit-Regular',
    color: colors.White,
    textAlign: 'center',
  },
  profileIcn: {
    position: 'absolute',
    right: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.Slate,
  },
  listContainer: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  characterCard: {
    backgroundColor: colors.LightSlate,
    paddingTop: 15,
    borderRadius: 20,
    marginBottom: 15,
    alignItems: 'center',
    // Shadow properties for iOS
    shadowColor: colors.White,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Shadow property for Android
    elevation: 4,
  },
  characterImage: {
    width: 120,
    height: 120,
    borderRadius: 50,
    marginBottom: 10,
  },
  characterName: {
    fontSize: 18,
    fontFamily: 'Outfit-Regular',
    color: colors.White,
  },
  characterTitle: {
    fontSize: 14,
    color: colors.Gray,
  },
});
