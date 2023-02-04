import { ActionIcon, Button, Drawer, Flex, Group, Modal, Stack, Text } from '@mantine/core';
import { IconBell, IconCrosshair, IconCurrentLocation, IconMap2, IconPower } from '@tabler/icons';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../context'
import { useNavigate } from 'react-router-dom';
import { collection, documentId, getDocs, query, QuerySnapshot, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { STATUS_TYPES } from '../../utils';
import dayjs from 'dayjs';
import { CONSUMER_DATA_COLLECTION, REPORT_COLLECTION, USER_COLLECTION } from '../../collection_constants';

const DEFAULT_ZOOM = 13

function StatusIndicator({ data, latLang, zoom = DEFAULT_ZOOM, close }) {
    const map = useMap();
    const [savedLatLang, setSavedLatLang] = useState(null);

    const navigate = useNavigate()

    const onClick = useCallback(() => {
        if (!savedLatLang) return;
        map.flyTo([savedLatLang[0], savedLatLang[1]], DEFAULT_ZOOM);
        close();
    }, [map, savedLatLang]);

    useEffect(() => {
        if (!latLang) return;
        const x = map.latLngToContainerPoint(latLang).x;
        const y = map.latLngToContainerPoint(latLang).y + (6 * (zoom * 0.003));
        const point = map.containerPointToLatLng([x, y]);
        map.flyTo(point, zoom);
        setSavedLatLang(latLang);
    }, [map, latLang]);

    useEffect(() => {
        map.on('click', onClick);

        return () => {
            map.off('click', onClick);
        }
    }, [map, onClick]);

    return (
        <Drawer
            opened={!!data}
            onClose={close}
            position="bottom"
            zIndex={9999}
            withOverlay={false}
            withCloseButton={false}
            sx={(theme) => ({
                textAlign: 'center'
            })}>
            <Stack>
                <Stack align="center" p="xl" px={50} spacing={10}>
                    {data?.status && <Stack spacing="sm">
                        <Text color='blue' fz={20} fw="bold">Status: {STATUS_TYPES[Math.max((data.status ?? 1) - 1, 0)].label}</Text>
                    </Stack>}

                    <Text fz="xs">Experiencing problems on your area?</Text>
                    <Button 
                        onClick={() => {
                            navigate('/report')}
                        }
                        variant="gradient" radius="xl" fullWidth>Report interruption</Button>
                    <Button 
                    onClick={() => {
                        navigate('/history')}
                    }
                    radius="xl" variant="outline" fullWidth>Check status history</Button>
                </Stack>
                {data?.last_updated && <Text fz={10} fs="italic">Last updated: {dayjs(data?.last_updated.toDate()).format('MM/DD/YYYY h:mm A')}</Text>}
            </Stack>
        </Drawer>
    )
}

export default function () {
    const [latLang, setLatLang] = useState(null);
    const navigate = useNavigate()
    const [opened, setOpened] = useState(false)
    const {user, signout} = useAuth()
    const [reportData, setReports] = useState([]);
    const [report, setReport] = useState(null);
    const [loaded, setLoaded] = useState(false);

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
        return Promise.all([usersSnapshot, consumerSnapshot]);
    }

    async function getReports() {
        try {
            const response = await getDocs(query(collection(db, REPORT_COLLECTION)));
            const [usersResponse, consumersResponse] = await fetchAssociatedData(response);

            // present contain each document that is present in the collection
            const mappedReports = response.docs.map(doc => {
                const user = usersResponse.docs.find(u => u.id === doc.get('user_id'));
                const consumer_data = user ? consumersResponse.docs.find(c => c.id == user.get('billingNo')) : null;
                return {
                    ...consumer_data?.data(),
                    id: doc.id,
                    last_updated: doc.get('last_updated')
                }
            });

            // @ts-ignore
            setReports(mappedReports.filter(r => r.latitude))
        } catch (e) {
            console.error(e);
        } finally {
            setLoaded(true);
        }
    }

    const goToRegisteredLocation = () => {
        setLatLang([
            user.rawMetadata.consumer_data.latitude,
            user.rawMetadata.consumer_data.longitude
        ]);

        const foundReport = reportData.find(r => 
            r.latitude === user.rawMetadata.consumer_data.latitude && 
            r.longitude === user.rawMetadata.consumer_data.longitude) ?? {};

        setReport(foundReport);
    }

    useEffect(() => {
        getReports();
    }, []);

    useEffect(() => {
        console.log(reportData);
    }, [reportData]);

    return (
        <>

        <Modal
            opened={opened}
            zIndex={99999}
            onClose={()=> setOpened(false)}
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
                        setOpened(false)}
                    }
                    radius="xl"
                    variant="outline" color='red'
                    fullWidth>No, take me back
                </Button>
            </Group>
        </Modal>

        <Stack my="auto" h="100%" spacing={0}>
            <Stack p="md">
                <Group position='apart'>
                    <Group>
                        <ActionIcon size="lg" onClick={goToRegisteredLocation}>
                            <IconCurrentLocation size={50} />
                        </ActionIcon>
                        <Flex direction='column'>
                            <Text fz={12} fw={600}>{user.rawMetadata.consumer_data?.street_name}</Text>
                            <Text fz={12}>{user.rawMetadata.barangay?.barangay_name}</Text>
                        </Flex>
                    </Group>
                    <Group>
                        <ActionIcon 
                            onClick={() => {
                                navigate('/notifications')}
                            } 
                            color='blue' size="lg">
                            <IconBell size={50}/>
                        </ActionIcon>
                        <ActionIcon 
                            onClick={() => {
                                setOpened(true)}
                            }
                            color='red' size="lg">
                            <IconPower size={50}/>
                        </ActionIcon>
                    </Group>
                </Group>
                <Group>
                    <Text fz={10}>Click on the location pin to reveal status. Can't find the pin? Click the button beside your address to zoom to your registered location.</Text>
                </Group>
            </Stack>

            {loaded && <MapContainer 
                center={reportData.length != 0 ? [reportData[0].latitude, reportData[0].longitude] : [user.rawMetadata.consumer_data.latitude, user.rawMetadata.consumer_data.longitude]} 
                zoom={DEFAULT_ZOOM} 
                scrollWheelZoom={true} 
                style={{ height: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                <Marker 
                    position={[user.rawMetadata.consumer_data.latitude, user.rawMetadata.consumer_data.longitude]}
                    eventHandlers={{
                        click: (e) => goToRegisteredLocation()
                    }} />
                
                <StatusIndicator 
                    latLang={latLang}
                    zoom={latLang ? 16 : DEFAULT_ZOOM}
                    data={report}
                    close={() => {
                        setLatLang(null);
                        setReport(null);
                    }} />
            </MapContainer>}
        </Stack>
        </>
    )
}