import React, { useRef,useState,useContext, useEffect} from "react";
import {View,Text,TouchableOpacity, Button} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from "@react-navigation/native";
import * as SQLite from 'expo-sqlite';
import ScreenTask from "./screens/screenTask";

//creamos el navigate stack
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//iconoss
import { AntDesign } from '@expo/vector-icons';

import { ConfiguracionesContext } from "./componentes/ConfiguracionesContext";

const NavegadorSecciones=({navigation})=>{

    //conectamos con la base de datos
    const db= SQLite.openDatabase('taskApp.db');
    const {ConfiguracionesCustom,setConfiguracionesCustom}=useContext(ConfiguracionesContext);
    const [secciones,setSecciones]=useState([]);//es un array
    const [showSimpleScreen, setShowSimpleScreen] = useState(false);
    const [ShowListSecciones, setShowListSecciones] = useState(true);
    ShowListSecciones

    useFocusEffect(

        React.useCallback(() => {
          console.log("ATENCION: =>=> DENTRO <=<= del call back");
        //   setIsLoading(true);
          CargarDatosTabla();
          return () => console.log("ATENCION: =>=> FUERA <=<= del call back");
        },[])
    
      );

      const Stack = createStackNavigator();

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
                                // setFullTable(true);
                         
                  }else{
                    // setFullTable(false);
                  }
                },
                // (txObj,error)=>console.log("ATENCIÓN!!se encontro un error al leer la tabla taskappSecciones: "+error)
                );
              
          })
        //   setIsLoading(false);
          },2000)
  
          
  }
    //construimos un componente de boton
    const BtnSeccion=({iconName='',sectionName=''})=>{

        return(
            <View style={{margin:5,justifyContent:'center',alignItems:'center',width:125,height:125,backgroundColor:'none'}}>
                <View style={{width:81,
                                height:81,
                                backgroundColor:'black',
                                borderRadius:40,
                                alignItems:'center',
                                justifyContent:'center',
                                
                              }}>
                    <TouchableOpacity style={{width:80,
                                height:80,
                                backgroundColor:'pink',
                                borderRadius:40,
                                alignItems:'center',
                                justifyContent:'center',
                                borderWidth:1,
                               
                                }}
                                // onPress={()=>{
                                //     // navigation.navigate('Administrar secciones');
                                //     // //ScreenTask
                                //     <ScreenTask screnName={sectionName} dbName={sectionName}></ScreenTask>
                                // }}
                                onPress={() => navigation.navigate('Screen2',{ propName: sectionName})}

                                //onPress={() => {setShowSimpleScreen(true);setShowListSecciones(!ShowListSecciones)}}
                                >
                                   
                              
                                
                        {/* iconos */}
                        <AntDesign name={iconName} size={30} color={ConfiguracionesCustom[0].navigateselect}/>

                        {/* nombre de la seccion */}
            
                    </TouchableOpacity>

                </View>
                  
                    <Text>{sectionName.replaceAll('_',' ')}</Text>
            </View>
        );
    }

    const BtnAdministrar=()=>{
        return(
// /* boton "ir" */
        <View style={{width:'100%',height:'20%',backgroundColor:'white',justifyContent:'center'}}>
            <TouchableOpacity style={{
                display:'flex',
                flexDirection:'column',
                width:80,
                height:80,
                borderRadius:50,
                backgroundColor:'#ccc',
                position:'relative',
                zIndex:10,
                bottom:0,
                alignItems:'center',
                justifyContent:'center',
                borderWidth:1,
                left:'40%'
            }}
            onPress={()=>{
                navigation.navigate('Administrar secciones')
                //ScreenTask
            }}
            >
                <AntDesign name='database' color='black' size={30}></AntDesign>
                <Text>Secciones</Text>
            </TouchableOpacity>
        </View>
        )
    }

    function Screen1() {
      return (
        <View style={{height:'100%'}}>

        <ScreenListSecciones/>

          {/* <Button
            title="Cargar pantalla 2"
            onPress={() => navigation.navigate('Screen2')}
          /> */}
        </View>
      );
    }

    function Screen2({navigation,route }) {
      const propName = route.params?.propName;
  return (
    <View style={{height:'100%'}}>
      
      <ScreenTask screnName={propName} dbName={propName} />
      <Button title="Volver atrás" onPress={() => navigation.goBack()} />
    </View>
  );
}

    const ScreenListSecciones=()=>{
        return(

            <View>
                 <ScrollView style={{height:'80%',backgroundColor:'white'}}>
                    {/* //ACA VA EL FOR */}
                    <View style={{height:'100%',width:'100%',backgroundColor:'white',display:'flex',flexDirection:'row',flexWrap: 'wrap'}}>

            {                secciones.map((val, index) => (

                            //   console.log("vuelta "+index+" estado "+val.show),
                                val.show == 1? <BtnSeccion
                                key={index}
                                sectionName={val.name}
                                iconName={val.icon}
                                    
                                // children={()=><ScreenTask screnName={val.name} dbName={val.name}></ScreenTask>}
                                />: 
                                console.log("")
                                )

                                )
    }          

                        </View>
                  
                  </ScrollView>

                  <BtnAdministrar style={{position:'absolute'}}/>

            </View>
            
        )
    }

  //   <View style={{height:'100%'}}>  
  //   {showSimpleScreen && <ScreenTask screnName='hola' dbName='hoellou' setShowSimpleScreen={setShowSimpleScreen} />}      
    
  //     {ShowListSecciones && <ScreenListSecciones/>}
     
  // </View>

    //scrollbar
    
    //for que lee la tabla y renderiza los commponentes

    //barra de fraces abajo de todo
    return(

      
      <Stack.Navigator initialRouteName="Screen1">
        <Stack.Screen
          name="Screen1"
          component={Screen1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Screen2"
          component={Screen2}
          options={{ headerShown: false}}
        />
      </Stack.Navigator>
    
        
       

        
        

    );



}
export default NavegadorSecciones;