import React, { useRef,useState,useContext, useEffect} from "react";
import {StyleSheet,Text, View, TouchableOpacity, Image, Animated} from 'react-native';
//importamos los iconos 
import { AntDesign } from '@expo/vector-icons';

import { ConfiguracionesContext } from "../componentes/ConfiguracionesContext";

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

const AnimatedTextView = ({ phrases }) => { 
  const slideAnimation = useRef(new Animated.Value(-1000)).current;
  const [paused, setPaused] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);

  useEffect(() => {
    if (!paused) {
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setPaused(true);
          setTimeout(() => {
            setPhraseIndex((phraseIndex + 1) % phrases.length);
            setCurrentPhrase(phrases[(phraseIndex + 1) % phrases.length]);
            slideAnimation.setValue(-1000);
            setPaused(false);
          }, 4000);
        }
      });
    }
  }, [phraseIndex, paused]);

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={{ transform: [{ translateX: slideAnimation }] }}>
        <Text style={{ borderWidth: 1, borderRadius: 10, backgroundColor: 'orange', padding: 10, margin: 10 }}>
          {currentPhrase}
        </Text>
      </Animated.View>
    </View>
  );
};

const ScreenInicio =({navigation})=>{

    const {ConfiguracionesCustom,setConfiguracionesCustom}=useContext(ConfiguracionesContext);


    //declaramos las frases 

    const phrases = [
      "1-No pospongas tus sueños, haz que sucedan con nuestra aplicación de tareas",
      "2-Haz de la organización una prioridad y alcanza tus metas con nuestra app",
      "3-Sé dueño de tu tiempo y consigue más con nuestra aplicación de tareas",
      "4-La clave para el éxito es la planificación y la organización, usa nuestra app para lograrlo",
      "5-El camino hacia el éxito comienza con una tarea a la vez",
      "6-Con nuestra aplicación de tareas, tendrás el control de tu tiempo y la confianza para alcanzar tus metas",
      "7-Convierte tus tareas en logros con nuestra app de tareas",
      "8-Nunca dejes que tus tareas te abrumen, toma el control con nuestra aplicación de tareas",
      "9-Empieza a trabajar en tus sueños hoy mismo, nuestra app te ayudará a hacerlo",
      "10-Un día a la vez, una tarea a la vez, y pronto verás cómo alcanzas tus objetivos con nuestra aplicación de tareas"
      ];



    //en inicio se vera el nombre de usuario, la cantidad de secciones y tareas por secciones
    //crear un circulo que indicque la cantidad de tareas completas e incompletas
    return(
        <View style={{height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',backgroundColor:ConfiguracionesCustom[0].backgroundviewapp}}>
{/* imagen */}
            <Image 
            source={require('../assets/imageInicio.png')}
            style={{ width:'100%'}}
            />
            
{/* title */}
            <View style={{position:'absolute',top:0,width:'90%',height:'20%',alignItems:'center'}}>

                {/* <Text style={{fontSize:70}}>AppTareas</Text> */}
            
                <Text style={{fontSize:40,backgroundColor:ConfiguracionesCustom[0].colortitle,borderRadius:10,padding:10,borderWidth:1}}
                        >App-Task!
                </Text>

            </View>

{/* fraces */}

            <View style={{ flex: 1, position:'absolute' }}>
                 <AnimatedTextView  phrases={phrases} />
            </View>

{/* boton "ir" */}
                        <View style={{width:'100%'}}>
                            <TouchableOpacity style={{
                                display:'flex',
                                flexDirection:'column',
                                width:80,
                                height:80,
                                borderRadius:50,
                                backgroundColor:ConfiguracionesCustom[0].backgroundbutton,
                                position:'absolute',
                                zIndex:10,
                                bottom:-90,
                                alignItems:'center',
                                justifyContent:'center',
                                borderWidth:1,
                                left:'40%'
                            }}
                            onPress={()=>{
                                navigation.navigate('Administrar secciones')
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

// {/* barras */}
// <View style={{

//     width:'100%',
//     alignItems:'center',
//     justifyContent:'center',
//     // backgroundColor:'red',
//     alignContent:'center',
//     position:'absolute'}}>
    
//     {/* barras */}
//     {/* <Text>Secciones: 7</Text> */}
//     <Barra title='Secciones:' porcentual={false} value={7}></Barra>

//     {/* <Text>Secciones Visibles: 5</Text> */}
//     <Barra title='Secciones Visibles:' porcentual={false} value={5}></Barra>

//     {/* <Text>Tareas Totales: 10</Text> */}
//     <Barra title='Tareas Totales:' porcentual={false} value={10}></Barra>

//     {/* <Text>Tareas Realizadas: 8/ tareas totales</Text> */}
//     <Barra title='Tareas Realizadas:' porcentual={false} value={8}></Barra>


//     <Barra title='progreso:' porcentual={true}  value={50}></Barra>
//     {/* <Text>Progreso: 80%</Text> */}
// </View>