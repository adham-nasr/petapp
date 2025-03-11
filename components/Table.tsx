import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { WeightLog } from '../types';

const Table = ({ data , keyName , logName , columnName }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{logName}</Text>
      <View style={styles.row}>
        <Text style={styles.columnHeader}>Date</Text>
        <Text style={styles.columnHeader}>{columnName}</Text>
      </View>
      {data.length>0 ? (
        <FlatList data={data} renderItem={ ({item}) => 
                <View  style={styles.row}>
                    <Text style={styles.cell}>{new Date(item.date).toLocaleDateString()}</Text>
                    <Text style={styles.cell}>{item[keyName]}</Text>
                </View>
        }/>
        // data.map((log, index) => (
        //   <View key={index} style={styles.row}>
        //     <Text style={styles.cell}>{new Date(log.date).toLocaleDateString()}</Text>
        //     <Text style={styles.cell}>{log[keyName]}</Text>
        //   </View>
        // ))
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
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  columnHeader: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  noData: {
    textAlign: 'center',
    padding: 10,
    color: 'gray',
  },
});

export default Table;