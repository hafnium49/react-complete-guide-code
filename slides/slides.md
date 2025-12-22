# Advanced Redux

## Slide 1: Side Effects, Async Tasks & Redux

> Reducers must be **pure**, **side-effect free**, **synchronous** functions

```
Input (Old State + Action) ──────────► Output (New State)
```

**Where should side-effects and async tasks be executed?**

| Option 1 | Option 2 |
|----------|----------|
| Inside the **components** (e.g. useEffect()) | Inside the **action creators** |

---

## Slide 2: Fat Reducers vs Fat Components vs Fat Actions

> Where should our logic (code) go?

| Synchronous, side-effect free code (i.e. data transformations) | Async code or code with side-effects |
|---------------------------------------------------------------|-------------------------------------|
| **Prefer** Reducers | **Prefer** Action Creators or Components |
| **Avoid** Action Creators or Components | **Never use** Reducers |

---

## Slide 3: Frontend Code Depends On Backend Code

```
                    ┌──────────────┐
                    │ Backend API  │
                    └──────────────┘
                     ▲            ▲
                     │            │
┌────────────────────┴──┐    ┌───┴────────────────────┐
│   Does a lot of work  │    │  Does NOT a lot of work│
│ (transforms + stores) │    │ (just stores incoming) │
└────────────────────┬──┘    └───┬────────────────────┘
                     │            │
┌────────────────────┴──┐    ┌───┴────────────────────┐
│ Send data & receive + │    │ Transform data & send  │
│ use response          │    │ data                   │
│ (less frontend code)  │    │ (more frontend code)   │
└────────────────────┬──┘    └───┬────────────────────┘
                     │            │
                    ┌┴────────────┴┐
                    │Frontend React│
                    │     App      │
                    └──────────────┘
```

---

## Slide 4: What is a "Thunk"?

> A function that **delays an action until later**

An action creator function that does **NOT** return the action itself but **another function** which eventually returns the action.

### Example:
```javascript
// Regular action creator
const addItem = (item) => ({ type: 'ADD_ITEM', payload: item });

// Thunk action creator
const fetchItems = () => {
  return async (dispatch) => {
    const response = await fetch('/api/items');
    const data = await response.json();
    dispatch({ type: 'SET_ITEMS', payload: data });
  };
};
```
