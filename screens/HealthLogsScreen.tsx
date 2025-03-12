import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,ScrollView,ActivityIndicator, Button} from 'react-native';
import { Pet, BodyConditionLog, WeightLog,VetVisitLog } from '../types';
import { globalMockPet } from '../utils/const'
import Logs from "../layouts/Logs"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { healthLogService } from '@/services/healthLogService';
import FormModal from '@/components/FormModal';

const HealthLogsScreen = () => { 
  
  const [modalVisible, setModalVisible] = useState(false);

  const queryClient = useQueryClient()

  const healthLogQuery = useQuery({
    queryKey: ["healthLog"],
    queryFn : healthLogService.getBodyConditionLogs,
    staleTime : Infinity
  })
  
  const addHealthLog = useMutation({
    mutationFn: healthLogService.createBodyConditionLog,
    onSuccess: (healthLog)=>{ console.log(healthLog); queryClient.setQueryData(["healthLog"],(data:BodyConditionLog[]) =>
      data
        ? [            
            ...data,
            healthLog,
          ]
        : healthLog)}

  })

  const postHandler = async(data) => 
  {
      const response = await addHealthLog.mutate({date:data.date , body_condition:data.textField , pet_id:"123"})
      console.log('RESPONSE ^VV^V^V^^V^V^V^^V^V^^V^V' )
      console.log(response)
  }
  

  if (healthLogQuery.isLoading) {
    return <Text>NONE</Text>;
  }
  console.log(healthLogQuery.error)
  if (healthLogQuery.isError) {
    return <Text>{JSON.stringify(healthLogQuery.error)}</Text>;
  }

  // const [pet, setPet] = useState<Pet | null>(null);
  // const [loading, setLoading] = useState(true);
  

  // useEffect(() => {
  //     const fetchPet = async () => {
  //       try {
  //         // Simulate network delay
  //         await new Promise(resolve => setTimeout(resolve, 1000));
  //         setPet(globalMockPet);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  
  //     fetchPet();
  //   }, [globalMockPet]);


  // if (loading) {
  //   return <Text>NONE</Text>;
  // }

  const inputProperties = {
    rules:{
      required:'health field is required',
      maxLength:{value:30, message:'text should be less than 30 charecters long'},
    },
    label:"Health"
  }
  
  return(
    <View style={styles.container}>
      <FormModal modalVisible={modalVisible}  setModalVisible={setModalVisible} inputProperties = {inputProperties} postHandler={postHandler}/>
      <Logs keyName="body_condition" data={healthLogQuery.data} logType="Health">
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