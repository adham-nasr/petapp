import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,ScrollView,ActivityIndicator, Button} from 'react-native';
import { Pet, BodyConditionLog, WeightLog,VetVisitLog } from '../types';
import { globalMockPet } from '../utils/const'
import Logs from "../layouts/Logs"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { healthLogService } from '@/services/healthLogService';

const HealthLogsScreen = () => { 

  const queryClient = useQueryClient()

  const healthLogQuery = useQuery({
    queryKey: ["healthLog"],
    queryFn : healthLogService.getBodyConditionLogs,
    staleTime : Infinity
  })
  
  const addVisitLog = useMutation({
    mutationFn: healthLogService.createBodyConditionLog,
    onSuccess: (healthLog)=>{ console.log(healthLog); queryClient.setQueryData(["healthLog"],(data:BodyConditionLog[]) =>
      data
        ? [            
            ...data,
            healthLog,
          ]
        : healthLog)}

  })

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
  
  return(
    <View>
      <Logs keyName="body_condition" data={healthLogQuery.data} logType="Health"/>
      <Button title="asd" onPress={()=>{  addVisitLog.mutate({date:"2024-01-25T10:00:00Z",body_condition:"2",pet_id:"21"})}} />
    </View>
) };

const styles = StyleSheet.create({
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
  export default HealthLogsScreen;