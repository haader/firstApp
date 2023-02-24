import React, {useContext} from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { createNativeBottomTabNavigator } from "@react-navigation/native-bottom-tabs";
import {StyleSheet,Text, View} from 'react-native';
//efectos
import { useFocusEffect } from "@react-navigation/native";
//cargamos el componente loading
import Loading from './componentes/Loading';
//screen  => ambarScreen,melyScreen,comprarScreen,susanaScreen,deberesScreen
import ScreenTask from "./screens/screenTask";
import ScreenInicio from "./screens/ScreenInicio";
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';

//iconos

import { AntDesign } from '@expo/vector-icons';

import { ConfiguracionesContext } from './componentes/ConfiguracionesContext';



const Tab=createBottomTabNavigator();


const Navigation=({navigation})=>{

  //variables traidas desde el context para actualizar los colores
  const { ConfiguracionesCustom, setConfiguracionesCustom } = useContext(ConfiguracionesContext);

  console.log("entrando a Navigation")
    //conectamos con la base de datos
    const db= SQLite.openDatabase('taskApp.db');
    const [isLoading,setIsLoading]= useState(false); //es un booleano
    const [fullTable,setFullTable]= useState(false); //BOOLEANO PARA NULL TABLE
    const [secciones,setSecciones]=useState([]);//es un array
    const array=[{"id": 2, "name": "Ambar"}, {"id": 3, "name": "susana"}, {"id": 4, "name": "Compras"}, {"id": 5, "name": "Deberes"}, {"id": 6, "name": "Yo"}]

  useFocusEffect(

    React.useCallback(() => {
      console.log("ATENCION: =>=> DENTRO <=<= del call back");
      setIsLoading(true);
      CargarDatosTabla();
      return () => console.log("ATENCION: =>=> FUERA <=<= del call back");
    },[])

  );

//vamos a comentarlo ya que useEffect se ejecuta despues del renderizado

  // useEffect(()=>{
  //   CargarDatosTabla();
    
  // },[]);

  if(isLoading){
    return(
        <Loading state={isLoading} color='orange'></Loading>
    );
  }

    const CargarDatosTabla =()=>{
      console.log("entro a =>=>=>cargarDatosTabla")
        // setIsLoading(true);
        setTimeout(()=>{
            
            db.transaction(tx=>{

                tx.executeSql('SELECT * FROM taskappSecciones',null,
                (obj,setResult)=>{ // enviamos los objetos a la variable names que es un array!
    
                      //sí el lenght de los row es 0 la tabla esta vacia => se renderiza un mensaje
                if(setResult.rows.length>0){
                              
                              setSecciones(setResult.rows._array);
                              setFullTable(true);
                       
                }else{
                  setFullTable(false);
                }
              },
              // (txObj,error)=>console.log("ATENCIÓN!!se encontro un error al leer la tabla taskappSecciones: "+error)
              );
            
        })
        setIsLoading(false);
        },2000)

        
}

return(
  
  <Tab.Navigator
  screenOptions={{
      tabBarActiveTintColor:'#7cc'
  }}
 >
          {/* <Tab.Screen name={'Inicio'} options={{headerShown:false,tabBarIcon:({color,size})=>(<AntDesign name="home" size={24} color="black"/>)}}children={()=><View style={{alignItems:'center',justifyContent:'center'}}><Text>Bienvenido a appTareas</Text></View>}></Tab.Screen> */}
          <Tab.Screen name={'Inicio'} 
          options={{headerShown:false,tabBarIcon:({focused,size})=>(<AntDesign name="home" size={24} color={focused?ConfiguracionesCustom[0].navigateselect:ConfiguracionesCustom[0].navigateunselect}/>)}} 
          component={ScreenInicio}/>

            {
              
                 secciones.map((val, index) => (

                // console.log("vuelta "+index+" estado "+val.show),
            val.show == 1? <Tab.Screen
            key={index}
            name={val.name}
                        options={{
                          tabBarLabel: val.name,
                          headerShown:false,
                          tabBarIcon:({focused,size})=>(
                            <AntDesign name={val.icon} size={24} color={focused?ConfiguracionesCustom[0].navigateselect:ConfiguracionesCustom[0].navigateunselect} />
                                      )
                                }}
            children={()=><ScreenTask screnName={val.name} dbName={val.name}></ScreenTask>
            
            }
          />: 
          console.log("")
              )
              
              )

            }
</Tab.Navigator>
                      
              )
 
}

const styles = StyleSheet.create({
    container: {
      // marginTop:40,
      flex: 1,
      height:'100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    girar:{
      width:50,
      height:50,
      borderWidth:3,
      borderColor:'gray',
      borderRadius:25,
      borderLeftWidth:3,
      borderLeftColor:'red',
      
      
    }})

export default Navigation