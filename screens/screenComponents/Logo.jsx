import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

// import colors fron constants
import colors from '../../constants/colors'

const Logo = () => {
    return (
        <View style={styles.logoBox}>
            <Image
                style={styles.logo}
                source={require('../../assets/GoT.png')}
            />
            <Text style={styles.logoText}> GALLARY </Text>
        </View>
    )
}

export default Logo

const styles = StyleSheet.create({
    logoBox: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 55,

    },
    logo: {
        width: 250,
        height: 120,
    },
    logoText: {
        color: colors.White,
        fontSize: 30,
        fontFamily: 'Game of Thrones',
        color: colors.Red,
    },
})