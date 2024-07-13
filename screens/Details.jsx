import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import colors from '../constants/colors';

const Details = ({ route }) => {
    const { character } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image source={{ uri: character.imageUrl }} style={styles.characterImage} />
                <Text style={styles.characterName}>{character.fullName}</Text>
                <Text style={styles.characterTitle}>" {character.title} "</Text>
                <Text style={styles.characterDetails}>First Name: {character.firstName}</Text>
                <Text style={styles.characterDetails}>Last Name: {character.lastName}</Text>
                <Text style={styles.characterDetails}>Family: {character.family || 'N/A'}</Text>

            </View>
        </View>
    );
};

export default Details;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.Slate,
        alignItems: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: colors.LightSlate,
        alignItems: 'center',
        padding: 15,
        borderRadius: 20,
        // Shadow properties for iOS
        shadowColor: colors.White,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        // Shadow property for Android
        elevation: 4,
        width: '100%'
    },
    characterImage: {
        width: 170,
        height: 170,
        borderRadius: 90,
        marginBottom: 20,
    },
    characterName: {
        fontSize: 25,
        color: colors.White,
        marginBottom: 10,
        fontFamily: 'Outfit-Regular'
    },
    characterTitle: {
        fontSize: 22,
        color: '#B0B0B0',
        marginBottom: 10,
        fontFamily: 'Outfit-Bold'
    },
    characterDetails: {
        fontSize: 18,
        color: colors.White,
        fontFamily: 'Outfit-Regular',
        marginBottom: 7,
    },
});
