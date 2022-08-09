import { StyleSheet } from "react-native";

export const tableStyle = StyleSheet.create({
    row:{
        flexDirection:'row',
        paddingHorizontal:10,
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:10,
        borderBottomColor:'#d6d6d6',
        borderBottomWidth:1
    },
    rowText:{
        fontWeight:'100',
        textAlign: 'center',
        textAlignVertical: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 5,
        color: '#eee',
        width: '100%',
        height: '100%',
        fontSize: 20,
    },
    header:{
        paddingHorizontal:10,
    }
})