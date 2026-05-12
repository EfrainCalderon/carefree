import '../src/tokens.css'

/** @type {import('@storybook/react').Preview} */
const preview = {
  parameters: {
    backgrounds: {
      default: 'app',
      values: [
        { name: 'app', value: '#f5f5f3' },
        { name: 'white', value: '#ffffff' },
      ],
    },
    layout: 'centered',
  },
}

export default preview
