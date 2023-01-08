import { ActionIcon, Container, Flex, Text, Title } from '@mantine/core'
import { IconMap2 } from '@tabler/icons';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'

export default function () {
    return (
        <Container my="auto" size={400} h="100%">
            <Flex direction='row' gap='sm'>
                <ActionIcon size="sm">
                    <IconMap2 />
                </ActionIcon>
                <Flex direction='column'>
                    <Text fz={12} fw={600}>Registered Location</Text>
                    <Text fz={12}>The location goes here</Text>
                </Flex>
            </Flex>

            <MapContainer center={[7.0900, 125.6134]} zoom={13} scrollWheelZoom={false} style={{ height: '100vh' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </Container>
    )
}