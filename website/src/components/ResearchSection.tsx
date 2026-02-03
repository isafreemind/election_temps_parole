import { Box, Heading, SimpleGrid, Flex, Text, Link } from '@chakra-ui/react';
import { GiNewspaper } from 'react-icons/gi';
import { FaFlask, FaTv, FaFlagCheckered, FaEye, FaGlobe, FaBook } from 'react-icons/fa';

export const ResearchSection = () => {
  const stats = [
    { icon: <GiNewspaper />, value: '50%', label: 'du temps médiatique' },
    { icon: <FaFlask />, value: '6', label: 'études citées' },
    { icon: <FaTv />, value: '100%', label: 'des journaux TV' },
    { icon: <FaFlagCheckered />, value: '2', label: 'présidentielles' }
  ];

  const keyFigures = [
    { icon: <FaEye />, value: '15-20%', label: 'Seuil de viabilité perçue', description: 'de couverture médiatique nécessaire' },
    { icon: <FaBook />, value: '> 30%', label: 'Corrélation forte', description: 'visibilité = succès électoral (r > 0.7)' },
    { icon: <FaGlobe />, value: '< 10%', label: 'Seuil critique', description: 'difficulté à dépasser 5% des voix' },
    { icon: <FaFlask />, value: '+40%', label: 'Impact agenda-setting', description: 'de notoriété avec 20% de visibilité' }
  ];

  const studies = [
    {
      icon: <GiNewspaper />,
      title: "McCombs & Shaw (1972) - Agenda-Setting Theory",
      description: "Étude fondatrice montrant que les médias ne nous disent pas quoi penser, mais à quoi penser. Les candidats bénéficiant de plus de 15% de couverture médiatique voient leur notoriété augmenter significativement.",
      link: "https://scholar.google.com/scholar?q=mccombs+shaw+1972+agenda+setting"
    },
    {
      icon: <FaFlask />,
      title: "Iyengar & Simon (2000) - News Coverage and Electoral Outcomes",
      description: "Démontre un seuil critique de visibilité médiatique autour de 20% pour influencer significativement les intentions de vote.",
      link: "https://scholar.google.com/scholar?q=iyengar+simon+2000+news+coverage+electoral"
    },
    {
      icon: <FaTv />,
      title: "CSA - Observatoire du temps de parole",
      description: "Depuis 2017, le CSA mesure le 'temps d'antenne' (présence directe) et le 'temps de parole' (mentions). Seuil d'équité fixé à environ 15% pour les candidats majeurs.",
      link: "https://www.csa.fr"
    },
    {
      icon: <FaFlagCheckered />,
      title: "Gerstlé (2016) - Communication politique",
      description: "Analyse française montrant qu'en dessous de 10% de visibilité médiatique, un candidat peine à franchir le seuil de 5% des voix.",
      link: "https://scholar.google.com/scholar?q=gerstle+2016+communication+politique"
    },
    {
      icon: <FaEye />,
      title: "Balmas & Sheafer (2013) - Visibility Threshold",
      description: "Identification d'un seuil de visibilité à 15-20% nécessaire pour qu'un candidat soit perçu comme 'viable' par les électeurs.",
      link: "https://scholar.google.com/scholar?q=balmas+sheafer+2013+candidate+viability"
    },
    {
      icon: <FaGlobe />,
      title: "Hopmann et al. (2012) - Media Visibility and Electoral Success",
      description: "Étude européenne montrant une corrélation forte (r > 0.7) entre visibilité médiatique et résultats électoraux au-dessus de 30% de couverture.",
      link: "https://scholar.google.com/scholar?q=hopmann+2012+media+visibility+electoral"
    }
  ];

  return (
    <Box
      bgGradient="linear(to-br, gray.700, gray.800)"
      p={{ base: 6, sm: 8, lg: 12 }}
      mt={{ base: 8, sm: 12 }}
      borderRadius="2xl"
    >
      <Heading
        as="h2"
        color="white"
        fontSize={{ base: '2xl', sm: '3xl' }}
        mb={{ base: 6, sm: 8 }}
      >
        <Flex align="center" gap={{ base: 3, sm: 4 }}>
          <Box as={FaBook} fontSize={{ base: '3xl', sm: '4xl' }} />
          <span>Contexte Scientifique</span>
        </Flex>
      </Heading>
      
      <SimpleGrid columns={{ base: 2, lg: 4 }} gap={{ base: 3, sm: 4, lg: 6 }} mb={{ base: 8, sm: 12 }}>
        {stats.map((stat, idx) => (
          <Box
            key={idx}
            bg="gray.800"
            borderRadius="xl"
            p={{ base: 4, sm: 6 }}
            textAlign="center"
          >
            <Flex direction="column" align="center" gap={2}>
              <Box fontSize={{ base: '4xl', sm: '5xl' }} color="#667eea">
                {stat.icon}
              </Box>
              <Text fontSize={{ base: '2xl', sm: '3xl' }} fontWeight="bold" color="#667eea">
                {stat.value}
              </Text>
              <Text fontSize={{ base: 'xs', sm: 'sm' }} color="gray.300">
                {stat.label}
              </Text>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>

      <Heading
        as="h3"
        color="white"
        fontSize={{ base: 'xl', sm: '2xl' }}
        mt={{ base: 8, sm: 12 }}
        mb={{ base: 4, sm: 6 }}
      >
        <Flex align="center" gap={{ base: 2, sm: 3 }}>
          <Box as={FaBook} fontSize={{ base: '2xl', sm: '3xl' }} />
          <span>Chiffres clés de la recherche</span>
        </Flex>
      </Heading>

      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={{ base: 4, sm: 6 }} mb={{ base: 8, sm: 12 }}>
        {keyFigures.map((figure, idx) => (
          <Box
            key={idx}
            bg="white"
            borderRadius="xl"
            p={{ base: 4, sm: 6 }}
            boxShadow="lg"
            textAlign="center"
          >
            <Flex direction="column" align="center" gap={3}>
              <Box fontSize={{ base: '4xl', sm: '5xl' }} color="#667eea">
                {figure.icon}
              </Box>
              <Text fontSize={{ base: '3xl', sm: '4xl' }} fontWeight="bold" color="purple.600">
                {figure.value}
              </Text>
              <Text fontSize={{ base: 'md', sm: 'lg' }} fontWeight="bold" color="gray.800">
                {figure.label}
              </Text>
              <Text fontSize={{ base: 'xs', sm: 'sm' }} color="gray.600">
                {figure.description}
              </Text>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>

      <Heading
        as="h3"
        color="white"
        fontSize={{ base: 'xl', sm: '2xl' }}
        mb={{ base: 4, sm: 6 }}
      >
        <Flex align="center" gap={{ base: 2, sm: 3 }}>
          <Box as={GiNewspaper} fontSize={{ base: '2xl', sm: '3xl' }} />
          <span>Études académiques</span>
        </Flex>
      </Heading>

      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: 4, sm: 6 }}>
        {studies.map((study, idx) => (
          <Link
            key={idx}
            href={study.link}
            target="_blank"
            rel="noopener noreferrer"
            _hover={{ textDecoration: 'none' }}
          >
            <Box
              bg="white"
              p={{ base: 4, sm: 6 }}
              borderRadius="xl"
              boxShadow="lg"
              transition="all 0.2s"
              h="full"
              minH={{ base: '180px', sm: '200px' }}
              display="flex"
              _hover={{
                transform: 'translateY(-4px)',
                boxShadow: 'xl'
              }}
            >
              <Flex gap={{ base: 3, sm: 4 }}>
                <Box
                  fontSize={{ base: '3xl', sm: '4xl' }}
                  flexShrink={0}
                  pt={1}
                  color="#667eea"
                >
                  {study.icon}
                </Box>
                <Box flex={1} minW={0}>
                  <Heading
                    as="h4"
                    color="#667eea"
                    mb={2}
                    fontSize={{ base: 'md', sm: 'lg' }}
                    fontWeight="bold"
                  >
                    {study.title}
                  </Heading>
                  <Text
                    color="gray.600"
                    fontSize={{ base: 'sm', sm: 'md' }}
                    lineHeight="relaxed"
                  >
                    {study.description}
                  </Text>
                </Box>
              </Flex>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
};
