import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SingleProfileScreen } from './screens/SingleProfile.screen';
import TabNavigator from "./navigation/TabNavigator";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


export default function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <TabNavigator />
    </QueryClientProvider>
  );
} 