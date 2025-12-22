# JavaScript Refresher

*In case it's been some time...*

---

## Slide 1: JavaScript Refresher

> In case it's been some time...

---

## Slide 2

> This course section is **optional**!

It's recommended if you haven't used JavaScript in a while or if you don't have a lot of JavaScript experience

---

## Slide 3

> This section **does not replace** a JavaScript course!

But it will revisit **crucial JavaScript concepts** needed for building **React apps**

---

## Slide 4: JavaScript Refresher Overview

In case it's been some time since you last worked with JavaScript

- Core Syntax & Rules
- Essential, Modern JavaScript Features
- Key JavaScript Features Used In React Apps

---

## Slide 5: JavaScript Can Be Executed In Many Environments

| In the Browser | On any Computer | On mobile Devices |
|----------------|-----------------|-------------------|
| (i.e., as part of websites) | (e.g., server-side code) | (e.g., via embedded websites) |
| JavaScript code can be included in any website | Thanks to Node.js or Deno, JavaScript code can be executed outside of the browser, too | With extra technologies like Capacitor or React Native, you can build mobile apps based on JavaScript |
| The code then executes inside the browser (i.e., on the machine of the website visitor) | The code then executes directly on the machine | The code then executes on the mobile device |

---

## Slide 6: Adding JavaScript Code To A Website

| Between `<script>` Tags | Via `<script>` Import |
|-------------------------|----------------------|
| `<script>alert('Hello')</script>` | `<script src="script.js"></script>` |
| Typically only used for very short scripts | Separates HTML & JavaScript code |
| Can quickly lead to unmaintainable & complex HTML files | Maintaining complex JS-powered apps becomes easier |

---

## Slide 7

> JavaScript code is just **plain text**!

---

## Slide 8: How Code Is Executed

Code is read top to bottom, left to right

---

## Slide 9: JavaScript Code Consists Of "Statements"

**Statement** - The "thing" that gets executed

| Keywords | Identifiers | Values / Expressions |
|----------|-------------|---------------------|
| Built into JavaScript | Defined by developers | Defined by developers |
| Required to "tell" JavaScript that a certain feature is used | Used to identify commands (functions), variables (values) etc. | Hardcoded values or expressions that produce new values |
| `let`, `if`, `for`, ... | `alert()`, `age`, ... | `'Hello world'`, `5 - 3`, ... |

---

## Slide 10: Keywords

Keywords enable language features

`let`, `const`, `if`, `for`, `function`, ...

---

## Slide 11: Identifiers

Identifiers identify "things"

- **Variables**
- **Functions** ("Commands")
- **Parameters**
- **Property**

---

## Slide 12

> JavaScript code is **case-sensitive**!

---

## Slide 13: Identifiers Must Follow Certain Rules & Recommendations

| # | Rule |
|---|------|
| #1 | **Must not contain whitespace or special characters** (except `$` and `_`) |
| | Valid: `$userName`, `age`, `user_name`, `data$`, ... |
| | Invalid: `%userName`, `age/`, `user name`, ... |
| #2 | **May contain numbers but must not start with a number** |
| | Valid: `user3`, `us3r`, ... |
| | Invalid: `3user`, `11players`, ... |
| #3 | **Must not clash with reserved keywords** |
| | Valid: `user`, `age`, `data`, ... |
| | Invalid: `let`, `const`, `if`, ... |
| #4 | **Should use camelCasing** |
| | Recommended: `userName`, `isCorrect`, ... |
| | Uncommon: `user_name`, `iscorrect`, ... |
| #5 | **Should describe what the "thing" it identifies contains or does** |
| | Recommended: `userName`, `isCorrect`, `loadData`, ... |

---

## Slide 14

> **Semicolons** are **optional** (in most cases)!

---

## Slide 15

> **Whitespace** is **ignored** in many cases!

Use it to format your code & improve readability. But avoid adding too much whitespace.

---

## Slide 16

> **React projects** use a **build process**

---

## Slide 17

> The code **you write** is **not** the code that gets **executed** (like this) in the browser

---

## Slide 18

> Your code is **transformed** before it's handed off to the browser

---

## Slide 19: React Projects Use A Build Process

1. Raw, unprocessed React code **won't execute** in the browser
   - **JSX** is not a default JavaScript feature

2. In addition, the code would **not be optimized for production** (e.g., not minified)

**React projects require a build process that transforms your code**

`create-react-app`, `vite` etc. give you such a build process (no custom setup or tweaking needed)

---

## Slide 20: It's All About Data & Values!

- Your tweet is data
- The loaded tweets in the feed are data
- Your location is data
- The calculated route is data
- ...

---

## Slide 21: There Are Different Types Of Values

| String | Number | Boolean | Null & undefined |
|--------|--------|---------|------------------|
| Text values | Positive or negative | True or false | "There is no value" |
| Wrapped with single or double quotes | With decimal point (float) or without it (integer) | A simple "Yes" or "No" value type | `undefined`: Default if no value was assigned yet |
| Can also be created with backticks (\`) | | Typically used in conditions | `null`: Explicitly assigned by developer (reset value) |
| `"Hello World"`, `'Max'`, `` `Hi there` `` | `5`, `-23`, `3.14`, `-8.12` | `true`, `false` | `undefined`, `null` |

Additionally: **Objects**

---

## Slide 22

> **Variables** store **Values**

---

## Slide 23: Variables Are Data Containers

A variable stores a value

- **Variable Identifier**: `userMessage`
- **Value** (Type: String): `"Hi everyone!"`

---

## Slide 24: Why Use Variables?

| 1. Reusability | 2. Readability |
|----------------|----------------|
| Store a value in a variable once and use it as often and in as many places as needed | Organize your code over several lines rather than cramming everything into a single line |

---

## Slide 25: Variables vs Constants

| Variables | Constants |
|-----------|-----------|
| Defined via `let` | Defined via `const` |
| **Can** be re-assigned (i.e., the stored value can be overwritten) | **Cannot** be re-assigned (i.e., the stored value can't be overwritten) |
| `let age = 34;` | `const age = 34;` |
| `age = 29;` (Allowed) | `age = 29;` (Error) |

---

## Slide 26

> **Values** can be **hardcoded**
>
> But they can also be derived via **Expressions & Operators**

---

## Slide 27: Reference Values

**Objects = Reference Values**

```javascript
const hobbies = ["Sports", "Cooking"];
```

- For objects (and arrays are objects!), the **memory address** is stored in the variable
- The underlying value (i.e., the object / array) can be edited **without changing that address**
- The value can therefore be edited **without reassigning** the variable
