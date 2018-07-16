# Plyo Dev Tools
This repo is designed to be a single dev dependency for Plyo's micro services.

## Installation

```bash
> yarn add -D @plyo/dev-tools
``` 

after that you need to add scripts into your `package.json` file:

```json
{
  "scripts": {
    "lint": "lint",
    "lint-staged": "lint --staged",
    "precommit": "lint --staged"
  }
}
```

Pre-commit will be installed automatically. 

You can redefine standard `.eslintrc.js` file simply declaring it in your project root folder. Also you need to add `.prettierrc.js` file into your project.
