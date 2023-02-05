import React from "react";
import {StyleSheet,Text, View, TouchableOpacity} from 'react-native';
//importamos los iconos 
import { AntDesign } from '@expo/vector-icons';


const Barra=(props)=>{

    return(
        
            <View style={{borderRadius:10,borderWidth:1,width:'80%',height:30,marginTop:20,borderColor:'black',overflow:'hidden'}}>
                
                <Text style={{width:'100%',textAlign:'center',position:'absolute',zIndex:10,fontSize:20}}>
                    {props.porcentual?   props.title+' '+props.value+'%'  :   props.title+' '+props.value}
                </Text>
                
                <View style={{  width:`${props.porcentual ? props.value+'%' : '100%'}` ,height:30,  backgroundColor:'orange', }}>
                </View>

            </View>
        
    )
}

const ScreenInicio =()=>{
    //en inicio se vera el nombre de usuario, la cantidad de secciones y tareas por secciones
    //crear un circulo que indicque la cantidad de tareas completas e incompletas
    return(
        <View style={{height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            
            <View style={{width:'90%',height:'20%',alignItems:'center'}}>

                {/* <Text style={{fontSize:70}}>AppTareas</Text> */}
            
                 <Text style={{fontSize:40,backgroundColor:'orange',borderRadius:10,padding:10,borderWidth:1}}>App-Task!</Text>
            </View>

                        <View style={{

                            width:'100%',
                            alignItems:'center',
                            justifyContent:'center',
                            // backgroundColor:'red',
                            alignContent:'center'}}>
                            
                            {/* barras */}
                            {/* <Text>Secciones: 7</Text> */}
                            <Barra title='Secciones:' porcentual={false} value={7}></Barra>

                            {/* <Text>Secciones Visibles: 5</Text> */}
                            <Barra title='Secciones Visibles:' porcentual={false} value={5}></Barra>

                            {/* <Text>Tareas Totales: 10</Text> */}
                            <Barra title='Tareas Totales:' porcentual={false} value={10}></Barra>

                            {/* <Text>Tareas Realizadas: 8/ tareas totales</Text> */}
                            <Barra title='Tareas Realizadas:' porcentual={false} value={8}></Barra>


                            <Barra title='progreso:' porcentual={true}  value={50}></Barra>
                            {/* <Text>Progreso: 80%</Text> */}
                        </View>


                        <View style={{backgroundColor:'red',width:'100%'}}>
                            <TouchableOpacity style={{
                                display:'flex',
                                flexDirection:'column',
                                width:80,
                                height:80,
                                borderRadius:50,
                                backgroundColor:'#ccc',
                                position:'absolute',
                                zIndex:10,
                                bottom:-130,
                                alignItems:'center',
                                justifyContent:'center',
                                borderWidth:1,
                                left:'40%'
                            }}
                            onPress={()=>{
                                // navigation.navigate('Details')
                            }}
                            >
                                <AntDesign name='database' color='black' size={30}></AntDesign>
                                <Text>Secciones</Text>
                            </TouchableOpacity>
                        </View>

                    

            
            
        </View>
    )
}

export default ScreenInicio;