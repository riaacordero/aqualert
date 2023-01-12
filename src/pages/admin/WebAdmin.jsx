import { Divider, Space, Flex, Stack, Title, TextInput, Button, Paper, Text,  MantineProvider, Group, Table, ScrollArea, Select} from '@mantine/core'
import { IconSearch } from '@tabler/icons'
import { DataTable } from 'mantine-datatable';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';



export default function() {
    const [userData, setUserData] = useState([])

    useEffect(() =>{
        getUserData(),
        console.log(userData)
        },[])


    function getUserData(){
        const getUserDataRef = collection(db, 'reports')
        getDocs(getUserDataRef)
        .then(response =>{
            console.log(response)
            // present contain each document that is present in the collection
            const users = response.docs.map(doc => ({
                data: doc.data(), 
                id:doc.id,
            }))
            setUserData(users)
        })
        .catch(error => console.log(error.message))
    }

    return (
        <MantineProvider
            theme={{
                fontFamily: 'Poppins, sans-serif',
                headings: { fontFamily: 'Poppins, sans-serif' }
            }}>
            
            {/* <Container mx={80} py={60} px={0} h="100%"> */}
            <Group mx={80} py={60} px={0} h="100%">
           
                <Flex
                    direction='row'
                    gap= 'xl'
                    w='100%'
                    h='100%'
                    
                    >
                    
                    <Stack  my="auto" h="100%" spacing={0} >
                        <Title order={2}> Welcome to Aqualert! </Title>
                        <Text fz="sm"> Monitor interruptions all over the city through is your admin dashboard. </Text>
                        <Space h= "xs" />

                        <Group grow >
                            <TextInput
                                placeholder="Search for barangay..."
                                mt= "lg"
                                icon={<IconSearch size={14} />}
                                size= "sm"
                                
                            />
                            <Button  mt= "xl"  radius="xl" size="md" px={50} >Print History</Button>
                        </Group>

                        <Space h= "xl" />
                        
                        <ScrollArea style={{ height: 400 }} scrollHideDelay={0}>
                            <DataTable
                                withBorder
                                borderRadius="sm"
                                withColumnBorders
                                striped
                                highlightOnHover
                                
                                // provide data
                                records= {[
                                    { billAccount: 90000122379, barangay: 'Lubogan', district: 'Toril', previousStatus: 'Interrupted' },
                                    { billAccount: 90000122379, barangay: 'Lubogan', district: 'Toril', previousStatus: 'Interrupted' },
                                    { billAccount: 90000122379, barangay: 'Lubogan', district: 'Toril', previousStatus: 'Good' },
                                    { billAccount: 90000122379, barangay: 'Lubogan', district: 'Toril', previousStatus: 'Good' },
                                    { billAccount: 90000122379, barangay: 'Lubogan', district: 'Toril', previousStatus: 'Good' },
                                    { billAccount: 90000122379, barangay: 'Lubogan', district: 'Toril', previousStatus: 'Good' },
                                    { billAccount: 90000122379, barangay: 'Lubogan', district: 'Toril', previousStatus: 'Good' },
                                    { billAccount: 90000122379, barangay: 'Lubogan', district: 'Toril', previousStatus: 'Good' },
                                    { billAccount: 90000122379, barangay: 'Lubogan', district: 'Toril', previousStatus: 'Good' },
                                    { billAccount: 90000122379, barangay: 'Lubogan', district: 'Toril', previousStatus: 'Good' },
                                    { billAccount: 90000122379, barangay: 'Lubogan', district: 'Toril', previousStatus: 'Good' },
                                    // more records...
                                ]}
                                // define columns
                                columns={[
                                        {
                                            accessor: 'billAccount',
                                            // this column has a custom title
                                            title: 'Billing Account No.',
                                            // right-align column
                                            textAlignment: 'left',
                                        },
                                        { 
                                            accessor: 'barangay' ,
                                            title: 'Barangay'
                                        },
                                        {
                                            accessor: 'district',
                                            title: 'District'
                                        },
                                        {
                                            accessor: 'previousStatus',
                                            title: 'Previous Status',
                                            // this column has custom cell data rendering
                                            render: ({ previousStatus }) => (
                                                <Text weight={700} color={previousStatus === 'Good' ? 'blue' : 'red'}>
                                                {previousStatus.toUpperCase()}
                                                </Text>
                                            ),
                                        }
                                    ]}
                                    // execute this callback when a row is clicked
                                    onRowClick={({ billAccount, previousStatus }) =>
                                    alert(`You clicked on ${billAccount}, ang status mo ay ${previousStatus}`)
                                    }
                            />                
                        </ScrollArea>
                        
                        
                        

                    </Stack >
                    
                       
                    <Stack pl={30} spacing={0} mx={70}>
                        <Paper radius="xs" pl={10} pr={40} py={5} withBorder >
                            <Flex direction="row" gap='sm'  wrap="wrap">
                                <Text fz="md" fw={500}>Selected Barangay: </Text>
                                <Text fz={16} >Lubogan, Toril </Text>
                            </Flex>
                                    
                        </Paper>  

                        <Space h= "xl" />  

                        <MapContainer 
                            center={[7.03285, 125.49727]} 
                            zoom={20} 
                            scrollWheelZoom={false} 
                            style={{ height: '100%' }}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker 
                                position={[7.03285, 125.49727]}

                            />
                            
                        </MapContainer> 
                        
                        <Space h= "xl" />
                        
                        <Paper radius="xs" pl={10} pr={40} py={5} withBorder >
                            <Text fz="xl" fw={500}>Report Details </Text>
                            <Divider my="xs" size="xs" color="dark.7"/>

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
                                        <Text fz="xs" >
                                            {/* 10/22/2022 | 8:12 AM  */}
                                            {/* {userData.map(data => <div>{data.data.complaintMsg}</div>)} */}
                                            {userData.map(data => <div>{((data.data.interruptDate).toString())}</div>)}
                                            </Text>
                                    </Flex>
                                </Flex>
                            
                                <Space h= "xl" />
                                <Text fz="xs" fw={500}>Message: </Text>
                                <Text fz="xs" >
                                    {/* Hello maam/sir... wala nsay 2big diri sa mag brgy LUBOGAN, TORIL, Davao City sukad kagabii. Naay nabangga nga truck unahan saamong kanto, bcg mao toy hinungdan ngano naputol nasd ang supply sa 2big.. unta ma SOLUSYONAN dayon. salamat  */}
                                    {userData.map(data => <div>{data.data.complaintMsg}</div>)}
                                    </Text>
                                
                                
                                
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
            </Group>
            {/* </Container> */}

        </MantineProvider>
        
    )
}