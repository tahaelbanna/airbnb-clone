---
name: ESQOUN
description: A comprehensive two-sided booking platform for guests and hosts.
colors:
  primary: "#6F856F"
  primary-hover: "#758A75"
  primary-light: "#E2E8E2"
  secondary: "#D9C4A1"
  background: "#F7F3ED"
  foreground: "#2C363F"
  muted: "#828C96"
  muted-foreground: "#A1ABB5"
  border: "#E6E1D8"
  surface: "#FCFBF9"
  success: "#16a34a"
  warning: "#f59e0b"
  error: "#dc2626"
typography:
  display:
    fontFamily: "'Newsreader', serif"
  body:
    fontFamily: "'Outfit', sans-serif"
rounded:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.75rem"
  xl: "1rem"
  2xl: "1.5rem"
spacing:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.75rem"
  xl: "1rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "9999px"
---
# Design System: ESQOUN

## Overview

**Creative North Star: "Modern Oasis"**

ESQOUN is an accommodation platform that serves as a bridge to a peaceful stay. Its personality is calm, refined, comfortable, sophisticated, breathable, welcoming, and modern. It feels like arriving somewhere beautiful and taking a deep breath. It is accessible yet refined—not an exclusive luxury boutique, but a premium digital experience. It avoids heavy borders, stark geometry, and clinical pure whites.

**Key Characteristics:**
- Soft Modern Architecture
- Generous Whitespace
- Editorial Subtlety
- Warmth over Coldness

## Colors

The palette balances warmth with high legibility, avoiding clinical whites and harsh blacks.

### Primary
- **Muted Sage** (#6F856F): Used for primary actions, active states, and success indicators.

### Secondary
- **Warm Sand** (#D9C4A1): Used for highlights, subtle backgrounds, badges, and secondary buttons.

### Neutral
- **Ivory** (#F7F3ED): The base background color.
- **Deep Charcoal** (#2C363F): Primary text and high contrast elements.
- **White-ish Surface** (#FCFBF9): Used strategically on top of the Ivory base for cards.
- **Ivory Border** (#E6E1D8): Subtle borders and dividers.

### Named Rules
**The Soft Warmth Rule.** Avoid sterile pure whites (`#FFFFFF`) or harsh pure blacks (`#000000`). Use Ivory and Deep Charcoal instead to maintain the oasis feel.

## Typography

**Display Font:** 'Newsreader', serif
**Body Font:** 'Outfit', sans-serif

**Character:** An editorial serif paired with a clean geometric sans-serif to balance refinement with digital usability.

### Hierarchy
- **Display**: H1s, Hero sections, marketing copy, and large property titles. Adds immediate sophistication.
- **Body**: Body text, buttons, form inputs, metadata, and dashboards. Highly legible at small sizes.

## Layout

Generous whitespace is used to let elements breathe. The interface avoids dense, cluttered layouts. Form controls and cards use soft, pill-like or rounded structures.

## Elevation & Depth

Minimal hard borders. Instead, rely on very subtle, soft drop shadows against the warm Ivory background to create elevation.

### Shadow Vocabulary
- **Shadow Sm** (`0 2px 8px 0 rgba(44, 54, 63, 0.04)`): Micro interactions.
- **Shadow Md** (`0 4px 16px -2px rgba(44, 54, 63, 0.06)`): Default card elevation.
- **Shadow Lg** (`0 10px 24px -4px rgba(44, 54, 63, 0.08)`): Hover states on cards.

## Shapes

- **Arches**: Used sparingly for major hero images or featured destination framing.
- **Rounded Geometry**: Property cards use `24px` to `32px` border-radius. Buttons use pill shapes (`rounded-full`) for primary actions to contrast with architectural cards.

## Components

### Property Cards
- **Corner Style**: Rounded at the bottom (`rounded-3xl`), arched at the top (`rounded-t-full`).
- **Background**: White surface on an Ivory background.
- **Shadow Strategy**: Soft `shadow-md`, rising to `shadow-lg` on hover.

### Buttons
- **Shape**: Pill shapes (fully rounded).
- **Primary**: Muted Sage Green.

## Do's and Don'ts

### Do:
- **Do** use rounded corners and subtle arches for architectural framing.
- **Do** rely on typography and whitespace for visual hierarchy.

### Don't:
- **Don't** use heavy color blocking or stark geometry.
- **Don't** rely on color alone to indicate errors or success.
