import React from 'react';
import {
  Container,
  Grid,
  Text,
  Group,
  Stack,
  Anchor,
  Divider,
  ActionIcon,
  Paper,
  ThemeIcon, // Add this import
} from '@mantine/core';
import {
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandYoutube,
  IconChefHat,
} from '@tabler/icons-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Recipes': ['Browse All', 'Popular', 'Recent', 'Featured'],
    'Categories': ['Vegetarian', 'Desserts', 'Main Course', 'Appetizers', 'Drinks'],
    'Cuisines': ['Italian', 'Mexican', 'Asian', 'Indian', 'Mediterranean'],
    'Support': ['Help Center', 'Contact Us', 'Feedback', 'Community'],
  };

  return (
    <Paper component="footer" style={{ background: '#1a1b1e', color: 'white' }}>
      <Container size="xl" py={60}>
        <Grid gutter={50}>
          {/* Brand Section */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack spacing="md">
              <Group spacing="sm">
                <ThemeIcon size={40} radius="md" color="blue">
                  <IconChefHat size={24} />
                </ThemeIcon>
                <Text size="xl" weight={700} style={{ color: 'white' }}>
                  RecipeMaster
                </Text>
              </Group>
              <Text color="dimmed" size="lg">
                Discover, cook, and share amazing recipes from around the world. Your culinary journey starts here.
              </Text>
              <Group spacing="sm">
                <ActionIcon 
                  size="lg" 
                  variant="filled" 
                  color="blue"
                  radius="md"
                >
                  <IconBrandFacebook size={18} />
                </ActionIcon>
                <ActionIcon 
                  size="lg" 
                  variant="filled" 
                  color="blue"
                  radius="md"
                >
                  <IconBrandTwitter size={18} />
                </ActionIcon>
                <ActionIcon 
                  size="lg" 
                  variant="filled" 
                  color="blue"
                  radius="md"
                >
                  <IconBrandInstagram size={18} />
                </ActionIcon>
                <ActionIcon 
                  size="lg" 
                  variant="filled" 
                  color="blue"
                  radius="md"
                >
                  <IconBrandYoutube size={18} />
                </ActionIcon>
              </Group>
            </Stack>
          </Grid.Col>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <Grid.Col key={category} span={{ base: 6, sm: 3, md: 2 }}>
              <Stack spacing="sm">
                <Text weight={600} size="lg" style={{ color: 'white' }}>
                  {category}
                </Text>
                {links.map((link) => (
                  <Anchor
                    key={link}
                    href="#"
                    color="dimmed"
                    size="sm"
                    style={{ 
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#909296';
                    }}
                  >
                    {link}
                  </Anchor>
                ))}
              </Stack>
            </Grid.Col>
          ))}
        </Grid>

        <Divider my="xl" color="dark.5" />

        {/* Bottom Section */}
        <Group position="apart">
          <Text color="dimmed" size="sm">
            © {currentYear} RecipeMaster. All rights reserved.
          </Text>
          <Group spacing="lg">
            <Anchor href="#" color="dimmed" size="sm">
              Privacy Policy
            </Anchor>
            <Anchor href="#" color="dimmed" size="sm">
              Terms of Service
            </Anchor>
            <Anchor href="#" color="dimmed" size="sm">
              Cookie Policy
            </Anchor>
          </Group>
        </Group>
      </Container>
    </Paper>
  );
};

export default Footer;