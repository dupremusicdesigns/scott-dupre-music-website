import { createRequire } from 'module';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
// @ts-expect-error - no types available
import importNewlines from 'eslint-plugin-import-newlines';
import unusedImports from 'eslint-plugin-unused-imports';
// @ts-expect-error - no types available
import noAutofix from 'eslint-plugin-no-autofix';
// @ts-expect-error - no types available
import newlineDestructuring from 'eslint-plugin-newline-destructuring';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import js from '@eslint/js';
import typescriptEslintPlugin from 'typescript-eslint';
import type { Linter } from 'eslint';

const require = createRequire( import.meta.url );
const nextConfig = require( 'eslint-config-next' );

const eslintConfig: Linter.Config[] = [
    {
        ignores: [
            'node_modules/**'
            , '.next/**'
            , 'out/**'
            , 'build/**'
            , 'next-env.d.ts'
            , 'dist/**'
            , 'styled-system/**'
        ]
    }
    , js.configs.recommended
    , ...nextConfig
    , ...typescriptEslintPlugin.configs.recommended
    , {
        plugins: {
            '@typescript-eslint': typescriptEslint
            , 'import-newlines': importNewlines
            , 'unused-imports': unusedImports
            , 'no-autofix': noAutofix
            , 'newline-destructuring': newlineDestructuring
            , 'import': importPlugin
            , 'react': reactPlugin
        }
        , languageOptions: {
            parser: typescriptParser
            , globals: {
                globalThis: false
                , JSX: 'readonly'
                , React: 'readonly'
                , RequestInit: true
                , BodyInit: true
                , PageProps: 'readonly'
                , LayoutProps: 'readonly'
                , NodeJS: 'readonly'
            }
        }
        , rules: {
        // Indent using 4 spaces and error on mixed tabs/spaces
            'indent': [
                'error'
                , 4
                , {
                    'SwitchCase': 1
                    , 'ignoredNodes': [
                        'JSXFragment'
                        , 'JSXOpeningFragment'
                        , 'JSXClosingFragment'
                    ]
                }
            ]
            // Enforce max line length of 80 characters
            , 'max-len': [
                'warn'
                , {
                    'code': 80
                    , 'ignorePattern': '\\s'
                    , 'ignoreTemplateLiterals': true
                }
            ]
            // Enforce 1 space after commas and no space before
            , 'comma-spacing': [
                'error'
                , {
                    'before': false
                    , 'after': true
                }
            ]
            // Disallow trailing commas
            , 'comma-dangle': [
                'error'
                , 'never'
            ]
            // Enforce single quotes
            , 'quotes': [
                'error'
                , 'single'
            ]
            // Enforce Unix linebreaks
            , 'linebreak-style': [
                'warn'
                , 'unix'
            ]
            // Enforce space before block statements
            , 'space-before-blocks': [
                'error'
                , 'always'
            ]
            // Enforce spacing around arrows
            , 'arrow-spacing': [
                'error'
                , {
                    'before': true
                    , 'after': true
                }
            ]
            // Enforce spacing after colon but not before in key-value pairs
            , 'key-spacing': [
                'error'
                , {
                    'beforeColon': false
                    , 'afterColon': true
                    , 'mode': 'strict'
                }
            ]
            // Enforce parenthesis around arrow function parameters as needed
            , 'arrow-parens': [
                'error'
                , 'as-needed'
            ]
            // Enforce spacing inside parenthesis
            , 'space-in-parens': [
                'error'
                , 'always'
                , { 'exceptions': [ 'empty' ] }
            ]
            // Enforce spacing inside brackets
            , 'array-bracket-spacing': [
                'error'
                , 'always'
            ]
            // Enforce spacing around brackets of computed properties
            , 'computed-property-spacing': [
                'error'
                , 'always'
            ]
            // Enforce spacing inside curly braces
            , 'object-curly-spacing': [
                'error'
                , 'always'
            ]
            // Enforce new lines for object properties if there are more than 2
            , 'object-curly-newline': [
                'error'
                , {
                    'ObjectExpression': {
                        'multiline': true
                        , 'minProperties': 2
                        , 'consistent': true
                    }
                    , 'ObjectPattern': {
                        'multiline': true
                        , 'minProperties': 2
                        , 'consistent': true
                    }
                    , 'ImportDeclaration': {
                        'multiline': true
                        , 'minProperties': 2
                    }
                    , 'ExportDeclaration': {
                        'multiline': true
                        , 'minProperties': 2
                    }
                }
            ]
            // Enforce newlines for destructured imports
            , 'import-newlines/enforce': [
                'error'
                , {
                    'items': 1
                    , 'semi': false
                }
            ]
            // Enforce newlines between object properties
            , 'object-property-newline': 'error'
            // Prefer template literals over string concatenation
            , 'prefer-template': 'error'
            // Enforce spacing around template literal curly braces
            , 'template-curly-spacing': [
                'error'
                , 'always'
            ]
            // Enforce one true brace style
            , 'brace-style': [
                'warn'
                , '1tbs'
                , {
                    'allowSingleLine': true
                }
            ]
            // Require 'use strict' pragma
            , 'strict': [
                'warn'
                , 'global'
            ]
            // Enforce space before function parentheses
            , 'space-before-function-paren': [
                'error'
                , 'always'
            ]
            // Require semicolons
            , 'semi': [
                'error'
                , 'always'
            ]
            // Enforce newline at end of file
            , 'eol-last': [
                'error'
                , 'always'
            ]
            // Enforce spacing after semicolons but not before
            , 'semi-spacing': [
                'error'
                , {
                    'before': false
                    , 'after': true
                }
            ]
            // Enforce semicolon at the end of a line
            , 'semi-style': [
                'error'
                , 'last'
            ]
            // Disallow unnecessary semicolons
            , 'no-extra-semi': 'error'
            // Enforce spacing after keywords
            , 'keyword-spacing': [
                'error'
                , {
                    'after': true
                }
            ]
            // Enforce leading commas
            , 'comma-style': [
                'error'
                , 'first'
                , {
                    'exceptions': {
                        'ImportDeclaration': false
                        , 'ObjectPattern': false
                    }
                }
            ]
            // Enforce linebreaks before and after operators
            , 'operator-linebreak': [
                'error'
                , 'before'
                , {
                    'overrides': {
                        '?': 'ignore'
                        , ':': 'ignore'
                    }
                }
            ]
            // Enforce spacing around infix operators
            , 'space-infix-ops': 'error'
            // Disallow multiple spaces
            , 'no-multi-spaces': 'error'
            // Disallow trailing spaces
            , 'no-trailing-spaces': 'error'
            // Enforce spacing around block braces
            , 'block-spacing': [
                'error'
                , 'always'
            ]
            // Enforce a limit of 750 lines per file
            , 'max-lines': [
                'error'
                , {
                    'max': 750
                    , 'skipBlankLines': true
                    , 'skipComments': true
                }
            ]
            // Enforce single quotes for JSX attributes
            , 'jsx-quotes': [
                'error'
                , 'prefer-single'
            ]
            // Disallow unnecessary ternary operators
            , 'no-unneeded-ternary': 'error'
            // Enforce multiline ternary operators
            , 'multiline-ternary': [ 'error', 'always-multiline' ]
            // Allow variable declaration inside a case block
            , 'no-case-declarations': 'off'
            // Allow control flow statements in finally blocks
            , 'no-unsafe-finally': 'off'
            // Warn on unreachable code
            , 'no-unreachable': 'warn'
            // Warn on undefined variables
            , 'no-undef': 'warn'
            // Warn on empty destructuring patterns
            , 'no-empty-pattern': 'warn'
            // Disallow more than 1 empty line
            , 'no-multiple-empty-lines': [
                'error'
                , {
                    'max': 1
                    , 'maxBOF': 0
                    , 'maxEOF': 0
                }
            ]
            // TypeScript-specific rules
            , '@typescript-eslint/no-unused-vars': 'warn'
            , '@typescript-eslint/ban-ts-comment': 'warn'
            , '@typescript-eslint/no-empty-function': 'warn'
            , '@typescript-eslint/consistent-type-definitions': [ 'error', 'type' ]
            // Prefer arrow functions over regular functions
            , 'prefer-arrow-callback': 'error'
            , 'func-style': [ 'error', 'expression' ]
            // Error on unused imports
            , 'no-autofix/unused-imports/no-unused-imports': 'error'
            // Enforce newlines for destructuring
            , 'newline-destructuring/newline': [ 'error', { 'items': 1 } ]
            // Warn on default exports
            , 'import/no-default-export': 'warn'

            // React-specific rules
            // Do not check for prop types
            , 'react/prop-types': 'off'
            // Require all prop types to be used in the component
            , 'react/no-unused-prop-types': 'error'
            // Disallow inconsistent spacing around jsx brackets
            , 'react/jsx-tag-spacing': [
                'error'
                , {
                    'closingSlash': 'never'
                    , 'beforeSelfClosing': 'always'
                    , 'afterOpening': 'never'
                    , 'beforeClosing': 'never'
                }
            ]
            // Enforce consistent spacing around jsx attributes
            , 'react/jsx-curly-spacing': [
                'error'
                , {
                    'when': 'always'
                    , 'children': true
                }
            ]
            // Enforce all props are on a new line
            , 'react/jsx-max-props-per-line': [
                'error'
                , {
                    'maximum': 1
                    , 'when': 'always'
                }
            ]
            // Enforce first prop on a new line if the component has multiple props
            , 'react/jsx-first-prop-new-line': [ 'error', 'multiline' ]
            // Enforce self closing tags for React and HTML elements
            , 'react/self-closing-comp': [
                'error'
                , {
                    'component': true
                    , 'html': true
                }
            ]
            // Enforce parentheses around multilines JSX
            , 'react/jsx-wrap-multilines': [
                'error'
                , {
                    'declaration': 'parens-new-line'
                    , 'assignment': 'parens-new-line'
                    , 'return': 'parens-new-line'
                    , 'arrow': 'parens-new-line'
                    , 'condition': 'parens-new-line'
                    , 'logical': 'parens-new-line'
                    , 'prop': 'parens-new-line'
                }
            ]
            // Enforce consistent alignment of closing brackets of JSX elements
            , 'react/jsx-closing-bracket-location': [ 'error', 'tag-aligned' ]
            // Enforce boolean attributes to be explicit
            , 'react/jsx-boolean-value': 'error'
            // Disallow curly brackets as props or children in JSX expressions
            , 'react/jsx-curly-brace-presence': [
                'error'
                , {
                    'props': 'never'
                    , 'children': 'never'
                }
            ]
            // Enforce no spacing around equal signs in JSX attributes
            , 'react/jsx-equals-spacing': 'error'
            // Enforce newlines for multiline JSX expressions in curly braces
            , 'react/jsx-curly-newline': [
                'error'
                , {
                    'multiline': 'require'
                    , 'singleline': 'forbid'
                }
            ]
            , 'react/jsx-indent': [
                'error'
                , 4
            ]
            , 'react/jsx-indent-props': [
                'error'
                , 4
            ]
            // Enforce JSX content on separate lines from opening/closing tags
            , 'react/jsx-one-expression-per-line': [
                'error'
                , {
                    'allow': 'none'
                }
            ]
        }
    }, {
        files: [ '**/*.ts' ]
        , rules: {
            'max-lines': [ 'off' ]
        }
    }, {
        files: [ 'src/app/**/page.tsx', 'src/app/**/layout.tsx', 'src/app/**/loading.tsx', 'src/app/**/error.tsx', 'src/app/**/not-found.tsx' ]
        , rules: {
            'import/no-default-export': 'off'
        }
    }, {
        files: [ 'src/app/api/**/route.ts' ]
        , rules: {
            'func-style': 'off'
        }
    }, {
        files: [ '**/*.spec.ts', '**/*.spec.tsx', '**/*.test.ts', '**/*.test.tsx' ]
        , languageOptions: {
            globals: {
                describe: 'readonly'
                , it: 'readonly'
                , expect: 'readonly'
                , beforeEach: 'readonly'
                , afterEach: 'readonly'
                , beforeAll: 'readonly'
                , afterAll: 'readonly'
                , vi: 'readonly'
                , test: 'readonly'
            }
        }
        , rules: {
            'import/no-default-export': 'off'
            , 'max-lines': 'off'
        }
    } ];

// eslint-disable-next-line import/no-default-export
export default eslintConfig;
