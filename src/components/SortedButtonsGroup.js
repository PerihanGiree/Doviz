import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import { butonStyle } from '../styles/butonstyle';
const SortedButtonsGroup = ({active,onPress}) => {

    //active , onPress 
    //sıralama yapılacak fonksiyonların aktifliğinin ve press işlemlerinin tek state ler üzerinde tutulması
    return (
    <View style={{flexDirection:'row',paddingVertical:10, alignItems: 'center', justifyContent: 'space-around'}}>
      <Button style={butonStyle.buttonContainer} uppercase={false} onPress={()=>onPress({type:"asc"})} mode={`${active==="asc" ? "contained" :"outlined"}`}>Asc Price</Button>
      <Button style={butonStyle.buttonContainer}uppercase={false} onPress={()=>onPress({type:"desc"})} mode={`${active==="desc" ? "contained" :"outlined"}`}>Desc Price</Button>
      <Button style={butonStyle.buttonContainer} uppercase={false} onPress={()=>onPress({type:"kod"})} mode={`${active==="kod" ? "contained" :"outlined"}`}>A-Z By Kod</Button>
    </View>
  );
};

export default SortedButtonsGroup;
