import { Divider, Space, Flex, Stack, Title, Modal, Button, Paper, Text, Image, Group, ActionIcon, ScrollArea, Select, Container } from '@mantine/core'
import { IconSearch, IconPower } from '@tabler/icons'
import { DataTable } from 'mantine-datatable';
import { showNotification } from '@mantine/notifications';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../context'
import { addDoc, collection, doc, documentId, getDocs, query, QuerySnapshot, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase';
import dayjs from 'dayjs';
import { STATUS_TYPES } from '../../utils';
import { useForm } from '@mantine/form';
import { BARANGAY_COLLECTION, CONSUMER_DATA_COLLECTION, USER_COLLECTION } from '../../collection_constants';

function Panner({ coords }) {
    const map = useMap();
    const defaultCenter = useRef(null);

    useEffect(() => {
        defaultCenter.current = map.getCenter();
    }, []);

    useEffect(() => {
        map.setView(coords ?? defaultCenter.current);
    }, [coords]);

    return null;
}

export default function () {
    const [reports, setReports] = useState([]);
    const [reportId, setCurrentReportId] = useState(null);
    const [report, setReport] = useState(null);
    const [opened, setOpened] = useState(false);
    const { user, signout } = useAuth();
    const form = useForm({
        initialValues: {
            status: STATUS_TYPES[0].value
        }
    });

    useEffect(() => {
        getReports();
    }, [])

    useEffect(() => {
        console.log(reports);
    }, [reports]);

    useEffect(() => {
        setReport(reports.find(r => r.id === reportId));
    }, [reportId]);

    useEffect(() => {
        form.setValues({
            status: STATUS_TYPES[Math.max((report?.consumer_data?.status ?? 1) - 1, 0)].value
        });
    }, [report]);

    /**
     * 
     * @param {QuerySnapshot<import('firebase/firestore').DocumentData>} snapshot 
     */
    function fetchBarangayData(snapshot) {
        const barangayIds = [...new Set(snapshot.docs.map(doc => doc.get('barangay_id')).filter(Boolean))];
        return getDocs(query(
            collection(db, BARANGAY_COLLECTION),
            where(documentId(), 'in', barangayIds)
        ))
    }

    /**
     * 
     * @param {QuerySnapshot<import('firebase/firestore').DocumentData>} snapshot 
     */
    function fetchConsumerData(snapshot) {
        const billingNos = [...new Set(snapshot.docs.map(doc => doc.get('billingNo')).filter(Boolean))];

        return getDocs(query(
            collection(db, CONSUMER_DATA_COLLECTION),
            where(documentId(), 'in', billingNos)
        ))
    }

    /**
     * 
     * @param {QuerySnapshot<import('firebase/firestore').DocumentData>} snapshot 
     */
    function fetchUserData(snapshot) {
        const userIds = [...new Set(snapshot.docs.map(doc => doc.get('user_id')).filter(Boolean))];
        return getDocs(query(
            collection(db, USER_COLLECTION),
            where(documentId(), 'in', userIds)
        ))
    }

    /**
     * 
     * @param {QuerySnapshot<import('firebase/firestore').DocumentData>} snapshot 
     */
    async function fetchAssociatedData(snapshot) {
        const usersSnapshot = await fetchUserData(snapshot);
        const consumerSnapshot = await fetchConsumerData(usersSnapshot);
        const barangaySnapshot = fetchBarangayData(consumerSnapshot);
        return Promise.all([usersSnapshot, consumerSnapshot, barangaySnapshot]);
    }

    function getReports() {
        getDocs(collection(db, 'reports'))
            .then(response => {
                return Promise.all([
                    fetchAssociatedData(response),
                    response
                ])
            })
            .then(([[usersResponse, consumersResponse, barangayResponse], response]) => {
                // present contain each document that is present in the collection
                const mappedReports = response.docs.map(doc => {
                    const user = usersResponse.docs.find(u => u.id === doc.get('user_id'));
                    const consumer_data = user ? consumersResponse.docs.find(c => c.id == user.get('billingNo')) : null;
                    const barangay = consumer_data ? barangayResponse.docs.find(b => b.id == consumer_data.get('barangay_id')) : null;

                    return {
                        ...doc.data(),
                        id: doc.id,
                        user: user?.data(),
                        consumer_data: consumer_data ? {
                            ...consumer_data.data(),
                            barangay: barangay?.data()
                        } : null
                    }
                });

                setReports(mappedReports)
            })
            .catch(console.error)
    }

    async function changeStatus(report, newStatus) {
        await updateDoc(doc(db, 'consumer_data', report?.user.billingNo), { status: newStatus });
        await updateDoc(doc(db, 'reports', report?.id), { last_updated: new Date() });
        showNotification({
            color: 'green',
            title: 'Status set successfully!',
            message: "The new status should reflect on the table and the complainant's app."
        })
        // TODO: add notifications collection 
        // await addDoc(collection(db, 'notifications'), {
        //     user_id: report?.user_id,

        // });

        getReports();
    }

    return (
        <Container py={60}>
            <Group h="100%" align={"stretch"}>
                <Stack sx={{ flex: 1 }} h="100%" spacing={0} >
                    <Stack>
                        <Group>
                            <Image
                                width= {40}
                                sx={{ alignSelf: 'center' }}
                                src= "./assets/aqualert-logo.png"
                                alt= "icon for dp" 
                            />
                            <Title order={2}> Welcome to Aqualert! </Title>
                        </Group>
                        <Text fz="sm">Monitor interruptions all over the city through your admin dashboard. Select a complaint and review its details and map location.</Text>  
                    </Stack>

                    {/* TODO: Search bar and print history implementation.
                    
                    <Group grow >
                        <TextInput
                            placeholder="Search for barangay..."
                            mt= "lg"
                            icon={<IconSearch size={14} />}
                            size= "sm"
                            
                        />
                        <Button  mt= "xl"  radius="xl" size="md" px={50} >Print History</Button>
                    </Group> */}

                    <Modal
                        opened={opened}
                        zIndex={99999}
                        onClose={() => setOpened(false)}
                        title="Are you sure you want to logout?">
                        <Group>
                            <Button
                                onClick={() => {
                                    signout();
                                }}
                                radius="xl"
                                color='red'
                                fullWidth>Yes, log me out
                            </Button>
                            <Button
                                onClick={() => {
                                    setOpened(false)
                                }
                                }
                                radius="xl"
                                variant="outline" color='red'
                                fullWidth>No, take me back
                            </Button>
                        </Group>
                    </Modal>

                    <Space h="xl" />
                    <ScrollArea style={{height: 700}}>
                        
                        <DataTable
                            withBorder
                            borderRadius="sm"
                            withColumnBorders
                            striped
                            highlightOnHover

                            records={reports.map(r => ({
                                id: r.id,
                                billAccount: r.user?.billingNo ?? 'Unknown',
                                barangay: r.consumer_data?.barangay?.barangay_name ?? 'Unknown',
                                street_name: r.consumer_data?.street_name ?? 'Unknown',
                                previousStatus: STATUS_TYPES[Math.max((r.consumer_data?.status ?? 1) - 1, 0)].label
                            }))}
                            // define columns
                            columns={[
                                {
                                    accessor: 'billAccount',
                                    title: 'Billing Account No.',
                                    textAlignment: 'left',
                                },
                                {
                                    accessor: 'barangay',
                                    title: 'Barangay'
                                },
                                {
                                    accessor: 'street_name',
                                    title: 'Street Name'
                                },
                                {
                                    accessor: 'previousStatus',
                                    title: 'Previous Status',
                                    // this column has custom cell data rendering
                                    render: ({ previousStatus }) => (
                                        <Text weight={700} color={STATUS_TYPES.find(s => s.label === previousStatus).color}>
                                            {previousStatus.toUpperCase()}
                                        </Text>
                                    ),
                                }
                            ]}
                            // execute this callback when a row is clicked
                            onRowClick={({ id }) =>
                                setCurrentReportId(id)
                            }
                        />
                    </ScrollArea>
                </Stack>
                <Stack sx={{ flex: 1, flexGrow: 1 }} h="100%">
                    <Flex direction='row' gap='sm'>
                        <Paper w={380} radius="xs" pl={10} pr={10} py={5} mb="xl" withBorder >
                            <Flex direction="row" gap='sm' wrap="wrap">
                                <Text fz="md" fw={500}>Selected Barangay: </Text>
                                <Text fz={16} >{report?.consumer_data?.barangay?.barangay_name}</Text>
                            </Flex>
                        </Paper>
                        <ActionIcon 
                            onClick={() => {
                                setOpened(true)}
                            }
                            color='red' size="lg">
                            <IconPower size={50}/>
                        </ActionIcon>
                    </Flex>

                    <MapContainer
                        center={[7.03285, 125.49727]}
                        zoom={20}
                        scrollWheelZoom={false}
                        style={{ height: '400px' }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Panner
                            coords={report?.consumer_data ?
                                [report?.consumer_data?.latitude, report?.consumer_data?.longitude] : null} />

                        {report?.consumer_data &&
                            <Marker position={[report?.consumer_data.latitude, report?.consumer_data.longitude]} />}
                    </MapContainer>

                    <Paper radius="xs" pl={10} pr={40} py={5} withBorder >
                        <Text fz="xl" fw={500}>Report Details </Text>
                        <Divider my="xs" size="xs" color="dark.7" />

                        <Stack spacing={0}>
                            <Flex direction='row' gap="sm">
                                <Flex direction="column">
                                    <Text fz="xs" fw={500}>Complainant: </Text>
                                    <Text fz="xs" fw={500}>Billing Account No.: </Text>
                                    <Text fz="xs" fw={500}>Report Date: </Text>
                                </Flex>
                                <Flex direction="column">
                                    <Text fz="xs">{report?.user?.firstName} {report?.user?.middleName} {report?.user?.lastName}</Text>
                                    <Text fz="xs">{report?.user?.billingNo}</Text>
                                    <Text fz="xs">
                                        {dayjs(report?.interruptDate?.toDate()).format('MM/DD/YYYY | h:mm A')}
                                    </Text>
                                </Flex>
                            </Flex>

                            <Space h="xl" />
                            <Text fz="xs" fw={500}>Message: </Text>
                            <Text fz="xs" >
                                {report?.complaintMsg}
                            </Text>
                        </Stack>
                    </Paper>
                    <Space/>
                    <form onSubmit={form.onSubmit(({ status }) => {
                        if (!report || !report?.consumer_data || !report?.user) return;
                        const newStatus = STATUS_TYPES.findIndex(s => s.value === status) ?? report?.consumer_data?.status - 1 ?? 0;
                        changeStatus(report, newStatus + 1);
                    })}>
                        <Stack>
                            <Select
                                label="Select New Status: "
                                placeholder="Pick one"
                                data={STATUS_TYPES}
                                {...form.getInputProps('status')}
                            />
                            <Button type="submit" radius="xl" size="lg">Set Status</Button>
                        </Stack>
                    </form>
                </Stack>
            </Group>
        </Container>
    )
}