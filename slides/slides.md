# Component-Driven User Interfaces

Building Interactive & Scalable UIs

- React Core Syntax & JSX
- Working with Components
- Working with Data

---

## Slide 2

> React is a JavaScript **library** for building **user interfaces**

---

## Slide 3

> **HTML, CSS & JavaScript** are about building user interfaces as well

---

## Slide 4

> React makes building **complex**, **interactive** and **reactive** user interfaces **simpler**

---

## Slide 5

> React is all about **Components**

---

## Slide 6

> **What** is a **Component**?

---

## Slide 7

> React is all about **Components**
>
> **Because all user interfaces in the end are made up of components**

---

## Slide 8: Why Components?

| Reusability | Separation of Concerns |
|-------------|------------------------|
| Don't repeat yourself | Don't do too many things in one and the same place (function) |

**Split big chunks of code into multiple smaller functions**

---

## Slide 9: How Is A Component Built?

**HTML** + **CSS** + **JavaScript** = **React**

---

## Slide 10: React & Components

React allows you to create **re-usable** and **reactive** components consisting of **HTML and JavaScript** (and CSS)

### Declarative Approach

Define the desired target state(s) and let React figure out the actual JavaScript DOM instructions

---

## Slide 11

> Build your own, **custom HTML Elements**

---

## Slide 12

> **JSX** = "HTML in JavaScript"

---

## Slide 13: Understanding JSX

| JSX (Syntactic sugar) | React.createElement |
|-----------------------|---------------------|
| `<p title="Intro text">React.js is a library for building user interfaces.</p>` | `React.createElement('p', {title: 'Intro text'}, 'React.js is a library for building user interfaces.');` |
| "Syntactic sugar", **does not run** in the browser like this! | Real JavaScript code, would run in the browser like this. But not that nice to use. |

---

## Slide 14: You Build A Component Tree

```
        <App />
       /      \
<Header />   <Tasks />
            /   |   \
      <Task /> <Task /> <Task />
```

Rendered into single HTML page

---

## Slide 15

> **Props** are the "**attributes**" of your "custom HTML elements" (Components)

---

## Slide 16: Passing Data via "Props"

Components can't just use data stored in other components.

```jsx
// In App component
goalItem = "Finish!"
<CourseGoalItem text={goalItem} />

// In CourseGoalItem component
<li>{props.text}</li>
```

Data flows from parent to child via props.
