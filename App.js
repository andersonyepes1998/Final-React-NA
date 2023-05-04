import { useState } from 'react';
import { Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TextInput, Button } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';
import { styles, styleImage, styleText, styleInp, styleBut, contenedorBtn, styleTxtReg } from './assets/style/style';
import Cars from './components/Cars';
import RentsCars from './components/RentCars';
import Lista from './components/Lista';


let users = [
  { email: 'andersonyepesbedoya@gmail.com', name: 'anderson', password: "22", role: 1 },
  { email: 'aladeus@gmail.com', name: 'alejandro', password: "11", role: 2 }
]




const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
 
<Cars estado={'Disponible'}/>

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{
        // headerShown:false,
        headerStyle: {
          backgroundColor: "gray"
        },
          headerTintColor: "white",
      }}>
        <Stack.Screen name='HomeTabs' component={HomeTabs} options={{title: 'Mercedes Bens',
        headerShown:false
      }}/>
        <Stack.Screen name='HomeRegister' component={HomeRegister} options={{title: 'Mercedes Bens',
        // headerShown:false
      }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({navigation}){

  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [errormess, seterrormess] = useState('');

  let limpiar = ()=>{
    seterrormess('')
    setEmail('')
    setpassword('')
  }
  return (
    <View style={styles.container}>
      <Image
        style={styleImage.img}
        source={require('./assets/images/Logo.png')}
      />
      <Text style={styleText.txt}>WELCOME</Text>

      <TextInput
        label="Correo electronico"
        mode='Flat'
        left={<TextInput.Icon icon="account-box" />}
        style={styleInp.input}
        // onBlur={onBlur}
        onChangeText={email => setEmail(email)}
        value={email}
      />

      <TextInput
        label="Contraseña"
        mode='flat'
        left={<TextInput.Icon icon="lock"/>}
        style={styleInp.input}
        // onBlur={onBlur}
         onChangeText={password => setpassword(password)}
         value={password}
         secureTextEntry  //PARA NO DEJAR VER LO QUE SE ESTA ESCRIBIENDO EN LA CONTRASEÑA, POR DEFECTO VIENE EN TRUE
      />

      <View style={contenedorBtn.contenedor}>
        <Button
          style={styleBut.btn}
          icon="login"
          mode="contained"
          onPress={()=>{
            if(email != '' && password != ''){
              let findUser = users.find(e => e.email == email && e.password == password);
              if(findUser != undefined) {
                seterrormess('');
                limpiar();
                navigation.navigate('Cars')
              }else{
                seterrormess('Correo y/o contraseña ICONRRECTO')
                setTimeout(function(){
                    limpiar();
                },2000)
              }
            }else{
              seterrormess('Todos los datos son obligatorios')
              setTimeout(function(){
                    limpiar();
                },2000)
            }
          }}
        >
          Iniciar Sesión
        </Button>
        <Button
          style={styleBut.btn}
          icon="account-plus"
          mode="contained"
          onPress={()=> navigation.navigate('HomeRegister')}
        >
          Registrarse
        </Button>
      </View>

      <Text style={{ color: 'white', marginTop: 22, position:'absolute' }}>{errormess}</Text>

      <Image
        style={styleImage.auto}
        source={require('./assets/images/Mercedes.png')}
      />

    </View>
  );
}


function HomeRegister({navigation}){

  const [email, setEmail]=useState('');
  const [name, setName]=useState('');
  const [password, setpassword]=useState('');
  const [errormess, seterrormess] = useState('');

  let limpiar = ()=>{
    seterrormess('')
    setEmail('')
    setpassword('')
    setName('')
  }

  return(
    <View style={styles.container}>
        <Text style={styleText.txt}>CREA UNA CUENTA</Text>
          <Text style={styleTxtReg.txt2}>Al crear la cuenta tendras acceso a todas las funciones del aplicativo</Text>
            <TextInput
              label="Correo electronico"
              mode='flat'
              left={<TextInput.Icon icon="account-box" />}
              style={styleInp.input}
              // onBlur={onBlur}
              onChangeText={email => setEmail(email)}
              value={email}
            />

            <TextInput
              label="Nombre del usuario"
              mode='flat'
              left={<TextInput.Icon icon="rename-box" />}
              style={styleInp.input}
              // onBlur={onBlur}
              onChangeText={name => setName(name)}
              value={name}
            />

            <TextInput
              label="Contraseña Nueva"
              mode='flat'
              left={<TextInput.Icon icon="lock"/>}
              style={styleInp.input}
              // onBlur={onBlur}
               onChangeText={password => setpassword(password)}
              value={password}
              secureTextEntry  //PARA NO DEJAR VER LO QUE SE ESTA ESCRIBIENDO EN LA CONTRASEÑA, POR DEFECTO VIENE EN TRUE
            />

        <Button
          style={styleBut.btn}
          icon="account-plus"
          mode="contained"
          onPress={()=>{
            if (email == '' && name == '' && password == '') {
              seterrormess('Todos los campos son obligatorios')
              //limpiar();
            }else{
              let findUser = users.find(e => e.email == email);
                if (findUser == undefined){
                  users.push({
                    email: email,
                    name: name,
                    password: password
                  })
                  console.log(users)
                  setTimeout(function(){
                    limpiar();
                  },4000)
                  seterrormess('Excelente, se ha creado la cuenta, ahora debes de inicar Sesion...')
                  // navigation.navigate('Cars')
              }
            }
              
          }}
        >
          Crear Cuenta
        </Button>

        <Text style={{ color: 'white', marginTop: 22 }}>{errormess}</Text>

    </View>
  )
}

function HomeTabs(){
  return(
    <Tab.Navigator
      screenOptions={{
        headerShown:false,
        tabBarActiveTintColor: 'white',
        //tabBarInactiveTintColor: 'white',
        tabBarActiveBackgroundColor: '#bf930d',
        tabBarInactiveBackgroundColor: '#8b0000'
      }}
    >
      <Tab.Screen name='Home' component={HomeScreen} options={{
        tabBarStyle: { display: 'none' },
        tabBarIcon: (tabInfo) => (<MaterialIcons name='home' size={30} color='white' />)
      }} />
      <Tab.Screen name='Cars' component={Cars} options={{
        tabBarIcon: (tabInfo) => (<MaterialIcons name='train' size={30} color='white' />)
      }} />
      <Tab.Screen name='RentCars' component={RentsCars} options={{
        tabBarIcon: (tabInfo) => (<MaterialIcons name='badge' size={30} color='white' />)
      }} />
      {/* <Tab.Screen name='Lista' component={Lista} options={{
        tabBarIcon: (tabInfo) => (<MaterialIcons name='euro' size={30} color='#AAA' />)
      }} /> */}
    </Tab.Navigator>
  )
}
