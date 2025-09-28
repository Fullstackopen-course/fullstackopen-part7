import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default [
	{ ignores: ['dist'] },

	...compat.extends(
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended'
	),

	js.configs.recommended,
	prettierConfig,
	{
		files: ['**/*.{js,jsx}'],
		languageOptions: {
			ecmaVersion: 'latest',
			globals: globals.browser,
			parserOptions: {
				ecmaFeatures: { jsx: true },
				sourceType: 'module',
			},
		},
		settings: {
			react: {
				version: '18.3',
			},
		},
		plugins: {
			react,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			prettier: prettierPlugin,
		},
		rules: {
			'react/jsx-no-target-blank': 'off',
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
			'react/prop-types': 'off',

			indent: ['error', 'tab'],
			'linebreak-style': ['error', 'unix'],
			quotes: ['error', 'single'],
			semi: ['error', 'never'],
			eqeqeq: 'error',
			'no-trailing-spaces': 'error',
			'object-curly-spacing': ['error', 'always'],
			'arrow-spacing': ['error', { before: true, after: true }],
			'no-console': 'off',

			'prettier/prettier': 'error',
		},
	},
]
