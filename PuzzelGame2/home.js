import React, { useCallback, useState } from "react";
import { StyleSheet, View, ImageBackground, Text, Pressable, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";


export default function Home({navigation,route})
{
    const [levelno,setlevelno] = useState()
    const [lastlevel,setlast] = useState()


    // ===============[Getdata_lastlevel]====================
    const getlastData = async () => {
        try {
        const value = await AsyncStorage.getItem('Lastlevel');
        if (value !== null) {
            setlast(parseInt(value))
        }
        } catch (e) {
        // error reading value
        }
    };

    // ==============[Stordata_levelnumber]==============
    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('levelnumber', value);
            navigation.navigate('game')
        } catch (e) {
            // saving error
        }
    };
    // ==============[Getdata-levelnumber]==============
    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('levelnumber');
          if (value !== null) {
            setlevelno(parseInt(value))
          }
        } catch (e) {
          // error reading value
        }
      };
    useFocusEffect(
        useCallback(()=>{
            getData()
            getlastData()
        })
    )

    return(
        <View style={style.main}>
        <ImageBackground source={require("./img/home_background.jpg")} style={style.home_bg} resizeMode="cover" >

                <Text style={style.head_name}>Math Puzzles</Text>
                <View style={style.board_home_perent}>
                    <ImageBackground source={require("./img/blackboard_home.png")} style={style.board_home} resizeMode="stretch">
                        <Pressable style={style.buttons} onPress={()=>{storeData(String(lastlevel))}} >
                            <Text style={style.buton_name}>CONTINUE</Text>
                        </Pressable>    
                        <Pressable style={style.buttons} onPress={()=>{navigation.navigate('level')}}>
                            <Text style={style.buton_name}>PUZZLES</Text>
                        </Pressable>    
                        <Pressable style={style.buttons}>
                            <Text style={style.buton_name}>BUY PRO</Text>
                        </Pressable>    
                    </ImageBackground>                        
                </View>    
                <View style={style.footer_home}>
                    <View style={style.footer_icon}><Image source={require("./img/shareus.png")} style={style.icon_img}></Image></View>
                    <View style={style.footer_icon}><Image source={require("./img/emailus.png")} style={style.icon_img2}></Image></View>
                </View>
                
        </ImageBackground>   
    </View> 
    )
}
const style = StyleSheet.create({
    main:{
        height:"100%",
        backgroundColor:"grey",
    },
    home_bg:{
        height:"100%",
        width:"100%",
        flexDirection:"column",
        justifyContent:"space-evenly",
    },
    head_name:{
        height:"8%",
        width:"90%",
        alignSelf:"center",
        fontSize:45,
        textAlign:"center",
        textAlignVertical:"center",
        fontWeight:"900",
        color:"#bfaa61",
        textShadowColor:"black",
        textShadowOffset:{width:-1, height:3},
        textShadowRadius:10,
    },
    board_home_perent:{
        backgroundColor:"black",
        height:"75%",
        width:"90%" ,
        alignSelf:"center"
    },
    board_home:{
        backgroundColor:"black",
        height:"100%",
        width:"100%",
        justifyContent:"center",
        rowGap:5
    },
    buttons:{
        height:"10%",
        borderRadius:100,
        backgroundColor:"rgba(0,0,0,9)",
        width:"80%",
        alignSelf:"center",
        shadowColor:"white",
        elevation:5,
    },
    buton_name:{
        height:"100%",
        fontSize:25,
        fontWeight:"900",
        color:"white",
        textAlign:"center",
        letterSpacing:3,
        textAlignVertical:"center",
    },
    footer_home:{
        height:"7%",
        width:"90%",
        alignSelf:"center",
        flexDirection:"row",
        columnGap:9,
        justifyContent:"flex-end",
    },
    footer_icon:{
        height:"90%",
        width:"13%",
        // backgroundColor:"rgba(160,32,240,0.4)",
        backgroundColor:"#bfaa61",
        alignSelf:"flex-end",
        borderRadius:15,
        justifyContent:"center",
    },
    icon_img:{
        height:"70%",
        width:"75%",
        alignSelf:"center",
    },
    icon_img2:{
        height:"60%",
        width:"80%",
        alignSelf:"center",
    }
})