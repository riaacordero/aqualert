import { MantineProvider, ActionIcon, Container, Flex, Text, Title } from '@mantine/core'
import { useState } from 'react'
import { IconMap2, IconNotification } from '@tabler/icons';

export default function () {
    return (
        <MantineProvider
            theme={{
                fontFamily: 'Poppins, sans-serif',
                headings: { fontFamily: 'Poppins, sans-serif' }
            }}>
            <Container my="auto" size={400} h="100%">
                <Flex direction='row' gap='sm'>
                    <ActionIcon>
                        <IconMap2 size="sm"/>
                    </ActionIcon>
                    <Flex direction='column'>
                        <Text fz={12} fw={600}>Registered Location</Text>
                        <Text fz={12}>The location goes here</Text>
                    </Flex>
                    <ActionIcon>
                        <IconNotification align='flex-end'/>
                    </ActionIcon>
                </Flex>
            </Container>
        </MantineProvider>
    )
}