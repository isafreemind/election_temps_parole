import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import { HiChartBar } from 'react-icons/hi';
import { MdHowToVote } from 'react-icons/md';

export const Header = () => {
  return (
    <Box
      as="header"
      bgGradient="linear(to-br, #667eea, #764ba2)"
      color="white"
      p={{ base: 6, sm: 8, lg: 12 }}
      textAlign="center"
      boxShadow="lg"
    >
      <Heading
        size={{ base: 'xl', sm: '2xl', lg: '3xl' }}
        mb={{ base: 3, sm: 4 }}
        fontWeight="bold"
        textShadow="0 2px 4px rgba(0,0,0,0.1)"
      >
        <Flex align="center" justify="center" gap={{ base: 3, sm: 4 }} flexWrap="wrap">
          <Box as={HiChartBar} fontSize={{ base: '40px', sm: '48px', lg: '60px' }} />
          <span>Analyse Temps de Parole vs Votes</span>
        </Flex>
      </Heading>
      <Text
        fontSize={{ base: 'md', sm: 'lg', lg: 'xl' }}
        opacity={0.95}
        maxW="4xl"
        mx="auto"
        px={4}
      >
        <Flex align="center" justify="center" gap={2} flexWrap="wrap">
          <Box as={MdHowToVote} fontSize={{ base: '20px', sm: '24px' }} />
          <span>Présidentielles 2017 & 2022 - Comparaison médias / résultats électoraux</span>
        </Flex>
      </Text>
    </Box>
  );
};
