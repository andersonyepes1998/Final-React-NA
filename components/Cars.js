import { Text, View, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { stylesCon, styleTexto} from '../assets/style/Cars';
import { styleInp, styleBut, styleImage } from '../assets/style/style';




export default function Cars(props){

    //console.log(props)

    let vehiculos =[
        {placa: 'mqs 456', auto: 'Merces2', estado:'Disponible'}
    ]
    

    const [placa, setPlaca] = useState('');
    const [auto, setAuto] = useState('');
    const [estado, setEstado] = useState('');
    const [mensaje, setMensaje] = useState('');

    let limpiar = ()=>{
        setPlaca('')
        setAuto('')
        setEstado('')
    }

    return(
        <View style={stylesCon.container2}>

            <Image
                style={styleImage.img}
                source={require('../assets/images/Logo.png')}
            />

            <Text style={styleTexto.carro}>DESEAS INGRESAR ALGÚN VEHICULO</Text>

            <TextInput
                label="Número de la placa"
                mode='Flat'
                left={<TextInput.Icon icon="numeric-0-box-multiple-outline" />}
                style={styleInp.input}
                // onBlur={onBlur}
                onChangeText={placa => setPlaca(placa)}
                value={placa}
            />
            <TextInput
                label="Marca del auto"
                mode='Flat'
                left={<TextInput.Icon icon="watermark" />}
                style={styleInp.input}
                // onBlur={onBlur}
                onChangeText={auto => setAuto(auto)}
                value={auto}
            />
            <TextInput
                label="Estado del auto"
                mode='Flat'
                left={<TextInput.Icon icon="car-estate" />}
                style={styleInp.input}
                // onBlur={onBlur}
                onChangeText={estado => setEstado(estado)}
                value={estado}
            />
            <Button
                style={styleBut.btn}
                icon="bookmark"
                mode="contained"
                onPress={()=>{
                     if (placa == '' && auto == '' && estado == ''){
                        setMensaje('Todos los campos son Obligatorios...')
                    }else{
                        let findAtomovil = vehiculos.find(vehiculo=>vehiculo.placa == placa)
                        if(findAtomovil == undefined){
                            vehiculos.push({
                                placa:placa,
                                auto: auto,
                                estado: estado
                            })
                            console.log(vehiculos);
                            setTimeout (function(){
                                limpiar()
                            },2000)
                            setMensaje('Se ha guardado correctamente')
                        }
                    }
                }}
            >
                Guardar Autos
            </Button>

            <Button
                style={styleBut.btn}
                icon="magnify"
                mode="contained"
                onPress={()=>{

                    let findPlaca = vehiculos.find(vehiculo => vehiculo.placa == placa)
                    
                    if(placa == ''){
                        setTimeout(function(){
                            limpiar()
                        },3000)
                        setMensaje('Para poder hacer una busqueda debes ingresar la placa')
                    }else{
                        if (findPlaca == undefined && estado != 'disponible') {
                            setMensaje('Vehiculo No dispoible...')
                            setTimeout(function(){
                                limpiar()
                            },2000)
                        }else{
                            setMensaje('Vehiculo encontrado correctamente en el sistema')
                            setAuto(findPlaca.auto)
                            setEstado(findPlaca.estado)
                            console.log(findPlaca)
                            setTimeout(function(){
                                limpiar()
                            },7000)
                        }
                    }
                }}
            >
                Buscar Autos
            </Button>

            <Text style={{ color: 'white', marginTop: 22 }}>{mensaje}</Text>
        </View>
    )
}