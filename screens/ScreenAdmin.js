import React, { Component, useContext } from "react";

import { StyleSheet, Modal, Text, View, TextInput, Alert,ScrollView,TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
//importamos Loading
import Loading from '../componentes/Loading'
//iconos
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import { ConfiguracionesContext } from "../componentes/ConfiguracionesContext";


//alerta con input

const ScreenAdmin=({ navigation })=>{

  //obtenemos el contexto
  const {ConfiguracionesCustom,setConfiguracionesCustom}=useContext(ConfiguracionesContext)
  
  // console.log("iniciando screen configuraciones")
    //creamos un crud para una tabla que se llama taskappSecciones 
    //esta tabla tiene todos los nombres de las tareas
    const db= SQLite.openDatabase('taskApp.db');
    const [isLoading,setIsLoading]= useState(false); //es un booleano
    const [fullTable,setFullTable]= useState(false); //BOOLEANO PARA NULL TABLE
    const [names,setNames]=useState([]);//es un array
    const [currentName,setCurrentName]=useState(undefined);
    const [modalVisible,setModaleVisible]=useState(false);
    const [idSeccion,setIdSeccion]=useState('');

    //creamos la variable para el modal
    const [visibleModalEdit,setVisibleModalEdit]=useState(false);
    const [valueSeccionEdit,setValueSeccionEdit]=useState('');
    const [idEditSeccion,setIdEditSeccion]=useState(0);
    const [valueOldSeccionEdit,setValueOldSeccionEdit]=useState('');
    const objetoEditar={id: 0, name: 'empity', icon: 'questioncircleo', show: 0}

    //const AntDesign_iconos=[{"key":"stepforward"},{"key":"stepbackward"},{"key":"forward"},{"key":"banckward"},{"key":"caretright"},{"key":"caretleft"},{"key":"caretdown"},{"key":"caretup"},{"key":"rightcircle"},{"key":"leftcircle"},{"key":"upcircle"},{"key":"downcircle"},{"key":"rightcircleo"},{"key":"leftcircleo"},{"key":"upcircleo"},{"key":"downcircleo"},{"key":"verticleleft"},{"key":"verticleright"},{"key":"back"},{"key":"retweet"},{"key":"shrink"},{"key":"arrowsalt"},{"key":"doubleright"},{"key":"doubleleft"},{"key":"arrowdown"},{"key":"arrowup"},{"key":"arrowright"},{"key":"arrowleft"},{"key":"down"},{"key":"up"},{"key":"right"},{"key":"left"},{"key":"minussquareo"},{"key":"minuscircle"},{"key":"minuscircleo"},{"key":"minus"},{"key":"pluscircleo"},{"key":"pluscircle"},{"key":"plus"},{"key":"infocirlce"},{"key":"infocirlceo"},{"key":"info"},{"key":"exclamation"},{"key":"exclamationcircle"},{"key":"exclamationcircleo"},{"key":"closecircle"},{"key":"closecircleo"},{"key":"checkcircle"},{"key":"checkcircleo"},{"key":"check"},{"key":"close"},{"key":"customerservice"},{"key":"creditcard"},{"key":"codesquareo"},{"key":"book"},{"key":"barschart"},{"key":"bars"},{"key":"question"},{"key":"questioncircle"},{"key":"questioncircleo"},{"key":"pause"},{"key":"pausecircle"},{"key":"pausecircleo"},{"key":"clockcircle"},{"key":"clockcircleo"},{"key":"swap"},{"key":"swapleft"},{"key":"swapright"},{"key":"plussquareo"},{"key":"frown"},{"key":"menufold"},{"key":"mail"},{"key":"link"},{"key":"areachart"},{"key":"linechart"},{"key":"home"},{"key":"laptop"},{"key":"star"},{"key":"staro"},{"key":"filter"},{"key":"meho"},{"key":"meh"},{"key":"shoppingcart"},{"key":"save"},{"key":"user"},{"key":"videocamera"},{"key":"totop"},{"key":"team"},{"key":"sharealt"},{"key":"setting"},{"key":"picture"},{"key":"phone"},{"key":"paperclip"},{"key":"notification"},{"key":"menuunfold"},{"key":"inbox"},{"key":"lock"},{"key":"qrcode"},{"key":"tags"},{"key":"tagso"},{"key":"cloudo"},{"key":"cloud"},{"key":"cloudupload"},{"key":"clouddownload"},{"key":"clouddownloado"},{"key":"clouduploado"},{"key":"enviroment"},{"key":"enviromento"},{"key":"eye"},{"key":"eyeo"},{"key":"camera"},{"key":"camerao"},{"key":"windows"},{"key":"export2"},{"key":"export"},{"key":"circledowno"},{"key":"circledown"},{"key":"hdd"},{"key":"ie"},{"key":"delete"},{"key":"enter"},{"key":"pushpino"},{"key":"pushpin"},{"key":"heart"},{"key":"hearto"},{"key":"smile-circle"},{"key":"smileo"},{"key":"frowno"},{"key":"calculator"},{"key":"chrome"},{"key":"github"},{"key":"iconfontdesktop"},{"key":"caretcircleoup"},{"key":"upload"},{"key":"download"},{"key":"piechart"},{"key":"lock1"},{"key":"unlock"},{"key":"windowso"},{"key":"dotchart"},{"key":"barchart"},{"key":"codesquare"},{"key":"plussquare"},{"key":"minussquare"},{"key":"closesquare"},{"key":"closesquareo"},{"key":"checksquare"},{"key":"checksquareo"},{"key":"fastbackward"},{"key":"fastforward"},{"key":"upsquare"},{"key":"downsquare"},{"key":"leftsquare"},{"key":"rightsquare"},{"key":"rightsquareo"},{"key":"leftsquareo"},{"key":"down-square-o"},{"key":"up-square-o"},{"key":"play"},{"key":"playcircleo"},{"key":"tag"},{"key":"adduser"},{"key":"bank"},{"key":"Trophy"},{"key":"loading1"},{"key":"loading2"},{"key":"like2"},{"key":"dislike2"},{"key":"like1"},{"key":"dislike1"},{"key":"bulb1"},{"key":"rocket1"},{"key":"select1"},{"key":"apple1"},{"key":"apple-o"},{"key":"android1"},{"key":"android"},{"key":"aliwangwang-o1"},{"key":"aliwangwang"},{"key":"pay-circle1"},{"key":"pay-circle-o1"},{"key":"poweroff"},{"key":"trademark"},{"key":"find"},{"key":"copyright"},{"key":"sound"},{"key":"earth"},{"key":"wifi"},{"key":"sync"},{"key":"login"},{"key":"logout"},{"key":"reload1"},{"key":"message1"},{"key":"shake"},{"key":"API"},{"key":"appstore-o"},{"key":"appstore1"},{"key":"scan1"},{"key":"exception1"},{"key":"contacts"},{"key":"solution1"},{"key":"fork"}];
    const AntDesign_iconos=[{"key":"customerservice"},{"key":"creditcard"},{"key":"codesquareo"},{"key":"book"},{"key":"clockcircle"},{"key":"clockcircleo"},{"key":"frown"},{"key":"mail"},{"key":"home"},{"key":"star"},{"key":"staro"},{"key":"meho"},{"key":"meh"},{"key":"shoppingcart"},{"key":"user"},{"key":"team"},{"key":"picture"},{"key":"setting"},{"key":"notification"},{"key":"enviromento"},{"key":"enviroment"},{"key":"eye"},{"key":"eyeo"},{"key":"camera"},{"key":"camerao"},{"key":"circledowno"},{"key":"circledown"},{"key":"delete"},{"key":"heart"},{"key":"pushpin"},{"key":"pushpino"},{"key":"hearto"},{"key":"smile-circle"},{"key":"smileo"},{"key":"frowno"},{"key":"play"},{"key":"playcircleo"},{"key":"Trophy"},{"key":"adduser"},{"key":"like2"},{"key":"dislike2"},{"key":"tag"},{"key":"rocket1"},{"key":"bulb1"},{"key":"message1"},{"key":"find"},{"key":"sound"}];
    // useFocusEffect(
    // );



  useEffect(()=>{
    iniciar();
  },[]);

 

  //funciones
  const iniciar=()=>{
    setIsLoading(true);
        setTimeout(()=>{

                db.transaction(tx=>{
                  //si no existe creo la tabla names!
                  tx.executeSql('CREATE TABLE IF NOT EXISTS taskappSecciones (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, icon TEXT, show BOOLEAN)',null,
                  (txObj,resultSet)=>{
                    if(resultSet.rowsAffected>0){
                      // console.log("se creo la tabla taskappSecciones")
                    }else{
                      // console.log("NO se creo la tabla taskappSecciones")
                    }
                  }
                  );            
                });


                db.transaction(tx=>{
                  //cargamos los datos a la variable names!
                    //tx.executeSql('DROP TABLE taskappSecciones',null,
                    tx.executeSql('SELECT * FROM taskappSecciones',null,
                    (txObj,resultSet)=>{
                      // enviamos los objetos a la variable names que es un array!
                      setNames(resultSet.rows._array);
                      // console.log(names);

                            //sí el lenght de los row es 0 la tabla esta vacia => se renderiza un mensaje
                      if(resultSet.rows.length>0){
                        setFullTable(true);
                        // console.log("la tabla taskappSecciones tiene SECIONES");
                        // console.log("Secciones configuraciones "+JSON.stringify(resultSet.rows._array) );
                      }else{
                        
                        setFullTable(false);
                        // console.log("la tabla taskappSecciones NO tiene SECIONES");
                      }
                    },
                    (txObj,error)=>console.log(error)
                    
                    );
                });

        setIsLoading(false);

        },1000);
  }
  //LOADING
  //
  const loading=()=>{
    return(
      <Loading color='red'/>
     );
  }
  //
  //FIN LOADING
  const dropTable=()=>{
    return Alert.alert(
      "Estas seguro?",
    `Realmente quieres eliminar esta sección?, esto sera PERMANENTE`,
      [
        // The "Yes" button
        {
          text: "Si",
          onPress: () => {
                  db.transaction(tx => {
                    tx.executeSql('DROP TABLE taskappSecciones ',null,(txObj,error)=>console.log(error));
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
  const addSeccion=()=>{
console.log("***********************************************");
 
    if((currentName!=='')&&(currentName!==undefined)&&(!names.some(item => item.name === currentName))){

      db.transaction(tx=>{
        tx.executeSql(`INSERT INTO taskappSecciones (name,icon,show) values ('${currentName}','questioncircleo', 0)`,[],
        (txObj,resultSet)=>{
          let existingNames=[...names];
          existingNames.push({id: resultSet.insertId, name: currentName, icon: 'questioncircleo', show: 0});
          setNames(existingNames);
          setCurrentName(undefined);
          console.log(existingNames)
        },
        (txObj,error)=>console.log(error)
        )
      });
       
    setFullTable(true);
    showMensageEmpity();
    showSecciones();


    }else{
      alert("El nombre ya existe en la lista o no se proporcionó un valor válido.");
    }

  

    //alert(currentName)
    console.log("currentName Seccion: "+currentName);
    
  };

  const showMensageEmpity=()=>{
    if(fullTable==false){
      return(
        <View key={"idNoName"} style={styles.row}>
          <Text>No hay secciones, crea una seccion</Text>
        </View>
      );
    }
  }

//metodos check
  const changeViewSeccion=(id,estado)=>{
    // console.log("tocanste el OJOOOO")
    db.transaction(tx=>{
      
      tx.executeSql(`UPDATE taskappSecciones SET show = ${estado?0:1} WHERE id = ${id}`,null,
      (obj,resultSet)=>{if(resultSet.rowsAffected>0){
        
        // console.log("****************************")
        // console.log(">>>>Array NO actualizado (BOLEANO):");
        // console.log(names);
        // console.log("****************************")

        let newArray=[];
        names.forEach(element=>{
          newArray.push(element);
            if(element.id==id){
                  element.show=estado?false:true;
                  //newArray.push(element);
            }
        })
        // console.log("****************************")
        // console.log(">>>>Array actualizado (BOLEANO):");
        // console.log(newArray);
        // console.log("****************************")
        setNames(newArray);
        //recargamos la tabla de secciones
        showSecciones();
      }
    })
    })
    //setActualizar(true);
  }

//metodos update delete
  const deleteSeccion=(id)=>{
                  //metodo comfirm

                return Alert.alert(
                  "Eliminar Seccion",
                  "Estas seguro que deseas eliminar esta Seccion?",
                  [
                    // The "Yes" button
                    {
                      text: "Si",
                      onPress: () => {
                        //eliminamos el dato

                        //localizamos el nombre de la seccion
                        names.forEach((element)=>{
                          if(element.id==id){
                            
                                        db.transaction(tx=>{
                                          tx.executeSql(`DELETE FROM taskappSecciones WHERE name = ?`,[element.name],
                                          (obj,resultSet)=>{
                                            if(resultSet.rowsAffected>0){
                                              
                                              tx.executeSql(`DROP TABLE ${element.name}`,[],
                                                      (obj,resultSet)=>{
                                                          if(resultSet>0){
                                                           console.log("se elimini el row "+element.name+" y la tabla "+element.name ); 
                                                          }
                                                      },(obj,error)=>{console.log(error)}
                                              );
                                            let newTask=[...names].filter(name=>name.id !== id);
                                            setNames(newTask);
                                            setCurrentName(undefined);
                                            {showSecciones};
                                          }
                                        },(obj,error)=>alert("Ocurrio un error inesperado, porfavor volve a intentarlo mas tarde"))
                                        })

                            }
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

const editSeccion=(id)=>{

Alert.alert("Editar Seccion", "¿Realmente desea editar esta Seccion?",[
  {
    text:"Si",
    onPress:
      ()=>{
        
        //enviamos el valor de la seccion a la variable "valueseccionedit"

        names.forEach(element=>{

          if(element.id==id){
            //preparamos el objetoEditar
            objetoEditar.id=id;
            objetoEditar.icon=element.icon;
            objetoEditar.show=element.show;
            objetoEditar.name=element.name;
            console.log("objeto editar: "+JSON.stringify(objetoEditar));
            setValueSeccionEdit(element.name);//valor viejo a editar
            setValueOldSeccionEdit(element.name);//valor VIEJO
            
          }
      
        })

        //enviamos el id de la SECCION  a EDITAR
        setIdEditSeccion(id);

        //haceos visible el modal "editar seccion"
        setVisibleModalEdit(true);

      }
  },
  {
    text:"No",
    onPress:()=>{
      
    }
  }
])

  }

const saveEditSeccion=()=>{

  db.transaction(tx=>{
    tx.executeSql(`UPDATE taskappSecciones SET name='${valueSeccionEdit}' WHERE id=${idEditSeccion}`,null,
          (obj,resultSet)=>{
            
            if(resultSet.rowsAffected>0){
              console.log("***************************")
                  console.log("(UPDATE) resultSet: "+JSON.stringify(resultSet))

                  let newArray=[...names];
                  newArray.some((element,index)=>{

                    element.id==idEditSeccion?element.name=valueSeccionEdit:null;
                    console.log(index+" "+element.name );
                    return index==idEditSeccion;

                  })
                  setNames(newArray);
                    //editamos el array names que contiene una comia de la tabla secciones
                    {showSecciones}

                  //renombramos la tabla
                  tx.executeSql(`SELECT name FROM sqlite_master WHERE type='table' AND name='${valueOldSeccionEdit}'`,null,
                        (obj,resultSet)=>{
                              if(resultSet.rows.length==1){
                                tx.executeSql(`ALTER TABLE '${valueOldSeccionEdit}' RENAME TO '${valueSeccionEdit}'`,null,
                                          (obj,resultSet)=>{
                                            console.log("-se renombro la tabla");
                                            console.log("***************************");
                        
                                            
                        
                                              },(obj,error)=>{                                
                                              console.log(error);
                                              console.log("***************************");
                                            })
                              }else{
                                console.log("no hay tabla");
                                console.log("***************************");
                              }        
                        },(obj,error)=>{                                
                          console.log(error);
                          console.log("***************************");
                        })
                 
        

    }},(obj,error)=>console.log(error))
  })

}
 
  const selectIcon =(id)=>{
    setModaleVisible(true);
    setIdSeccion(id)
    cargarIconos();
  }

  const showSecciones=()=>{
    
    return names.map((name,index)=>{
      return(
        //onPress={()=>selectTask(name.id)}
        <View key={index} style={{display:'flex',flexDirection:'row',marginBottom:10,background:'red'}}>
            <TouchableOpacity  style={{ 
                                              flexDirection:'row',
                                              alignItems:'center',
                                              alignSelf:'stretch',
                                              justifyContent:'space-between',
                                              borderWidth:1,
                                              borderColor:'black',        
                                              borderRadius:10,
                                            // backgroundColor:name.show?'green':'white',
                                            backgroundColor:name.show?ConfiguracionesCustom[0].sectioncheck:ConfiguracionesCustom[0].sectionuncheck,
                                          width:'100%',
                                        height:44}}
                onPress={()=>changeViewSeccion(name.id,name.show)}>

                <Text >
                <Feather name="database" size={24} color="black" />
                {name.name}
                </Text>
            </TouchableOpacity>
            
            <View style={styles.rowIcon}>
                <TouchableOpacity style={styles.icon} onPress={()=>selectIcon(name.id)}><AntDesign name={name.icon} size={24} color="black" /></TouchableOpacity>
                <TouchableOpacity style={styles.icon}><Ionicons name={name.show?"eye-sharp":"eye-off-sharp"} size={24} color={name.show?"green":"red"} /></TouchableOpacity>
                <TouchableOpacity style={styles.icon} onPress={()=>editSeccion(name.id)}><AntDesign name="edit" size={24} color="orange"  /></TouchableOpacity>
                <TouchableOpacity style={styles.icon} onPress={()=>deleteSeccion(name.id)}><AntDesign name="closecircle" size={24} color="red"  /></TouchableOpacity>
            </View>
        
        </View>
        
      );
    });
  };

  const analisisInput=(texto="")=>{
      console.log(texto);
      
          texto.match(/[^\w\s]/g)?alert("el nombre de la tarea NO debe contener caracteres esepciales")
                
      :setCurrentName(texto)
      //
  }

  const input= ()=>{
    return(
        // <Feather name="database" size={24} color="black" />
      <TextInput style={styles.input} value={currentName} placeholder={'Agregar una Seccion'} onChangeText={analisisInput}></TextInput>
    )
  }

  const cargarIconos=()=>{

    if(idSeccion==null){

    }else{

          // console.log("SE ESTAN CARGANDO LOS ICONOS DE LA SECCION CON ID= "+idSeccion);
        
          return(
                  <FlatList style={styles.flatListModal}
                      numColumns={4}
                      data={AntDesign_iconos}
                      renderItem={({item})=>
                        <TouchableOpacity style={styles.rowIconModal} key={item.key}  onPress={()=>IconoElegido(item.key)}>
                                  <AntDesign name={item.key} size={30} color="black"/>
                        </TouchableOpacity>
                  }/>

          )
        
     }         
        

    
    
  }

  const IconoElegido=(nameIcono)=>{

    // console.log('se eligio el icono= '+nameIcono+" idSección= "+idSeccion);
    //insertamos el icono a la tabla de la data base
    db.transaction(tx=>{
      tx.executeSql(`UPDATE taskappSecciones SET icon='${nameIcono}' WHERE id= ${idSeccion}`,
      null,(obj,resultSet)=>{if(resultSet.rowsAffected>0){
          //pusheamos el nuevo icon name en el array
          //recorremos el array de secciones hasta que coincida el idSeccion con el elemento y ahi alteramos
          // console.log(">>>>Array ANTES de actualizar:");
          // console.log(names);
          let newArray=[];
          names.forEach(element=>{
            newArray.push(element);
              if(element.id==idSeccion){
                    element.icon=nameIcono;
                    newArray.push(element);
              }
          })
          // console.log(">>>>Array actualizado:");
          // console.log(newArray);
          setIdSeccion(null);
        }
      },(obj,error)=>{
        Alert.alert("Ocurrio un error al guardar el icono seleccionado");
        console.log(error);
      })
      
    })
    //cargamos las secciones para que se vean actualizadas con los icono nuevos
    showSecciones();//esta función no actualiza los datos de los array de la db OJO!!!

    //cerramos el Modal
    setModaleVisible(!modalVisible)
  }
  
  /////******************************** */ PRINCIPAL
  return (
    <View style={[styles.container,{ backgroundColor:ConfiguracionesCustom[0].backgroundviewapp}]}>

          <View style={[styles.titleContainer,{ backgroundColor:ConfiguracionesCustom[0].backgroundviewapp}]}>
                    
                    <Text
                    style={[styles.titleText,{ backgroundColor:ConfiguracionesCustom[0].colortitle}]}>
                      Secciones
                    </Text>
                    {/* <AntDesign name="minuscircle" size={35} color="red" onPress={dropTable}/> */}
                                      
          </View>


          {/* <View style={styles.ListTareas}> */}

          <ScrollView style={styles.ListTareas}>
                
                <View style={{width:'100%',height:'100%'}} children={isLoading?loading():fullTable?showSecciones():showMensageEmpity()}/>
                    
                {/* <StatusBar style="auto" /> */}

          </ScrollView>

          {/* </View> */}

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
                bottom:20,
                alignItems:'center',
                justifyContent:'center',
                borderWidth:1,
                left:'40%'
              }}
              onPress={()=>{
                navigation.navigate('Tareas')
              }}
              >
                  <AntDesign name='home' color='black' size={40}></AntDesign>
                  <Text>Inicio</Text>
              </TouchableOpacity>
          </View>
          
          <View style={styles.buttonPanel}>
                {input()}
                <Ionicons name="add-circle" size={45} color="rgb(60, 155, 202)" onPress={addSeccion}/>
          </View>

         

          <Modal
                style={styles.modal}
                animationType="slide"
                  transparent={false}
                  visible={modalVisible}
                onRequestClose={()=>{
                  
                  setModaleVisible(!modalVisible);

                }}
                
                
                >
                  <View style={styles.modalView}>
                    
                          <Text>Seleccione un icono para la Seccion</Text>


                              {cargarIconos()}

                          <View style={{flexDirection:'row'}}>
                                <TouchableOpacity style={styles.ModalTouch} 
                                onPress={()=>setModaleVisible(!modalVisible)}>

                                        <AntDesign name="close" size={24} color="black" />
                                        <Text>Salir</Text>
                                </TouchableOpacity>

                          </View>
                          
                    
                  </View>
          </Modal>

{/* modal para editar la seccion */}
          <Modal
          style={styles.modal}
          animationType="slide"
          transparent={true}
          visible={visibleModalEdit}
          onRequestClose={()=>{
                              setVisibleModalEdit(!visibleModalEdit);
                              }
          }
          >
            <View style={styles.modalView}>
              <Text style={styles.titleText} >Editar Sección</Text>

              <TextInput style={styles.ModalInput} value={valueSeccionEdit} onChangeText={setValueSeccionEdit}>
              </TextInput>
                        
                        <View style={{flexDirection:'row'}}>

                              <TouchableOpacity style={styles.ModalTouch} onPress={()=>{saveEditSeccion(); setVisibleModalEdit(false)}}>
                                  <AntDesign name='save' color='black' size={40}></AntDesign>
                                  <Text>Guardar</Text>
                              </TouchableOpacity>

                              <TouchableOpacity style={styles.ModalTouch} onPress={()=>{setVisibleModalEdit(false)}}>
                                  <AntDesign name='close' color='black' size={40}></AntDesign>
                                  <Text>Salir</Text>
                              </TouchableOpacity>

                        </View>
                        
            </View>
        </Modal>

        
    </View>
    
  );
}

  

const styles = StyleSheet.create({
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
  flatListModal:{
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    gap:2,
    width:'90%', backgroundColor:'rgba(229, 227, 227)', marginTop:10
  },
  modal:{
    height:'100%'
  },
  ModalTouch:{margin:20,
              display:'flex',
              alignItems:'center',
              flexDirection:'column',
              borderWidth:1,
              borderRadius:10,
              padding:10},
  modalView: {
    backgroundColor:'rgba(229, 227, 227,0.7 )',
    margin: 20,
    height:'90%',
    //backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // justifyContent:'center'
  },
  ModalInput:{
    fontSize:25,
    backgroundColor:'white',
    width:'100%',
    height:100,
    textAlign:'center',
    borderRadius:10,
    marginTop:30



  },
    container: {
      flex: 1,
      height:'100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
                    titleContainer:{
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'center',
                      width:'100%',
                      backgroundColor:"rgb(241, 237, 236)",
                    },
                    titleText:{
                      left:'2.5%',
                      fontSize:40,
                      textAlign:"center",
                      marginTop:10,
                      marginBottom:10,
                      backgroundColor:'orange',
                      borderRadius:10,
                      borderWidth:1,
                      width:'95%',
                      
                    },
    ListTareas:{
      backgroundColor:"rgb(241, 237, 236)",
      top:0,
      width:'100%',
      height:'90%',
      padding:10,
      paddingTop:0
      
    },
    
    
    buttonPanel:{
      
      backgroundColor:"rgb(229, 227, 227)",
      width:'100%',
      height:70,
      flexDirection:'row',
      padding:10
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
                girar:{
                  width:50,
                  height:50,
                  borderWidth:3,
                  borderColor:'blue',
                  borderRadius:25,
                  borderLeftWidth:0,
                  
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
      padding:8,
      borderRadius:10,
      position:'absolute',
      right:1,
      marginTop:1
      
    },
    icon:{
      marginEnd:10
    }
  });

export default ScreenAdmin;

