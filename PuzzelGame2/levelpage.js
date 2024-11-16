import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, ImageBackground, Text, Pressable, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";

export default function Levelpage({navigation})
{
    const [levelno,setlevelno] = useState('');
    const [lastlevel,setlast]=useState(1);
    const [skiparr,setskiparr]=useState([])

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

// =================[StorData_lastlevel]==================
    const storelastData = async (value) => {
        try {
        await AsyncStorage.setItem('Lastlevel', value);
            // navigation.push('level')
        } catch (e) {
        // saving error
        }
    };
    useFocusEffect(
        React.useCallback(()=>{
            if(parseInt(levelno)>parseInt(lastlevel))
            {
                storelastData(String(levelno))
            }
        },[levelno])
    ); 
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

// ================[Getdata_levelnumber]============
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
        getlastData();
    },[])
)
// console.log("level",levelno)
// console.log("last",lastlevel)
// =======================================================================
    const levelarr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    return(
        <View style={style.main}>

            <ImageBackground source={require("./img/home_background.jpg")} style={style.bg_img}>

                <Text style={style.selecttxt}>Select Puzzle</Text>

                <View style={style.perentflex}>

                    {
                        levelarr.map((val,ind) => {
                            return(
                                lastlevel>val?
                                    <Pressable style={style.lavelbutton} onPress={()=>{storeData(String(val))}} >
                                        {
                                            skiparr.includes(val)?
                                                <Text style={style.txt}>{val}</Text>
                                            :
                                                <ImageBackground source={require("./img/tick.png")} style={style.imglavel}>
                                                    <Text style={style.txt}>{val}</Text>
                                                </ImageBackground>
                                        }
                                    </Pressable> 
                                :lastlevel==val?
                                    <Pressable style={style.lavelbutton} onPress={()=>{storeData(String(val))}} >
                                        <Text style={style.txt}>{val}</Text>
                                    </Pressable>
                                :
                                    <Pressable style={style.lavelbutton}>
                                        <Image source={require("./img/lock.png")} style={style.imglavel}></Image>
                                    </Pressable>
                            )
                        })
                    }
                </View>
            </ImageBackground> 
        </View>                    
    )
}
const style=StyleSheet.create({
    main: {
        height: 700,
        width: "100%",
        backgroundColor: "black",
        flexDirection: "column",
    },
    bg_img: {
        height: 700,
        width:"100%",
    },
    selecttxt: {
        height: "6%",
        fontSize: 27,
        fontWeight: "900",
        fontStyle: "italic",
        color: "#bfaa61",
        textAlign: "center",
        textShadowColor: "black",
        textShadowOffset: { width: -3, height: 3 },
        textShadowRadius: 5,
    },
    perentflex: {
        height: "85%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignContent: "space-between"
    },
    lavelbutton: {
        height: "14%",
        width: "21.5%",
        borderWidth: 3,
        borderRadius:20,
    },
    txt: {
        height: "100%",
        fontSize: 50,
        fontWeight: "900",
        color: "black",
        textAlign: "center",
        textAlignVertical: "center",
    },
    imglavel: {
        height: "100%",
        width: "100%",
        // borderWidth:3,
    },
    footer1: {
        height: "10%",
    },
    nextperent1: {
        height: "100%",
        width: "20%",
        alignSelf: "flex-end",
        justifyContent: "center",
    },
    footer0: {
        height: "10%",
    },
    footer: {
        height: "10%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    nextperent: {
        height: "100%",
        width: "20%",
        alignSelf: "flex-end",
        justifyContent: "center",
    },
    backperent: {
        height: "100%",
        width: "20%",
        justifyContent: "center",
    },
    nextimg: {
        height: "60%",
        width: "65%",
        alignSelf: "center",
    },
})