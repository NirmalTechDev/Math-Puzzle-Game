import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, ImageBackground, Image, View, Text, Pressable } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Winpage({navigation,route})
{
    const [levelno,setlevelno] = useState();

    // ============[Stordata_levelnumber]===============

    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('levelnumber', value);
            navigation.navigate('game')
        } catch (e) {
          // saving error
        }
      };

    // ===============[Getdata_levelnumber]================
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
        })
    )

    return(
        <View style={style.main}>
            <ImageBackground source={require("./img/home_background.jpg")} style={style.bgimg} resizeMode="stretch">

                <View style={style.perent}>
                    <Text style={style.comlettxt}>PUZZLE  {levelno}  COMPLETED</Text>
                    <Image source={require("./img/trophy.png")} style={style.trophyimg}></Image>
                    <Pressable style={style.buttons} onPress={()=>{storeData(String(levelno+1))}} >
                        <Text style={style.buton_name}>CONTINUE</Text>
                    </Pressable>
                    <Pressable style={style.buttons} onPress={()=>{navigation.navigate('level')}} >
                        <Text style={style.buton_name}>PUZZLES</Text>
                    </Pressable>
                    <Pressable style={style.buttons}>
                        <Text style={style.buton_name}>BUY PRO</Text>
                    </Pressable>
                    <Text style={style.sharetxt}>SHARE THIS PUZZLE</Text>
                    <View style={style.footer_icon}><Image source={require("./img/shareus.png")} style={style.icon_img}></Image></View>
                </View>

            </ImageBackground>
        </View>
    )
}
const style=StyleSheet.create({
    main: {
        height: "100%",
    },
    bgimg: {
        height: "100%",
    },
    perent: {
        height: "85%",
        justifyContent: "space-between"
        // backgroundColor:"grey",
    },

    comlettxt: {
        height: "10%",
        fontSize: 25,
        // backgroundColor:"white",
        fontWeight: "900",
        fontStyle: "italic",
        color: "black",
        textAlign: "center",
        textAlignVertical: "center",
    },
    trophyimg: {
        // backgroundColor:"white",
        alignSelf: "center"
    },
    buttons: {
        height: "7%",
        borderRadius: 10,
        backgroundColor: "rgba(0,0,0,0.3)",
        width: "50%",
        alignSelf: "center",
    },
    buton_name: {
        height: "100%",
        fontSize: 25,
        fontWeight: "900",
        color: "white",
        textAlign: "center",
        letterSpacing: 3,
        textAlignVertical: "center",
    },
    sharetxt: {
        height: "5%",
        fontSize: 20,
        fontWeight: "900",
        fontStyle: "italic",
        color: "black",
        textAlign: "center",
        textAlignVertical: "center",
    },
    footer_icon: {
        height: "8%",
        width: "13%",
        backgroundColor: "rgba(0,0,0,0.2)",
        alignSelf: "center",
        borderRadius: 15,
        justifyContent: "center",
    },
    icon_img: {
        height: "75%",
        width: "70%",
        alignSelf: "center",
    },
})