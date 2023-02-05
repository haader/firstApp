import React from "react";
import {StyleSheet, View, Text, TextInput,TouchableOpacity} from 'react-native';
import { ScrollView } from "react-native-gesture-handler";

// iconos
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

//variables globales
const JSONconfig={colorTitle:'orange',colorFondoPanelTask:'#7cc',colorTask:'white',navigateSelect:'#7cc',navigateUnselect:'#ccc'}
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
    <TouchableOpacity style={{  
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
            <Feather name='check-circle' size={24} color='green' />
        </View>
        {/* creamos un elipsis */}
        <Text >
            nombre de tarea
        </Text>

        <View style={estilos.rowIcon}>

            <View style={estilos.icon}><AntDesign name="edit" size={24} color="orange"/></View>
            <View style={estilos.icon}><AntDesign name="closecircle" size={24} color="red"/></View>
        </View>
  </TouchableOpacity>
  )
}

const MiniaturaPendiente=(props)=>{
  return(

    <View style={{display:'flex',flexDirection:'row',alignItems:'center',borderRadius:5,borderWidth:1,width:'80%',height:20,backgroundColor:JSONconfig.colorTask,margin:10}}>
      <Circulo  color='green'></Circulo>
      <Text style={{width:'70%',textAlign:'center',fontSize:10,}}>{props.title}</Text>
      <View style={{position:'absolute',backgroundColor:'gray',display:'flex',flexDirection:'row',padding:4,right:0}}>
        <Circulo  color='orange'></Circulo>
        <Circulo  color='red'></Circulo>
      </View>
    </View>
  )
}

const MiniaturaTask=()=>{

  return(
    // aqui va el color
    <View style={{
      borderRadius:10,
    borderWidth:1,
    width:'90%',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:JSONconfig.colorFondoPanelTask
    }}>
        <View style={{alignItems:'center',borderRadius:5,borderWidth:1,width:'80%',height:20,backgroundColor:JSONconfig.colorTitle,margin:10}}>
            <Text>titulo</Text>
        </View>
    {/* tareas */}
        <View style={{width:'100%',marginLeft:40}}>
          <MiniaturaPendiente title='tarea 1'></MiniaturaPendiente>
          <MiniaturaPendiente title='tarea 2'></MiniaturaPendiente>
          <MiniaturaPendiente title='tarea 3'></MiniaturaPendiente>
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
      
      <View style={{display:'flex',flexDirection:'column',alignItems:'center',width:60}}>
        <AntDesign name='home' size={20} color={props.colorSelect}/>
        <Text style={{fontSize:10,color:props.colorSelect}}>Inicio</Text>
      </View>
      <View style={{display:'flex',flexDirection:'column',alignItems:'center',width:60}}>
      <AntDesign name='home' size={20} color={props.colorUnselect}/>
      <Text style={{fontSize:10,color:props.colorUnselect}}>{props.seccion1}</Text>
      </View>
      <View style={{display:'flex',flexDirection:'column',alignItems:'center',width:60}}>
      <AntDesign name='home' size={20} color={props.colorUnselect}/>
      <Text style={{fontSize:10,color:props.colorUnselect}}>{props.seccion2}</Text>
      </View>

      <View style={{display:'flex',flexDirection:'column',alignItems:'center',width:60}}>
      <AntDesign name='home' size={20} color={props.colorUnselect}/>
      <Text style={{fontSize:10,color:props.colorUnselect}}>{props.seccion3}</Text>
      </View>
    </View>

  )
}

const Title=(props)=>{
  return(
    <Text style={{fontSize:20,marginTop:20,marginBottom:20}}>{props.title}</Text>
  )
}

// screen
const ScreenConfig=()=>{

  return(
    <View style={estilos.column}>
      <Text style={{backgroundColor:'orange',
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
            <View style={{borderRadius:10,borderWidth:1,margin:10,alignItems:'center'}}>
                  <Title title='Color de fondo del titulo'></Title>

                <TitleMiniatura title='Titulo' color={JSONconfig.colorTitle}></TitleMiniatura>

                  <Confi value='red'></Confi>
            </View>

{/* fondo tareas */}
            <View style={{borderRadius:10,borderWidth:1,margin:10,alignItems:'center',justifyContent:'center'}}>
                  <Title title='Color de fondo de las tareas'></Title>
                  
                  <Barratareas color={JSONconfig.colorTask}></Barratareas>

                  <Confi value='red'></Confi>
            </View>
{/* color de fondo de las secciones */}
            <View style={{borderRadius:10,borderWidth:1,margin:10,alignItems:'center'}}>
                  <Title title='Color de fondo de las secciones'></Title>

                  <MiniaturaTask></MiniaturaTask>
                  

                  <Confi value='red'></Confi>
            </View>

            <View style={{borderRadius:10,borderWidth:1,margin:10,alignItems:'center'}}>
                  <Title title='Color de iconos barra de navegación'></Title>

                  <BarraDeNavegacion colorSelect={JSONconfig.navigateSelect} colorUnselect={JSONconfig.navigateUnselect} seccion1='escuela' seccion2='comprar' seccion3='ropa'></BarraDeNavegacion>

                  <Confi title='Color de fondo del titulo' value='red'></Confi>
            </View>

        </ScrollView>

        <View style={{display:'flex',flexDirection:'row',margin:20,alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity style={{
              borderRadius:10,
              borderWidth:1,
              width:'90%',
              alignItems:'center',
              justifyContent:'center',
              backgroundColor:'blue',
              backgroundColor:'rgb(60, 155, 202)'

            }}>
              <Text>Guardar</Text>
            </TouchableOpacity>
        </View>
        
      </View>

      

    </View>
  );
}

const estilos=StyleSheet.create({
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