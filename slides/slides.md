# JSX Limitations

## Slide 1: The Problem

```jsx
return (
  <h2>Hi there!</h2>
  <p>This does not work :-(</p>
);
```

You **can't return more than one "root" JSX element** (you also can't store more than one "root" JSX element in a variable).

Because this also isn't valid JavaScript:

```jsx
return (
  React.createElement('h2', {}, 'Hi there!')
  React.createElement('p', {}, 'This does not work :-(')
);
```

---

## Slide 2: The Solution: Always Wrap Adjacent Elements

```jsx
return (
  <div>
    <h2>Hi there!</h2>
    <p>This does not work :-(</p>
  </div>
);
```

**Important**: Doesn't have to be a `<div>` - ANY element will do the trick.

---

## Slide 3: A New Problem: "\<div\> Soup"

```html
<div>
  <div>
    <div>
      <div>
        <h2>Some content - yeah, this can really happen.</h2>
      </div>
    </div>
  </div>
</div>
```

In bigger apps, you can easily end up with **tons of unnecessary `<div>`s** (or other elements) which add **no semantic meaning or structure** to the page but **are only there because of React's/ JSX' requirement**.

---

## Slide 4: Introducing Fragments

```jsx
return (
  <React.Fragment>
    <h2>Hi there!</h2>
    <p>This does not work :-(</p>
  </React.Fragment>
);
```

**OR** (shorthand syntax):

```jsx
return (
  <>
    <h2>Hi there!</h2>
    <p>This does not work :-(</p>
  </>
);
```

It's an **empty wrapper component**: It **doesn't render** any real HTML element to the DOM. But it **fulfills React's/ JSX' requirement**.

---

## Slide 5: Understanding React Portals

```jsx
return (
  <React.Fragment>
    <MyModal />
    <MyInputForm />
  </React.Fragment>
);
```

**Real DOM** (without portals):

```html
<section>
  <h2>Some other content ...</h2>
  <div class="my-modal">
    <h2>A Modal Title!</h2>
  </div>
  <form>
    <label>Username</label>
    <input type="text" />
  </form>
</section>
```

**Semantically** and from a "clean HTML structure" perspective, having this nested modal isn't ideal. It is an **overlay to the entire page** after all (that's similar for side-drawers, other dialogs etc.).

---

## Slide 6: Understanding React Portals (continued)

It's a bit like styling a `<div>` like a `<button>` and adding an event listener to it: It'll work, but it's not a good practice.

```jsx
<div onClick={clickHandler}>Click me, I'm a bad button</div>
```

---

## Slide 7-8: React Portals Solution

**With Portals** - the modal is rendered outside the nested structure:

**Real DOM** (with portals):

```html
<div class="my-modal">
  <h2>A Modal Title!</h2>
</div>
<section>
  <h2>Some other content ...</h2>
  <form>
    <label>Username</label>
    <input type="text" />
  </form>
</section>
```

The modal is now rendered at a higher level in the DOM tree, maintaining proper semantic HTML structure while keeping the same React component hierarchy.
