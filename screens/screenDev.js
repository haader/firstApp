import React, { Component } from "react";

import { StyleSheet, Text, View, Image,TouchableOpacity, Linking } from 'react-native';
//importamos los iconos
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

//alerta con input

const ScreenDev=()=>{
    const openURL=(url)=>{
        Linking.openURL(url)
    }
    return(
            <View style={styles.container}>
                
                
                {/* <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <Text style={{fontSize:100,margin:5}}>&lt;</Text> */}
                        <Image
                        style={styles.image}
                        source={require("../assets/dev.png")}
                        />
                    {/* <Text style={{fontSize:100,margin:5}}>&gt;</Text>
                </View> */}
                <Text style={{fontSize:25}}>&lt;Adrián Benitez/&gt;</Text>
                
                
                <View style={styles.containerContact}>
                    
                    <Text style={{fontSize:20,marginBottom:20}}>Mis Redes</Text>

                    <TouchableOpacity style={styles.row} onPress={()=>openURL('https://www.instagram.com/haaderdev/')}>
                        <AntDesign name="instagram" size={24} color="black" /><Text>  HaaderDev</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.row} onPress={()=>{openURL('https://www.youtube.com/@ayudasrandomdevelopers8306/featured')}}>
                        <AntDesign name="youtube" size={24} color="red" /><Text>  AyudasRandomDevelopers</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.row} onPress={()=>openURL('https://www.linkedin.com/in/adrian-benitez-254774241/')}>
                        <AntDesign name="linkedin-square" size={24} color="#0a66c2" /><Text>  Adrian Benitez</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.row} onPress={()=>openURL('https://github.com/haader')}>
                        <AntDesign name="github" size={24} color="black" /><Text>  Git-Hub</Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={styles.row} onPress={()=>openURL('https://wa.link/jem6yt')}>
                        <FontAwesome name="whatsapp" size={24} color="green" /><Text>  Whatsapp</Text>
                    </TouchableOpacity> */}
                </View>
                {/* <Text>Descripción:</Text>
                <Text>AppTareas es una aplicación donde usted prodra organizar sus tareas por Secciones en configuraciones</Text> */}
            </View>
    )
}

const styles=StyleSheet.create({
    containerContact:{
        marginTop:40,
        padding:20,
        borderWidth:2,
        borderRadius:10,
        alignItems:'center'

    },
        row:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:2,
        margin:5,
        padding:2,
        borderRadius:10,
        
        
        
    },
    container:{
        height:'100%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
    },
    image:{
        width: 150,
        overflow:'hidden',
        height: 150,
        borderStyle: 'solid',
        marginBottom: 15,
        borderRadius:75,
        borderWidth:2,
        borderColor:'black'

    }
})
export default ScreenDev;