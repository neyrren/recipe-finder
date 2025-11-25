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
  Box,
  ActionIcon,
} from '@mantine/core';
import { IconUsers, IconMapPin, IconHeart, IconShare } from '@tabler/icons-react';
import { useLanguage } from '../hooks/useLanguage';
import { useHover } from '@mantine/hooks';

const RecipeCard = ({ recipe }) => {
  const { t } = useLanguage();
  const { hovered, ref } = useHover();
  
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
    <Card
      ref={ref}
      shadow={hovered ? "xl" : "md"}
      p="lg"
      radius="lg"
      withBorder
      style={{
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'none',
        border: '1px solid #e0e0e0',
      }}
    >
      <Card.Section style={{ position: 'relative' }}>
        <Image
          src={recipe.strMealThumb || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'}
          height={220}
          alt={recipe.strMeal}
          withPlaceholder
          style={{
            filter: hovered ? 'brightness(1.05)' : 'brightness(1)',
            transition: 'filter 0.3s ease'
          }}
        />
        <Group position="apart" style={{ 
          position: 'absolute', 
          top: 10, 
          left: 10, 
          right: 10 
        }}>
          {recipe.strArea && (
            <Badge 
              color="blue" 
              variant="filled"
              size="lg"
              style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(34, 139, 230, 0.9)' }}
            >
              {recipe.strArea}
            </Badge>
          )}
          <Group spacing="xs">
            <ActionIcon 
              variant="filled" 
              color="red" 
              size="md"
              style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            >
              <IconHeart size={16} />
            </ActionIcon>
            <ActionIcon 
              variant="filled" 
              color="blue" 
              size="md"
              style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            >
              <IconShare size={16} />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>

      <Stack spacing="sm" mt="md">
        <Group position="apart" align="flex-start">
          <Text weight={700} size="xl" lineClamp={2} style={{ flex: 1 }}>
            {recipe.strMeal}
          </Text>
        </Group>

        <Group spacing="lg">
          {recipe.strCategory && (
            <Group spacing={5}>
              <IconUsers size={18} color="#666" />
              <Text size="sm" color="dimmed" weight={500}>
                {recipe.strCategory}
              </Text>
            </Group>
          )}
          {recipe.strArea && (
            <Group spacing={5}>
              <IconMapPin size={18} color="#666" />
              <Text size="sm" color="dimmed" weight={500}>
                {recipe.strArea}
              </Text>
            </Group>
          )}
        </Group>

        <Divider my="sm" />

        <Accordion 
          variant="separated" 
          radius="md"
          styles={{
            item: {
              border: '1px solid #e0e0e0',
              marginBottom: '8px',
            },
            control: {
              padding: '12px 16px',
            }
          }}
        >
          <Accordion.Item value="ingredients">
            <Accordion.Control>
              <Group spacing="sm">
                <Text weight={600}>{t('ingredients')}</Text>
                <Badge variant="light" color="blue" size="sm">
                  {ingredients.length}
                </Badge>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <List 
                size="sm" 
                spacing="xs"
                styles={{
                  item: {
                    padding: '4px 0',
                  }
                }}
              >
                {ingredients.map((item, index) => (
                  <List.Item key={index}>
                    <Text span weight={600} color="blue">{item.measure}</Text> {item.ingredient}
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
              <List 
                type="ordered" 
                size="sm" 
                spacing="sm"
                styles={{
                  item: {
                    marginBottom: '8px',
                    lineHeight: '1.4',
                  }
                }}
              >
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