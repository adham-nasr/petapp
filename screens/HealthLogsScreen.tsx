import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,ScrollView,ActivityIndicator, Button} from 'react-native';
import { Pet, BodyConditionLog, WeightLog,VetVisitLog ,formData} from '../types';
import Logs from "../layouts/Logs"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { healthLogService } from '@/services/healthLogService';
import FormModal from '@/components/FormModal';
import { petService } from '../services/petService';

const HealthLogsScreen = () => { 
  
  const [modalVisible, setModalVisible] = useState(false);

  const queryClient = useQueryClient()

  const healthLogQuery = useQuery({
    queryKey: ["healthLog"],
    queryFn : healthLogService.getBodyConditionLogs,
    staleTime : Infinity
  })
  const petQuery = useQuery({
        queryKey: ["pet"],
        queryFn : petService.getPets,
        staleTime : Infinity
      })
  
  const addHealthLog = useMutation({
    mutationFn: healthLogService.createBodyConditionLog,
    onSuccess: (healthLog)=>{ queryClient.setQueryData(["healthLog"],(data:BodyConditionLog[]) =>
      data
        ? [            
            ...data,
            healthLog,
          ]
        : healthLog)}

  })
  const editHealthLog = useMutation({
    mutationFn: healthLogService.updateBodyConditionLog,
    onSuccess: (healthLog)=>{  queryClient.setQueryData(["healthLog"],(data:Partial<BodyConditionLog>[]) =>
      
      data.map((item) => item.id === healthLog.id ? healthLog : item)
    )},
    onError: (error) => {
      throw Error
    }
  })
  const deleteHealthLog = useMutation({
    mutationFn: healthLogService.deleteBodyConditionLog,
    onSuccess: (id)=>{ queryClient.setQueryData(["healthLog"],(data:BodyConditionLog[]) =>
      data.filter((item) => item.id != id)
    )}

  })

  const postHandler = async(data:formData) => 
  {
      const date = (new Date(data.date)).toISOString()
      const response = await addHealthLog.mutate({date:date , body_condition:data.textField , pet_id:petQuery.data![0].id})

  }
  const patchHandler = async (data:formData,id:string) =>
  {
   
    const date = (new Date(data.date)).toISOString()
    const response = await editHealthLog.mutate( { id:id , updates:{ date:date, body_condition:data.textField }}) 

  }
  const deleteHandler = (id:string) =>
  {
      const response =  deleteHealthLog.mutate(id)
  }


  if (healthLogQuery.isLoading) {
    return <Text>NONE</Text>;
  }
  console.log(healthLogQuery.error)
  if (healthLogQuery.isError) {
    return <Text>{JSON.stringify(healthLogQuery.error)}</Text>;
  }
   if(!petQuery.data || !petQuery.data[0])
      return <Text>Pet Data doesn't Exist</Text>

  const inputProperties = {
    rules:{
      required:'health field is required',
      maxLength:{value:30, message:'text should be less than 30 charecters long'},
    },
    label:"Health"
  }
  const handlers = {
    patchHandler:patchHandler,
    deleteHandler:deleteHandler
  }
  
  return(
    <View style={styles.container}>
      <FormModal modalVisible={modalVisible}  setModalVisible={setModalVisible} inputProperties={inputProperties}  actionHandler={postHandler}/>
      <Logs keyName="body_condition" data={healthLogQuery.data!} logType="Health" inputProperties={inputProperties} handlers={handlers}>
        <Button title='Add' onPress={()=>{setModalVisible(true)}} />
      </Logs>
    </View>
) };

const styles = StyleSheet.create({
    container:{
      flex:1,
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
  export default HealthLogsScreen;