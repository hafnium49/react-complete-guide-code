# Testing React Apps

## Slide 1: What is "Testing"?

| Manual Testing | Automated Testing |
|----------------|-------------------|
| Write Code <> Preview & Test in Browser | Code that tests your code |
| Very important: You see what your users will see | You test the individual building blocks of your app |
| ↓ | ↓ |
| Error-prone: It's hard to test all possible combinations and scenarios | Very technical but allows you to test ALL building blocks at once |

---

## Slide 2: Different Kinds Of Automated Tests

| Unit Tests | Integration Tests | End-to-End (e2e) Tests |
|------------|-------------------|------------------------|
| Test the **individual building blocks** (functions, components) **in isolation** | Test the **combination** of multiple building blocks | Test complete scenarios in your app as the user would experience them |
| Projects typically contain dozens or hundreds of unit tests | Projects typically contain a couple of integration tests | Projects typically contain only a few e2e tests |
| The most common / important kind of test | Also important, but focus on unit tests in most cases | Important but can also be done manually *(partially)* |

---

## Slide 3: What To Test

| What? | How? |
|-------|------|
| Test the different building blocks | Test success and error cases, also test rare (but possible) results |
| **Unit Tests:** The smallest building blocks that make up your app | |

---

## Slide 4: Required Tools & Setup

| Running Tests & Asserting Results | Simulating React App/Components |
|-----------------------------------|--------------------------------|
| ↓ | ↓ |
| **Jest** | **React Testing Library** |

> Both tools are already set up for you when using create-react-app

---

## Slide 5: Writing Tests – The Three "A"s

| Step | Description |
|------|-------------|
| **Arrange** | Set up the test data, test conditions and test environment |
| **Act** | Run logic that should be tested (e.g. execute function) |
| **Assert** | Compare execution results with expected results |
