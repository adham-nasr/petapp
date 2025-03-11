import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TableHeader = ({ headerName,columnName }) => {
  return (
    <>
      <Text style={styles.header}>{columnName}</Text>
      <View style={styles.row}>
        <Text style={styles.columnHeader}>Date</Text>
        <Text style={styles.columnHeader}>{headerName}</Text>
      </View>
    </>
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

export default TableHeader;