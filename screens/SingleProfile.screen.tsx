import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pet, BodyConditionLog, WeightLog } from '../types';
import  WeightLogsScreen  from './WeightLogsScreen'
import { useQuery, useMutation } from '@tanstack/react-query';
import { petService } from "../services/petService"
import { weightLogService } from "../services/weightLogService"
import { visitLogService } from '../services/visitLogService';
import { healthLogService } from '../services/healthLogService';
import { queriesService } from '../services/queriesService';



type RootStackParamList = {
  SingleProfile: { id: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'SingleProfile'>;

// Mock data for development
// const mockPet: Pet = globalMockPet 

function getThisMonthLogs(logs_bodycondition: BodyConditionLog[], logs_weight: WeightLog[]) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const latestBodyConditionLog = logs_bodycondition
    .filter(
      (log) =>
        new Date(log.date).getMonth() === currentMonth &&
        new Date(log.date).getFullYear() === currentYear
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  const latestWeightLog = logs_weight
    .filter(
      (log) =>
        new Date(log.date).getMonth() === currentMonth &&
        new Date(log.date).getFullYear() === currentYear
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  return { latestBodyConditionLog, latestWeightLog };
}

const PetCard = ({ pet }: { pet: Pet }) => (
  <View style={styles.card}>
    <Text style={styles.name}>{pet.name}</Text>
    <Text>Species: {pet.species}</Text>
    <Text>Age: {pet.age} years</Text>
  </View>
);

const LogsTable = ({ 
  weightLogs, 
  bodyConditionLogs 
}: { 
  weightLogs: WeightLog[], 
  bodyConditionLogs: BodyConditionLog[] 
}) => (
  <View style={styles.table}>
    <Text style={styles.tableHeader}>Recent Logs</Text>
    {weightLogs.map((log, index) => (
      <View key={index} style={styles.tableRow}>
        <Text>Weight: {log.weight}kg</Text>
        <Text>Date: {new Date(log.date).toLocaleDateString()}</Text>
      </View>
    ))}
  </View>
);

const HealthStatus = ({ pet }: { pet: Pet }) => (
  <View style={styles.healthStatus}>
    <Text style={styles.tableHeader}>Health Status</Text>
    <Text>Overall Health: {pet?.logs_weight.length > 3 ? 'Good' : 'Needs More Data'}</Text>
    <Text>Last Vet Visit: 2 months ago</Text>
  </View>
);

export const SingleProfileScreen = () => {

  const [thisMonthLogs, setThisMonthLogs] = useState<{
    latestBodyConditionLog: BodyConditionLog | null;
    latestWeightLog: WeightLog | null;
  }>({
    latestBodyConditionLog: null,
    latestWeightLog: null,
  });

  const petQuery = useQuery({
    queryKey: ["pet"],
    queryFn : petService.getPets,
    staleTime : Infinity
  })
  const weightLogQuery = useQuery({
    queryKey: ["weightLog"],
    queryFn : weightLogService.getWeightLogs,
    staleTime : Infinity
  })
  const visitLogQuery = useQuery({
    queryKey: ["visitLog"],
    queryFn : visitLogService.getVetVisitLogs,
    staleTime : Infinity
  })
  const healthLogQuery = useQuery({
    queryKey: ["healthLog"],
    queryFn : healthLogService.getBodyConditionLogs,
    staleTime : Infinity
  })

  const queries = [petQuery , weightLogQuery , visitLogQuery , healthLogQuery]

  useEffect(() => {
    if (pet) {
      setThisMonthLogs(getThisMonthLogs(pet.logs_bodycondition, pet.logs_weight));
    }
  }, [petQuery.data])

  if(queriesService.hasErrors(queries))
  {
      return(
      <View style={styles.container}>
        <Text>Pet not found Eroor</Text>
      </View>
    )
  }
  if(queriesService.isLoading(queries))
      return <ActivityIndicator style={styles.loader} />;

  console.log("PET QUERY DATA")
  console.log(petQuery.data)

  const pet:Pet|null = {...(petQuery.data[0])||null,
    "logs_weight":weightLogQuery.data || [],
    "logs_bodycondition":healthLogQuery.data || [],
    "logs_vet_visits":visitLogQuery.data || []
  }

  if (!pet) {
    return (
      <View style={styles.container}>
        <Text>Pet not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <PetCard pet={pet} />
      
      <View style={styles.monthSummary}>
        <Text style={styles.tableHeader}>This Month's Summary</Text>
        <Text>
          Latest Weight: {thisMonthLogs.latestWeightLog?.weight || 'No data'} kg
        </Text>
        <Text>
          Body Condition: {thisMonthLogs.latestBodyConditionLog?.body_condition || 'No data'}
        </Text>
      </View>

      <HealthStatus pet={pet} />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
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
  monthSummary: {
    padding: 16,
    backgroundColor: '#e6f3ff',
    borderRadius: 8,
    marginBottom: 16,
  },
  healthStatus: {
    padding: 16,
    backgroundColor: '#f0fff0',
    borderRadius: 8,
    marginBottom: 16,
  },
}); 