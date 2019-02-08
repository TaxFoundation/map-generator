module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": ["prettier", "prettier/react"],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react", "react-hooks", "prettier"
    ],
    "rules": {
        "linebreak-style": [
            "error",
            "unix"
        ],
        "react/jsx-uses-vars": 2,
        "react/jsx-uses-react": 2,
        "react-hooks/rules-of-hooks": "error",
        "prettier/prettier": [
        "error",
            {
                trailingComma: "es5",
                singleQuote: true,
            }
        ]
    }
};