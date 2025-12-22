# A Look Behind The Scenes

## Slide 1: How Does React Work?

> "A JavaScript library for building user interfaces"

```
    Props ───────►  ┌────────────┐
  (Data from       │            │        ┌──────────┐
   parent)         │ Components │───────►│ Real DOM │
                   │            │        │(What the │
    State ────────►└────────────┘        │user sees)│
  (Internal                              └──────────┘
    data)                ▲
                         │
   Context ──────────────┘
  (Component-wide data)
```

| React | ReactDOM |
|-------|----------|
| "A JavaScript library for building user interfaces" | Interface to the web |

---

## Slide 2: How Does React Work? (continued)

```
Components ────────────────► Real DOM
     ▲                      (What the user sees)
     │
   React ──────────────────► ReactDOM
```

**How?**

| React | ReactDOM |
|-------|----------|
| React determines how the component tree **currently looks like** and what it **should look like** | ReactDOM **receives the differences** (i.e. required changes) and then **manipulates the real DOM** |

---

## Slide 3: Re-Evaluating Components !== Re-Rendering the DOM

| Components | Real DOM |
|------------|----------|
| Re-evaluated whenever props, state or context changes | Changes to the real DOM are only made for **differences between evaluations** |
| React executes component functions | |

---

## Slide 4: Virtual DOM Diffing

**Previous Evaluation Result:**
```html
<div>
  <h1>Hi there!</h1>
</div>
```

**Current Evaluation Result:**
```html
<div>
  <h1>Hi there!</h1>
  <p>This is new!</p>
</div>
```

**Changes are required**: `<p>` should be inserted in DOM (the rest should stay unchanged)

---

## Slide 5: Components & State

```
┌──────────────────┐      ┌─────────────┐
│ State Management │◄────►│ Components  │
└──────────────────┘      └─────────────┘
        │                        │
   ┌────┴────┐              ┌────┴────┐
   │ State   │              │Component│
   │ (A, B)  │              │ (A, B)  │
   └─────────┘              └─────────┘
```

State Management is tied to Components - each component can have its own state.

---

## Slide 6: State Updates & Scheduling

```
┌─────────────────────────────────────────────────────────────┐
│                        Our Code                             │
├────────────────┬────────────────────────────────────────────┤
│ <MyProduct />  │  setNewProduct('Book')                     │
└────────────────┴────────────────────────────────────────────┘
                            │
                            ▼
              ┌─────────────────────────────┐
              │ Schedules a State Update    │
              │ with data 'Book'            │
              └─────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                         React                               │
├─────────────────────────────────────────────────────────────┤
│  Current State: 'DVD'                                       │
│  Scheduled State Change ─────────────────────────────────►  │
│  New State: 'Book'                                          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
              ┌─────────────────────────────┐
              │ Re-evaluate Component       │
              │ (re-run Component Function) │
              └─────────────────────────────┘
                            │
                            ▼
                     <MyProduct />
```

---

## Slide 7: State Updates & Scheduling (Multiple Updates)

```
┌─────────────────────────────────┐
│            React                │
├─────────────────────────────────┤
│  Current State: 'DVD'           │
├─────────────────────────────────┤
│  Scheduled State Change         │◄─── Multiple updates can be
├─────────────────────────────────┤     scheduled at the same time!
│  Scheduled State Change         │
├─────────────────────────────────┤
│  New State: 'Book'              │
└─────────────────────────────────┘
```

React batches state updates and processes them in order, which is why you should use the function form of setState when updating state based on previous state.
