import React from 'react';
import { 
  MantineProvider, 
  Container, 
  Title, 
  AppShell, 
  Group,
  Button,
  ActionIcon,
  useMantineColorScheme,
  Select,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { IconSun, IconMoon, IconLanguage } from '@tabler/icons-react';
import WelcomePage from './components/WelcomePage';
import RecipeFinder from './components/RecipeFinder';
import { LanguageProvider } from './contexts/LanguageProvider';
import { useLanguage } from './hooks/useLanguage';

// Theme toggle component
function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <ActionIcon
      variant="outline"
      color={colorScheme === 'dark' ? 'yellow' : 'blue'}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
    </ActionIcon>
  );
}

// Language switcher component
function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  
  const languages = [
    { value: 'en', label: 'English' },
    { value: 'sw', label: 'Kiswahili' },
    { value: 'fr', label: 'Français' },
    { value: 'zh', label: '中文' },
  ];

  return (
    <Select
      value={language}
      onChange={setLanguage}
      data={languages}
      size="sm"
      w={120}
      leftSection={<IconLanguage size={16} />}
    />
  );
}

// Header component
function Header() {
  const { t } = useLanguage();
  
  return (
    <AppShell.Header>
      <Group h="100%" px="md" justify="space-between">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Title order={2} c="blue">
            🍳 {t('appTitle')}
          </Title>
        </Link>
        <Group>
          <Link to="/">
            <Button variant="subtle" size="sm">
              {t('home')}
            </Button>
          </Link>
          <Link to="/recipes">
            <Button variant="subtle" size="sm">
              {t('browseRecipes')}
            </Button>
          </Link>
          <LanguageSwitcher />
          <ThemeToggle />
        </Group>
      </Group>
    </AppShell.Header>
  );
}

function AppContent() {
  return (
    <Router>
      <AppShell
        header={{
          height: 70,
        }}
        padding="md"
      >
        <Header />
        <AppShell.Main>
          <Container size="lg" py="xl">
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/recipes" element={<RecipeFinder />} />
            </Routes>
          </Container>
        </AppShell.Main>
      </AppShell>
    </Router>
  );
}

function App() {
  return (
    <LanguageProvider>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Notifications />
        <AppContent />
      </MantineProvider>
    </LanguageProvider>
  );
}

export default App;