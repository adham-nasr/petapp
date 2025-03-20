import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const CustomButton = ({ title , pressHandler , color='#2196F3' }:{title:string,pressHandler:()=>{},color:string}) => {
  return (
    <View style={styles.buttonView}>
        <Button title={title} onPress={()=>{pressHandler()} } />
    </View>
  );
};

const styles = StyleSheet.create({
    buttonView:{
        width:120,
        height:50,
        marginHorizontal:"auto",
      },
  container: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    flex:1,
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

export default CustomButton;