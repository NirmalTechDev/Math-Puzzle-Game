import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, ImageBackground, Text, Pressable, Image, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScreenStackHeaderLeftView } from "react-native-screens";

export default function Gamepage({navigation,route})
{    
    const [number,setnumber] = useState("");

    const [levelno,setlevelno]=useState('')
    const [coin,setcoin]=useState(10);
    const [skiparr,setskiparr]=useState([])

    const imgarr=[require("./img/p1.png"),require("./img/p2.png"),require("./img/p3.png"),
                require("./img/p4.png"),require("./img/p5.png"),require("./img/p6.png"),
                require("./img/p7.png"),require("./img/p8.png"),require("./img/p9.png"),
                require("./img/p10.png"),require("./img/p11.png"),require("./img/p12.png"),
                require("./img/p13.png"),require("./img/p14.png"),require("./img/p15.png"),
                require("./img/p16.png"),require("./img/p17.png"),require("./img/p18.png"),
                require("./img/p19.png"),require("./img/p20.png"),require("./img/p21.png")
                ]
    const ansarr = ["10", "25", "6", "14", "128", "7", "50", "1025", "100", "3", "212", "3011", "14", "16", "1", "2", "44", "45", "625","1", "13", ]

    const hintarr =["sum","MULTIPULICATION","6*30 = 30","Count The Square","Try Multiplication","Look At The Different Of Tow Number","Apply BOOMAS","Splite 21 into 2 and 1","4 = 2*2","Diagonal Sum 0"]
// ==============[Stordata_levelnumber]==============
const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('levelnumber', value);
        navigation.push('game')
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

// ==============[Stordata_coin]==============
const storecoinData = async (value) => {
    try {
        await AsyncStorage.setItem('coin', value);
        // navigation.push('game')
    } catch (e) {
        // saving error
    }
};

// ===============[Getdata_coin]================
const getcoinData = async () => {
    try {
      const value = await AsyncStorage.getItem('coin');
      if (value !== null) {
        setcoin(parseInt(value))
      }
    } catch (e) {
      // error reading value
    }
  };
useFocusEffect(
    useCallback(()=>{
        getcoinData()
    })
)
// ====================[storedata_skipdata]============
const storeSkipData = async (value) => {
    try {
        if(value.length)
        {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('Skiparr', jsonValue);
        }
    } catch (e) {
      // saving error
    }
  };
  useFocusEffect(
    React.useCallback(()=>{ 
        storeSkipData(skiparr)
    },[skiparr])
  )
//   ==================[getdata_skipdata]====================
    const getSkipdataData = async () => {
        try {
        const jsonValue = await AsyncStorage.getItem('Skiparr');
        tempdata = jsonValue != null ? JSON.parse(jsonValue) : null;
            setskiparr(tempdata)
        } catch (e) {
        // error reading value
        }
    };
    useFocusEffect(
        React.useCallback(()=>{
            getSkipdataData()
        },[])
    )
    useEffect(()=>{
        console.log(skiparr)
    },[skiparr])
// ============================================
    function skip()
    {
        setskiparr([...skiparr,levelno])
        storeData(String(levelno+1))
    }
// =============================================
    function hint()
    {
        Alert.alert("Hint For You...",hintarr[levelno-1])
    }
//=============================================
    function chackans()
    {
        if(number==ansarr[levelno])
        {
            storecoinData(String(coin+10))

            var temparr=[...skiparr]
            if(temparr.includes(levelno))
            {
                for(var i=0;i<temparr.length;i++)
                {
                    if(temparr[i]==levelno)
                    {
                        temparr[i]=null;
                    }
                }
                storeSkipData(temparr)
            }
            navigation.navigate('win')
            setnumber('')
        }
        else
        {
            navigation.navigate('lose')
            storecoinData(String(coin-5))
            setnumber('')
        }
    }

// =============================================
    function type_number(n)
    {
        setnumber(number+n)
    }
    function deletetxt()
    {
        var temp = number;
        setnumber(temp.substring(0,temp.length-1))
    }
// ========================================================================================
    return(
        <View style={style.main}>
            <ImageBackground source={require("./img/gameplaybackground.jpg")} resizeMode="stretch" style={style.main}>

                <View style={style.header}>
                    <Pressable style={style.skipperent} onPress={()=>{skip()}} > 
                        <Image source={require("./img/skip.png")} style={style.skip}></Image>
                    </Pressable>
                    <View style={style.nameboard__}> 
                        <ImageBackground source={require("./img/level_board.png")} style={style.nameboard} resizeMode="stretch" >
                            <Text style={style.leveltxt}>Puzzle {levelno}</Text>
                        </ImageBackground>
                    </View>
                    <Pressable style={style.skipperent} onPress={()=>{hint()}} > 
                        <Image source={require("./img/hint.png")} style={style.skip}></Image>
                    </Pressable>
                </View>

                

                <View style={style.boardperent}>
                    <View style={style.coinperent}>
                        <View style={style.coinp2}>
                            <Text style={style.coins_}>🪙</Text>
                            <Text style={style.coins__}>{coin}</Text>
                        </View>
                    </View>
                    <Image source={imgarr[levelno-1]} style={style.boardimg} resizeMode="stretch" class="img"></Image>
                </View>

                <View style={style.footer}>
                    <View style={style.firstline}>
                        <Text style={style.txtdisplay}>{number}</Text>
                        <Pressable style={style.delete} onPress={()=>{deletetxt()}}>
                            <Image source={require("./img/delete.png")} style={style.deletetxt}></Image>
                        </Pressable>
                        <Pressable style={style.submit} onPress={()=>{chackans()}} >
                            <Text style={style.submittxt}>SUBMIT</Text>
                        </Pressable>
                    </View>
                    <View style={style.secondline}>
                        <Pressable style={style.button} onPress={()=>{type_number(1)}} ><Text style={style.buttontxt}>1</Text></Pressable>
                        <Pressable style={style.button} onPress={()=>{type_number(2)}} ><Text style={style.buttontxt}>2</Text></Pressable>
                        <Pressable style={style.button} onPress={()=>{type_number(3)}} ><Text style={style.buttontxt}>3</Text></Pressable>
                        <Pressable style={style.button} onPress={()=>{type_number(4)}} ><Text style={style.buttontxt}>4</Text></Pressable>
                        <Pressable style={style.button} onPress={()=>{type_number(5)}} ><Text style={style.buttontxt}>5</Text></Pressable>
                        <Pressable style={style.button} onPress={()=>{type_number(6)}} ><Text style={style.buttontxt}>6</Text></Pressable>
                        <Pressable style={style.button} onPress={()=>{type_number(7)}} ><Text style={style.buttontxt}>7</Text></Pressable>
                        <Pressable style={style.button} onPress={()=>{type_number(8)}} ><Text style={style.buttontxt}>8</Text></Pressable>
                        <Pressable style={style.button} onPress={()=>{type_number(9)}} ><Text style={style.buttontxt}>9</Text></Pressable>
                        <Pressable style={style.button} onPress={()=>{type_number(0)}} ><Text style={style.buttontxt}>0</Text></Pressable>
                    </View>
                </View>

            </ImageBackground>
        </View>
    )
}

const style=StyleSheet.create({
    main:{
        height:"100%",
        justifyContent:"space-evenly",
    },
    header:{
        height:"10%",
        flexDirection:"row",
        justifyContent:"space-around",
        // backgroundColor:"black"
    },
    skipperent:{
       height:"65%",
       width:"13%" ,
       alignSelf:"center",
    //    backgroundColor:"white"
    },
    skip:{
        height:"100%",
        width:"100%"
    },
    nameboard__:{
        height:"80%",
        width:"55%",
        alignSelf:"center",
        // backgroundColor:"white",
    },
    nameboard:{
        height:"100%",
        width:"100%",
    },
    leveltxt:{
        height:"100%",
        fontSize:35,
        fontWeight:"900",
        textAlignVertical:"center",
        textAlign:"center",
        color:"black",
    },
    coinperent:{
        height:"10%",
        justifyContent:"center",        
    },
    coinp2:{
        height:"90%",
        width:"30%",
        backgroundColor:"black",
        borderTopLeftRadius:20,
        borderBottomStartRadius:20,
        alignSelf:"flex-end",
        borderWidth:3,
        borderColor:"#bfaa61",
        flexDirection:"row",
    },
    coins_:{
        height:"90%",
        width:"30%",
        color:"white",
        fontSize:23,
        textAlignVertical:"bottom",
        fontWeight:"900",
        alignSelf:"center",
        // backgroundColor:"white"
    },
    coins__:{
        height:"100%",
        width:"70%",
        color:"white",
        fontSize:25,
        textAlignVertical:"center",
        fontWeight:"900",
    },
    boardperent:{
        height:"60%",
        width:"90%",
        alignSelf:"center",
        // backgroundColor:"white"
    },
    boardimg:{
        height:"90%",
        width:"100%"
    },
    footer:{
        height:"15%",
        borderWidth:3,
        borderColor:"white",
        backgroundColor:"black"
    },
    firstline:{
        height:"50%",
        // backgroundColor:"pink",
        flexDirection:"row",
        justifyContent:"space-around"
    },
    txtdisplay:{
        height:"70%",
        width:"60%",
        borderWidth:1,
        alignSelf:"center",
        backgroundColor:"white",
        fontSize:25,
        fontWeight:"900",
        color:"black",
        borderRadius:9,
        textAlignVertical:"center",
        paddingLeft:10,
    },
    delete:{
        height:"91%",
        width:"13%",
        backgroundColor:"red",
        justifyContent:"center",
        alignSelf:"center"
    },
    deletetxt:{
        height:"95%",
        width:"95%",
        alignSelf:"center",
    },
    submit:{
        height:"75%",
        width:"20%",
        alignSelf:"center",
        borderWidth:2,
        borderColor:"green"
    },
    submittxt:{
        height:"100%",
        fontSize:17,
        fontWeight:"700",
        color:"white",
        textAlign:"center",
        textAlignVertical:"center"
    },
    secondline:{
        height:"50%",
        // backgroundColor:"white",
        flexDirection:"row",
        justifyContent:"space-evenly"
    },
    button:{
        height:"90%",
        width:"9%",
        alignSelf:"center",
        borderRadius:10,
        borderWidth:1,
        borderColor:"white"
    },
    buttontxt:{
        height:"100%",
        backgroundColor:"rgba(105,105,105,0.5)",
        fontSize:20,
        textAlign:"center",
        textAlignVertical:"center",
        color:"white",
        borderRadius:10
    }
})