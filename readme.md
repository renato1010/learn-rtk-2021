# Use the recommended React Redux patters and reduce boilerplate code

## Scafold a React App

We'll use [vite](https://vitejs.dev/) to create a bare bone React app.

```bash
npm init @vitejs/app
```

![start app](./screenshots/react-redix-2021_init_app.gif)

## Install Redux dependencies:

```bash
npm i @reduxjs/toolkit@latest react-redux
```

## Create `features` folder under `src` and then create `counter` under `features` and then the file: `counter.slice.ts` inside

```bash
mkdir -p src/features/counter && touch src/features/counter/counter.slice.ts
```

![](screenshots/features-folder.png)

### in `counter.slice.ts` define:

import from `@reduxjs/toolkit`

```typescript
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
```

type this section of state as:

```typescript
interface CounterState {
  value: number;
}
```

define the initialState:

```typescript
const initialState: CounterState = {
  value: 0,
};
```

create the _counter_ slice: [Using createSlice](https://redux.js.org/tutorials/fundamentals/part-8-modern-redux#using-createslice)

```typescript
const counterSlide = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incremented(state) {
      state.value++;
    },
    amountAdded(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});
```

where:

- **name**: a string that will be used as the prefix for generated action types
- **initialState**: The initial state of the reducer
- **reducers** an object where the keys are strings, and the values are "case reducer" functions that will handle  
  specific actions.

*

### **createSlice will create automatically the action creators** that correspond to each one of the `reducers` object

```typescript
export const { incremented, amountAdded } = counterSlide.actions;
```

### Will export default the `counter reducer` to use it in App Store

```typescript
export default counterSlide.reducer;
```

### One thing to note is that **createSlice** allows us to safely **mutate** the state!

## Create `app` folder under `src` and then create file: `store.ts`

```bash
mkdir src/app && touch src/app/store.ts
```

![](screenshots/app_store.png)

### inside `app/store.ts` define:

import from `@reduxjs/toolkit`

```typescript
import { configureStore } from "@reduxjs/toolkit";
```

And import the `counterReducer` from `conter.slice.ts`

```typescript
import counterReducer from "../features/counter/counter.slice";
```

Configure the store using the [configureStore](https://redux.js.org/tutorials/fundamentals/part-8-modern-redux#using-configurestore)

```typescript
export const store = configureStore({
  reducer: { counter: counterReducer },
});
```

Export two very important types `AppDispatch` type for all action creators and `RootState` the type for the entire store state

```typescript
export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
```

### create file: `src/app/hooks.ts`

Create Hooks for `AppDispatch` and `AppSelector` (use specific slice of global state)

```typescript
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## configure Provider at `main.tsx`

```typescript
import { Provider } from "react-redux";
import { store } from "./app/store";
```

Configure `Provider`

```typescript
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

## Now use Hooks on `App.tsx`

Import dependencies

```typescript
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { incremented } from "./features/counter/counter.slice";
```

Fortunatelly the **App.tsx** demo code use a counter, we'll take advantage of that!

**comment** `useState` for `[count, setCount]`

```typescript
function App() {
  // const [count, setCount] = useState(0);
  return (
    <div className="App">
```

Add our React Redux Hooks

```typescript
const count = useAppSelector((state) => state.counter.value);
const dispatch = useAppDispatch();
```

Around line 21 change this:

```typescript
<button type="button" onClick={() => setCount((count) => count + 1)}>
```

For this:

```typescript
<button type="button" onClick={() => dispatch(incremented())}>
```

Run App in Dev: Click on count button

```bash
npm run dev
```

![](screenshots/dispatch_incremented_.gif)
