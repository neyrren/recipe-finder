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
  Container,
  Overlay,
  Center,
} from '@mantine/core';
import {
  IconCooker,
  IconSalt,
  IconSalad,
  IconArrowRight,
  IconChefHat,
  IconStar,
  IconClock,
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
      color: 'blue',
    },
    {
      icon: <IconSalt size={30} />,
      title: t('easyToFollow'),
      description: t('easyToFollowDescription') || 'Step-by-step cooking instructions',
      color: 'green',
    },
    {
      icon: <IconSalad size={30} />,
      title: t('variousCuisines'),
      description: t('variousCuisinesDescription') || 'From local specialties to international dishes',
      color: 'orange',
    },
  ];

  const popularRecipes = [
    { name: 'Pasta', emoji: '🍝', color: 'orange' },
    { name: 'Chicken', emoji: '🍗', color: 'red' },
    { name: 'Pizza', emoji: '🍕', color: 'yellow' },
    { name: 'Cake', emoji: '🍰', color: 'pink' },
    { name: 'Salad', emoji: '🥗', color: 'green' },
    { name: 'Soup', emoji: '🍲', color: 'blue' }
  ];

  const stats = [
    { value: '10,000+', label: 'Recipes' },
    { value: '50+', label: 'Cuisines' },
    { value: '1M+', label: 'Happy Cooks' },
    { value: '95%', label: 'Success Rate' },
  ];

  const handleSearchClick = () => {
    navigate('/recipes');
  };

  const handlePopularRecipeClick = (recipeName) => {
    navigate(`/recipes?search=${encodeURIComponent(recipeName)}`);
  };

  return (
    <Stack spacing={0}>
      {/* Hero Section */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <Image
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=600&fit=crop"
          height={600}
          alt="Delicious Food"
        />
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.65) 100%)"
          opacity={0.85}
        />
        <Container size="lg" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
          <Center>
            <Stack spacing="xl" style={{ textAlign: 'center' }}>
              <Group position="center">
                <ThemeIcon size={60} radius={30} variant="filled" color="white" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)' }}>
                  <IconChefHat size={30} />
                </ThemeIcon>
              </Group>
              <Title order={1} c="white" size={48} weight={800}>
                Cook Like a Professional Chef
              </Title>
              <Text size="xl" c="white" maw={600}>
                Discover thousands of recipes from around the world. Easy-to-follow instructions for every skill level.
              </Text>
              <Group position="center">
                <Button 
                  size="xl" 
                  variant="white" 
                  color="dark"
                  rightSection={<IconArrowRight size={20} />}
                  onClick={handleSearchClick}
                  radius="lg"
                >
                  Start Cooking
                </Button>
                <Button 
                  size="xl" 
                  variant="outline" 
                  color="white"
                  onClick={() => navigate('/recipes?search=random')}
                  radius="lg"
                >
                  Feeling Lucky
                </Button>
              </Group>
            </Stack>
          </Center>
        </Container>
      </div>

      {/* Stats Section */}
      <Paper p="xl" style={{ background: 'linear-gradient(135deg, #228BE6 0%, #15AABF 100%)' }}>
        <Container size="lg">
          <Grid gutter={50}>
            {stats.map((stat, index) => (
              <Grid.Col key={index} span={{ base: 6, md: 3 }}>
                <Stack spacing={0} align="center">
                  <Text size={32} weight={800} c="white">
                    {stat.value}
                  </Text>
                  <Text size="lg" c="white" opacity={0.9}>
                    {stat.label}
                  </Text>
                </Stack>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Paper>

      {/* Features */}
      <Container size="lg" py={80}>
        <Stack spacing={50}>
          <Stack spacing="sm" align="center">
            <Title order={2} style={{ textAlign: 'center' }}>
              Why Choose RecipeMaster?
            </Title>
            <Text size="lg" color="dimmed" style={{ textAlign: 'center' }} maw={600}>
              Everything you need to become a better cook, all in one place
            </Text>
          </Stack>
          
          <Grid gutter="xl">
            {features.map((feature, index) => (
              <Grid.Col key={index} span={{ base: 12, md: 4 }}>
                <Card 
                  shadow="lg" 
                  p="xl" 
                  radius="lg"
                  style={{ 
                    textAlign: 'center',
                    transition: 'transform 0.3s ease',
                    border: '1px solid #e0e0e0',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <ThemeIcon 
                    size={80} 
                    radius={40} 
                    variant="light" 
                    color={feature.color}
                    mb="md"
                  >
                    {feature.icon}
                  </ThemeIcon>
                  <Title order={3} mb="sm">
                    {feature.title}
                  </Title>
                  <Text c="dimmed" size="lg">
                    {feature.description}
                  </Text>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Stack>
      </Container>

      {/* Popular Recipes */}
      <Paper p="xl" style={{ background: '#f8f9fa' }}>
        <Container size="lg">
          <Stack spacing="xl">
            <Stack spacing="sm" align="center">
              <Title order={2}>
                Popular Recipes
              </Title>
              <Text size="lg" color="dimmed" style={{ textAlign: 'center' }}>
                Quick access to our most searched recipes
              </Text>
            </Stack>
            
            <Grid gutter="md">
              {popularRecipes.map((recipe) => (
                <Grid.Col key={recipe.name} span={{ base: 6, sm: 4, md: 2 }}>
                  <Card 
                    shadow="sm" 
                    p="lg" 
                    style={{ 
                      textAlign: 'center', 
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      border: `2px solid var(--mantine-color-${recipe.color}-2)`,
                    }}
                    onClick={() => handlePopularRecipeClick(recipe.name)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.borderColor = `var(--mantine-color-${recipe.color}-6)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.borderColor = `var(--mantine-color-${recipe.color}-2)`;
                    }}
                  >
                    <Text size={32} mb="sm">{recipe.emoji}</Text>
                    <Text fw={600} size="lg">{recipe.name}</Text>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Paper>

      {/* Call to Action */}
      <Container size="lg" py={80}>
        <Paper 
          p={60} 
          radius="lg"
          style={{
            background: 'linear-gradient(135deg, #228BE6 0%, #15AABF 100%)',
            textAlign: 'center',
          }}
        >
          <Stack spacing="xl">
            <Title order={2} c="white">
              Ready to Start Your Culinary Journey?
            </Title>
            <Text size="xl" c="white" opacity={0.9}>
              Join thousands of home cooks discovering new recipes every day
            </Text>
            <Group position="center">
              <Button 
                size="lg" 
                variant="white"
                color="dark"
                onClick={handleSearchClick}
                rightSection={<IconArrowRight size={20} />}
                radius="lg"
              >
                Find Your Next Meal
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Container>
    </Stack>
  );
};

export default WelcomePage;