# Side Effects, Reducers & Context API

## Slide 1: What is an "Effect" (or a "Side Effect")?

| Main Job: Render UI & React to User Input | Side Effects: Anything Else |
|-------------------------------------------|----------------------------|
| Evaluate & Render JSX | Store Data in Browser Storage |
| Manage State & Props | Send Http Requests to Backend Servers |
| React to (User) Events & Input | Set & Manage Timers |
| Re-evaluate Component upon State & Prop Changes | ... |

**Main Job**: This all is "baked into" React via the "tools" and features covered in this course (i.e. useState() Hook, Props etc).

**Side Effects**: These tasks **must happen outside of the normal component evaluation** and render cycle - especially since they might block/delay rendering (e.g. Http requests)

---

## Slide 2: Handling Side Effects with the useEffect() Hook

```jsx
useEffect(() => { ... }, [ dependencies ]);
```

| Effect Function | Dependencies Array |
|-----------------|-------------------|
| A function that should be executed AFTER every component evaluation IF the specified dependencies changed | Dependencies of this effect - the function only runs if the dependencies changed |
| **Your side effect code goes into this function.** | **Specify your dependencies of your function here** |

---

## Slide 3: Introducing useReducer() for State Management

1. Sometimes, you have **more complex state** - for example if it got **multiple states**, **multiple ways of changing** it or **dependencies** to other states

2. useState() then often **becomes hard or error-prone to use** - it's easy to write bad, inefficient or buggy code in such scenarios

3. useReducer() can be used as a **replacement** for useState() if you need "**more powerful state management**"

---

## Slide 4: Understanding useReducer()

```jsx
const [state, dispatchFn] = useReducer(reducerFn, initialState, initFn);
```

| Parameter | Description |
|-----------|-------------|
| `state` | The state snapshot used in the component re-render/re-evaluation cycle |
| `dispatchFn` | A function that can be used to dispatch a new action (i.e. trigger an update of the state) |
| `reducerFn` | `(prevState, action) => newState` - A function that is **triggered automatically** once an action is **dispatched** (via dispatchFn()) - it **receives the latest state snapshot** and **should return the new, updated state**. |
| `initialState` | The initial state |
| `initFn` | A function to set the initial state programmatically |

---

## Slide 5: useState() vs useReducer()

Generally, you'll know when you need useReducer() (when using useState() becomes cumbersome or you're getting a lot of bugs/unintended behaviors)

| useState() | useReducer() |
|------------|--------------|
| The main state management "tool" | Great if you need "more power" |
| Great for independent pieces of state/data | Should be considered if you have related pieces of state/data |
| Great if state updates are easy and limited to a few kinds of updates | Can be helpful if you have more complex state updates |

---

## Slide 6: Component Trees & Component Dependencies

```
                    <App />
                   /   |   \
            <Auth />  <Shop />  <Cart />
              |          |
        <LoginForm />  <Products />
            |            |
          Login       <Product />
                         |
                    Add to Cart
```

**Problem**: There is no direct connection between `<LoginForm />` and `<App />`, or between `<Product />` and `<Cart />`

**Solution**: Use Props & Functions passed via Props

---

## Slide 7: Context to the Rescue!

**Component-wide, "behind-the-scenes" State Storage**

Context allows components to access shared state without prop drilling through the entire component tree.

---

## Slide 8: Context Limitations

1. React Context is **NOT optimized** for high frequency changes!
   - We'll explore a better tool for that, later (Redux)

2. React Context also **shouldn't be used to replace ALL** component communications and props
   - Component should still be configurable via props and short "prop chains" might not need any replacement

---

## Slide 9: Rules of Hooks

| Only call React Hooks in **React Functions** | Only call React Hooks at the **Top Level** |
|----------------------------------------------|-------------------------------------------|
| React Component Functions | Don't call them in nested functions |
| Custom Hooks (covered later!) | Don't call them in any block statements |

**+ extra, unofficial Rule for useEffect()**: ALWAYS add everything you refer to inside of useEffect() as a dependency!
