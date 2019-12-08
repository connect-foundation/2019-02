module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es6": true
	},
	"extends": [
		"airbnb-base",
		"plugin:@typescript-eslint/eslint-recommended"
	],
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": 2018
	},
	"plugins": [
		"@typescript-eslint"
	],
	"rules": {
		"import/first": "off",
		"no-console": "off",
		"import/no-unresolved": "off",
		"no-unused-vars": "off",
		"lines-between-class-members": "off",
		"no-param-reassign": "off",
		"class-methods-use-this": "off",
	}
}