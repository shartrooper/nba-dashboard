import '../src/index.css'
import { ContentLayout } from '../src/components/Layout'
import { ApolloProvider } from '@apollo/client';
import {client} from '@/lib/apollo';

const BREAKPOINTS_INT = {
  xs: 375,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

const customViewports = Object.fromEntries(
  Object.entries(BREAKPOINTS_INT).map(([key, val], idx) => {
    return [
      key,
      {
        name: key,
        styles: {
          width: `${val}px`,
          height: `${(idx + 5) * 10}vh`,
        },
      },
    ];
  })
);


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: { viewports: customViewports }
}

export const decorators = [
  (Story) => (
    <ApolloProvider client={client}>
      <ContentLayout >
        <Story />
      </ContentLayout>
    </ApolloProvider>
  ),
];