# Working With Forms

## Slide 1: What's Complex About Forms?

> Forms and inputs can assume different states

| One or more inputs are invalid | All inputs are valid |
|-------------------------------|---------------------|
| Output input-specific error messages & highlight problematic inputs | Allow form to be submitted / saved |
| Ensure form can't be submitted / saved | |

---

## Slide 2: When To Validate?

| When form is **submitted** | When an input is **losing focus** | On **every keystroke** |
|---------------------------|----------------------------------|----------------------|
| Allows the user to enter a valid value before warning him/her | Allows the user to enter a valid value before warning him/her | Warns user before he/she had a chance of entering valid values |
| Avoid unnecessary warnings but maybe present feedback "too late" | Very useful for untouched forms | If applied only on invalid inputs, has the potential of providing more direct feedback |

### Best Practice:
Combine validation strategies - validate on submit, but also provide instant feedback on blur (losing focus) for already-touched inputs, and keystroke validation for inputs that were previously invalid.
