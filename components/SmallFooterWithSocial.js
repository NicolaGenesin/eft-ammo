import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
} from '@chakra-ui/react';
import { FaTwitter, FaTwitch } from 'react-icons/fa';

const SocialButton = ({
    children,
    label,
    href,
    size
}) => {
    return (
        <chakra.button
            bg='white'
            color='black'
            rounded={'full'}
            w={size || 8}
            h={size || 8}
            cursor={'pointer'}
            as={'a'}
            href={href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
        >
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};

const SmallFooterWithSocial = () => {
    return (
        <Box
            color='white'>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}>
                <Text>© {new Date().getFullYear()} NoFoodAfterMidnight - All rights reserved</Text>
                <Stack direction={'row'} spacing={6}>
                    <SocialButton label={'Twitter'} href={'https://twitter.com/food_eft'}>
                        <FaTwitter />
                    </SocialButton>
                    <SocialButton label={'Twitch'} href={'https://www.twitch.tv/nofoodaftermidnight/'}>
                        <FaTwitch />
                    </SocialButton>
                </Stack>
            </Container>
        </Box>
    );
}

export {
    SocialButton,
    SmallFooterWithSocial
}
