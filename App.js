import 'react-native-gesture-handler';

import  Navigation from './Navigation';
import NavegadorSecciones from './NavegadorSecciones'

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';



//importamos las screens
import ScreenHelp from './screens/ScreenHelp';
import ScreenAboutApp from './screens/ScreenAboutApp';
import ScreenAdmin from './screens/ScreenAdmin';
import ScreenConfig from './screens/screenConfig';
import ScreenDev from './screens/screenDev';
//extra
import ScreenEXTRA from './screens/screenEXTRA'

//ConfiguracionesProvider
import {ConfiguracionesProvider} from './componentes/ConfiguracionesContext'
//navigation


//importamos los iconos
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Drawer= createDrawerNavigator();

export default function MyDrawer(){



  return(

<ConfiguracionesProvider>

    <NavigationContainer>


            {/* <Drawer.Navigator initialRouteName="EXTRA"> */}
            {/* <Drawer.Navigator initialRouteName="Configuración"> */}
            {/* <Drawer.Navigator initialRouteName="Administrar secciones"> */}
            <Drawer.Navigator initialRouteName="Tareas">
            {/* <Drawer.Navigator initialRouteName="Acerca de la App"> */}


                        <Drawer.Screen  name="Tareas" options={{drawerIcon:({focused,size})=>(

                                  <FontAwesome5 name="tasks" size={24} color={focused?'#7cc':'#ccc'} />

                                  )}} component={NavegadorSecciones}>

                        </Drawer.Screen>


                        <Drawer.Screen name={"Administrar secciones"} options={{drawerIcon:({focused,size})=>(
                                <AntDesign name="database" size={24} color={focused ? '#7cc' : '#ccc'} />)}}
                                component={ScreenAdmin}>
                                {/* {()=>(<ScreenAdmin ></ScreenAdmin>)} */}
                        </Drawer.Screen>

                        <Drawer.Screen
                            name="Configuración"
                            component={ScreenConfig}
                            options={{
                              drawerIcon: ({ focused, size }) => (
                                <AntDesign name="setting" size={24} color={focused ? '#7cc' : '#ccc'} />
                              ),
                            }}
                           
                          />

                        {/* <Drawer.Screen name="EXTRA" options={{drawerIcon:({focused,size})=>(<AntDesign name="setting" size={24} color={focused?'#7cc':'#ccc'} />)}} component={ScreenEXTRA}/> */}

                        <Drawer.Screen name="Acerca de la App" options={{drawerIcon:({focused,size})=>(<MaterialIcons name="app-settings-alt" size={24} color={focused?'#7cc':'#ccc'} />)}} component={ScreenAboutApp}/>

                        <Drawer.Screen name="Programador" options={{drawerIcon:({focused,size})=>(<FontAwesome5 name="code" size={24} color={focused?'#7cc':'#ccc'} />)}} component={ScreenDev}/>

                        <Drawer.Screen name="Ayudar" options={{drawerIcon:({focused,size})=>(<AntDesign name="gift" size={24} color={focused?'#7cc':'#ccc'} />)}} component={ScreenHelp}/>

                        {/* <Drawer.Screen name="Eliminar db" component={()=>{eliminarDB}}/>            */}

            </Drawer.Navigator>


    </NavigationContainer>

</ConfiguracionesProvider>

  );
}



