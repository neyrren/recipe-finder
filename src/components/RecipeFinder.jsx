import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Grid,
  TextInput,
  Select,
  Button,
  Stack,
  Paper,
  LoadingOverlay,
  Text,
  Group,
  Chip,
  Container,
  Title,
  Affix,
  Transition,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useWindowScroll } from '@mantine/hooks';
import { IconSearch, IconArrowUp, IconChefHat } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import RecipeCard from './RecipeCard';
import { useLanguage } from '../hooks/useLanguage';

const RecipeFinder = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scroll, scrollTo] = useWindowScroll();
  const { t } = useLanguage();

  const form = useForm({
    initialValues: {
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || '',
      area: searchParams.get('area') || '',
    },
  });

  const categories = [
    { value: '', label: t('allCategories') },
    { value: 'Beef', label: '🍖 Beef' },
    { value: 'Chicken', label: '🍗 Chicken' },
    { value: 'Dessert', label: '🍰 Dessert' },
    { value: 'Lamb', label: '🐑 Lamb' },
    { value: 'Miscellaneous', label: '🍽️ Miscellaneous' },
    { value: 'Pasta', label: '🍝 Pasta' },
    { value: 'Pork', label: '🐖 Pork' },
    { value: 'Seafood', label: '🐟 Seafood' },
    { value: 'Vegetarian', label: '🥗 Vegetarian' },
    { value: 'Breakfast', label: '🍳 Breakfast' },
    { value: 'Starter', label: '🥘 Starter' },
  ];

  const areas = [
    { value: '', label: t('allRegions') },
    { value: 'American', label: '🇺🇸 American' },
    { value: 'British', label: '🇬🇧 British' },
    { value: 'Canadian', label: '🇨🇦 Canadian' },
    { value: 'Chinese', label: '🇨🇳 Chinese' },
    { value: 'French', label: '🇫🇷 French' },
    { value: 'Greek', label: '🇬🇷 Greek' },
    { value: 'Indian', label: '🇮🇳 Indian' },
    { value: 'Italian', label: '🇮🇹 Italian' },
    { value: 'Japanese', label: '🇯🇵 Japanese' },
    { value: 'Mexican', label: '🇲🇽 Mexican' },
    { value: 'Spanish', label: '🇪🇸 Spanish' },
    { value: 'Thai', label: '🇹🇭 Thai' },
    { value: 'Vietnamese', label: '🇻🇳 Vietnamese' },
  ];

  const popularRecipes = [
    'Pasta', 'Chicken', 'Pizza', 'Cake', 'Salad', 
    'Soup', 'Rice', 'Fish', 'Beef', 'Dessert'
  ];

  const performSearch = async (values, updateUrl = true) => {
    setLoading(true);

    if (updateUrl) {
      const newParams = new URLSearchParams();
      if (values.search) newParams.set('search', values.search);
      if (values.category) newParams.set('category', values.category);
      if (values.area) newParams.set('area', values.area);
      setSearchParams(newParams);
    }

    try {
      let url = '';
      
      if (values.search) {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${values.search}`;
      } else if (values.category) {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${values.category}`;
      } else if (values.area) {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${values.area}`;
      } else {
        url = 'https://www.themealdb.com/api/json/v1/1/random.php';
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.meals) {
        if (values.category || values.area || !values.search) {
          const detailedMeals = await Promise.all(
            data.meals.slice(0, 20).map(async (meal) => {
              try {
                const detailResponse = await fetch(
                  `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
                );
                const detailData = await detailResponse.json();
                return detailData.meals[0];
              } catch (error) {
                console.error('Error fetching meal details:', error);
                return meal;
              }
            })
          );
          setRecipes(detailedMeals.filter(meal => meal !== null));
        } else {
          setRecipes(data.meals.slice(0, 20));
        }
      } else {
        setRecipes([]);
        notifications.show({
          title: t('noRecipesFound'),
          message: 'Try different search terms',
          color: 'yellow',
          icon: <IconChefHat size={16} />,
        });
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to fetch recipes',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  const searchRecipes = (values) => {
    performSearch(values, true);
  };

  const handlePopularRecipeClick = (recipeName) => {
    form.setFieldValue('search', recipeName);
    performSearch({ search: recipeName, category: '', area: '' }, true);
  };

  const showRandomRecipes = () => {
    form.setValues({ search: '', category: '', area: '' });
    performSearch({ search: '', category: '', area: '' }, true);
  };

  useEffect(() => {
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const area = searchParams.get('area');

    const initialValues = {
      search: search || '',
      category: category || '',
      area: area || '',
    };

    form.setValues(initialValues);

    if (search || category || area) {
      performSearch(initialValues, false);
    } else {
      showRandomRecipes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container size="xl">
      <Stack spacing="xl">
        {/* Header */}
        <Stack spacing="sm" align="center" mb="xl">
          <Title order={1} style={{ 
            background: 'linear-gradient(135deg, #228BE6 0%, #15AABF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center'
          }}>
            Discover Amazing Recipes
          </Title>
          <Text size="lg" color="dimmed" ta="center">
            Find your next favorite meal from thousands of recipes
          </Text>
        </Stack>

        {/* Search Form */}
        <Paper 
          p="xl" 
          shadow="md" 
          radius="lg"
          style={{
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            border: '1px solid #dee2e6'
          }}
        >
          <form onSubmit={form.onSubmit(searchRecipes)}>
            <Grid gutter="md">
              <Grid.Col xs={12} sm={5}>
                <TextInput
                  label="Search Recipes"
                  placeholder="What are you craving today?"
                  icon={<IconSearch size={18} />}
                  size="md"
                  radius="md"
                  {...form.getInputProps('search')}
                />
              </Grid.Col>
              <Grid.Col xs={6} sm={3}>
                <Select
                  label="Category"
                  data={categories}
                  size="md"
                  radius="md"
                  {...form.getInputProps('category')}
                />
              </Grid.Col>
              <Grid.Col xs={6} sm={3}>
                <Select
                  label="Cuisine"
                  data={areas}
                  size="md"
                  radius="md"
                  {...form.getInputProps('area')}
                />
              </Grid.Col>
              <Grid.Col xs={12} sm={1}>
                <Button 
                  type="submit" 
                  loading={loading}
                  size="md"
                  radius="md"
                  style={{ marginTop: '24px' }}
                  fullWidth
                >
                  Search
                </Button>
              </Grid.Col>
            </Grid>
          </form>
        </Paper>

        {/* Popular Recipes Quick Access */}
        <Paper p="xl" radius="lg" withBorder>
          <Text size="xl" weight={700} mb="md">
            🔥 Popular Searches
          </Text>
          <Group spacing="sm">
            {popularRecipes.map((recipe) => (
              <Chip
                key={recipe}
                value={recipe}
                variant="filled"
                color="blue"
                radius="md"
                size="md"
                onClick={() => handlePopularRecipeClick(recipe)}
                style={{ cursor: 'pointer' }}
              >
                {recipe}
              </Chip>
            ))}
          </Group>
        </Paper>

        {/* Results */}
        <div style={{ position: 'relative', minHeight: 400 }}>
          <LoadingOverlay 
            visible={loading} 
            overlayBlur={2}
            loaderProps={{ size: 'lg', color: 'blue' }}
          />
          
          {recipes.length > 0 ? (
            <>
              <Group position="apart" mb="lg">
                <Text size="xl" weight={600}>
                  {recipes.length} Recipes Found
                </Text>
                <Button 
                  variant="light" 
                  onClick={showRandomRecipes}
                  leftIcon={<IconChefHat size={16} />}
                >
                  Show Random
                </Button>
              </Group>
              <Grid gutter="xl">
                {recipes.map((recipe) => (
                  <Grid.Col key={recipe.idMeal} xs={12} sm={6} lg={4}>
                    <RecipeCard recipe={recipe} />
                  </Grid.Col>
                ))}
              </Grid>
            </>
          ) : (
            !loading && (
              <Paper p="xl" style={{ textAlign: 'center' }} radius="lg">
                <IconChefHat size={64} color="#ccc" style={{ margin: '0 auto 20px' }} />
                <Text size="xl" color="dimmed" mb="md">
                  No recipes found matching your criteria
                </Text>
                <Text color="dimmed" mb="xl">
                  Try adjusting your search terms or browse random recipes
                </Text>
                <Button 
                  variant="light" 
                  onClick={showRandomRecipes}
                  size="lg"
                >
                  Show Random Recipes
                </Button>
              </Paper>
            )
          )}
        </div>
      </Stack>

      {/* Scroll to top button */}
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              leftIcon={<IconArrowUp size={16} />}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
              radius="md"
            >
              Scroll to top
            </Button>
          )}
        </Transition>
      </Affix>
    </Container>
  );
};

export default RecipeFinder;