# Building Custom React Hooks

## Slide 1: Rules of Hooks

| Only call React Hooks in **React Functions** | Only call React Hooks at the **Top Level** |
|----------------------------------------------|-------------------------------------------|
| React Component Functions | Don't call them in nested functions |
| Custom Hooks | Don't call them in any block statements |

**+ extra, unofficial Rule for useEffect()**: ALWAYS add everything you refer to inside of useEffect() as a dependency!

---

## Slide 2: What are "Custom Hooks"?

> Outsource **stateful** logic into **re-usable functions**

Unlike "regular functions", custom hooks can use other React hooks and React state.

### Key Points:
- Custom hooks must start with `use` (e.g., `useCounter`, `useFetch`)
- They can call other hooks (useState, useEffect, etc.)
- State used in custom hooks is independent per component
- They help avoid code duplication for stateful logic
