// /components/inputs/ButtonStyleSelector.tsx
import React from 'react'
import Image from 'next/image'
import { Stack, Card, Text, Flex } from '@sanity/ui'
import { set, unset } from 'sanity'

const buttonOptions = [
    {
        title: 'Primary',
        value: 'primary',
        image: '/images/buttons/primary-btn.webp', // Update with actual path or use require
    },
    {
        title: 'Primary Transparent',
        value: 'primaryTransparent',
        image: '/images/buttons/primary-transparent.webp', // Update with actual path or use require
    },
    {
        title: 'Primary Without Arrow',
        value: 'primaryWithoutArrow',
        image: '/images/buttons/primay-without-arrow-btn.webp', // Update with actual path or use require
    },
    {
        title: 'Primary Black',
        value: 'primaryBlack',
        image: '/images/buttons/black-btn.webp',
    },
    {
        title: 'Secondary',
        value: 'secondary',
        image: '/images/buttons/secondary-btn.webp',
    },
    {
        title: 'Secondary with Border',
        value: 'secondaryBorder',
        image: '/images/buttons/secondary-border-btn.webp',
    },
    {
        title: 'Secondary with arrow',
        value: 'secondaryArrow',
        image: '/images/buttons/secondary-with-arrow-btn.webp',
    },
    {
        title: 'Secondary Watch Video',
        value: 'secondarywatchvideo',
        image: '/images/buttons/secondary-watch-video.webp',
    },
    {
        title: 'Gradient Button',
        value: 'gradientButton',
        image: '/images/buttons/gradient-color-button.webp',
    }
]

const ButtonStyleSelector = (props) => {
    const { value, onChange } = props

    const handleChange = (val) => {
        onChange(val === value ? unset() : set(val))
    }

    return (
        <Stack space={3}>
            <Flex wrap="wrap" gap={3}>
                {buttonOptions.map((option) => (
                    <Card
                        key={option.value}
                        padding={3}
                        radius={2}
                        shadow={value === option.value ? 2 : 1}
                        tone={value === option.value ? 'primary' : 'default'}
                        style={{ cursor: 'pointer', border: value === option.value ? '2px solid #0074D9' : '1px solid #ccc' }}
                        onClick={() => handleChange(option.value)}
                    >
                        <Flex direction="column" align="center" gap={2}>
                            <Image
                                src={option.image}
                                alt={option.title}
                                width={100}
                                height={60}
                                style={{ objectFit: 'contain' }}
                            />
                            <Text size={1}>{option.title}</Text>
                        </Flex>
                    </Card>
                ))}
            </Flex>
        </Stack>
    )
}

export default ButtonStyleSelector
