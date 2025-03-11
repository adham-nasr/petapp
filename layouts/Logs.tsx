import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WeightLog } from '../types';
import Table from '../components/Table';

const Logs = ({ data,logType,keyName }) => {

    const logName = `${logType} Log`
    const columnName = `${logType}`

    // data = [...data  , ...data , ...data , ...data , ...data , ...data, ...data, ...data, ...data, ...data, ...data , ...data, ...data, ...data, ...data, ...data]


  return (
    <Table data={data} logName={logName} columnName={columnName} keyName={keyName} />
  )
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

export default Logs;