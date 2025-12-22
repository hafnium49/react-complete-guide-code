# Class-based Components: An Alternative To Functions

## Slide 1: Class-based Components: An Alternative To Functions

| Functional Components | Class-based Components |
|-----------------------|------------------------|
| Default & Most Modern Approach! | Was Required In The Past |

**Functional:**
```jsx
function Product(props) {
  return <h2>A Product!</h2>
}
```
Components are regular JavaScript functions which return renderable results (typically JSX)

**Class-based:**
```jsx
class Product extends Component {
  render() {
    return <h2>A Product!</h2>
  }
}
```
Components can also be defined as JS classes where a `render()` method defines the to-be-rendered output

---

## Slide 2

> Traditionally (React < 16.8), you had to use Class-based Components to manage "State"

---

## Slide 3

> React 16.8 introduced "React Hooks" for Functional Components

---

## Slide 4

> Class-based Components Can't Use React Hooks!

---

## Slide 5: Class-based Component Lifecycle

| Lifecycle Method | Description | useEffect Equivalent |
|------------------|-------------|---------------------|
| `componentDidMount()` | Called once component mounted (was evaluated & rendered) | `useEffect(…, [])` |
| `componentDidUpdate()` | Called once component updated (was evaluated & rendered) | `useEffect(…, [someValue])` |
| `componentWillUnmount()` | Called right before component is unmounted (removed from DOM) | `useEffect(() => { return () => {…}}, [])` |

---

## Slide 6

> You don't have to use Functional Components – it is fine to use Class-based Ones instead

---

## Slide 7: Class-based vs. Functional Components

**Prefer functional components**

Use class-based if:
- You prefer them
- You're working on an existing project or in a team where they're getting used
- You build an "Error Boundary"
