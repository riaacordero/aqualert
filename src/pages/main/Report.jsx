import React from 'react';
import { ActionIcon, Container, Button, Group, Text, Stack, Title, Textarea } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconArrowLeft, IconSend } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';

export default function () {
    const navigate = useNavigate()
    const auth = useAuth()
    const form = useForm({
        initialValues: {
            interruptDate: '',
            complaintMsg: ''
        }
    })

    return (
        <Container my="auto" py={50} px={40} h="100%">
            <Stack>
                <Group>
                    <ActionIcon 
                        onClick={() => {
                            navigate('/')}
                        }
                        color='blue' size={50}>
                        <IconArrowLeft size='xl' />
                    </ActionIcon>
                    <Title color='blue' size={25}>Report Interruption</Title>
                </Group>
                <Text fz='sm'>Thank you for reporting your area. We would like to know more about what happened. Please fill up the form below with the details of your current water situation.</Text>
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <Stack py={10}>
                        <DatePicker
                            placeholder='Select date' label='No water since'
                            withAsterisk />
                        <Textarea
                            placeholder='Tell us more about what happened...' label='Complaint details' withAsterisk
                            minRows={10}
                            maxRows={20} />
                    </Stack>
                    <Stack py={50}>
                        <Button type="submit"
                            onClick={() => {
                                navigate('/success')}
                            }
                            variant="gradient" fullWidth radius="xl" size="md">
                                <ActionIcon>
                                    <IconSend color='white'/>
                                </ActionIcon>Submit
                        </Button>
                        <Button 
                            onClick={() => {
                                navigate('/')}
                            }
                            fullWidth variant="outline" radius="xl" size="md">Cancel
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Container>

    )
}