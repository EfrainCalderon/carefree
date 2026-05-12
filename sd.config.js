export default {
  hooks: {
    transforms: {
      // Strips the Tokens Studio set name ("global") from the token path
      'name/kebab-no-set': {
        type: 'name',
        transform: (token, config) => {
          const filtered = token.path.filter(p => p !== 'global')
          const name = filtered.join('-')
          return config.prefix ? `${config.prefix}-${name}` : name
        },
      },
      // Adds px to dimension tokens that arrive as bare numbers
      'ts/size/px': {
        type: 'value',
        filter: token => ['spacing', 'borderRadius', 'fontSizes'].includes(token.type),
        transform: token => {
          const v = String(token.value)
          return /^\d+(\.\d+)?$/.test(v) ? `${v}px` : v
        },
      },
    },
  },
  source: ['tokens/tokens.json'],
  platforms: {
    css: {
      transforms: ['attribute/cti', 'name/kebab-no-set', 'color/css', 'ts/size/px'],
      prefix: 'cf',
      buildPath: 'src/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: { selector: ':root' },
        },
      ],
    },
  },
}
