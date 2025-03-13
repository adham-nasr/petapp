import React, { useEffect, useState } from 'react';
import { View,Text,StyleSheet, Button} from 'react-native';
import { Pet, VetVisitLog } from '../types';
import Logs from "../layouts/Logs"
import { visitLogService } from '../services/visitLogService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import FormModal from '@/components/FormModal';
import { petService } from '../services/petService';

const VisitLogsScreen = () => { 
  const [modalVisible, setModalVisible] = useState(false);
  

  const queryClient = useQueryClient()

  const visitLogQuery = useQuery({
    queryKey: ["visitLog"],
    queryFn : visitLogService.getVetVisitLogs,
    staleTime : Infinity
  })
  const petQuery = useQuery({
        queryKey: ["pet"],
        queryFn : petService.getPets,
        staleTime : Infinity
      })
  
  const addVisitLog = useMutation({
    mutationFn: visitLogService.createVetVisitLog,
    onSuccess: (visitLog)=>{ queryClient.setQueryData(["visitLog"],(data:VetVisitLog[]) =>
      data
        ? [            
            ...data,
            visitLog,
          ]
        : visitLog)}

  })
    const editVisitLog = useMutation({
      mutationFn: visitLogService.updateVetVisitLog,
      onSuccess: (visitLog)=>{ queryClient.setQueryData(["visitLog"],(data:Partial<VetVisitLog>[]) =>
        
        data.map((item) => item.id === visitLog.id ? visitLog : item)
      )},
      onError: (error) => {
        throw Error
      }
    })
    const deleteVisitLog = useMutation({
      mutationFn: visitLogService.deleteVetVisitLog,
      onSuccess: (id)=>{  queryClient.setQueryData(["visitLog"],(data:VetVisitLog[]) =>
        data.filter((item) => item.id != id)
      )}
  
    })

  const postHandler = async(data) => 
  {
      const date = (new Date(data.date)).toISOString()
      const response = await addVisitLog.mutate({date:date , notes:data.textField , pet_id:petQuery.data[0].id})

  }
  const patchHandler = async (data,id) =>
  {
   
    const date = (new Date(data.date)).toISOString()
    const response = await editVisitLog.mutate( { id:id , updates:{ date:date, notes:data.textField }}) 

  }
  const deleteHandler = (id) =>
  {
      const response =  deleteVisitLog.mutate(id)
  }
  

  if (visitLogQuery.isLoading) {
    return <Text>NONE</Text>;
  }
  console.log(visitLogQuery.error)
  if (visitLogQuery.isError) {
    return <Text>{JSON.stringify(visitLogQuery.error)}</Text>;
  }
   if(!petQuery.data || !petQuery.data[0])
      return <Text>Pet Data doesn't Exist</Text>

  const inputProperties = {
    rules:{
      required:'Notes field is required',
      maxLength:{value:300, message:'text should be less than 300 charecters long'},
    },
    label:"Notes"
  }
  const handlers = {
    patchHandler:patchHandler,
    deleteHandler:deleteHandler
  }
  
  return(
    <View style={styles.container}>
       <FormModal modalVisible={modalVisible}  setModalVisible={setModalVisible} inputProperties={inputProperties}  actionHandler={postHandler}/>
        <Logs keyName="notes" data={visitLogQuery.data} logType="Vet Visit" inputProperties={inputProperties} handlers={handlers}>
        <Button title='Add' onPress={()=>{setModalVisible(true)}} />
      </Logs>
    </View>
  )
};

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
  export default VisitLogsScreen;