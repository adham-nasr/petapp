import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

const Trend = ({ trend}) => {
    
  if (trend > 0)
    return <Ionicons name="trending-up" size={26} color="green" />
  else if(trend < 0)
    return <Ionicons name="trending-down" size={26} color="crimson" />
  else
    return <Ionicons name="remove" size={26} color="black" />
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

export default Trend;