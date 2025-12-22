# User Interaction & State

Making Apps Interactive & Reactive

- Handling Events
- Updating the UI & Working with "State"
- A Closer Look At Components & State

---

## Slide 2: Updating Data via "State"

| Default Behavior | State | Child Components |
|------------------|-------|------------------|
| By default, React does not care about changes of variables inside of components. It does not re-evaluate the component's JSX markup. | "State" is data managed by React, where changes of the data do force React to re-evaluate ("re-render") the component where the data changed. | Child components of components where state changed are also re-evaluated. |

---

## Slide 3: Lifting State Up

```
        This component has access
            to both components
                 [State]
                <App />
               /        \
    <Expenses />    <NewExpense />
```

- **Data / State is (also) needed here** ← `<Expenses />`
- **Data / State is generated or changed here** ← `<NewExpense />`

**Pass state data via props** ← "Lifting the state up"

---

## Slide 4: Stateful vs Stateless Components

| Stateful Components | Stateless Components |
|---------------------|----------------------|
| React components that manage internal state | React components which only use props and output JSX |
| Typically, you have only a couple of these | Typically, you have plenty of these |
| Also called "smart" components or "containers" | Also called "dumb" or "presentational" components |

---

## Slide 5: Alternative Way Of Building Components

| Functional Components | Class-based Components |
|-----------------------|------------------------|
| JavaScript functions which return JSX code | JavaScript classes as blueprints for components |
| React executes them for you (initially & upon state changes) | render() method for outputting JSX (called by React) |
| Use "React Hooks" for state management | Historically (React < 16.8), the only way of managing state! |
