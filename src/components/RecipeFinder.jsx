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
  ChipGroup,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconSearch } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import RecipeCard from './RecipeCard';
import { useLanguage } from '../hooks/useLanguage';

const RecipeFinder = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
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
    { value: 'Beef', label: 'Beef' },
    { value: 'Chicken', label: 'Chicken' },
    { value: 'Dessert', label: 'Dessert' },
    { value: 'Lamb', label: 'Lamb' },
    { value: 'Miscellaneous', label: 'Miscellaneous' },
    { value: 'Pasta', label: 'Pasta' },
    { value: 'Pork', label: 'Pork' },
    { value: 'Seafood', label: 'Seafood' },
    { value: 'Vegetarian', label: 'Vegetarian' },
    { value: 'Breakfast', label: 'Breakfast' },
    { value: 'Starter', label: 'Starter' },
  ];

  const areas = [
    { value: '', label: t('allRegions') },
    { value: 'American', label: 'American' },
    { value: 'British', label: 'British' },
    { value: 'Canadian', label: 'Canadian' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Dutch', label: 'Dutch' },
    { value: 'Egyptian', label: 'Egyptian' },
    { value: 'French', label: 'French' },
    { value: 'Greek', label: 'Greek' },
    { value: 'Indian', label: 'Indian' },
    { value: 'Irish', label: 'Irish' },
    { value: 'Italian', label: 'Italian' },
    { value: 'Jamaican', label: 'Jamaican' },
    { value: 'Japanese', label: 'Japanese' },
    { value: 'Kenyan', label: 'Kenyan' },
    { value: 'Malaysian', label: 'Malaysian' },
    { value: 'Mexican', label: 'Mexican' },
    { value: 'Moroccan', label: 'Moroccan' },
    { value: 'Polish', label: 'Polish' },
    { value: 'Portuguese', label: 'Portuguese' },
    { value: 'Russian', label: 'Russian' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'Thai', label: 'Thai' },
    { value: 'Tunisian', label: 'Tunisian' },
    { value: 'Turkish', label: 'Turkish' },
    { value: 'Unknown', label: 'Unknown' },
    { value: 'Vietnamese', label: 'Vietnamese' },
  ];

  const popularRecipes = [
    'Pasta',
    'Chicken',
    'Pizza',
    'Cake',
    'Salad',
    'Soup',
    'Rice',
    'Fish',
    'Beef',
    'Dessert'
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
    <Stack spacing="xl">
      {/* Search Form */}
      <Paper p="md" shadow="sm" withBorder>
        <form onSubmit={form.onSubmit(searchRecipes)}>
          <Grid gutter="md">
            <Grid.Col xs={12} sm={4}>
              <TextInput
                label={t('searchRecipes')}
                placeholder={t('searchPlaceholder')}
                icon={<IconSearch size={16} />}
                {...form.getInputProps('search')}
              />
            </Grid.Col>
            <Grid.Col xs={6} sm={4}>
              <Select
                label={t('category')}
                data={categories}
                {...form.getInputProps('category')}
              />
            </Grid.Col>
            <Grid.Col xs={6} sm={4}>
              <Select
                label={t('cuisine')}
                data={areas}
                {...form.getInputProps('area')}
              />
            </Grid.Col>
            <Grid.Col xs={12}>
              <Group>
                <Button type="submit" loading={loading}>
                  {t('searchRecipes')}
                </Button>
                <Button variant="outline" onClick={showRandomRecipes}>
                  {t('showRandom')}
                </Button>
              </Group>
            </Grid.Col>
          </Grid>
        </form>
      </Paper>

      {/* Popular Recipes Quick Access */}
      <Paper p="md" withBorder>
        <Text size="lg" weight={600} mb="sm">
          {t('popularSearches')}:
        </Text>
        <ChipGroup>
          {popularRecipes.map((recipe) => (
            <Chip
              key={recipe}
              value={recipe}
              variant="outline"
              onClick={() => handlePopularRecipeClick(recipe)}
              style={{ cursor: 'pointer' }}
            >
              {recipe}
            </Chip>
          ))}
        </ChipGroup>
      </Paper>

      {/* Results */}
      <div style={{ position: 'relative' }}>
        <LoadingOverlay visible={loading} />
        
        {recipes.length > 0 ? (
          <Grid gutter="lg">
            {recipes.map((recipe) => (
              <Grid.Col key={recipe.idMeal} xs={12} sm={6} lg={4}>
                <RecipeCard recipe={recipe} />
              </Grid.Col>
            ))}
          </Grid>
        ) : (
          !loading && (
            <Paper p="xl" style={{ textAlign: 'center' }}>
              <Text color="dimmed" size="lg">
                {t('noRecipesFound')}
              </Text>
              <Button 
                variant="light" 
                onClick={showRandomRecipes}
                mt="md"
              >
                {t('showRandom')}
              </Button>
            </Paper>
          )
        )}
      </div>
    </Stack>
  );
};

export default RecipeFinder;