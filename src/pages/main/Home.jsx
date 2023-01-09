import { ActionIcon, Button, Drawer, Flex, Group, Stack, Text } from '@mantine/core';
import { IconBell, IconMap2, IconNotification } from '@tabler/icons';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useCallback, useEffect, useState } from 'react';
import React from 'react';
import { useAuth } from '../../context'
import { useNavigate } from 'react-router-dom';

function StatusIndicator({ data, latLang, close }) {
    const map = useMap();
    const [savedLatLang, setSavedLatLang] = useState(null);

    const navigate = useNavigate()
    const auth = useAuth()

    const onClick = useCallback(() => {
        if (!savedLatLang) return;
        map.panTo([savedLatLang[0], savedLatLang[1]]);
        close();
    }, [map, savedLatLang]);

    useEffect(() => {
        if (!latLang) return;
        const x = map.latLngToContainerPoint(latLang).x;
        const y = map.latLngToContainerPoint(latLang).y + 120
        const point = map.containerPointToLatLng([x, y]);
        map.panTo(point);
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
            opened={!!data.status}
            onClose={close}
            position="bottom"
            zIndex={9999}
            withOverlay={false}
            withCloseButton={false}
            sx={(theme) => ({
                textAlign: 'center'
            })}>
            <Stack align="center" p="xl" spacing="lg">
                <Stack spacing="sm">
                    <Text fz={20} fw="bold">Status: {data.status}</Text>
                    <Text fz="xs">Experiencing problems on your area?</Text>
                </Stack>

                <Stack>
                    <Button 
                        onClick={() => {
                            navigate('/report')}
                        }
                        variant="gradient" radius="xl" fullWidth>Report interruption</Button>
                    <Button radius="xl" variant="outline" fullWidth>Check status history</Button>
                    <Text fz={10} fs="italic">Last updated: 10/17/2022</Text>
                </Stack>
            </Stack>
        </Drawer>
    )
}

export default function () {
    const [locationStatus, setLocationStatus] = useState(null);
    const [latLang, setLatLang] = useState(null);

    return (
        <Stack my="auto" h="100%" spacing={0}>
            <Stack p="md">
                <Group position='apart'>
                    <Group>
                        <ActionIcon size="lg">
                            <IconMap2 size={50} />
                        </ActionIcon>
                        <Flex direction='column'>
                            <Text fz={12} fw={600}>Registered Location</Text>
                            <Text fz={12}>The location goes here</Text>
                        </Flex>
                    </Group>
                    <ActionIcon color='blue' size="lg">
                        <IconBell size={50}/>
                    </ActionIcon>
                </Group>
                <Text fz={10}>Click on the location pin to reveal status</Text>
            </Stack>

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
                    eventHandlers={{
                        click: (e) => {
                            setLatLang([e.latlng.lat, e.latlng.lng]);
                            setLocationStatus('Cleared');
                        }
                    }} />
                <StatusIndicator 
                    latLang={latLang}
                    data={{status: locationStatus}}
                    close={() => {
                        setLocationStatus(null)
                        setLatLang(null);
                    }} />
            </MapContainer>
        </Stack>
    )
}