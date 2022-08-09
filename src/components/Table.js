import React, {useState} from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import images from '../constants/images';
import {tableStyle} from '../styles';
const Table = ({datas}) => {

  const header = () => {
    return (
      <View style={[tableStyle.row, tableStyle.header]}>
        <Text style={[tableStyle.rowText, {width: '15%'}]}>{'KOD'}</Text>
        <Text style={[tableStyle.rowText,{width: '45%'}]}>{'Name'}</Text>
        <Text style={[tableStyle.rowText,{width: '20%'}]}>{'Forex Buying'}</Text>
        <Text style={[tableStyle.rowText,{width: '20%'}]}>{'Forex Selling'}</Text>
      </View>
    );
  };

  const emptyTextRender = value => {
    if (value.length > 0) return value;
    else return '---';
  };

  const render_item = ({item}) => {
    return (
      <View style={tableStyle.row}>
        <Text style={[tableStyle.rowText, {width: '15%'}]}>
          {item.attributes.Kod}
        </Text>
        <Text style={[{width: '45%'}]}>
          {emptyTextRender(item.children[1].value)}
        </Text>
        <Text style={[{width: '20%'}]}>
          {emptyTextRender(item.children[3].value)}
        </Text>
        <Text style={[{width: '20%'}]}>
          {emptyTextRender(item.children[4].value)}
        </Text>
      </View>
    );
  };

  const empty = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={images.empty_folder} />
      </View>
    );
  };

  return (
    <FlatList
      ListHeaderComponent={header}
      data={datas}
      keyExtractor={item => item.attributes.Kod}
      renderItem={render_item}
      ListEmptyComponent={empty}
    />
  );
};

export default Table;
