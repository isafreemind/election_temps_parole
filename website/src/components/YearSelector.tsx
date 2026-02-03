import { Box, Button as ChakraButton } from '@chakra-ui/react';
import { MdHowToVote, MdAnalytics } from 'react-icons/md';
import { IoGitCompare } from 'react-icons/io5';

interface YearSelectorProps {
  selectedYear: '2017' | '2022' | 'compare' | 'analysis';
  onYearChange: (year: '2017' | '2022' | 'compare' | 'analysis') => void;
}

export const YearSelector = ({ selectedYear, onYearChange }: YearSelectorProps) => {
  const Button = ({ year, icon, label, mobileLabel }: { 
    year: '2017' | '2022' | 'compare' | 'analysis'; 
    icon: React.ReactNode; 
    label: string;
    mobileLabel?: string;
  }) => {
    const isActive = selectedYear === year;
    
    return (
      <ChakraButton
        onClick={() => onYearChange(year)}
        px={{ base: 4, sm: 8 }}
        py={{ base: 3, sm: 4 }}
        mx={{ base: 1, sm: 2 }}
        fontSize={{ base: 'md', sm: 'lg' }}
        fontWeight="bold"
        borderRadius="lg"
        transition="all 0.3s ease-in-out"
        bgGradient={isActive ? "linear(to-br, #667eea, #764ba2)" : undefined}
        bg={!isActive ? "gray.100" : undefined}
        color={isActive ? "white" : "gray.800"}
        boxShadow={isActive ? "lg" : "md"}
        transform={isActive ? "translateY(-2px)" : undefined}
        _hover={{
          boxShadow: "lg"
        }}
      >
        {icon}
        <Box display={{ base: 'none', sm: 'inline' }}>
          {label}
        </Box>
        <Box display={{ base: 'inline', sm: 'none' }}>
          {mobileLabel || label}
        </Box>
      </ChakraButton>
    );
  };

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      p={{ base: 4, sm: 8 }}
      bg="white"
      borderRadius="xl"
      my={{ base: 4, sm: 8 }}
      mx="auto"
      maxW="4xl"
      boxShadow="md"
      gap={2}
    >
      <Button year="2017" icon={<MdHowToVote size={20} />} label="2017" />
      <Button year="2022" icon={<MdHowToVote size={20} />} label="2022" />
      <Button year="compare" icon={<IoGitCompare size={20} />} label="Comparaison" mobileLabel="Comp." />
      <Button year="analysis" icon={<MdAnalytics size={20} />} label="Analyse" />
    </Box>
  );
};

