import React from 'react';
import { ActionIcon, Container, Button, Group, Text, Stack, Title, Textarea } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconArrowLeft, IconSend } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';
import { addDoc, collection, doc, documentId, getDoc, query, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function () {
    const navigate = useNavigate()
    const {user} = useAuth()

    const form = useForm({
        initialValues: {
            interruptDate: '',
            complaintMsg: ''
        },
        validate:{
            complaintMsg: (value) => value.length > 1 ? null : 'Cannot leave blank',
        }
    })

    return (
        <Container my="auto" py={50} px={40} h="100%">
            <Stack>
                <Group>
                    <ActionIcon 
                        onClick={() => {
                            navigate('/home')}
                        }
                        color='blue' size={50}>
                        <IconArrowLeft size='xl' />
                    </ActionIcon>
                    <Title color='blue' size={25}>Report Interruption</Title>
                </Group>
                <Text fz='sm'>Thank you for reporting your area. We would like to know more about what happened. Please fill up the form below with the details of your current water situation.</Text>
                <form onSubmit={form.onSubmit(async(values) => {
                    // const billingNo = (await getDoc(doc(db, 'users', user.uid)))?.get('billingNo');
                    await addDoc(collection(db, "reports"), { ...values, user_id: user.rawUser.uid })
                    navigate('/success')
                })}>
                    <Stack py={10}>
                        <DatePicker
                            placeholder='Select date' label='No water since'
                            withAsterisk {...form.getInputProps('interruptDate')}
                            maxDate={new Date()} />
                        <Textarea
                            placeholder='Tell us more about what happened...' label='Complaint details' withAsterisk
                            minRows={10}
                            maxRows={20} {...form.getInputProps('complaintMsg')}/>
                    </Stack>
                    <Stack py={50}>
                        <Button type="submit"
                            variant="gradient" fullWidth radius="xl" size="md">
                                <ActionIcon>
                                    <IconSend color='white'/>
                                </ActionIcon>
                                
                                Submit
                        </Button>
                        <Button 
                            onClick={() => {
                                navigate('/home')}
                            }
                            fullWidth variant="outline" radius="xl" size="md">Cancel
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Container>

    )
}