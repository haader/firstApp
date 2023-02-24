import { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';

import React, { createContext } from 'react';

export const ConfiguracionesContext = createContext();

export const ConfiguracionesProvider = (props) => {
  
  const [ConfiguracionesCustom, setConfiguracionesCustom] = useState([{
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
  }]);

  //abrimos la base de datos
  const db= SQLite.openDatabase('taskApp.db');
  //variable que almacena las configuraciones
  
  //la configuración DEFAULT se encuentra en la screenConfig 

  //creamos la tabla si no existe configCustomApp
  useEffect(()=>{
    console.log("=> => => => El valor ACTUAL (useeEffect) de ConfiguracionesCustom es: "+JSON.stringify(ConfiguracionesCustom))

  },[ConfiguracionesCustom])


useEffect(()=>{

  const cargarTabla=()=>{

    db.transaction((tx)=>{
      
      tx.executeSql(`CREATE TABLE IF NOT EXISTS configCustomApp (
          id INTEGER,
          colortitle TEXT,
          backgroundviewapp TEXT,
          navigateselect TEXT,
          navigateunselect TEXT,
          backgroundbutton TEXT,
          taskuncheck TEXT,
          taskcheck TEXT,
          sectionuncheck TEXT,
          sectioncheck TEXT
        )`,null,
      
        (obj,resultSet)=>{
          console.log("")
          console.log(`=> CREATE TABLE "configCustomApp" `)
          console.log("")
        },
      (obj,error)=>{
        console.log("hubo un error al crear configCustomApp: "+error)
      })
  
    })
  
    db.transaction((tx)=>{
    
        //colocamos los valores predeterminados en la tabla
          tx.executeSql(`
          INSERT INTO configCustomApp 
          (
          id,
          colortitle,
          backgroundviewapp,
          navigateselect,
          navigateunselect,
          backgroundbutton,
          taskuncheck,
          taskcheck,
          sectionuncheck,
          sectioncheck
          )
          SELECT 0,
          'orange',
          'white',
          '#7ccc',
          '#ccc',
          'white',
          'white',
          'rgb(184, 245, 181)',
          'white',
          'rgb(184, 245, 181)'
          WHERE NOT EXISTS (SELECT * FROM configCustomApp)
          `,
          null,
          (obj,resultSet)=>{console.log("=> INSERT INTO"  )
          //+JSON.stringify(resultSet)
        //{"insertId":-1,"rowsAffected":0,"rows":{"_array":[],"length":0}}
        },
          (obj,error)=>{console.log(error)}
          )
  
    })
  
    db.transaction((tx)=>{
  
      tx.executeSql(`SELECT * FROM configCustomApp`,null,
  
          (obj,resultSet)=>{
            
            let myobjeto=resultSet.rows._array;
            setConfiguracionesCustom(myobjeto);
            console.log("");
            console.log("=> SELECT * FROM");
            console.log("");
            // console.log("-App  datos traidos SELECT * FROM "+JSON.stringify(myobjeto));
            // console.log("-App  datos traidos SELECT * FROM (ConfiguracionesCustom) "+JSON.stringify(ConfiguracionesCustom));
            
          },
          (obj,error)=>{console.log("error:"+error)})
  
    })
  }



  cargarTabla();

},[])

  return (
    <ConfiguracionesContext.Provider value={{ ConfiguracionesCustom, setConfiguracionesCustom }}>
      {props.children}
    </ConfiguracionesContext.Provider>
  );
};
