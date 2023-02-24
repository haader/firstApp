import React, { useState } from 'react';
import {View, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
//importamos los iconos
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


const Barratareas=(props)=>{

  return(
    <View style={{  
      flexDirection:'row',
      alignItems:'center',
      marginBottom:10,
      justifyContent:'space-between',
      borderWidth:1,
      borderColor:'black',
      marginTop:20,
      borderRadius:10,
      backgroundColor:props.color,
      width:'90%'}}>
      
        <View style={{
           marginEnd:10,
           marginLeft:10
        }}>
            <Feather name={props.nameIcon} size={24} color={props.colorIcon}/>
        </View>
        {/* creamos un elipsis */}
        <Text >
            nombre de tarea
        </Text>

        <View style={{
           backgroundColor:'rgb(229, 227, 227)',
           flexDirection:'row',
           alignItems:'center',
           //alignSelf:'stretch',
           //justifyContent:'space-between',
           padding:8,
           borderRadius:10, 
        }}>

            <View style={{marginEnd:10}}><AntDesign name="edit" size={24} color="orange"/></View>
            <View style={{marginEnd:10}}><AntDesign name="closecircle" size={24} color="red"/></View>
        </View>
  </View>
  )
  }

  const Secciones=(props)=>{

    return(
      <View style={{display:'flex',flexDirection:'row',marginBottom:10,marginTop:20,
      marginRight:40}}>
      <View  style={{ 
                                        flexDirection:'row',
                                        alignItems:'center',
                                        alignSelf:'stretch',
                                        justifyContent:'space-between',
                                        borderWidth:1,
                                        borderColor:'black',
                                       
                                        borderRadius:10,
                                      // backgroundColor:name.show?'green':'white',
                                      backgroundColor:props.show?'rgb(184, 245, 181)':'white',
                                    width:'100%',
                                  height:44}}
          >

          <Text >
          <Feather name="database" size={24} color="black" />
          {props.title}
          </Text>
      </View>
      
      <View style={{
         
          backgroundColor:'rgb(229, 227, 227)',
          flexDirection:'row',
          alignItems:'center',
          padding:8,
          borderRadius:10,
          position:'absolute',
          right:1,
          marginTop:1
         
      }}>
          <View style={{ marginEnd:10}}><AntDesign name='questioncircleo' size={24} color="black" /></View>
          <View style={{ marginEnd:10}}><Ionicons name={props.show?"eye-sharp":"eye-off-sharp"} size={24} color={props.show?"green":"red"} /></View>
          <View style={{ marginEnd:10}}><AntDesign name="edit" size={24} color="orange"  /></View>
          <View style={{ marginEnd:10}}><AntDesign name="closecircle" size={24} color="red"  /></View>
      </View>
  
      </View>
    );
    }

const ScreenAboutApp =({ navigation })=>{
  const textSize=20;
 
  return(
        <View style={[{display:'flex',alignItems:'center',justifyContent:'center'},{height:'100%'}]}>

{/* title */}
            <View style={{top:20,width:'90%',alignItems:'center',marginBottom:30}}>
                {/* <Text style={{fontSize:70}}>AppTareas</Text> */}
            
                <Text style={{fontSize:40,backgroundColor:'orange',borderRadius:10,padding:10,borderWidth:1}}
                        >Acerca de la App</Text>
            </View>
            

            <ScrollView style={{paddingBottom:30,borderWidth:1,borderRadius:10,borderColor:'orange',margin:10,padding:10}}>



{/* View de textos */}
                    
                    <Text style={{fontSize:textSize, textAlign:'center'}}>
                    ¡Hola! Bienvenido 
                    <Text style={{fontWeight: 'bold'}}> App-task!</Text>
                    </Text>

<View style={{width:'100%',height:30}}></View>                    
                    <Text style={{fontSize:textSize, textAlign:'left'}}>
                    ¿Estás cansado de tener una larga lista de tareas sin organización? 
                    ¿Quieres tener un control completo sobre tus tareas y secciones personalizadas? 
                    Entonces, nuestra aplicación de tareas es justo lo que necesitas.
                    </Text>

<View style={{width:'100%',height:50}}></View>
{/* secciones */}
      <Text style={{fontSize:30, textAlign:'center',marginBottom:20}}>Secciones</Text>
                    <Text style={{fontSize:textSize}}>
                    {' '}-Con nuestra aplicación, puedes separar tus tareas en Secciones</Text>
                    
                    <Text style={{fontSize:textSize}}>
                    {' '}-Personaliza las Secciones asignandoles un  
                    <Text style={{fontWeight: 'bold'}}>{' '} 
                    <AntDesign name='questioncircleo' color='black' size={20}></AntDesign>{' '}Icono{' '}</Text> 
                    para que puedas identificarlas fácilmente. 
                    </Text>
                    
                    <Text style={{fontSize:textSize}}> 
                    {' '}-Puedes crear secciones para tareas personales, de trabajo, de estudio o
                    cualquier otra que necesites en la parte de 
                    <Text style={{fontWeight: 'bold'}} onPress={()=>{
                          navigation.navigate('Administrar secciones')
                          }}>{' '}  
                          <AntDesign name='database' color='black' size={20}></AntDesign>
                          {' '}"Administrar Secciones"{' '}</Text>
                    
                    </Text>

<View style={{width:'100%',height:20}}></View>
                    <Text style={{fontSize:textSize}}>
                    {' '}-Puedes ocultar las secciones que no necesitas visualizar en el inicio habitualmente
                    </Text>

                    <Secciones title='seccion 1' show={true} />
                    


{/* tareas */}
<View style={{width:'100%',height:50}}></View>

      <Text style={{fontSize:30, textAlign:'center',marginBottom:20}}>Tareas</Text>
                    <Text style={{fontSize:textSize}}>
                    Marcar las tareas como realizadas o pendientes para que puedas
                    llevar un seguimiento del progreso.
                    </Text>

                    <Barratareas color='rgb(184, 245, 181)' nameIcon='check-circle' colorIcon='green'></Barratareas>



{/* PERSONALIZACIÓN */}
<View style={{width:'100%',height:50}}></View>
      <Text style={{fontSize:30, textAlign:'center',marginBottom:20}}>Personalización</Text>
                    <Text style={{fontSize:textSize}}>
                    {' '}-Para darle un toque personalizado,
                    puedes configurar los colores de los distintos elementos de la app en la sección de  
                    <Text style={{fontWeight: 'bold'}} onPress={()=>{navigation.navigate("Configuración")}}> 
                    {' '}<AntDesign name="setting" size={20} color="black" />{' '}Configuraciones{' '}</Text>. 
                    Así, puedes personalizar tu aplicación de tareas para que se ajuste a tu estilo.
                    </Text>

<View style={{width:'100%',height:50}}></View>
                    <Text style={{fontSize:textSize}}>
                    En resumen, nuestra aplicación de tareas es una herramienta esencial para cualquier 
                    persona que busque una forma fácil y organizada de administrar sus tareas diarias.
                    </Text>

                    <Text style={{fontSize:textSize,marginBottom:100}}>
                    Pruébala hoy mismo y comienza a experimentar la eficiencia que puede aportar a tu vida diaria.
                    ¡Gracias por elegir nuestra aplicación de tareas!       
                    </Text>    

                    <View style={{marginBottom:20,width:'100%',alignItems:'center',marginTop:30}}>
              <TouchableOpacity style={{
                display:'flex',
                flexDirection:'column',
                width:80,
                height:80,
                borderRadius:50,
                backgroundColor:'#ccc',
                position:'absolute',
                zIndex:10,
                bottom:10,
                alignItems:'center',
                justifyContent:'center',
                borderWidth:1,
                
              }}
              onPress={()=>{
                navigation.navigate('Tareas')
              }}
              >
                  <AntDesign name='home' color='black' size={40}></AntDesign>
                  <Text>Inicio</Text>
              </TouchableOpacity>
          </View>
                                
            </ScrollView>       
            
        </View>
    )
  }

export default ScreenAboutApp;


// import React, { useState } from 'react';
// import { StyleSheet, View, Text, Button } from 'react-native';
// import Loading from '../componentes/Loading';

// //efectos
// import { useFocusEffect } from "@react-navigation/native";



// const [loading,setLoading]=useState(true);
// const [color,setColor]=useState('red');

// useFocusEffect(
//   React.useCallback(() => {
//     reload(true)
//   },[])
// );

// const reload=(estadoReacargar)=>{
  
//     setLoading(estadoReacargar)
  
  
// }



// if(loading){
//   setTimeout(()=>{
//     reload(false)
//   },500)
//   return(
//     <Loading color='blue'/>
//   )
  
// }
// const reloading=()=>{
//   return(
//     <View style={{width:'100%',height:'50%'}}>
//             <Loading color={color}/>
//     </View>
//   )
// }


// return(
//   <Button onPress={()=>reload(!loading)} title='Recargar'/>
//   {reloading()}
//   <Button onPress={()=>{
//                       setColor(color=='red'?'black':'red')
//                       }} title='cambiar color'/>
//   <Button onPress={
            
//             ()=>navigation.navigate('Tareas')
            
//             } title='hola'/>
// )
