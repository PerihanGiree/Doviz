import React from 'react'
import { Text, View } from 'react-native'

import { ActivityIndicator, MD2Colors } from 'react-native-paper';
const Loading = () => {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size={"small"} animating={true} />
        <Text style={{color:'black'}}>Loading...</Text>
    </View>
  )
}

export default Loading