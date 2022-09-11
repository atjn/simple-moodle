
module.exports = {

	extends: [
		"@atjn/eslint-config",  
	],

	parserOptions: {
		sourceType: "module",
		ecmaVersion: "latest",
	},
  
  globals: {
		browser: true,
		chrome: true,
	}

};
