import React, { useContext } from "react";

import { Modal, StyleSheet, Text, View, TextInput, Alert,ScrollView,TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
//efectos
import { useFocusEffect } from "@react-navigation/native";
//cargamos el componente loading
import Loading from '../componentes/Loading';
//iconos
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { ConfiguracionesContext } from "../componentes/ConfiguracionesContext";
//alerta con input



//dbName,
//      nameScreen,dbScreen
const ScreenTask=(props)=>{

  const {ConfiguracionesCustom,setConfiguracionesCustom}=useContext(ConfiguracionesContext);

    console.log("screnName= "+props.screnName);
    console.log("dbName= "+props.dbName);
    
    const db= SQLite.openDatabase('taskApp.db');
    const [isLoading,setIsLoading]= useState(false); //es un booleano
    const [fullTable,setFullTable]= useState(true); //BOOLEANO PARA NULL TABLE
    const [names,setNames]=useState([]);//es un array
    const [currentName,setCurrentName]=useState(undefined);
    //agregamos la variable para el modal
    const [modalVisibleShowTask,setModalVisibleShowTask]=useState(false);
    const [visibleModalEdit,setVisibleModalEdit]=useState(false);
    //creamos la variable para seleccionar la TASK actual
    const [selectTask,setSelectTask]=useState("");
    //creamos la variable para contener el valor de la tarea a editar
    const [valueEditTask,setValueEditTask]=useState("");
    const[idEditTask,setIdEditTask]=useState(0);
  
    useEffect(()=>{
        console.log("ATENCION: =>=> DENTRO <=<= del call back");
           iniciar()
        // return () => console.log("ATENCION: =>=> FUERA <=<= del call back");
    },[])


 
  //funciones
  const iniciar=()=>{
    setIsLoading(true);
          setTimeout(()=>{

                db.transaction(tx=>{
                  //si no existe creo la tabla names!
                  tx.executeSql(`CREATE TABLE IF NOT EXISTS ${props.dbName} (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, state BOOLEAN)`,[],
                  //,null,
                  //(txObj,ress)=>{console.log(ress)}
                  );
                  
                  
            
                });
                db.transaction(tx=>{
                  //cargamos los datos a la variable names!
                    tx.executeSql(`SELECT * FROM ${props.dbName}`,null,
                    //tx.executeSql(`DROP TABLE FROM ${props.dbName}`,null,
                    
                    (txObj,resultSet)=>{
                      // enviamos los objetos a la variable names que es un array!
                      setNames(resultSet.rows._array);

                            //sí el lenght de los row es 0 la tabla esta vacia => se renderiza un mensaje
                      if(resultSet.rows.length>0){
                        setFullTable(true);
                        console.log("n° de tareas= "+resultSet.rows.length+" setFullTable=true");
                      }else{
                        
                        setFullTable(false);
                        console.log("n° de tareas= "+resultSet.rows.length+" setFullTable=false");
                      }
                    },
                    (txObj,error)=>console.log(error)
                    
                    );
                });

            setIsLoading(false);

        },2000);
  }

  //pantalla de carga
  //
  const showMensageEmpity=()=>{
    
      return(
        <View key={"idNoName"} style={styles.row}>
          <Text>No se encontraron datos existentes</Text>
        </View>
      );
  }

  const showLoading=()=>{
    return(
      <Loading style={{backgroundColor:'blue'}} color='red'/>
    )
  }
//
//FIN pantalla de carga

//deprecado
//
  const deleteTable=()=>{
    return Alert.alert(
      "EStas seguro?",
    `Realmente quieres eliminar la tabla "${props.screnName}"?`,
      [
        // The "Yes" button
        {
          text: "Si",
          onPress: () => {
                  db.transaction(tx => {
                    tx.executeSql('DROP TABLE ? ',[props.dbName],null,(txObj,error)=>console.log(error));
                    setFullTable(false);
                    {iniciar()}
                  })
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );



    
  }
//  
//fin deprecado

  const addTask=()=>{

    if((currentName!=='')&&(currentName!==undefined)){

      db.transaction(tx=>{
        tx.executeSql(`INSERT INTO ${props.dbName} (name,state) values ('${currentName}',0)`,[],
        (txObj,resultSet)=>{
          let existingNames=[... names];//realizamos una copia del objeto TAREAS
          existingNames.push({id: resultSet.insertId, name: currentName, state:0});//pusheamos al objeto
          setNames(existingNames);//actualizamos el valor de las tareas
          setCurrentName(undefined);
        },
        (txObj,error)=>console.log(error)
        )
      });
       
    setFullTable(true);
    showTareas();


    }else{
      alert("Agrege algun contenido a la tarea");
    }

  

    //alert(currentName)
    console.log("currentName ("+props.screnName+"): "+currentName);
    
  };
  
//metodos check
  const checkTask=(id)=>{
    //actualizaos el STATE que es un boleano en la base de datos
    names.forEach((element)=>{
          if(element.id==id){

            let stateNow=names.state

            db.transaction(tx=>{
              tx.executeSql(`UPDATE ${props.dbName} SET state = ${stateNow?0:1} WHERE id=${id}`,null,
              (obj,resultSet)=>{
        
                  if(resultSet.rowsAffected>0){
                    const newTASK=[...names];
                        newTASK.forEach((element,index)=>{
                          if(element.id==id){
                            element.state?element.state=0:element.state=1;
                          }
                          
                        })
                //actualizamos el STATE en el objeto "name"
                    setNames(newTASK);
                  }
        
              },
              (obj,error)=>{})
            })
          }
    })
    
    
    //pintaoss los datos desde el array "name"
    showTareas();
  }
//metodos update delete
  const deleteTask=(id)=>{
                  //metodo comfirm

                return Alert.alert(
                  "Eliminar Tarea",
                  "Estas seguro que deseas eliminar esta tarea?",
                  [
                    // The "Yes" button
                    {
                      text: "Si",
                      onPress: () => {
                        //eliminamos el dato
                        db.transaction(tx=>{
                          tx.executeSql(`DELETE FROM ${props.dbName} WHERE id = ?`,[id],
                          (obj,resultSet)=>{
                            if(resultSet.rowsAffected>0){
                              
                            let newTask=[...names].filter(name=>name.id !== id);
                            setNames(newTask);
                            setCurrentName(undefined);
                            {showTareas};
                          }
                        },(obj,error)=>alert("Ocurrio un error inesperado, porfavor volve a intentarlo mas tarde"))
                        })
                      },
                    },
                    // The "No" button
                    // Does nothing but dismiss the dialog when tapped
                    {
                      text: "No",
                    },
                  ]
                );
  }
const editTask=(id)=>{

Alert.alert("Editar tarea", "¿Realmente desea editar esta tarea?",[
  {
    text:"Si",
    onPress:
      ()=>{

              //colocamos el valor de la tarea en el input
              //realizamos una iteración en el array que contiene las tareas 
              //enviamos la tarea que coincida con el id del btn "editar"
              names.forEach(element=>{

                if(element.id==id){
                  setValueEditTask(element.name);
                }
            
              })
              //enviamos el valor del id de la tarea a editar
              setIdEditTask(id);
        
              //habilitamos el MODAL
              setVisibleModalEdit(true);
              
              //eliminamos la tarea y al contenido lo cargamos en el input

      }
  },
  {
    text:"No",
    onPress:()=>{
      
    }
  }
])

  }
//se apreta en el modal editartask en el btn (guardar)
const saveEditTask=(id)=>{
  //para futuras versiones arreglar la edición de las tareas
                    //colocamos el valor del id como "idEdit"

        
    //realizamos la eliminación de la tarea 
    
    db.transaction(tx=>{
      //actualizamos los datos de la db
      tx.executeSql(`UPDATE ${props.dbName} SET name='${valueEditTask}' WHERE id = ${id}`,[],
      //evaluamos  si la query se ejecuto correctamente
      (obj,resultSet)=>{if(resultSet.rowsAffected>0){
        //creamos una copia del objeto de tareas y eliminamos la tarea con el id seleccionado
        let newTask=[...names].filter(name=>name.id !== id);
        newTask.push({id: id, name: valueEditTask, state:0})
        setNames(newTask);
        console.log(newTask)
        showTareas();
        setVisibleModalEdit(false);
        
      }},
      (obj,error)=>{console.log(error)})
    })  
}
const showTareas=()=>{
    
    return names.map((name,index)=>{
      return(
        //onPress={()=>selectTask(name.id)}
        //agregamos un modal en el return  para mostrar la tareas lindas
        <View key={index} style={{display:'flex',
                                  flexDirection:'row',
                                  width:'100%',
                                  marginBottom:10,
                                  borderRadius:10,
                                  backgroundColor:'red',
                                  borderWidth:1,
                                  }}>

            {/* //iconono que indica se esta completada la tarea o no (default NO) */}
            {/* al presionarlo se guarda en la base de datos "ESTADO" true/false */}
            <TouchableOpacity style={{
               height:40,
               width:40,
               borderTopLeftRadius:10,
               borderBottomLeftRadius:10,
               backgroundColor:name.state?ConfiguracionesCustom[0].taskcheck:ConfiguracionesCustom[0].taskuncheck,
               justifyContent:'center',
               alignItems:'center'
            }} onPress={()=>checkTask(name.id)}>
              {/* //establecemos el color del icono dependiendo si la variable state es true o false */}
              <Feather name={name.state?'check-circle':'circle'} size={24} color={name.state?'green':"black"}  />
            </TouchableOpacity>

            <TouchableOpacity   style={{  
                                      flexDirection:'row',
                                      alignItems:'center',
                                      alignSelf:'stretch',
                                      justifyContent:'space-between',
                                      // backgroundColor:name.state?'rgb(184, 245, 181 )':'white',
                                      backgroundColor:name.state?ConfiguracionesCustom[0].taskcheck:ConfiguracionesCustom[0].taskuncheck,
                                      width:'80%',
                                    height:40,
                                  paddingLeft:10}} 
                                  onPress={()=>{
                                    setSelectTask(name.name);
                                    console.log(name.name);
                                    setModalVisibleShowTask(true);
                                    }}
                                  >
                        
                        {/* creamos un elipsis */}
                        <Text style={{maxWidth:'70%',textAlignVertical:'center'}}numberOfLines={1} >
                        {name.name}
                        </Text>
                </TouchableOpacity>

                <View style={styles.rowIcon}>
                    <TouchableOpacity style={styles.icon} onPress={()=>editTask(name.id)}><AntDesign name="edit" size={24} color="orange"  /></TouchableOpacity>
                    <TouchableOpacity style={styles.icon} onPress={()=>deleteTask(name.id)}><AntDesign name="closecircle" size={24} color="red"  /></TouchableOpacity>
                </View>
        </View>
        
      );
    });
  };
  const input= ()=>{
    return(
      <TextInput style={styles.input} value={currentName} placeholder={`Pendientes ${props.screnName}`} onChangeText={setCurrentName}></TextInput>
    )
  }
  const ViewTask=()=>{
    return(
      <View style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Text>{selectTask}</Text>
      </View>
    )
  }
  /////******************************** */ PRINCIPAL
  return (
    <View style={[styles.container,{backgroundColor:ConfiguracionesCustom[0].backgroundviewapp}]}>

          <View style={[styles.titleContainer,{backgroundColor:ConfiguracionesCustom[0].backgroundviewapp}]}>

              <Text style={[styles.titleText,{backgroundColor:ConfiguracionesCustom[0].colortitle}]}>
                
                {/* TITULO DE LA TAREA */}
                {props.screnName}

              </Text>
                                    
          </View>



          <View style={styles.ViewListTareas}>

              <ScrollView style={{height:'100%'}}>
                    
                    {/* ----LOADING---() */}
                    <View style={{width:'100%', justifyContent:'center',height:'100%'}}  children={isLoading?showLoading():fullTable?showTareas():showMensageEmpity()}/>

                    {/* <StatusBar style="auto" /> */}

              </ScrollView>

          </View>
          

          <View style={styles.buttonPanel}>
                {input()}
                <Ionicons name="add-circle" size={45} color="rgb(60, 155, 202)" onPress={addTask}/>
                
          </View>

          <Modal
          style={styles.modal}
          animationType="slide"
          transparent={true}
          visible={modalVisibleShowTask}
          onRequestClose={()=>{
            setModalVisibleShowTask(!modalVisibleShowTask);
          }}
          >

                  <View style={styles.modalView}>
                            
                            <Text style={{fontSize:25,marginTop:20,backgroundColor:'orange',borderRadius:10,borderWidth:1,width:'90%',textAlign:'center'}}>Detalle de la Tarea</Text>

                              <View style={{
                                backgroundColor:'white',
                                width:'90%',
                                display:'flex',
                                alignItems:'center',
                                justifyContent:'center',
                                marginTop:20,
                                height:'50%',
                                borderWidth:1,
                                borderRadius:10
                              }}>
                                    {ViewTask()}
                              </View>
                                
                            <View style={{flexDirection:'row'}}>

                              {/* //boton salida */}

                                  <TouchableOpacity style={{
                                    margin:10,
                                    display:'flex',
                                    alignItems:'center',
                                    flexDirection:'column',
                                    borderWidth:1,
                                    borderColor:'gray',
                                    borderRadius:10,
                                    padding:10
                                  }} 
                                  onPress={()=>setModalVisibleShowTask(!modalVisibleShowTask)}>

                                          <AntDesign name="close" size={24} color="black" />
                                          <Text>Salir</Text>
                                  </TouchableOpacity>

                            </View>
                            
                      
                  </View>

          </Modal>

    {/* MODAL EDITAR */}

          <Modal
          style={styles.modalEdit}
          animationType='slide'
          transparent={true}
          visible={visibleModalEdit}
          onRequestClose={()=>{
            setVisibleModalEdit(!visibleModalEdit);
          }}
          >

                  <View style={styles.modalView}>
                            
                            <Text style={{fontSize:25,marginTop:20, backgroundColor:'orange',width:'90%',textAlign:'center',borderRadius:10,borderWidth:1}}>Editar Tarea</Text>

                                  <View style={{
                                    // backgroundColor:'white',
                                    width:'90%',
                                    display:'flex',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    marginTop:20,
                                    height:50,
                                    // borderWidth:1,
                                    borderRadius:10,
                                    borderWidth:1
                                  }}>
                                          {/* agregar input */}
                                          <TextInput style={{width:'100%',height:50,backgroundColor:'white',alignItems:'center',borderRadius:10,textAlign:'center',borderWidth:1}} value={valueEditTask} onChangeText={setValueEditTask} placeholder={"tarea a editar"}></TextInput>
                                              
                                  </View>
                                
                            <View style={{flexDirection:'row'}}>

                              {/* //boton guardar */}

                                       <TouchableOpacity style={{
                                          margin:10,
                                          display:'flex',
                                          alignItems:'center',
                                          flexDirection:'column',
                                          borderWidth:1,
                                          borderColor:'gray',
                                          borderRadius:10,
                                          padding:10,
                                          width:80,
                                          height:70
                                        }} 
                                        onPress={()=>{
                                              // función para guardar la tarea (actualizar)
                                              {saveEditTask(idEditTask)}


                                        }}>

                                                <AntDesign name="save" size={24} color="black" />
                                                <Text>Guardar</Text>
                                        </TouchableOpacity>

                                    {/* //boton salida */}

                                        <TouchableOpacity style={{
                                          margin:10,
                                          display:'flex',
                                          alignItems:'center',
                                          flexDirection:'column',
                                          borderWidth:1,
                                          borderColor:'gray',
                                          borderRadius:10,
                                          padding:10,
                                          width:80,
                                          height:70
                                        }} 
                                        onPress={()=>setVisibleModalEdit(!visibleModalEdit)}>

                                                <AntDesign name="close" size={24} color="black" />
                                                <Text>Salir</Text>
                                        </TouchableOpacity>

                            </View>
                            
                      
                  </View>

          </Modal>
    
    </View>
  );
}

const styles = StyleSheet.create({
        //modal
              rowIconModal:{
                backgroundColor:'rgb(229, 227, 227)',
                flexDirection:'row',
                alignItems:'center',
                //alignSelf:'stretch',
                //justifyContent:'space-between',
                padding:8,
                borderRadius:10,
                margin:10
              },
              modal:{
                height:'100%'
              },
              // modalEdit:{
              //   height:'40%'
              // },
              modalView: {
                backgroundColor:'rgba(229, 227, 227,0.7 )',
                marginTop: '25%',
                marginLeft:'5%',
                height:'50%',
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
    container: {
      flex: 1,
      // height:'100%',
      backgroundColor: '#fff',
   
    },
              titleContainer:{
                backgroundColor:"rgb(241, 237, 236)",
                width:'100%',
                top:0,
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center',
                // marginBottom:"5%",
              },
              titleText:{
                fontSize:40,
                textAlign:"center",
                backgroundColor:'orange',
                borderWidth:1,
                width:'95%',
                margin:10,
                borderRadius:10
                },
    ViewListTareas:{
      backgroundColor:"rgb(241, 237, 236)",
      top:0,
      width:'100%',
      
      maxHeight:'80%',
      padding:10,
      // backgroundColor:'black'
    },
    
    
    //panel del input
    buttonPanel:{
      
      backgroundColor:"rgb(229, 227, 227)",
      width:'100%',
      height:70,
      flexDirection:'row',
      padding:10,
      position:'absolute',
      bottom:0
      
    },
                input:{
                
                  width:'90%',
                  borderWidth: 1,
                  borderRadius:10,
                  padding: 10,
                  textAlign:'center'
                },
                btnAdd:{
                  
                  borderWidth: 1,
                  borderRadius:10,
                  padding: 10,
                  textAlign:'center',
                  borderColor:'white',
                  justifyContent:'center'

                },
//show tareas,
    taskRow:{
    
    },
    row:{
      flexDirection:'row',
      alignItems:'center',
      alignSelf:'stretch',
      justifyContent:'space-between',
      margin:8
    },
    rowIcon:{
      backgroundColor:'rgb(229, 227, 227)',
      flexDirection:'row',
      alignItems:'center',
      paddingLeft:8,
      height:'100%',
      borderRadius:10,
      position:'absolute',
      right:1,
      
      
    },
    icon:{
      backgroundColor:'rgb(229, 227, 227)',
      marginEnd:5,
      width:50,
      height:'100%',
      alignItems:'center',
      justifyContent:'center'
      
    },
    
    girar:{
      width:50,
      height:50,
      borderTopWidth:1,
      borderRightWidth:1,
      borderBottomWidth:1,
      borderLeftWidth:3,
      borderColor:'#ccc',
      borderRadius:25,
      
      borderLeftColor:'red',
      
    }
  });

export default ScreenTask;
