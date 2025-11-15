import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Grid,
  Card,
  Image,
  ThemeIcon,
} from '@mantine/core';
import {
  IconCooker,
  IconSalt,
  IconSalad,
  IconArrowRight,
} from '@tabler/icons-react';
import { useLanguage } from '../hooks/useLanguage';

const WelcomePage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const features = [
    {
      icon: <IconCooker size={30} />,
      title: t('thousandsRecipes'),
      description: t('thousandsRecipesDescription') || 'Discover dishes from around the world',
    },
    {
      icon: <IconSalt size={30} />,
      title: t('easyToFollow'),
      description: t('easyToFollowDescription') || 'Step-by-step cooking instructions',
    },
    {
      icon: <IconSalad size={30} />,
      title: t('variousCuisines'),
      description: t('variousCuisinesDescription') || 'From local specialties to international dishes',
    },
  ];

  const popularRecipes = [
    'Pasta',
    'Chicken',
    'Pizza',
    'Cake',
    'Salad',
    'Soup'
  ];

  const handleSearchClick = () => {
    navigate('/recipes');
  };

  const handlePopularRecipeClick = (recipeName) => {
    navigate(`/recipes?search=${encodeURIComponent(recipeName)}`);
  };

  return (
    <Stack spacing="xl">
      {/* Hero Section */}
      <Paper
        p="xl"
        style={{
          background: 'linear-gradient(135deg, #228BE6 0%, #15AABF 100%)',
        }}
      >
        <Grid gutter={50} align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Title order={1} c="white" mb="md">
              {t('welcomeTitle')}
            </Title>
            <Text size="lg" c="white" mb="xl">
              {t('welcomeSubtitle')}
            </Text>
            <Group>
              <Button 
                size="lg" 
                variant="white" 
                color="blue"
                rightSection={<IconArrowRight size={16} />}
                onClick={handleSearchClick}
              >
                {t('exploreRecipes')}
              </Button>
            </Group>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image
              src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&auto=format&fit=crop"
              alt="Delicious Food"
              radius="md"
            />
          </Grid.Col>
        </Grid>
      </Paper>

      {/* Features */}
      <Grid gutter="xl">
        {features.map((feature) => (
          <Grid.Col key={feature.title} span={{ base: 12, md: 4 }}>
            <Card shadow="sm" p="lg" style={{ textAlign: 'center' }}>
              <ThemeIcon size={60} radius={30} variant="light" color="blue" mb="md">
                {feature.icon}
              </ThemeIcon>
              <Title order={3} mb="sm">
                {feature.title}
              </Title>
              <Text c="dimmed">{feature.description}</Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      {/* Popular Recipes */}
      <Paper p="xl" withBorder>
        <Title order={2} mb="lg" ta="center">
          {t('popularRecipes')}
        </Title>
        <Grid gutter="md">
          {popularRecipes.map((recipe) => (
            <Grid.Col key={recipe} span={{ base: 12, sm: 6, md: 4, lg: 2 }}>
              <Card 
                shadow="sm" 
                p="md" 
                style={{ textAlign: 'center', cursor: 'pointer' }}
                onClick={() => handlePopularRecipeClick(recipe)}
                withBorder
              >
                <Text fw={600}>{recipe}</Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Paper>

      {/* Call to Action */}
      <Paper p="xl" style={{ textAlign: 'center' }} withBorder>
        <Title order={2} mb="md">
          {t('readyToCook')}
        </Title>
        <Text size="lg" c="dimmed" mb="xl">
          {t('joinCommunity')}
        </Text>
        <Button 
          size="lg" 
          onClick={handleSearchClick}
          rightSection={<IconArrowRight size={16} />}
        >
          {t('findNextMeal')}
        </Button>
      </Paper>
    </Stack>
  );
};

export default WelcomePage;