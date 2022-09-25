# tsconfig-lib

default configuration for all typescript project

`tsconfig.json`

```
{
  "extends": "@libs/tsconfig-lib",
  "compilerOptions": {
    // other compile compile configurations
  },
  "include": ["src/**/*.ts", "tests/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}

```