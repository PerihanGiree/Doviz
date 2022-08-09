import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Alert,
  Text,
  Dimensions,
  StatusBar
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
const {width} = Dimensions.get('window');
const levelDatas = [
  'Yüksek Fiyattan Düşük Fiyata',
  'Düşük Fiyattan Yüksek Fiyata',
  'Döviz Koduna Göre',
];

const alisfiyati=new Map();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
  }
  
  componentDidMount() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = e => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        //http OK mesajı
        let XMLParser = require('react-xml-parser');
        let xml = new XMLParser().parseFromString(request.responseText); // text'i xml,json tarzına çeviriyor
        this.setState({data: xml.getElementsByTagName('Currency')}); //currency taglarını çekiyorum
      } else {
        Alert.alert('Uyarı', 'İnternet Bağlantınızı Kontrol ediniz.');
      }
    };

    request.open('GET', 'https://www.tcmb.gov.tr/kurlar/today.xml', true);
    request.send();
  }

  //İtem 'i props gectik
  render_item({item}) {
   /* alisfiyati.push(item)
    console.log(item.attributes.Kod)
    console.log(item.children[1].value)
    console.log(item.children[3].value)
   console.log(alisfiyati.size())*/
    
    return (
      <View style={styles.column_view_style}>
        <View style={{flex: 1}}>
          <Text style={styles.row_text_style}>{item.attributes.Kod}</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.row_text_style}>{item.children[1].value}</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.row_text_style}>{item.children[3].value}</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.row_text_style}>{item.children[4].value}</Text>
        </View>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.dropdownsRow}>
          <View style={styles.divider} />
          <SelectDropdown
            data={levelDatas}
            onSelect={selectedItem => {
              setLevel(selectedItem);
            }}
            defaultButtonText="Filtrele"
            buttonTextAfterSelection={selectedItem => {
              return selectedItem;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />
          <View style={styles.divider} />
        </View>

        <View style={styles.column_view_style}>
          <View style={{flex: 1}}>
            <Text style={styles.column_text_style}>{'Kod'}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.column_text_style}>{'İsim'}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.column_text_style}>{'Alış'}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.column_text_style}>{'Satış'}</Text>
          </View>
        </View>

        <View style={{flex: 9}}>
          <FlatList
            data={this.state.data}
            extraData={this.state}
            renderItem={this.render_item}
            keyExtractor={item => item.attributes.Kod}>
            
            </FlatList>
           
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  column_view_style: {
    flex: 1,
    margin: 5,
    backgroundColor: '#ccc',
    borderRadius: 5,
    flexDirection: 'row',
  },
  column_text_style: {
    textAlign: 'center',
    textAlignVertical: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    color: 'red',
    width: '100%',
    height: '100%',
    fontSize: 20,
  },
  row_text_style: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'black',
    width: '100%',
    height: '100%',
  },
  dropdownsRow: {
    flexDirection: 'column',
    borderRadius: 10,
    alignItems: 'center',

    width: '100%',
    paddingHorizontal: '5%',
  },
  ropdown1BtnTxtStyle: {color: '#444', textAlign: 'center', width: '100%'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'center', fontSize: 14},
  dropdown1BtnStyle: {
    flex: 1,
    height: 150,
    width: width - 40,
    backgroundColor: '#eee',
    borderRadius: 8,
    borderWidth: 20,
    color: 'white',
    borderColor: '#444',
  },
});
