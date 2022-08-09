import React, {useEffect, useState} from 'react';
import {StatusBar, TextInput, View} from 'react-native';
import XMLParser from 'react-xml-parser';
import Loading from '../components/Loading';
import Table from '../components/Table';
import {homeStyle} from '../styles';

import SortedButtonsGroup from '../components/SortedButtonsGroup';
const url = 'https://www.tcmb.gov.tr/kurlar/today.xml';

const Home = () => {
  const [datas, setDatas] = useState([]); //ana data , üzerinde değişiklik yaplımamalı
  const [filteredDatas, setFilteredDatas] = useState([]); // filteleme işlemlerim olduğu için ekstra bir state tutuyorum
  //çünkü ana state im üzerinde filtre ve değiştirme yaparsam eski haline dönmek için tekrar apiye istek atmam gerekir.
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBtn,setActiveBtn] = useState(""); // active filter button

  useEffect(() => {
    //her değişen search alanım için ana datayı filtreliyorum.
    if (searchQuery) {
      const filtered = datas.filter(data =>
        data.attributes.Kod.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredDatas(filtered);
    } else {
      setFilteredDatas(datas);
    }
  }, [searchQuery]);

  useEffect(() => {
    const getDatas = async () => {
      setLoading(true);
      let request = new XMLHttpRequest();
      request.onreadystatechange = event => {
        if (request.status == 200 && request.readyState === 4) {
          let xml = new XMLParser().parseFromString(request.responseText);
          setDatas(xml.getElementsByTagName('Currency'));
        } else {
          console.log('sıkıntı var', request.status, request.readyState);
        }
      };

      request.open('GET', url);
      request.send();
    };
    getDatas();
  }, []);

  useEffect(() => {
    if (datas.length > 0) {
      setLoading(false);
      setFilteredDatas(datas);
    }
  }, [datas]);
  
  const onChangeSearch = query => setSearchQuery(query);

  const onPress = (prop) =>{
    setLoading(true);
    switch(prop.type){
        case "asc":
            const sorted = filteredDatas.sort((a,b)=> a.children[3].value - b.children[3].value);
            setFilteredDatas(sorted);
            setActiveBtn("asc");
            break;
        case "desc":
            const desc = filteredDatas.sort((a,b)=> b.children[3].value - a.children[3].value);
            setFilteredDatas(desc);
            setActiveBtn("desc");
            break;
        case "kod":
            const sortkod = filteredDatas.sort((a,b)=>{
                if(a.attributes.Kod < b.attributes.Kod)
                    return -1;
                if(a.attributes.Kod > b.attributes.Kod)
                    return 1;
                return 0;
            });
            setFilteredDatas(sortkod);
            setActiveBtn("kod");
            
            break;
    }
    setLoading(false);
  }

  if (loading) return <Loading />;

  return (
    <View style={homeStyle.screenContainer}>
      <StatusBar backgroundColor={'#000'} />
      <View style={{flex: 1}}>
        <TextInput
          style={homeStyle.input}
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <Table datas={filteredDatas} />
        <View style={{marginTop: 10}}>
          <SortedButtonsGroup active={activeBtn} onPress={onPress} />
        </View>
      </View>
    </View>
  );
};

export default Home;
