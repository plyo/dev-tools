// ESLint configuration
// http://eslint.org/docs/user-guide/configuring
module.exports = {
  parser: "babel-eslint",

  plugins: ["mocha"],

  extends: ["airbnb-base", "plugin:prettier/recommended"],

  env: {
    mocha: true,
    browser: false,
    node: true,
    es6: true
  },

  rules: {
    "mocha/no-exclusive-tests": "error",
    "mocha/prefer-arrow-callback": "error",
    "mocha/handle-done-callback": "error",
    "mocha/no-global-tests": "error",
    "mocha/no-async-describe": "error",

    "default-case": "off",
    "generator-star-spacing": "off",
    "import/no-extraneous-dependencies": "off",
    "max-len": ["error", 120],
    "new-cap": ["error", { capIsNew: false }],
    "new-parens": "off",
    "no-mixed-operators": "off",
    "no-param-reassign": ["error", { props: false }],
    "prefer-template": "off",
    "no-console": "error",
    "import/no-cycle": "off",

    // Prefer destructuring from arrays and objects
    // http://eslint.org/docs/rules/prefer-destructuring
    "prefer-destructuring": [
      "error",
      {
        VariableDeclarator: {
          array: false,
          object: true
        },
        AssignmentExpression: {
          array: false,
          object: false
        }
      },
      {
        enforceForRenamedProperties: false
      }
    ]
  }
};
