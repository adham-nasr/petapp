import React, { Children ,PropsWithChildren } from 'react';
import { View, Text, StyleSheet,FlatList } from 'react-native';
import { WeightLog , BodyConditionLog, VetVisitLog ,formData, handlersTypes, inputTypes,logTypes} from '../types';
import Card from '../components/LogsCard';
import { calculateTrend, sortByDate } from '../utils/helpers';
import LogsCard from '../components/LogsCard';

type logsProps =  PropsWithChildren<{
  data: (WeightLog|BodyConditionLog|VetVisitLog)[];
  logType : string;
  keyName : string;
  inputProperties: inputTypes
  handlers: handlersTypes
}>

const Logs = ({ data,logType,keyName,children,inputProperties,handlers }:logsProps) => {

  const logName = `${logType} Log`
  const columnName = `${logType}`
  data = sortByDate(data)
  
  if(logType == 'Weight')
    data = calculateTrend(data)
    
  console.log(data)
  return (
    <View style={styles.container}>
      <View style= {styles.dataView}>
        <Text style={styles.header}>{logName}</Text>
          { data.length>0 ? (
            <FlatList  removeClippedSubviews={false} data={data} renderItem={ ( {item} ) => <LogsCard keyName={keyName} item={item} inputProperties={inputProperties} handlers={handlers}/> }/>
          ) : (
            <Text style={styles.noData}>No logs available</Text>
          )}
        {/* <Card data={data} logName={logName} columnName={columnName} keyName={keyName}/> */}
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