import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList,TouchableOpacity } from 'react-native';
import { WeightLog } from '../types';
import { formatDistanceToNow  } from 'date-fns';
import Trend from './Trend';
import Ionicons from '@expo/vector-icons/Ionicons';
import FormModal from './FormModal';



const LogsCard = ( { keyName,item , inputProperties ,handlers } ) => {

  const [modalVisible, setModalVisible] = useState(false);

    console.log(keyName)
    const {patchHandler,deleteHandler} = handlers

    const dateDiff = (date) => {
        
        let d = formatDistanceToNow(new Date(date))
        console.log(d)
        return d
    }
  return (
    <View style={styles.container}>
      <View style={styles.card}>
          <View style={styles.cardRow}>
            <View>
              <View style={styles.valueTrendView}>
                <Text style={styles.cardHeader}>{item[keyName]}</Text>
                <View style={{marginLeft:14}}>
                  { 'trend' in item && <Trend trend={item.trend}/>}
                </View>
              </View>
              <Text >{dateDiff(item.date)} ago</Text>
            </View>
            
            <View style={styles.iconButtons}>
              <TouchableOpacity onPress={()=>{setModalVisible(true)}} style={{marginRight:20}}>
                <Ionicons name="pencil" size={24} />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{deleteHandler(item.id)}}>
                <Ionicons name="trash" size={24} />
              </TouchableOpacity>
            </View>
          </View>
      </View>
      {modalVisible && <FormModal modalVisible={modalVisible} setModalVisible={setModalVisible} inputProperties={inputProperties} actionHandler={patchHandler} item={item} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    flex:1,
  },
  card: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 16,
  },
  noData: {
    textAlign: 'center',
    padding: 10,
    color: 'gray',
  },
  cardHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  iconButtons:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  valueTrendView:{
    flexDirection: 'row',
  }

});

export default LogsCard;