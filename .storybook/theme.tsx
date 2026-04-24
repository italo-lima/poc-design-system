/// <reference types="vite/client" />
import { create } from 'storybook/theming'

export const tokens = {
  black: '#000000',
  white: '#ffffff',
  brand500: '#ffa500',
  neutral50: '#f4f5f6',
  neutral100: '#e2e6e9',
  neutral200: '#d1d7db',
  neutral300: '#c0c8ce',
  neutral400: '#afb9c0',
  neutral500: '#8d9ba5',
  neutral600: '#5e6d78',
  neutral700: '#4a565e',
  neutral800: '#363e44',
  neutral900: '#22272b',
  neutral1000: '#0d1011',
} as const

const fontBase = "'Inter Variable', 'Inter', ui-sans-serif, system-ui, sans-serif"
const fontCode = "ui-monospace, 'Cascadia Code', 'Fira Code', Consolas, monospace"
const radius = 8

export const STORYBOOK_LOGO_PATH = `${import.meta.env.BASE_URL}crmbonus.png`

const brand = {
  brandTitle: 'CRM&Bonus · Design System',
  brandUrl: '/',
  brandTarget: '_self' as const,
}

export const storybookDocsTheme = create({
  base: 'light',

  colorPrimary: tokens.brand500,
  colorSecondary: tokens.neutral700,

  appBg: tokens.neutral50,
  appContentBg: tokens.white,
  appHoverBg: tokens.neutral100,
  appPreviewBg: tokens.neutral50,
  appBorderColor: tokens.neutral200,
  appBorderRadius: radius,

  fontBase,
  fontCode,

  textColor: tokens.neutral900,
  textInverseColor: tokens.white,
  textMutedColor: tokens.neutral600,

  barTextColor: tokens.neutral700,
  barHoverColor: tokens.black,
  barSelectedColor: tokens.brand500,
  barBg: tokens.white,

  buttonBg: tokens.neutral50,
  buttonBorder: tokens.neutral200,

  booleanBg: tokens.neutral100,
  booleanSelectedBg: tokens.brand500,

  inputBg: tokens.white,
  inputBorder: tokens.neutral300,
  inputTextColor: tokens.neutral900,
  inputBorderRadius: radius,

  ...brand,
})

export const storybookManagerTheme = create({
  base: 'dark',

  colorPrimary: tokens.brand500,
  colorSecondary: tokens.neutral300,

  appBg: tokens.neutral900,
  appContentBg: tokens.neutral1000,
  appHoverBg: tokens.neutral800,
  appPreviewBg: tokens.neutral900,
  appBorderColor: tokens.neutral700,
  appBorderRadius: radius,

  fontBase,
  fontCode,

  textColor: tokens.neutral50,
  textInverseColor: tokens.neutral900,
  textMutedColor: tokens.neutral400,

  barTextColor: tokens.neutral100,
  barHoverColor: tokens.white,
  barSelectedColor: tokens.brand500,
  barBg: tokens.neutral900,

  buttonBg: tokens.neutral800,
  buttonBorder: tokens.neutral700,

  booleanBg: tokens.neutral700,
  booleanSelectedBg: tokens.brand500,

  inputBg: tokens.neutral800,
  inputBorder: tokens.neutral600,
  inputTextColor: tokens.neutral50,
  inputBorderRadius: radius,

  ...brand,
  brandImage: STORYBOOK_LOGO_PATH,
})
