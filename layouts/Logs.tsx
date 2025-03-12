import React, { Children } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WeightLog } from '../types';
import Table from '../components/Table';

const Logs = ({ data,logType,keyName,children }) => {

    const logName = `${logType} Log`
    const columnName = `${logType}`

  return (
    <View style={styles.container}>
      <View style= {styles.dataView}>
        <Table data={data} logName={logName} columnName={columnName} keyName={keyName} />
      </View>
      <View style={styles.buttonView}>
        {children}
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    flex:1,
  },
  dataView:{
    flex:10,
    marginBottom:30,
  },
  buttonView:{
    flex:1,
    width:100,
    height:50,
    marginHorizontal:"auto",
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

export default Logs;