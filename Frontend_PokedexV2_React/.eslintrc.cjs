module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'prettier'],
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-unnecessary-type-assertion": "warn",
        "@typescript-eslint/strict-boolean-expressions": "warn",
        "@typescript-eslint/no-unsafe-assignment": "error",
        'prettier/prettier': 'error',
        "import/order": ["error", { "alphabetize": { "order": "asc" } }],
        "import/no-unresolved": "error",
        "import/no-duplicates": "error",
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
