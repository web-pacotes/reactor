# @web-pacotes/reactor-svelte

## 0.0.5

### Patch Changes

- 021be9d: feat(reactor-svelte): add support for providing multiple reactors to child components

## 0.0.4

### Patch Changes

- d82516c: fix(reactor-svelte): import TypedClass as type otherwise vite bundler won't remove imports during transform phase
  https://github.com/web-pacotes/reactor/pull/7

## 0.0.3

### Patch Changes

- ea7060b: fix: `resolve` not being able to infer state of multiple parameter constructor reactor. see https://github.com/web-pacotes/reactor/pull/4 for a detailed explanation on this issue

## 0.0.2

### Patch Changes

- 2f27a07: First real release of reactor-svelte.

  Add APIs for:

  - implementing new reactors
  - providing reactors to child components
  - resolving reactors from parent components
  - listening to reactor state changes

## 0.0.1

### Patch Changes

- efab1ec: initial release
