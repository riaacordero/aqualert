import { Divider, Space, Flex, Stack, Title, TextInput, Button, Paper, Text, Container, MantineProvider, Group, Table, ScrollArea, Select} from '@mantine/core'
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
                        <Group position="apart" >
                            <TextInput
                                placeholder="Search for barangay..."
                                mt= "lg"
                                icon={<IconSearch size={16} />}
                                size="md"
                                
                            />
                            <Button  mt= "xl"  radius="xl" size="md" px={50} >Print History</Button>
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

                        <Space h= "xl" />   

                        <Paper radius="xs" pl={10} pr={40} py={5} withBorder >
                            <Text fz="xl" fw={500}>Report Details </Text>
                            <Divider my="xs" size="sm"/>

                            <Stack spacing={0}>
                               
                                <Flex direction= 'row' gap= "sm">
                                    <Flex direction="column">
                                        <Text fz="xs" fw={500}>Complainant: </Text>
                                        <Text fz="xs" fw={500}>Billing Account No.: </Text>
                                        <Text fz="xs" fw={500}>Report Date: </Text>
                                    </Flex>
                                    <Flex direction="column">
                                        <Text fz="xs" >John C. Doe </Text>
                                        <Text fz="xs" >0012000345 </Text>
                                        <Text fz="xs" >10/22/2022 | 8:12 AM </Text>
                                    </Flex>
                                </Flex>
                            
                                <Space h= "xl" />
                                <Text fz="xs" fw={500}>Message: </Text>
                                <Text fz="xs" >Hello maam/sir... wala nsay 2big diri sa mag brgy LUBOGAN, TORIL, Davao City sukad kagabii. Naay nabangga nga truck unahan saamong kanto, bcg mao toy hinungdan ngano naputol nasd ang supply sa 2big.. unta ma SOLUSYONAN dayon. salamat </Text>
                                
                                
                                
                            </Stack>
                            
                        </Paper>  
                        
                        <Space h= "xl" />

                        <Group position='apart'>
                            <Select
                                label="Set Status: "
                                placeholder="Pick one"
                                data={[
                                    { value: 'interrupted', label: 'Interrupted' },
                                    { value: 'ongoingRepair', label: 'Ongoing Repair' },
                                    { value: 'scheduledInterruption', label: 'Scheduled Interruption' },
                                    { value: 'interruptionReported', label: 'Interruption Reported' },
                                    { value: 'good', label: 'Good' }
                                ]}
                            />
                            <Button  mt= "xl"  radius="xl" size="md" px={60}>Send</Button>

                        </Group>
                        
                        
                        
                    </Stack>
                

                </Flex>
            </Container>

        </MantineProvider>
        
    )
}