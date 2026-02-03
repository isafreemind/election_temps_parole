import React from 'react';
import { Box, Heading, Flex } from '@chakra-ui/react';

interface ChartCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const ChartCard = ({ title, icon, children }: ChartCardProps) => {
  return (
    <Box
      bg="white"
      p={{ base: 2, sm: 4, lg: 6 }}
      borderRadius={{ base: 'lg', sm: 'xl' }}
      boxShadow="lg"
      h="full"
      minW={0}
      overflow="hidden"
    >
      <Heading
        as="h3"
        color="#667eea"
        mb={{ base: 2, sm: 3, lg: 4 }}
        fontSize={{ base: 'xs', sm: 'sm', lg: 'lg' }}
        borderBottom="2px solid"
        borderColor="#667eea"
        pb={{ base: 1, sm: 2 }}
      >
        <Flex align="center" gap={{ base: 1, sm: 2 }}>
          {icon && (
            <Box
              fontSize={{ base: 'md', sm: 'lg', lg: 'xl' }}
              display="flex"
              alignItems="center"
              flexShrink={0}
            >
              {icon}
            </Box>
          )}
          <Box
            as="span"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            fontSize={{ base: 'xs', sm: 'sm', lg: 'base' }}
          >
            {title}
          </Box>
        </Flex>
      </Heading>
      <Box w="full">
        {children}
      </Box>
    </Box>
  );
};
