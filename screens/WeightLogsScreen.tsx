import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,ActivityIndicator, Button} from 'react-native';
import { Pet, BodyConditionLog, WeightLog } from '../types';
import { globalMockPet } from '../utils/const'
import Logs from "../layouts/Logs"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { weightLogService } from '../services/weightLogService';
import FormModal from '../components/FormModal';

const WeightLogsScreen = () => { 
  const [modalVisible, setModalVisible] = useState(false);
  

  const queryClient = useQueryClient()

  const weightLogQuery = useQuery({
    queryKey: ["weightLog"],
    queryFn : weightLogService.getWeightLogs,
    staleTime : Infinity
  })
  
  const addWeightLog = useMutation({
    mutationFn: weightLogService.createWeightLog,
    onSuccess: (weightLog)=>{ console.log(weightLog); queryClient.setQueryData(["weightLog"],(data:WeightLog[]) =>
      data
        ? [            
            ...data,
            weightLog,
          ]
        : weightLog)}

  })

  const postHandler = async(data) => 
  {
    const response = await addWeightLog.mutate({date:data.date , weight:data.textField , pet_id:"123"})
    console.log('RESPONSE ^VV^V^V^^V^V^V^^V^V^^V^V' )
    console.log(response)
  }

  if (weightLogQuery.isLoading) {
    return <Text>NONE</Text>;
  }
  console.log(weightLogQuery.error)
  if (weightLogQuery.isError) {
    return <Text>{JSON.stringify(weightLogQuery.error)}</Text>;
  }

  const inputProperties = {
    rules:{
      required:'Weight field is required',
      maxLength:{value:8, message:'weight should less than 1000'},
      pattern: { value: /^\d+(\.\d+)?$/ , message:'weight should be a number'}
    },
    label:"Weight (kg)"
  }
  
  return(
    <View style={styles.container}>
      <FormModal modalVisible={modalVisible}  setModalVisible={setModalVisible} inputProperties={inputProperties}  postHandler={postHandler}/>
      <Logs keyName="weight" data={weightLogQuery.data} logType="Weight">
        <Button title='Add' onPress={()=>{setModalVisible(true)}} />
      </Logs>
    </View>

) };

const styles = StyleSheet.create({
    container:{
      flex:1,
    },
    table: {
      marginTop: 16,
    },
    tableHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
  });
  export default WeightLogsScreen;