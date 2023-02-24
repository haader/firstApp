import React,{useEffect, useState} from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { Easing, spring } from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';

const Loading =(props)=>{
    
    const spinerValue = new Animated.Value(0);
    
    const spin=()=>{
        
            spinerValue.setValue(0);
            Animated.loop(
             Animated.timing(spinerValue,{
                toValue:1,
                duration:500,
                easing:Easing.linear,
                useNativeDriver:true,

                }),{iterations:-1}).start()
    }  
        
            
    
    useEffect(()=>{
        spin();
        return()=>{}
        },[]);

    const rotate=spinerValue.interpolate({
        inputRange:[0,1],
        outputRange:['0deg','360deg']
    });

     return(


      <View style={{width:'100%',height:'100%',alignItems: 'center',
      justifyContent: 'center',}}>
    
            <Animated.View
               
                style={
                {   

                    transform:[
                        {rotate}
                    ],
                    zIndex:10,
                    
                }
                }>
                <AntDesign name='loading2' color={props.color} size={50}/>
                
            
            </Animated.View>
            <View 
            
            style={{
                
                width:50,
                height:50,
                borderWidth:2,
                borderColor:'#ddd',
                borderRadius:25,
                position:'absolute',
                borderLeftColor:'red',
                
                
            }}></View>

            
          

     </View>
     )
 

 
   
    }

export default Loading;