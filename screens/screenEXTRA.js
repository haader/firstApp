import * as SQLite from 'expo-sqlite';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import {View, Text, StyleSheet,TouchableOpacity, Alert, Button, Linking, Image} from 'react-native';

//importamos los iconos
import { AntDesign } from '@expo/vector-icons';

const ScreenEXTRA=()=>{

//seccion de prueba
    // const [cont,setCont]=useState(0);
    
    //administrador de base de datos
    const [nameTabla,setNameTabla]=useState("");
    const [arrayNameTabla,setArrayNameTabla]=useState(['vacio']);
    const [arraySchemaTabla,setArraySchemaTabla]=useState(['seleccione una tabla']);
    const [arrayDatosTabla,setArrayDatosTabla]=useState(['seleccione una tabla']);
    const db= SQLite.openDatabase('taskApp.db');

    //variables para cambiar el nombre de la tabla
    const [nameTablaEditar,setNameTablaEditar]=useState('');
    const [newNameTablaEditar,setNewNameTablaEditar]=useState('');

useEffect(()=>{
    nameTablesDB()
},[])

//leemos los nombres de las tablas de la db


const nameTablesDB=()=>{
    db.transaction(tx=>{
        tx.executeSql('SELECT * FROM sqlite_master WHERE type = "table"',null,
        
        (obj,resultSet)=>{
            console.log("***************");
            
            let array=[]
            resultSet.rows._array.forEach((element)=>{
                
                if((element.name=='android_metadata')||(element.name=='sqlite_sequence')){
                    
                }else{
                    array.push(element.name);
                }
                
            })
            setArrayNameTabla(array)
            console.log("***************");
        },(obj,error)=>{console.log(error)})
    })
    
}

const verSchema=(TablaName)=>{
db.transaction(tx=>{
    // tx.executeSql('SELECT * FROM sqlite_master WHERE type = "table"',null,
    tx.executeSql(`PRAGMA table_info(${TablaName})`,null,
    
    (obj,resultSet)=>{
        console.log("*******    SCHEMA  ********");
        let arraySchema=[]
        resultSet.rows._array.forEach((element)=>{
            console.log(element.name);
            arraySchema.push(element.name)
        })
            setArraySchemaTabla(arraySchema);

        console.log("***************");
    },(obj,error)=>{console.log(error)})
})
}

const verDatos=(TablaName)=>{
    db.transaction(tx=>{
        // tx.executeSql('SELECT * FROM sqlite_master WHERE type = "table"',null,
        tx.executeSql(`SELECT * FROM ${TablaName}`,null,
        
        (obj,resultSet)=>{
            let objeto=resultSet.rows._array;
            let arrayKEY=["backgroundbutton","backgroundtask","colortask","colortitle","id","navigateunselect","navigateselect"];
            let array=[]
            console.log("****** DATOS ********");
            console.log("DATOS: "+JSON.stringify(resultSet.rows._array))
            arrayKEY.forEach((element)=>{

                console.log("--"+element);
                array.push(objeto[0][element]);
                })

            setArrayDatosTabla(array)
            
            // let arrayDatos=[resultSet.rows._array];
            // let {}=resultSet.rows._array;
            // resultSet.rows._array.forEach((element)=>{
            //     console.log(element);
            //     arrayDatos.push(element)
            // })
            //     setArrayDatosTabla(arrayDatos);
            console.log("***************");
        },(obj,error)=>{console.log(error)})
    })
}
    return(
        
        <View style={estilos.column}>
            
            <Text style={{width:'100%',textAlign:'center',fontSize:20}}>Nombre de las tablas:</Text>
            
            <View style={{padding:20}}>

                    {arrayNameTabla.map((element,index)=>{
                        return(
                            <TouchableOpacity
                            key={index}
                            children={<Text>{element}</Text>}
                            onPress={()=>{
                                setNameTabla(element)
                                verSchema(element)
                                verDatos(element)
                            }}
                            />
                        )
                    })}
            </View>
            
            <Text style={{width:'100%',textAlign:'center',fontSize:20}}>Esquema de: {nameTabla}</Text>
            
            <View style={{padding:20}}>

                    {arraySchemaTabla.map((element,index)=>{
                        return(
                            <TouchableOpacity
                            key={index}
                            children={<Text>{element}</Text>}
                            onPress={()=>{
                                setNameTabla(element)
                            }}
                            />
                        )
                    })}

            </View>


            <Text style={{width:'100%',textAlign:'center',fontSize:20}}>Datos de: {nameTabla}</Text>

            <View style={{padding:20}}>

            {arrayDatosTabla.map((element,index)=>{
                return(
                    <TouchableOpacity
                    key={index}
                    children={<Text>{element}</Text>}
                    onPress={()=>{
                        setNameTabla(element)
                    }}
                    />
                )
            })}

            </View>

{/* BOTONES */}
{/* 
            <Button onPress={verSchema} title='ver Schema'/>

            <Button onPress={verDatos} title='ver datos'/> */}
            
{/* eliminar tabla */}
            <Button 
            title={`eliminar ${nameTabla}`}
            onPress={()=>{
                return Alert.alert(
                    "Estas seguro?",
                  `Realmente quieres eliminar ${nameTabla}?, esto sera PERMANENTE`,
                    [
                      // The "Yes" button
                      {
                        text: "Si",
                        onPress: () => {
                            db.transaction(tx=>{
                                tx.executeSql(`DROP TABLE '${nameTabla}'`,null,(obj,resultSet)=>{
                                    
                                        console.log("se elimino la tabla con nombre "+nameTabla)
                                        nameTablesDB()
                                        setArraySchemaTabla(['seleccione una tabla']);
                                        setArrayDatosTabla(['seleccione una tabla']);
                                        setNameTabla('')
                                    
                                },(obj,error)=>{console.log(error)})
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
                
            }}/>

            <Button title='reload' onPress={()=>{
                nameTablesDB()
            }}/>
        </View>
        
    )
// termina la seccion de prueba



    // return(
    //     <View style={estilos.column}>
    //         <Text>¿Como Colaborar?</Text>
    //         <Text>Puedes ayudarme enviadome "Cafecitos"</Text>
    //         <Button style={estilos.button}>Eviar Cafesitos</Button>
    //     </View>
    // )


}

const estilos=StyleSheet.create({

    column:{
        display:'flex',
        flexDirection:'column'
    },
    row:{
        display:'flex',
        flexDirection:'row'
    },
    texto:{

    },
    button:{

    }

})

export default ScreenEXTRA;


// let objeto = `[{"id":0,"colortitle":"orange","backgroundtask":"white","colortask":"white","navigateselect":"#7cc","navigateunselect":"#ccc","backgroundbutton":"#9cc"}]`;
// let arrayKEY=["backgroundbutton","backgroundtask","colortask","colortitle","id","navigateunselect","navigateselect"]
// let array2=[]
// let newOBJETO=JSON.parse(objeto);
// arrayKEY.forEach((element,index)=>{
// console.log("*****");
//  console.log(arrayKEY[index]);
// array2.push(newOBJETO[0][element]);
// console.log(array2[index]);
// console.log("*****");