import React from 'react';
import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  Accordion,
  List,
  Stack,
  Divider,
} from '@mantine/core';
import { IconUsers, IconMapPin } from '@tabler/icons-react';
import { useLanguage } from '../hooks/useLanguage';

const RecipeCard = ({ recipe }) => {
  const { t } = useLanguage();
  
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({
        ingredient,
        measure: measure || '',
      });
    }
  }

  const instructions = recipe.strInstructions
    ? recipe.strInstructions.split('\n').filter(step => step.trim() !== '')
    : [t('noInstructions') || 'No instructions available'];

  return (
    <Card shadow="md" p="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={recipe.strMealThumb || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'}
          height={200}
          alt={recipe.strMeal}
          withPlaceholder
        />
      </Card.Section>

      <Stack spacing="sm" mt="md">
        <Group position="apart">
          <Text weight={700} size="lg" lineClamp={1}>
            {recipe.strMeal}
          </Text>
          {recipe.strArea && (
            <Badge color="blue" variant="light">
              {recipe.strArea}
            </Badge>
          )}
        </Group>

        <Group spacing="lg">
          {recipe.strCategory && (
            <Group spacing={5}>
              <IconUsers size={16} color="gray" />
              <Text size="sm" color="dimmed">
                {recipe.strCategory}
              </Text>
            </Group>
          )}
          {recipe.strArea && (
            <Group spacing={5}>
              <IconMapPin size={16} color="gray" />
              <Text size="sm" color="dimmed">
                {recipe.strArea}
              </Text>
            </Group>
          )}
        </Group>

        <Divider />

        <Accordion variant="separated">
          <Accordion.Item value="ingredients">
            <Accordion.Control>
              <Text weight={600}>{t('ingredients')} ({ingredients.length})</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <List size="sm" spacing="xs">
                {ingredients.map((item, index) => (
                  <List.Item key={index}>
                    <Text span weight={500}>{item.measure}</Text> {item.ingredient}
                  </List.Item>
                ))}
              </List>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="instructions">
            <Accordion.Control>
              <Text weight={600}>{t('instructions')}</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <List type="ordered" size="sm" spacing="xs">
                {instructions.map((instruction, index) => (
                  <List.Item key={index}>
                    <Text>{instruction}</Text>
                  </List.Item>
                ))}
              </List>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Stack>
    </Card>
  );
};

export default RecipeCard;