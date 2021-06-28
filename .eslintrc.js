module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parserOptions: {
		parser: 'babel-eslint',
	},
	extends: [
		'@nuxtjs',
		'plugin:prettier/recommended',
		'plugin:nuxt/recommended',
	],
	plugins: [],
	// add your custom rules here
	rules: {
		'prettier/prettier': [
			'error',
			{
				semi: false,
				trailingComma: 'es5',
				singleQuote: true,
				printWidth: 80,
				useTabs: true,
				tabWidth: 4,
				htmlWhitespaceSensitivity: 'ignore',
			},
		],
		semi: ['error', 'never'],
		'space-before-function-paren': [
			'error',
			{
				anonymous: 'always',
				named: 'never',
				asyncArrow: 'always',
			},
		],
		'space-in-parens': ['error', 'never'],
		'object-curly-spacing': ['error', 'always'],
		'func-style': [
			'error',
			'declaration',
			{
				allowArrowFunctions: true,
			},
		],
		indent: [
			'error',
			'tab',
			{
				ignoredNodes: ['TemplateLiteral > *'],
			},
		],
		quotes: [
			'error',
			'single',
			{
				allowTemplateLiterals: true,
			},
		],
		'object-curly-newline': [
			'error',
			{
				ObjectExpression: {
					minProperties: 1,
				},
				ObjectPattern: {
					multiline: true,
				},
				ImportDeclaration: 'never',
				ExportDeclaration: {
					multiline: true,
					minProperties: 3,
				},
			},
		],
		'object-property-newline': 'error',
		'no-console': 'off',
	},
}
