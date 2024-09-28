import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TamaguiProvider, Theme, YStack, XStack, Text, Button, Input, Checkbox, Avatar } from 'tamagui';
import { config } from '@tamagui/config/v2';
import { GluestackUIProvider, Box, VStack, HStack, Heading, FormControl, Select } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';

// Placeholder data
const placeholderService = {
  id: '1',
  name: 'Home Cleaning',
  description: 'Professional home cleaning service',
  price: 50,
};

const placeholderTaskers = [
  { id: '1', name: 'John Doe', avatar: 'https://example.com/avatar1.jpg' },
  { id: '2', name: 'Jane Smith', avatar: 'https://example.com/avatar2.jpg' },
  { id: '3', name: 'Bob Johnson', avatar: 'https://example.com/avatar3.jpg' },
];

export function ServiceBookingWizard() {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [service] = useState(placeholderService);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [taskers] = useState(placeholderTaskers);
  const [selectedTaskers, setSelectedTaskers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTaskerSelection = (taskerId) => {
    setSelectedTaskers(prev =>
      prev.includes(taskerId) ? prev.filter(id => id !== taskerId) : [...prev, taskerId]
    );
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Booking submitted:', {
        service: service.id,
        location,
        date,
        taskers: selectedTaskers,
        status: 'pending',
      });
      setStep(4); // Move to confirmation step
    } catch (err) {
      setError('Failed to create booking. Please try again.');
      console.error(err);
    }
    setIsLoading(false);
  };

  return (
    <TamaguiProvider config={config}>
      <GluestackUIProvider>
        <Theme name="light">
          <ScrollView>
            <Box p="$4">
              <VStack space="md">
                <Heading size="xl">{`Book ${service.name}`}</Heading>
                <Text>{`Step ${step} of 3`}</Text>

                {step === 1 && (
                  <VStack space="sm">
                    <FormControl>
                      <FormControl.Label>Location</FormControl.Label>
                      <Input
                        value={location}
                        onChangeText={setLocation}
                        placeholder="Enter service location"
                        leftElement={<Ionicons name="location-outline" size={24} color="gray" />}
                      />
                    </FormControl>
                    <Button onPress={() => setStep(2)}>
                      Next
                      <Ionicons name="arrow-forward" size={24} color="white" />
                    </Button>
                  </VStack>
                )}

                {step === 2 && (
                  <VStack space="sm">
                    <FormControl>
                      <FormControl.Label>Date and Time</FormControl.Label>
                      <Input
                        value={date}
                        onChangeText={setDate}
                        placeholder="Select date and time"
                        leftElement={<Ionicons name="calendar-outline" size={24} color="gray" />}
                      />
                    </FormControl>
                    <HStack space="sm" justifyContent="space-between">
                      <Button variant="outline" onPress={() => setStep(1)}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                        Back
                      </Button>
                      <Button onPress={() => setStep(3)}>
                        Next
                        <Ionicons name="arrow-forward" size={24} color="white" />
                      </Button>
                    </HStack>
                  </VStack>
                )}

                {step === 3 && (
                  <VStack space="sm">
                    <Heading size="lg">Select Taskers</Heading>
                    {taskers.map((tasker) => (
                      <HStack key={tasker.id} space="sm" alignItems="center">
                        <Checkbox
                          value={selectedTaskers.includes(tasker.id)}
                          onValueChange={() => handleTaskerSelection(tasker.id)}
                        />
                        <Avatar circular size="md" source={{ uri: tasker.avatar }} />
                        <Text>{tasker.name}</Text>
                      </HStack>
                    ))}
                    <HStack space="sm" justifyContent="space-between">
                      <Button variant="outline" onPress={() => setStep(2)}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                        Back
                      </Button>
                      <Button onPress={handleSubmit} disabled={isLoading}>
                        {isLoading ? 'Booking...' : 'Book Service'}
                      </Button>
                    </HStack>
                  </VStack>
                )}

                {step === 4 && (
                  <VStack space="md" alignItems="center">
                    <Heading size="lg" color="$green500">Booking Confirmed!</Heading>
                    <Text>Your service has been booked successfully.</Text>
                    <Button onPress={() => setStep(1)}>
                      Book Another Service
                    </Button>
                  </VStack>
                )}

                {error && <Text color="$red500">{error}</Text>}
              </VStack>
            </Box>
          </ScrollView>
        </Theme>
      </GluestackUIProvider>
    </TamaguiProvider>
  );
}