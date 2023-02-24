import {React, useContext, useState} from 'react';
import {View, Text, StyleSheet,TouchableOpacity, FlatList, Button, Linking, Image} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ConfiguracionesContext } from '../componentes/ConfiguracionesContext';


const ScreenHelp=()=>{

    const {ConfiguracionesCustom, setConfiguracionesCustom}=useContext(ConfiguracionesContext)

    const OpenURL=(url)=>{
        Linking.openURL(url)
    }
return(
<View style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>

    <Text style={{fontSize:40, backgroundColor:ConfiguracionesCustom[0].colortitle,borderRadius:10,padding:10,marginTop:10}}>¿Deseas ayudarnos?</Text>

    <Image style={{width:100,height:100,margin:20,borderWidth:2,borderColor:'black', borderRadius:50}} source={require('../assets/logo.png')}></Image>
    
    
    <Text style={{margin:10,padding:20,textAlign:'justify'}}>Si AppTask te resulto útil, pudes colaborar y ayudarme a crear mas contenidos similares enviandome "cafecitos" y sí no puedes hacerlo, no importa, disfruta la app gratis!</Text>

    

    <TouchableOpacity style={{display:'flex',flexDirection:'row',borderWidth:1,borderRadius:10,padding:10}} onPress={()=>{
        OpenURL('https://cafecito.app/ayudarandomdev')
    }}>
        <FontAwesome name="coffee" size={24} color="black" />
        <Text> invitar un cafecito</Text>
    </TouchableOpacity>

</View>
)

}
export default ScreenHelp;

