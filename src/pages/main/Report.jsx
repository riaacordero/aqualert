import { ActionIcon, Flex, Group, Text, Stack, Title } from '@mantine/core';
import { IconArrowBack, IconArrowLeft, IconMap2 } from '@tabler/icons';
import { useCallback, useEffect, useState } from 'react';
import React from 'react';

export default function (){

    return(
        <Stack>
            <Group>
                <ActionIcon size={100}>
                    <IconArrowLeft size={50} />
                </ActionIcon>
                <Title color={'04294F'} size={30}>Report Interruption</Title>
            </Group>
            <Text fz='sm'>Thank you for reporting your area. We’d like to know more. Kindly share more about the details of the service interruption in your area.</Text>
            <Stack>

            </Stack>
        </Stack>

    )
}