# Diving Into Redux

## Slide 1: What is "Redux"?

> A **state management system** for **cross-component or app-wide state**

---

## Slide 2: What Is Cross-Component / App-Wide State?

| Local State | Cross-Component State | App-Wide State |
|-------------|----------------------|----------------|
| State that belongs to a single component | State that affects multiple components | State that affects the entire app (most/all components) |
| E.g. listening to user input in an input field; toggling a "show more" details field | E.g. open/closed state of a modal overlay | E.g. user authentication status |
| Should be managed component-internal with useState() / useReducer() | Requires "prop chains" / "prop drilling" | Requires "prop chains" / "prop drilling" |
| | **OR: React Context or Redux** | **OR: React Context or Redux** |

---

## Slide 3: What is "Redux"? (continued)

> A state management system for cross-component or app-wide state

**Question**: Don't we have "React Context" already?

---

## Slide 4: React Context - Potential Disadvantages

| Complex Setup / Management | Performance |
|---------------------------|-------------|
| In more complex apps, managing React Context can lead to deeply nested JSX code and/or huge "Context Provider" components | React Context is not optimized for high-frequency state changes |

---

## Slide 5-6: React Context - Complex Setup Examples

**Deeply nested providers:**
```jsx
return (
  <AuthContextProvider>
    <ThemeContextProvider>
      <UIInteractionContextProvider>
        <MultiStepFormContextProvider>
          <UserRegistration />
        </MultiStepFormContextProvider>
      </UIInteractionContextProvider>
    </ThemeContextProvider>
  </AuthContextProvider>
);
```

**Or one huge provider:**
```jsx
function AllContextProvider() {
  const [isAuth, setIsAuth] = useState(false);
  const [isEvaluatingAuth, setIsEvaluatingAuth] = useState(false);
  const [activeTheme, setActiveTheme] = useState('default');
  const [...] = useState(...);

  function loginHandler(email, password) { ... };
  function signupHandler(email, password) { ... };
  function changeThemeHandler(newTheme) { ... };
  ...

  return (
    <AllContext.Provider>
      ...
    </AllContext.Provider>
  )
}
```

---

## Slide 7: React Context - Performance

> "My personal summary is that new context is ready to be used for low frequency unlikely updates (like locale/theme). It's also good to use it in the same way as old context was used. I.e. for static values and then propagate updates through subscriptions. It's not ready to be used as a replacement for all Flux-like state propagation."
>
> — **sebmarkbage** (React team member), Dec 2018

---

## Slide 8: Core Redux Concepts

```
                    ┌─────────────────────┐
  Forwarded to ───► │  Reducer Function   │ ◄─── NOT useReducer()
                    └─────────────────────┘      "Reducer Functions" are
                              │                   a general concept
                              │ Mutates (= changes) Store Data
                              ▼
                    ┌─────────────────────┐
                    │  Central Data       │
                    │  (State) Store      │
                    └─────────────────────┘
                              │
                              │ Subscription
                              ▼
┌──────────┐         ┌─────────────────────┐
│  Action  │◄────────│     Components      │
└──────────┘ Dispatch└─────────────────────┘
```

---

## Slide 9: The Reducer Function

| Property | Description |
|----------|-------------|
| Should be a **pure function** | Same input leads to same output |
| **Inputs** | Old State + Dispatched Action |
| **Output** | New State Object |

---

## Slide 10: The Role Of Immutability

> **State updates must be done in an immutable way!**

1. Objects and arrays are **reference values** in JavaScript

2. Changes made to an object property affect **ALL places** where the object gets used

3. **New object / array copies** (also of nested objects/arrays) must be created when producing a new state
