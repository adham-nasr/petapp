import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,ActivityIndicator, Button} from 'react-native';
import { Pet, BodyConditionLog, WeightLog } from '../types';
import Logs from "../layouts/Logs"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { weightLogService } from '../services/weightLogService';
import { petService } from '../services/petService';
import FormModal from '../components/FormModal';

const WeightLogsScreen = () => { 
  const [modalVisible, setModalVisible] = useState(false);
  

  const queryClient = useQueryClient()

  const weightLogQuery = useQuery({
    queryKey: ["weightLog"],
    queryFn : weightLogService.getWeightLogs,
    staleTime : Infinity
  })
  const petQuery = useQuery({
      queryKey: ["pet"],
      queryFn : petService.getPets,
      staleTime : Infinity
    })

  if (weightLogQuery.isLoading) {
    return <Text>NONE</Text>;
  }
  console.log(weightLogQuery.error)
  if (weightLogQuery.isError) {
    return <Text>{JSON.stringify(weightLogQuery.error)}</Text>;
  }

  if(!petQuery.data || !petQuery.data[0])
    return <Text>Pet Data doesn't Exist</Text>
  
  const addWeightLog = useMutation({
    mutationFn: weightLogService.createWeightLog,
    onSuccess: (weightLog)=>{ queryClient.setQueryData(["weightLog"],(data:WeightLog[]) =>
      data
        ? [            
            ...data,
            weightLog,
          ]
        : weightLog)}

  })
  const editWeightLog = useMutation({
    mutationFn: weightLogService.updateWeightLog,
    onSuccess: (weightLog)=>{ queryClient.setQueryData(["weightLog"],(data:Partial<WeightLog>[]) =>
      
      data.map((item) => item.id === weightLog.id ? weightLog : item)
    )},
    onError: (error) => {
      throw Error
    }
  })
  const deleteWeightLog = useMutation({
    mutationFn: weightLogService.deleteWeightLog,
    onSuccess: (id)=>{ queryClient.setQueryData(["weightLog"],(data:WeightLog[]) =>
      data.filter((item) => item.id != id)
    )}

  })

  const postHandler = async(data) => 
  {
    const date = (new Date(data.date)).toISOString()
    const response = await addWeightLog.mutate({date:date, weight:data.textField , pet_id:petQuery.data[0].id})

  }
  const patchHandler = async (data,id) =>
  {
   
    const date = (new Date(data.date)).toISOString()
    const response = await editWeightLog.mutate( { id:id , updates:{ date:date, weight:data.textField }}) 

  }
  const deleteHandler = (id) =>
  {
      const response =  deleteWeightLog.mutate(id)
  }

  const inputProperties = {
    rules:{
      required:'Weight field is required',
      maxLength:{value:8, message:'weight should less than 1000'},
      pattern: { value: /^\d+(\.\d+)?$/ , message:'weight should be a number'}
    },
    label:"Weight (kg)"
  }
  const handlers = {
    patchHandler:patchHandler,
    deleteHandler:deleteHandler
  }
  
  return(
    <View style={styles.container}>
      <FormModal modalVisible={modalVisible}  setModalVisible={setModalVisible} inputProperties={inputProperties}  actionHandler={postHandler}/>
      <Logs keyName="weight" data={weightLogQuery.data} logType="Weight" inputProperties={inputProperties} handlers={handlers}>
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