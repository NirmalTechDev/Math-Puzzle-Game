import React from "react";
import { StyleSheet, ImageBackground, Image, View, Text, Pressable } from "react-native";

export default function Losepage({navigation,route})
{
    const {levelno}=route.params;
    return(
        <View style={style.main}>
        <ImageBackground source={require("./img/home_background.jpg")} style={style.bgimg} resizeMode="stretch">
            
            <View style={style.perent}>
                <Text style={style.comlettxt}>You Lose 10 coins !!</Text>
                <Image source={require("./img/blnt.png")} style={style.trophyimg}></Image>
                <Pressable style={style.buttons} onPress={()=>{navigation.navigate('game',{'levelno':levelno})}} >
                    <Text style={style.buton_name}>RETRY</Text>
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
const style = StyleSheet.create({
    main:{
        height:"100%",
    },
    bgimg:{
        height:"100%",
    },
    perent:{
        height:"85%",
        justifyContent:"space-between",
        // backgroundColor:"grey",
    },
    
    comlettxt:{
        height:"10%",
        fontSize:25,
        // backgroundColor:"white",
        fontWeight:"900",
        fontStyle:"italic",
        color:"red",
        textAlign:"center",
        textAlignVertical:"center",
    },
    trophyimg:{
        height:"45%",
        width:"95%",
        // backgroundColor:"white",
        alignSelf:"center"
    },
    buttons:{
        height:"7%",
        borderRadius:10,
        backgroundColor:"rgba(0,0,0,0.3)",
        width:"50%",
        alignSelf:"center",
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
    sharetxt:{
        height:"5%",
        fontSize:20,
        fontWeight:"900",
        fontStyle:"italic",
        color:"black",
        textAlign:"center",
        textAlignVertical:"center",
    },
    footer_icon:{
        height:"8%",
        width:"13%",
        backgroundColor:"rgba(0,0,0,0.2)",
        alignSelf:"center",
        borderRadius:15,
        justifyContent:"center",
    },
    icon_img:{
        height:"75%",
        width:"70%",
        alignSelf:"center",
    },
})