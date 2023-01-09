import { Divider, Space, Flex, Stack, Title, TextInput, Button, Paper, Text, Container, MantineProvider, Group, Table, ScrollArea} from '@mantine/core'
import { IconSearch } from '@tabler/icons'
import { useState } from 'react'

const accountDetails = [
    { billAccount: 90000122379, barangay: 'Lubogan', district: 'Toril', previousStatus: 'Interrupted' },
    { billAccount: 90000122379, barangay: 'Lubogan', district: 'Toril', previousStatus: 'Interrupted' },
    { billAccount: 90000122379, barangay: 'Lubogan', district: 'Toril', previousStatus: 'Interrupted' },
    { billAccount: 90000122379, barangay: 'Lubogan', district: 'Toril', previousStatus: 'Interrupted' },
    { billAccount: 90000122379, barangay:'Lubogan', district: 'Toril', previousStatus: 'Interrupted' },
    { billAccount: 90000122379, barangay: 'Lubogan', district: 'Toril', previousStatus: 'Interrupted' },
    { billAccount: 90000122379, barangay:'Lubogan', district: 'Toril', previousStatus: 'Interrupted' },
    { billAccount: 90000122379, barangay:'Lubogan', district: 'Toril', previousStatus: 'Interrupted' },
    { billAccount: 90000122379, barangay: 'Lubogan', district: 'Toril', previousStatus: 'Interrupted' },
    { billAccount: 90000122379, barangay:'Lubogan', district: 'Toril', previousStatus: 'Interrupted' },
    { billAccount: 90000122379, barangay:'Lubogan', district: 'Toril', previousStatus: 'Interrupted' },
    { billAccount: 90000122379, barangay: 'Lubogan', district: 'Toril', previousStatus: 'Interrupted' },
    { billAccount: 90000122379, barangay:'Lubogan', district: 'Toril', previousStatus: 'Interrupted' },
   
  ];

export default function() {
    const rows = accountDetails.map((element) => (
        <tr key={element.previousStatus}>
        <td>{element.billAccount}</td>
        <td>{element.district}</td>
        <td>{element.barangay}</td>
        <td>{element.previousStatus}</td>
        </tr>
    ));

    return (
        <MantineProvider
            theme={{
                fontFamily: 'Poppins, sans-serif',
                headings: { fontFamily: 'Poppins, sans-serif' }
            }}>
            
            <Container mx={80} py={60} px={0} h="100%">
                <Flex
                    direction='row'
                    gap= 'xl'
                    w='100%'
                    h='100%'
                    >
                    
                    
                    
                    <Stack my="auto" h="100%" spacing={0}>
                        <Title order={2}> Welcome to Aqualert! </Title>
                        <Text fz="sm"> Monitor interruptions all over the city through is your admin dashboard. </Text>
                        <Space h= "xs" />
                        <Group grow >
                            <TextInput
                                placeholder="Search for barangay..."
                                mt= "lg"
                                icon={<IconSearch size={16} />}
                                size="md"
                                
                            />
                            <Button  mt= "xl"  radius="xl" size="md">Print History</Button>
                        </Group>
                        <Space h= "xl" />
                        
                        <ScrollArea style={{ height: 400 }} scrollHideDelay={0}>
                            <Table withBorder verticalSpacing="sm" horizontalSpacing="xl"  mt= "lg">
                            <thead >
                                <tr>
                                <th>Billing Account No.</th>
                                <th>Barangay</th>
                                <th>District</th>
                                <th>Previous Status</th>
                                </tr>
                            </thead>
                            <tbody>{rows}</tbody>
                            </Table>
                        </ScrollArea>
                        

                    </Stack >
                    
                       
                    <Stack pl={30} my="auto" h="100%" spacing={0}>
                        <Paper radius="xs" pl={10} pr={40} py={5} withBorder >
                            <Flex direction="row" gap='sm'  wrap="wrap">
                                <Text fz="md" fw={500}>Selected Barangay: </Text>
                                <Text fz={16} >Lubogan, Toril </Text>
                            </Flex>
                                    
                        </Paper>  

                        <Paper radius="xs" pl={10} pr={40} py={5} withBorder >
                            <Text fz="xl" fw={500}>Report Details </Text>
                            <Divider my="xs" size="sm"/>
                            
                            <Flex direction="row" gap='sm'  wrap="wrap">
                                
                            </Flex>
                                    
                        </Paper>  
                        

                        
                        
                    </Stack>
                

                </Flex>
            </Container>

        </MantineProvider>
        
    )
}