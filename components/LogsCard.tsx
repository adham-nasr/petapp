import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { WeightLog } from '../types';
import { formatDistanceToNow  } from 'date-fns';
import Trend from './Trend';




const LogsCard = ({ data , keyName , logName , columnName }) => {
    console.log(keyName)

    const dateDiff = (date) => {
        
        let d = formatDistanceToNow(new Date(date))
        console.log(d)
        return d
    }

  return (
    <View style={styles.container}>
    
    <Text style={styles.header}>{logName}</Text>
        
      {data.length>0 ? (
        <FlatList data={data} renderItem={ ({item}) => 
                <View style={styles.card}>
                    <View style={styles.cardRow}>
                      <View>
                        <Text style={styles.cardHeader}>{item[keyName]}</Text>
                        <Text style={styles.name}>{dateDiff(item.date)} ago</Text>
                      </View>
                      <View>
                        { 'trend' in item && <Trend trend={item.trend}/>}
                      </View>
                    </View>
                </View>
        }/>
      ) : (
        <Text style={styles.noData}>No logs available</Text>
      )}
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
  }

});

export default LogsCard;