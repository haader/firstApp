import React, { useState,useContext } from "react";
import {StyleSheet, View, Text, Modal,TouchableOpacity, Alert, Button} from 'react-native';
import { FlatList, ScrollView } from "react-native-gesture-handler";
//importamos los colores desde value.js
import Values from 'values.js'
//importamos la db
import * as SQLite from 'expo-sqlite';

//importamos el objeto colores
import JSONcolores from "../componentes/colores"

// iconos
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';

import { ConfiguracionesContext } from '../componentes/ConfiguracionesContext';

// screen
const ScreenConfig=({navigation})=>{

  const { ConfiguracionesCustom, setConfiguracionesCustom } = useContext(ConfiguracionesContext);

  // const [ConfiguracionesCustom, setConfiguracionesCustom] = useState([{
  //   id:0,
  //   colortitle:'orange',
  //   backgroundviewapp:'white',
  //   navigateselect:'#7ccc',
  //   navigateunselect:'#ccc',
  //   backgroundbutton:'white',
  //   taskuncheck:'white',
  //   taskcheck:'rgb(184, 245, 181 )',
  //   sectionuncheck:'white',
  //   sectioncheck:'rgb(184, 245, 181 )'
  // }]);

  // son las configuraciones por default son invariables y se copian al ConfiguracionesCustom
  //(por eso  no tiene un set)
  const JSONconfigDefault={
    id:0,
    colortitle:'orange',
    backgroundviewapp:'white',
    navigateselect:'#7ccc',
    navigateunselect:'#ccc',
    backgroundbutton:'white',
    taskuncheck:'white',
    taskcheck:'rgb(184, 245, 181 )',
    sectionuncheck:'white',
    sectioncheck:'rgb(184, 245, 181 )'
  };
  
  
  //variables globales CUSTOM
  
  
  console.log("--");
  console.log("--propiedades traidas de app (screenConfig ConfiguracionesCustom) "+JSON.stringify(ConfiguracionesCustom) );
  console.log("--");

  //modal editar variableonf
  const [variableEditar,setVariableEditar]=useState('');
  const[colorElegido,setColorElegido]=useState('none');

  const [listTono,setListTono]=useState(new Values('pink').all(50));

  const [visibleModal,setVisibleModal]=useState(false);

  let newArrayColor=JSON.stringify(JSONcolores);
  let newJSONColor=JSON.parse(newArrayColor)

  const PintarTono=(colorElegido)=>{

    //se envia el nombre del color elegido a la variable global (se actualiza el valor)
    //eso provoca un nuevo renderizado en el flatList del modal
    setListTono(new Values(colorElegido).all(20));

  }

  // 

const saveeditconfig=(tono='')=>{
  
  console.log("******** guardando un nuevo valor para el color del "+variableEditar+"***********")
  

  let newJSONconfig=ConfiguracionesCustom
  let tonoElegido=tono.replace('"','').replace('"','');

  if(variableEditar=='colortitle'){
          
    console.log("***   Editando colortitle")
          newJSONconfig[0].colortitle=tonoElegido;
          setConfiguracionesCustom(newJSONconfig);

  }else if(variableEditar=='taskuncheck'){

          newJSONconfig[0].taskuncheck=tonoElegido;
          setConfiguracionesCustom(newJSONconfig);

  }else if(variableEditar=='taskcheck'){

    newJSONconfig[0].taskcheck=tonoElegido;
    setConfiguracionesCustom(newJSONconfig);

  }else if(variableEditar=='sectioncheck'){

    newJSONconfig[0].sectioncheck=tonoElegido;
    setConfiguracionesCustom(newJSONconfig);

  }else if(variableEditar=='sectionuncheck'){

    newJSONconfig[0].sectionuncheck=tonoElegido;
    setConfiguracionesCustom(newJSONconfig);

  }
  else if(variableEditar=='backgroundviewapp'){
          
          newJSONconfig[0].backgroundviewapp=tonoElegido;
          setConfiguracionesCustom(newJSONconfig);

  }else if(variableEditar=='navegacionselect'){
    
          newJSONconfig[0].navigateselect=tonoElegido;
          setConfiguracionesCustom(newJSONconfig);

  }else if(variableEditar=='navegacionunselect'){

          newJSONconfig[0].navigateunselect=tonoElegido;
          setConfiguracionesCustom(newJSONconfig);

  }else if(variableEditar=='backgroundbutton'){

          newJSONconfig[0].backgroundbutton=tonoElegido;
          setConfiguracionesCustom(newJSONconfig);

  }

  
  console.log("")
  console.log("**  **")
  console.log("**  ConfiguracionesCustom NUEVO (newJSONconfig): "+JSON.stringify(newJSONconfig))
  console.log("**  ConfiguracionesCustom NUEVO (ConfiguracionesCustom): "+JSON.stringify(ConfiguracionesCustom))
  console.log("**  **")
  console.log("")
}

// componentes

          const Confi=(props)=>{
                

          return(
          // <View style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center'}}>
              
              <View style={{width:'90%',borderWidth:1,borderRadius:10,margin:10,display:'flex',flexDirection:'column',height:30}}>
                    
                    <View style={{display:'flex',flexDirection:'row',}}>
                      <Text>color:</Text>
                      <Text>{props.velue}</Text>
                    </View>
              
              {/* </View>    */}
          </View>
          )
          }

          const TitleMiniatura=(props)=>{
          return(

            <View style={{borderWidth:1,borderRadius:10,width:'90%',margin:10,backgroundColor:props.color}}>
                <Text style={{textAlign:'center',}}>{props.title}</Text>
            </View>
            
          )

          }

          const Barratareas=(props)=>{

          return(
            <View style={{  
              flexDirection:'row',
              alignItems:'center',
              marginBottom:10,
              justifyContent:'space-between',
              borderWidth:1,
              borderColor:'black',
              marginTop:5,
              borderRadius:10,
              backgroundColor:props.color,
              width:'90%'}}>
              
                <View style={estilos.iconCheck}>
                    <Feather name={props.nameIcon} size={24} color={props.colorIcon}/>
                </View>
                {/* creamos un elipsis */}
                <Text >
                    nombre de tarea
                </Text>

                <View style={estilos.rowIcon}>

                    <View style={estilos.icon}><AntDesign name="edit" size={24} color="orange"/></View>
                    <View style={estilos.icon}><AntDesign name="closecircle" size={24} color="red"/></View>
                </View>
          </View>
          )
          }

          const MiniaturaPendiente=(props)=>{
          return(

            <View style={{display:'flex',flexDirection:'row',alignItems:'center',borderRadius:5,borderWidth:1,width:'80%',height:20,backgroundColor:props.colorStateTask,margin:10}}>
              <Circulo  color='green'></Circulo>
              <Text style={{width:'70%',textAlign:'center',fontSize:10,}}>{props.title}</Text>
              <View style={{position:'absolute',backgroundColor:'gray',display:'flex',flexDirection:'row',padding:4,right:0}}>
                <Circulo  color='orange'></Circulo>
                <Circulo  color='red'></Circulo>
              </View>
            </View>
          )
          }

          const MiniaturaTask=(props)=>{

          return(
            // aqui va el color
            <View style={{
              borderRadius:10,
            borderWidth:1,
            width:'90%',
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:props.backColor
            }}>
                <View style={{alignItems:'center',borderRadius:5,borderWidth:1,width:'80%',height:20,backgroundColor:ConfiguracionesCustom[0].colortitle,margin:10}}>
                    <Text>titulo</Text>
                </View>
            {/* tareas */}
                <View style={{width:'100%',marginLeft:40}}>
                  <MiniaturaPendiente colorStateTask={ConfiguracionesCustom[0].taskuncheck} title='tarea 1'></MiniaturaPendiente>
                  <MiniaturaPendiente colorStateTask={ConfiguracionesCustom[0].taskcheck} title='tarea 2'></MiniaturaPendiente>
                  <MiniaturaPendiente colorStateTask={ConfiguracionesCustom[0].taskuncheck} title='tarea 3'></MiniaturaPendiente>
                </View>

                {/* input */}
                <View style={{width:'80%',
                            display:'flex',
                            flexDirection:'row',
                            justifyContent:'center',
                            alignItems:'center',
                            marginBottom:10,
                            backgroundColor:'#ccc',
                            padding:1}}>
                  <View style={{backgroundColor:'white',height:20,width:'80%',borderRadius:2,justifyContent:'center'}}>
                    <Text style={{fontSize:10,width:'100%',textAlign:'center'}}> tarea 4</Text>
                  </View>
                  <View style={{width:20,height:20,backgroundColor:'rgb(60, 155, 202)',alignItems:'center',borderRadius:10,marginLeft:20}}>
                    <Text style={{fontSize:14,}}>+</Text>
                  </View>
                </View> 

                <View style={{}}></View>
            </View>
          )
          }

          const Circulo=(props)=>{
            return(
              
              <View style={{width:10,height:10,borderRadius:50,backgroundColor:`${props.color}`,marginLeft:10}}></View>
              
            )
          }

          const BarraDeNavegacion=(props)=>{
          return(
            <View style={{width:'80%',borderRadius:10,borderWidth:1,alignItems:'center',display:'flex',flexDirection:'row',justifyContent:'center'}}>
              
{/* icono select */}
              <TouchableOpacity style={{display:'flex',flexDirection:'column',alignItems:'center',width:60}}
                                onPress={()=>{

                                  //enviamos el parametro que se editara en el modal
                                  setVariableEditar('navegacionselect');

                                  //hacemos visible el modal
                                  setVisibleModal(!visibleModal)
                                  
                                  }}
                                >
                <AntDesign name='home' size={20} color={props.colorSelect}/>
                <Text style={{fontSize:10,color:props.colorSelect}}>Inicio</Text>

              </TouchableOpacity>

{/* icono UNselect */}
              <TouchableOpacity style={{display:'flex',flexDirection:'column',alignItems:'center',width:60}}
                                onPress={()=>{

                                  //enviamos el parametro que se editara en el modal
                                  setVariableEditar('navegacionunselect');

                                  //hacemos visible el modal
                                  setVisibleModal(!visibleModal)
                                  
                                  }}
                                  >
                        <AntDesign name='home' size={20} color={props.colorUnselect}/>
                        <Text style={{fontSize:10,color:props.colorUnselect}}>{props.seccion1}</Text>

              </TouchableOpacity>
              
              <TouchableOpacity style={{display:'flex',flexDirection:'column',alignItems:'center',width:60}}
                                onPress={()=>{

                                  //enviamos el parametro que se editara en el modal
                                  setVariableEditar('navegacionunselect');

                                  //hacemos visible el modal
                                  setVisibleModal(!visibleModal)
                                  
                                  }}
                                  >
                        <AntDesign name='home' size={20} color={props.colorUnselect}/>
                        <Text style={{fontSize:10,color:props.colorUnselect}}>{props.seccion2}</Text>

              </TouchableOpacity>

              <TouchableOpacity style={{display:'flex',flexDirection:'column',alignItems:'center',width:60}}
                                onPress={()=>{

                                  //enviamos el parametro que se editara en el modal
                                  setVariableEditar('navegacionunselect');

                                  //hacemos visible el modal
                                  setVisibleModal(!visibleModal)
                                  
                                  }}
                                  >
                        <AntDesign name='home' size={20} color={props.colorUnselect}/>
                        <Text style={{fontSize:10,color:props.colorUnselect}}>{props.seccion3}</Text>

              </TouchableOpacity>
            </View>

          )
          }

          const Title=(props)=>{
          return(
            <Text style={{fontSize:20,marginTop:20,marginBottom:20}}>{props.title}</Text>
          )
          }
// botones GUARDAR Y SALOIR
          const btnGuardar=()=>{
            
            //abrimos la base de datos
            const db= SQLite.openDatabase('taskApp.db');
            //toma los valores de ConfiguracionesCustom y actualiza los datos en la tabla configCustomAppTask
            db.transaction(tx=>{

              tx.executeSql(`UPDATE configCustomApp SET 
              colortitle='${ConfiguracionesCustom[0].colortitle}',
              backgroundviewapp='${ConfiguracionesCustom[0].backgroundviewapp}',
              navigateselect='${ConfiguracionesCustom[0].navigateselect}',
              navigateunselect='${ConfiguracionesCustom[0].navigateunselect}',
              backgroundbutton='${ConfiguracionesCustom[0].backgroundbutton}',
              taskuncheck='${ConfiguracionesCustom[0].taskuncheck}',
              taskcheck='${ConfiguracionesCustom[0].taskcheck}',
              sectionuncheck='${ConfiguracionesCustom[0].sectionuncheck}',
              sectioncheck='${ConfiguracionesCustom[0].sectioncheck}'
              WHERE id='0'`,null,

              (obj,resultSet)=>{

                console.log("=> UPDATE DATOS: "+JSON.stringify(resultSet));

              },
              (obj,error)=>{console.log("error: "+error);
            })
              
            })
          }
          const btnSalir=()=>{
            navigation.navigate('Tareas');
          }

          const Secciones=(props)=>{

          return(
            <View style={{display:'flex',flexDirection:'row',marginBottom:10,background:'red',
            marginLeft:20,marginRight:20}}>
            <View  style={{ 
                                              flexDirection:'row',
                                              alignItems:'center',
                                              alignSelf:'stretch',
                                              justifyContent:'space-between',
                                              borderWidth:1,
                                              borderColor:'black',
                                             
                                              borderRadius:10,
                                            // backgroundColor:name.show?'green':'white',
                                            backgroundColor:props.show?ConfiguracionesCustom[0].sectioncheck:ConfiguracionesCustom[0].sectionuncheck,
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
                <TouchableOpacity style={{ marginEnd:10}}><AntDesign name='questioncircleo' size={24} color="black" /></TouchableOpacity>
                <TouchableOpacity style={{ marginEnd:10}}><Ionicons name={props.show?"eye-sharp":"eye-off-sharp"} size={24} color={props.show?"green":"red"} /></TouchableOpacity>
                <TouchableOpacity style={{ marginEnd:10}}><AntDesign name="edit" size={24} color="orange"  /></TouchableOpacity>
                <TouchableOpacity style={{ marginEnd:10}}><AntDesign name="closecircle" size={24} color="red"  /></TouchableOpacity>
            </View>
        
            </View>
          );
          }

          const ButtonDefaulConfig=(props)=>{
            return(
              <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
                <Button title={props.title} onPress={()=>{
                    
                    Alert.alert('Atencion', 'Desea Cargar los valores por defectos?', [
                      {
                        text: 'Cancel',
                        onPress: () => {},
                        style: 'cancel',
                      },
                      {text: 'Si', onPress: () =>{
                        loadDefaultConfig();
                      }},
                    ]);

                  loadDefaultConfig();
                }}></Button>
              </View>
            )
          }

          const loadDefaultConfig=()=>{

      //abrimos la base de datos
      const db= SQLite.openDatabase('taskApp.db');
      //toma los valores de ConfiguracionesCustom y actualiza los datos en la tabla configCustomAppTask
          db.transaction(tx=>{

            tx.executeSql(`UPDATE configCustomApp SET 
            colortitle='orange',
            backgroundviewapp='white',
            navigateselect='#7cc',
            navigateunselect='#ccc',
            backgroundbutton='#ccc',
            taskuncheck='white',
            taskcheck='rgb(184, 245, 181 )',
            sectionuncheck='white',
            sectioncheck='rgb(184, 245, 181 )'
            WHERE id='0'`,null,
            (obj,resultSet)=>{

              console.log("=> SE ESTABLECIERON LOS DATOS DEFAULT: "+JSON.stringify(resultSet));

            },
            (obj,error)=>{console.log("error: "+error);
          })
            
            })

          }

  return(
    <View style={estilos.column}>
      <Text style={{backgroundColor:ConfiguracionesCustom[0].colortitle,
                    fontSize:30,
                    borderWidth:1,
                    borderRadius:10,
                    textAlign:'center',
                    justifyContent:'center',
                    margin:10}}>
        Configuración
      </Text>

      <View style={{height:'89%',margin:10}}>

        <ScrollView style={{height:'100%',width:'100%'}}>

{/* titulo */}
            <TouchableOpacity style={{borderRadius:10,borderWidth:1,margin:10,alignItems:'center'}}
            onPress={()=>{

              //enviamos el parametro que se editara en el modal
              setVariableEditar('colortitle');

              //hacemos visible el modal
              setVisibleModal(!visibleModal)
              
              }}>
                  <Title title='Color de fondo del titulo'></Title>

                <TitleMiniatura title='Titulo' color={ConfiguracionesCustom[0].colortitle}></TitleMiniatura>

                  
            </TouchableOpacity>

{/* fondo tareas UNCHECK*/}
            <TouchableOpacity style={{borderRadius:10,borderWidth:1,margin:10,alignItems:'center',justifyContent:'center'}}
           
                              onPress={()=>{

                                //enviamos el parametro que se editara en el modal
                                setVariableEditar('taskuncheck');

                                //hacemos visible el modal
                                setVisibleModal(!visibleModal)
                                
                                }}>
                  
                  <Title title='Color tareas Pendientes'></Title>
                  
                  <Barratareas color={ConfiguracionesCustom[0].taskuncheck} nameIcon='circle' colorIcon='black'></Barratareas>

            </TouchableOpacity>


{/* fondo tareas CHECK */}
            <TouchableOpacity style={{borderRadius:10,borderWidth:1,margin:10,alignItems:'center',justifyContent:'center'}}
                      
                      onPress={()=>{

                        //enviamos el parametro que se editara en el modal
                        setVariableEditar('taskcheck');

                        //hacemos visible el modal
                        setVisibleModal(!visibleModal)
                        
                        }}>

                  <Title title='Color tareas Realizadas'></Title>

                  <Barratareas color={ConfiguracionesCustom[0].taskcheck} nameIcon='check-circle' colorIcon='green'></Barratareas>

            </TouchableOpacity>

{/* fondo de secciones check */}
            <TouchableOpacity style={{borderRadius:10,borderWidth:1,margin:10,alignItems:'center',justifyContent:'center'}}
                      
                      onPress={()=>{

                        //enviamos el parametro que se editara en el modal
                        setVariableEditar('sectioncheck');

                        //hacemos visible el modal
                        setVisibleModal(!visibleModal)
                        
                        }}>

                        <Title title='Color Secciones Visibles'></Title>

                        <Secciones title='seccion 1' show={true} />

            </TouchableOpacity>

{/* fondo de secciones uncheck */}

            <TouchableOpacity style={{borderRadius:10,borderWidth:1,margin:10,alignItems:'center',justifyContent:'center'}}
                      
                      onPress={()=>{
                        //enviamos el parametro que se editara en el modal
                        setVariableEditar('sectionuncheck');
                        //hacemos visible el modal
                        setVisibleModal(!visibleModal)
                        }}>

                        <Title title='Color Secciones NO visibles'></Title>

                        <Secciones title='seccion 2' show={false} />

            </TouchableOpacity>


{/* color de fondo de la App */}
            <TouchableOpacity style={{borderRadius:10,borderWidth:1,margin:10,alignItems:'center',paddingBottom:20}}
                              onPress={()=>{

                                //enviamos el parametro que se editara en el modal
                                setVariableEditar('backgroundviewapp');

                                //hacemos visible el modal
                                setVisibleModal(!visibleModal)
                                
                                }}>
                  
                  <Title title='Color de fondo de la App'></Title>

                  <MiniaturaTask backColor={ConfiguracionesCustom[0].backgroundviewapp} ></MiniaturaTask>
                  
            </TouchableOpacity>

{/* color de ICONOS de las navegaciones */}

            <View style={{borderRadius:10,borderWidth:1,paddingBottom:20,margin:10,alignItems:'center'}}>

                  <Title title='Color de iconos barra de navegación'></Title>

                  <BarraDeNavegacion  colorSelect={ConfiguracionesCustom[0].navigateselect} colorUnselect={ConfiguracionesCustom[0].navigateunselect} seccion1='escuela' seccion2='comprar' seccion3='ropa'></BarraDeNavegacion>

            </View>

{/* color del icono "IR" */}

          <View style={{borderRadius:10,borderWidth:1,paddingBottom:20,margin:10,alignItems:'center'}}>

                  <Title title='Fondo del icono "ir"'></Title>

                  {/* icono de muestra */}
                  <View style={{width:'100%',alignItems:'center'}}>
                            
                            <TouchableOpacity style={{
                                display:'flex',
                                flexDirection:'column',
                                width:80,
                                height:80,
                                borderRadius:50,
                                backgroundColor:ConfiguracionesCustom[0].backgroundbutton,
                                alignItems:'center',
                                justifyContent:'center',
                                borderWidth:1,
                                
                            }}
                            onPress={()=>{
                                setVariableEditar('backgroundbutton')
                                setVisibleModal(!visibleModal);
                            }}
                            >
                                <AntDesign name='database' color='black' size={30}></AntDesign>
                                <Text>Secciones</Text>
                            </TouchableOpacity>
                  </View>
          
          </View>

{/* cargar valores DEFAULT */}
          <View style={{borderRadius:10,borderWidth:1,paddingBottom:20,margin:10,alignItems:'center'}}>

                  <Title title='Cargar valores Estandar"'></Title>

                  <ButtonDefaulConfig title='Cargar'/>
          </View>
        </ScrollView>

{/* boton guarda */}
        <View style={{display:'flex',flexDirection:'row',padding:20,alignItems:'center',justifyContent:'center',justifyContent:'space-around'}}>
            <TouchableOpacity style={{
              borderRadius:10,
              borderWidth:1,
              height:40,
              width:'30%',
              alignItems:'center',
              justifyContent:'center',
              backgroundColor:'blue',
              backgroundColor:'rgb(60, 155, 202)'

            }}
            onPress={()=>{btnGuardar()}}>
              <Text>Guardar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{
              borderRadius:10,
              borderWidth:1,
              height:40,
              width:'30%',
              alignItems:'center',
              justifyContent:'center',
              backgroundColor:'blue',
              backgroundColor:'rgb(60, 155, 202)'

            }}
            onPress={()=>{btnSalir()}}>
              <Text>Salir</Text>
            </TouchableOpacity>
        </View>
        
      </View>

{/* CREACION DEL MODAL */}
      <Modal
      style={{height:'100%',backgroundColor:'red'}}
      visible={visibleModal}
      transparent={true}
      animationType='slide'
      onRequestClose={()=>{

        setVisibleModal(!visibleModal)

      }}>
<View style={estilos.modalView}>
{/* elegir COLOR */}
        <View
        style={{
                width:'90%',
                height:'40%', 
                borderWidth:1,
                borderRadius:10,
                justifyContent:'center',
                alignItems:'center'
            }}>
          
          <Text>Elija un Color</Text>

          
         
                          
          <FlatList
          style={{width:'100%',height:'100%'}}
          initialNumToRender={10}
          data={newJSONColor}
          horizontal={false}
          numColumns={4}          
          renderItem={({item})=>
            <TouchableOpacity 
                    key={item.name} 
                    style={{
                    width:55,
                    height:60,
                    borderWidth:1,
                    margin:10,
                    backgroundColor:item.name,
                    borderRadius:10,
                    }}
                    onPress={()=>{
                      console.log("se preciono "+item.name);
                      PintarTono(item.name)
                    }}
                    />
                
                  }
                  /> 
        </View>

{/* elegir TONO */}
        <View

          style={{
                  width:'90%',
                  height:'20%',
                  borderWidth:1,
                  borderRadius:10, 
                  marginTop:30,
                  justifyContent:'center',
                  alignItems:'center'
                  }}>
            
          <Text>Elija un tono</Text>
          
          <FlatList
          style={{width:'100%',height:'100%'}}
          initialNumToRender={10}
          data={listTono}
          horizontal={true}     
          renderItem={({item,index})=>
            <TouchableOpacity 
                    key={index} 
                    style={{
                    width:55,
                    height:60,
                    borderWidth:1,
                    margin:10,
                    backgroundColor:`"rgb(${item.rgb})"`,
                    borderRadius:10,
                  }}
                    onPress={()=>{
                      
                      //este boton enviara el color elegido al touchableOpaciti que muestra el color elegido
                      setColorElegido(`"rgb(${item.rgb})"`);
                      //realizamos el codigo para guardar el color nuevo
                      
                    }}
                    />
                
                  }
                  /> 

        </View>
{/* touchableOpacity que muestra el color elegido */}

      <View style={{widdth:'100%',height:60,marginTop:30}}>
        <TouchableOpacity style={{height:60,width:60,borderRadius:10,borderWidth:1,backgroundColor:colorElegido}}/>
      </View>

{/* botones guardar y salir */}
          <View style={{width:'75%',display:'flex',flexDirection:'row',padding:10,justifyContent:'space-around'}}>
            
                    <TouchableOpacity style={{display:'flex',
                                              alignItems:'center',
                                              justifyContent:'center',
                                              padding:10,
                                              borderWidth:1,
                                              borderRadius:10,
                                              width:80
                                            }} 
                    onPress={()=>{
                      //enviamos el color elegido
                      saveeditconfig(colorElegido)
                      //colocamos el valor en blanco de las variables globales del MODAL (COLOR ELEGIDO Y VARIABLE A EDITAR)
                      setColorElegido('none');
                      setVariableEditar('')
                      //cerramos el modal
                      setVisibleModal(!visibleModal)
                    }}>
                        <AntDesign name='save' size={20} color='black'/>
                        <Text>Guardar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{display:'flex',
                                              alignItems:'center',
                                              justifyContent:'center',
                                              padding:10,
                                              borderWidth:1,
                                              borderRadius:10,
                                              width:80
                                            }} 
                    onPress={()=>{
                      //colocamos el valor en blanco de las variables globales del MODAL (COLOR ELEGIDO Y VARIABLE A EDITAR)
                      setColorElegido('none');
                      setVariableEditar('');
                      //cerramos el modal
                      setVisibleModal(!visibleModal)
                    }}>
                        <AntDesign name='close' size={20} color='black'/>
                        <Text>Salir</Text>
                    </TouchableOpacity>
          
          </View>
</View>

      </Modal>
      

    </View>
  );
}

const estilos=StyleSheet.create({
  modalView: {
    backgroundColor:'rgba(229, 227, 227,0.9 )',
    marginTop: '25%',
    marginLeft:'5%',
    height:'75%',
    width:'90%',
    //backgroundColor: "white",
    borderRadius:10,
    padding: 10,
    alignItems: "center",
    justifyContent:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  border:{
    borderRadius:10,
    borderWidth:1,
    width:'90%',
    alignItems:'center',
    justifyContent:'center'
  },
  column:{
    display:'flex',
    flexDirection:'column'
  },
  
  rowIcon:{
    backgroundColor:'rgb(229, 227, 227)',
    flexDirection:'row',
    alignItems:'center',
    //alignSelf:'stretch',
    //justifyContent:'space-between',
    padding:8,
    borderRadius:10, 
  },
  icon:{
    marginEnd:10,
    
  },
  iconCheck:{
    marginEnd:10,
    marginLeft:10
  },
  row:{
    display:'flex',
    flexDirection:'row'
  },
  texto:{
    color:'red'
  },
  input:{

  }

})
export default ScreenConfig;