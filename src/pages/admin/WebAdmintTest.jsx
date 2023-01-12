import { Divider, Space, Flex, Stack, Title, TextInput, Button, Paper, Text, Container, MantineProvider, Group, Table, ScrollArea, Select} from '@mantine/core'
import { IconSearch } from '@tabler/icons'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default function() {

    const [users, setUsers] = useState([]) //hold the list of users collection
    const usersCollectionRef = collection(db, "users") //we need to import the collection

    //function called for a page to render
    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            console.log(data);

            setUsers(data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            })))
        };
        getUsers();
    }, []);
    
   
    //diri kay para mabutang didto sa table
    const rows = users.map((user) => (
        <tr key={user.id}>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        
        {/* <td>{element.barangay}</td>
        <td>{element.previousStatus}</td> */}
        </tr>
    ));

   

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
                                {/* <th>Previous Status</th> */}
                                </tr>
                            </thead>
                            <tbody>{rows}</tbody>
                            </Table>
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
            </Group>
            {/* </Container> */}

        </MantineProvider>
        
    )
}