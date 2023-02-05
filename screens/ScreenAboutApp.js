import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ScreenAboutApp =()=>{

    return(
        <View style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%'}}>
            <Text>información de la App</Text>
            <Text>Proximamente</Text>
        </View>
    )
}
const estilos=StyleSheet.create({
    column:{
        display:'flex',
        flexDirection:'column'
    },
    texto:{
        color:'red'
    }
})

export default ScreenAboutApp;