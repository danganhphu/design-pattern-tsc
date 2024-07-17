# Design Patterns in TypeScript

# Project Setup Guide

This guide provides the necessary steps to set up the project, install required tools, and configure your Visual Studio Code (VSCode) editor to ensure consistency in code formatting and linting.

## Prerequisites

1. **Visual Studio Code**: Make sure you have [VSCode](https://code.visualstudio.com/) installed.
2. **Node.js**: Install [Node.js and NPM](https://nodejs.org/en/).
3. **Yarn**: Install [Yarn](https://yarnpkg.com/getting-started/install).
4. **TypeScript Compiler**: Install globally by running the following command:

    ```bash
    yarn global add typescript
    ```

5. **TypeScript Node Extension**: Install globally by running the following command:

    ```bash
    yarn global add ts-node
    ```

## Project Setup

1. **Clone the Repository**

    ```bash
    git clone https://github.com/danganhphu/design-pattern-tsc.git
    cd design-pattern-tsc
    ```

2. **Install Dependencies**

   Run the following command to install the necessary dependencies:

    ```bash
    yarn install
    ```

3. **VSCode Extensions**: Install the following VSCode extensions (if using VSCode):
    - [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

4. **Create VSCode Settings** (if using VSCode)

   If you are using VSCode, create a `.vscode` folder in the root of your project and add a `settings.json` file with the following content:

    ```bash
    mkdir -p .vscode
    echo '{
      "editor.formatOnPaste": true,
      "editor.formatOnSave": true,
      "editor.defaultFormatter": "esbenp.prettier-vscode",
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true,
        "source.fixAll.format": true
      }
    }' > .vscode/settings.json
    ```

5. **Setup Husky (if applicable)**

   If you are using Husky for Git hooks, make sure to set it up:

    ```bash
    yarn prepare
    ```
### .husky/pre-commit

Create a file named pre-commit in the .husky directory with the following content:

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo '🏗️👷 Styling, testing and building your project before committing'

# Check Prettier standards
yarn check-format ||
(
    echo '🤢🤮🤢🤮 Its FOKING RAW - Your styling looks disgusting. 🤢🤮🤢🤮
            Prettier Check Failed. Run yarn format, add changes and try commit again.';
    false;
)

# Check ESLint Standards
yarn check-lint ||
(
    echo '😤🏀👋😤 Get that weak shit out of here! 😤🏀👋😤 
            ESLint Check Failed. Make the required changes listed above, add changes and try to commit again.'
    false; 
)

# Check tsconfig standards
yarn check-types ||
(
    echo '🤡😂❌🤡 Failed Type check. 🤡😂❌🤡
            Are you seriously trying to write that? Make the changes required above.'
    false;
)

# If everything passes... Now we can commit
echo '🤔🤔🤔🤔... Alright.... Code looks good to me... Trying to build now. 🤔🤔🤔🤔'

# Uncomment the following code if you want to run a build before committing:
# yarn build ||
# (
#     echo '❌👷🔨❌ Better call Bob... Because your build failed ❌👷🔨❌
#            Next build failed: View the errors above to see why.
#     '
#     false;
# )

# If everything passes... Now we can commit
echo '✅✅✅✅ You win this time... I am committing this now. ✅✅✅✅'
```

## Additional Notes

- Ensure that you have the Prettier and ESLint extensions installed and enabled in VSCode.
- The settings provided will automatically format and lint your code on save and paste.

Happy coding!
