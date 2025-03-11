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
import { globalMockPet } from '../const';
import { useQuery, useMutation } from '@tanstack/react-query';
import { petService } from "../services/petService"
import { weightLogService } from "../services/weightLogService"



type RootStackParamList = {
  SingleProfile: { id: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'SingleProfile'>;

// Mock data for development
const mockPet: Pet = globalMockPet 

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

export const SingleProfileScreen = ({ route }) => {
  console.log(route)
  // const { id } = !route?.params?.id ? route.params : 0;
  const id = 0 // FIX WITH ORIGINAL   const { id } = route.params
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [thisMonthLogs, setThisMonthLogs] = useState<{
    latestBodyConditionLog: BodyConditionLog | null;
    latestWeightLog: WeightLog | null;
  }>({
    latestBodyConditionLog: null,
    latestWeightLog: null,
  });

  // const PetQuery = useQuery({
  //   queryKey: ["pet"],
  //   queryFn : petService.getPets,
  //   staleTime : Infinity
  // })



  useEffect(() => {
    const fetchPet = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPet(mockPet);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  useEffect(() => {
    if (pet) {
      setThisMonthLogs(getThisMonthLogs(pet.logs_bodycondition, pet.logs_weight));
    }
  }, [pet]);

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
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
      
      {/* <WeightLogsScreen 
        weightLogs={pet.logs_weight} 
        bodyConditionLogs={pet.logs_bodycondition} 
      /> */}
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