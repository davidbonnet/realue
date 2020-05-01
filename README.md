# Realue

[![NPM Version](https://img.shields.io/npm/v/realue.svg)](https://www.npmjs.org/package/realue)
[![Build Status](https://travis-ci.org/davidbonnet/realue.svg?branch=master)](https://travis-ci.org/davidbonnet/realue)
[![Coverage](https://codecov.io/gh/davidbonnet/realue/branch/master/graph/badge.svg)](https://codecov.io/gh/davidbonnet/realue)
[![Dependency Status](https://david-dm.org/davidbonnet/realue/status.svg)](https://david-dm.org/davidbonnet/realue)
[![DevDependency Status](https://david-dm.org/davidbonnet/realue/dev-status.svg)](https://david-dm.org/davidbonnet/realue?type=dev)

⚛️ Simple value management for React components.

### Features

- Frees developers from value handling logic so that they can focus on the user experience.
- Enforces reusable components based on `{ value, name, onChange(value, name, payload?) }` properties.
- Provides helpers for commonly used value types.

## Contents

- [Installation](#installation)
- [Import](#import)
- [API](#api)
- [Demo](#demo)

## Installation

Install with the [Node Package Manager](https://www.npmjs.com/package/realue):

```bash
npm install realue
```

Alternatively, checkout this repository and install the development dependencies to build the module file:

```bash
git clone https://github.com/davidbonnet/realue.git
cd realue
npm install
```

## Import

Everything is exported from the main entry-point.

With JavaScript 6 modules:

```js
import { object } from 'realue'
```

With CommonJS:

```js
const { object } = require('realue')
```

## API

### Overview

<details>
  <summary>Show caption</summary>

- 🏗 Under construction: the implementation is subject to change soon
- ➡️ Arguments
- ⬆️ Used props: `{ required, optional? }`
- ⬇️ Injected props: `{ always, optional? }`

</details>

<br />

The `realue` module exposes the following functions:

<!-- MarkdownTOC autolink="true" levels="3,4" -->

- [Element creator](#element-creator)
  - [`$()`](#%24)
- [Value-based decorators](#value-based-decorators)
  - [`defaultValue`](#defaultvalue)
  - [`initialValue`](#initialvalue)
  - [`resilient`](#resilient)
  - [`transformable`](#transformable)
  - [`filterable`](#filterable)
  - [`delayable`](#delayable)
  - [`suspendable`](#suspendable)
  - [`synced`](#synced)
  - [`editable`](#editable)
  - [`cyclable`](#cyclable)
  - [`promised`](#promised)
  - [`toggledEditing`](#toggledediting)
  - [`fromValue()`](#fromvalue)
  - [`persisted`](#persisted)
- [Promised-based tools](#promised-based-tools)
  - [`on()`](#on)
  - [`sleep()`](#sleep)
  - [`until()`](#until)
  - [`untilOnline()`](#untilonline)
  - [`listenable()`](#listenable)
- [Tooling decorators](#tooling-decorators)
  - [`logProps()`](#logprops)
  - [`omitProps()`](#omitprops)
  - [`groupProps()`](#groupprops)
- [Context](#context)
  - [`fromContext()`](#fromcontext)
  - [`withContext()`](#withcontext)
- [Lifecycle](#lifecycle)
  - [`withEffect()`](#witheffect)
  - [`withImmediateEffect()`](#withimmediateeffect)
  - [`withGlobalEffect()`](#withglobaleffect)
  - [`withImmediateGlobalEffect()`](#withimmediateglobaleffect)
  - [`withHook()`](#withhook)
- [Scoped-based decorators](#scoped-based-decorators)
  - [`scoped()`](#scoped)
  - [`returned()`](#returned)
- [Property-based decorators](#property-based-decorators)
  - [`defaultProp()`](#defaultprop)
  - [`initialProp()`](#initialprop)
  - [`suspendableProp()`](#suspendableprop)
  - [`resilientProp()`](#resilientprop)
  - [`delayableProp()`](#delayableprop)
  - [`editableProp()`](#editableprop)
  - [`syncedProp()`](#syncedprop)
  - [`cyclableProp()`](#cyclableprop)
  - [`promisedProp()`](#promisedprop)
  - [`persistedProp()`](#persistedprop)
  - [`delayableHandler()`](#delayablehandler)
- [Children-based decorators](#children-based-decorators)
  - [`withChildren()`](#withchildren)
  - [`withChild()`](#withchild)
  - [`switchChild()`](#switchchild)
- [Type-oriented decorators](#type-oriented-decorators)
  - [`object`](#object)
  - [`objectProp()`](#objectprop)
  - [`splittable`](#splittable)
  - [`array`](#array)
  - [`removable`](#removable)
  - [`boolean`](#boolean)
  - [`string`](#string)
  - [`number` 🏗](#number-%F0%9F%8F%97)
  - [`date` 🏗](#date-%F0%9F%8F%97)
- [DOM-based decorators](#dom-based-decorators)
  - [`fromEvent()`](#fromevent)
  - [`syncedFocus`](#syncedfocus)
  - [`refreshable`](#refreshable)
  - [`refreshed`](#refreshed)
  - [`onKeysDown()`](#onkeysdown)
  - [`domProps`](#domprops)
  - [`withNode`](#withnode)
  - [`forwardNode`](#forwardnode)
  - [`withBounds()`](#withbounds)
- [Query helpers](#query-helpers)
  - [`Query` object](#query-object)
  - [`queriedProp()`](#queriedprop)
  - [`queried`](#queried)
  - [`retry()`](#retry)
  - [`split()`](#split)
  - [`cache()`](#cache)
  - [`aggregate()`](#aggregate)
  - [`concurrent`](#concurrent)
  - [`toFetchQuery(routes, transform?)`](#tofetchqueryroutes-transform)
  - [`fetchJson()`](#fetchjson)
  - [`logQuery()`](#logquery)
  - [`queryString()`](#querystring)
  - [`searchParams()`](#searchparams)
- [Immutability-oriented tools](#immutability-oriented-tools)
  - [`EMPTY_ARRAY`](#empty_array)
  - [`EMPTY_OBJECT`](#empty_object)
  - [`insertItem()`](#insertitem)
  - [`replaceItem()`](#replaceitem)
  - [`setItem()`](#setitem)
  - [`setProperty()`](#setproperty)
  - [`setProperties()`](#setproperties)
  - [`setPath()`](#setpath)
- [Asynchronous helpers](#asynchronous-helpers)
  - [`timeout()`](#timeout)
  - [`interval()`](#interval)
- [Storage helpers](#storage-helpers)
  - [`sessionStorage`](#sessionstorage)
  - [`localStorage`](#localstorage)
- [Prop helpers](#prop-helpers)
  - [`picked()`](#picked)
  - [`omitted()`](#omitted)
  - [`hasProp()`](#hasprop)
  - [`hasNotProp()`](#hasnotprop)
  - [`hasProps()`](#hasprops)
  - [`hasNotProps()`](#hasnotprops)
  - [`same()`](#same)
  - [`different()`](#different)
- [Formatters](#formatters)
  - [`replaceAll()`](#replaceall)

<!-- /MarkdownTOC -->

### Element creator

#### `$()`

> ➡️ `(component, propsOrChild, ...children)`

Creates a react element from the provided `component`, setting its props to `propsOrChild` if it is an object or `null`, and its children to `propsOrChild` if it is not an object and the rest of the provided `children`.

Similar to a reduced version of [hyperscript](https://github.com/hyperhype/hyperscript).

<details>
  <summary>Example</summary>

```js
$(
  'div',
  $('h1', 'Realue'),
  $('p', 'A simple set of tools and decorators for React.'),
  $('p', { style: { color: 'gold' } }, 'Watchout, it is very addictive.'),
)
```

</details>

### Value-based decorators

#### `defaultValue`

> ⬆️ `{ defaultValue?, value? }`

> ⬇️ `{ value? }`

Sets `value` to `defaultValue` if `value` is `nil`.

#### `initialValue`

> ⬆️ `{ initialValue?, value? }`

> ⬇️ `{ value? }`

Sets `value` to `initialValue` on first render, if `initialValue` is not `nil`, then to `value` for subsequent renders.

#### `resilient`

> ⬆️ `{ value? }`

> ⬇️ `{ value }`

Keeps the last non-`nil` value of prop `value`.

#### `transformable`

> ⬆️ `{ transformValue?, transformOnChange? }`

> ⬇️ `{ value?, onChange? }`

Replaces `value` with the return value of `transformValue(value, previous?: { transformedValue, value })`, if set. Note that `previous` is not provided when the component first mounts, since there are no previous prop values.
Replaces `value` passed to `onChange(value, name, payload)` with the return value of `transformOnChange(value, name, payload, previous: { transformedValue?, value? })`, if set.

#### `filterable`

> ⬆️ `{ filterValue?, filterOnChange? }`

> ⬇️ `{ onPush }`

Prevents `value` update if `filterValue(value, previousValue)` is set and returns `false`.
Prevents `onChange` call if `filterOnChange(value, name, payload)` is set and returns `false`. Using `onPush` calls `onChange` unconditionally.

#### `delayable`

> ⬆️ `{ onChange, delay }`

> ⬇️ `{ onChange, onPush(value, name, payload?) }`

Delays `onChange` calls until after `delay` milliseconds have elapsed since the last call.
Renames undelayed `onChange` as `onPush`.

#### `suspendable`

> ⬆️ `{ value, delay? }`

> ⬇️ `{ value? }`

Suspends `value` changes for `delay` milliseconds. Subsequent `value` or `delay` changes cancel previous suspensions. Last suspension is canceled if `value` is set to the value prior the start of the suspension.
Calling the injected method `onPull` immediately sets `value` to the latest value.

#### `synced`

> ⬆️ `{ value?, onPull? }`

> ⬇️ `{ value, onChange, onPull? }`

Enables prop `value` to be locally editable while staying in sync with its parent value.
The prop can be updated with prop `onChange(value, name, payload)`, which triggers the optional parent prop `onChange`.
Calling `onPull()` sets the local value to the parent value.
The return value of the optional parent prop `onPull(newValue, previousValue)` is used on prop `value` changes or when calling `onPull()`.

#### `editable`

> ⬆️ `{ value, name, onChange, onPull(value, previousValue)? }`

> ⬇️ `{ value, onChange, onPull(), onPush(payload?) }`

Enables the `value` prop to be locally editable when `onChange` is set, while staying in sync with its parent value.
The value can be updated with prop `onChange(value, name, payload)`, which triggers the parent prop `onChange`.
Calling `onPull()` sets the local value to the parent value.
The return value of the optional parent prop `onPull(newValue, previousValue)` is used on `value` changes or when calling `onPull()`.

#### `cyclable`

> ⬆️ `{ value, values?, name, onChange }`

> ⬇️ `{ onCycle(payload?) }`

Injects prop `cycle(payload)` that cycles the `value` prop through the values of `values` prop, which default to `[false, true]`. Calls `onChange(value, name, payload)`.

#### `promised`

> ⬆️ `{ value? }`

> ⬇️ `{ value, done, error }`

Replaces promise `value` with `{ done, error, value }`.
Before the promise resolves, `done` is `false` and `value` is `undefined`.
If an error occured in the promise, `error` is set to it. Otherwise, the `value` is set to the resolved value and `done` is `true`.
If a new promise is provided, the previously resolved `value` is kept until the new one resolves.

#### `toggledEditing`

> ⬆️ `{ editing?, onChange, onPush? }`

> ⬇️ `{ editing, onChangeEditing, onToggleEditing }`

Sets the `editing` prop and enables its toggling through the `onToggleEditing()` prop.

#### `fromValue()`

> ➡️ `(path)`

> ⬆️ `{ name, onChange? }`

> ⬇️ `{ onChange(value) }`

Adapts `onChange` for components that call it by providing the `value` as a first argument. If the `path` is not `nil`, extracts the value from `get(value, path)`.

#### `persisted`

> ⬆️ `{ value?, onChange? }`

> ⬇️ `{ value? }`

Persists prop `value` in the storage found in prop `storage`, optionally prepending the value found in `domain` to the key when looking for the value. On mount, if the value is found in the storage, it is set to prop `value`. Its value is updated in the storage when `onChange(value, name, payload)` is called.

### Promised-based tools

#### `on()`

> ➡️ `(target, event, listener?, options?)`

Listens for `event` on `target`, calling `listener(event)` at each incoming `event`. The provided `options` are identical to those provided to `addEventListener`.
Returns a function that removes the `listener` from the `target` for the specified `event`.
If `listener` is not defined, returns a function that accepts the remaining `(listener, options)` arguments.

#### `sleep()`

> ➡️ `(duration, signal)`

Returns a promise that resolves after at least `duration` milliseconds.
If a `signal` is provided, listens to it to cancel the promise.

#### `until()`

> ➡️ `(register, signal, sentinel = stubTrue)`

Listens for an event with the provided `register` function until `sentinel(event)` returns a truthy value.
If a `signal` is provided, listens to it to cancel the promise.

#### `untilOnline()`

> ➡️ `()`

Returns a promise that waits for the browser to be back online.
Resolves to `true` if it it was offline before calling this function, `false` otherwise.
If a `signal` is provided, listens to it to cancel the promise.

#### `listenable()`

> ➡️ `(initialValue)`

Returns a listenable value set to the provided `initialValue` encapsulated in an object with the following properties:

- `value`: the actual value
- `on(listener)`: a `listener` registerer that returns an unregisterer for this function
- `set(value)`: a new `value` setter that gets emitted to all registered listeners

<details>
  <summary>Example</summary>

```js
const height = listenable(0)
function log(value) {
  console.log(`Updated to ${value}`)
}
const off = height.on(log)
// Returns 0
height.value
// Calls `log(300)`
height.set(300)
// Stops loging value changes
off()
```

</details>

### Tooling decorators

#### `logProps()`

> ➡️ `(propNames, title?)`

Logs the provided `propNames` whenever they change.
Uses `title` as console group (defaults to decorated component name).

This function can be made available globally by importing `realue/src/register-loggers.js` first.

#### `omitProps()`

> ➡️ `(propNames)`

Removes provided `propNames`.

#### `groupProps()`

> ➡️ `(destinationName, propNames)`

Groups `propNames` into an object stored at `destinationName` and updates them when any property value listed in `propNames` changes.

### Context

#### `fromContext()`

> ➡️ `(provider, propName = 'value')`

> ⬆️ `{}`

> ⬇️ `{ [propName] }`

Injects a context `provider` that takes its value from `[propName]`.

#### `withContext()`

> ➡️ `(consumer, propName = 'value')`

> ⬆️ `{}`

> ⬇️ `{ [propName] }`

Injects the value of the context `consumer` into `[propName]`.

### Lifecycle

#### `withEffect()`

> ➡️ `(shouldHandleOrKeys, handler)`

Similar to `useEffect`. Runs `handler(props)` at mount and on update when `shouldHandleOrKeys`, in case it is an array of prop names, mentions a prop name whose value changed, or, in case of a function, returns `true` when called with `(prevProps, nextProps)`.
If the handler returns a callback, it is called on update before the next `handler` call or on unmount.

<details>
  <summary>Example</summary>

```js
// Listens for a given event and updates whenever `event` or `listener` changes
const withListener = withEffect(
  ['event', 'listener'],
  ({ event: eventName, listener }) => {
    window.addEventListener(eventName, listener)
    return () => window.removeEventListener(eventName, listener)
  },
)
```

</details>

#### `withImmediateEffect()`

> ➡️ `(shouldHandleOrKeys, handler)`

Similar to `withEffect`, except that it runs the `handler` at component construction and before each render if `shouldHandleOrKeys` returns `true`.

#### `withGlobalEffect()`

> ➡️ `(handler)`

Runs `handler()` when the first element of this component is mounted.
If the handler returns a callback, it is called when the last element of this component is unmounted.
If the handler returns `false`, it will never be run again for this component.

#### `withImmediateGlobalEffect()`

> ➡️ `(handler)`

Runs `handler()` when the first element of this component is constructed (that is, before it mounts).
If the handler returns a callback, it is called when the last element of this component is unmounted.
If the handler returns `false`, it will never be run again for this component.

#### `withHook()`

> ➡️ `(hook, source, result)`

Uses the provided `hook`, with the arguments extracted from `source`,
and reinjects the value from `result` back into the props.

<details>
  <summary>Example</summary>

```js
const Counter = compose(
  withProps({ initialCount: 0 }),
  withHook(useState, ['initialCount'], ['count', 'onChangeCount']),
)(({ count, onChangeCount }) =>
  $(
    'div',
    'Count: ',
    count,
    $('button', { onClick: () => onChangeCount(count + 1) }, 'Increment'),
  ),
)
```

</details>

### Scoped-based decorators

#### `scoped()`

> ➡️ `(decorators)`

> ⬆️ `{ [any] }`

> ⬇️ `{}`

Processes the `decorators` in an isolated props scope so as to avoid poluting the passed props.

<details>
  <summary>Example</summary>

```js
compose(
  withProps({ value: 1 }),
  scoped(withProps({ value: 2, otherValue: 3 })),
  // Logs unique prop `value` that equals `1`
  logProps(),
)
```

</details>

#### `returned()`

> ➡️ `(propsMapperOrMap)`

> ⬆️ `{ [any] }`

> ⬇️ `{ __return }`

Enables the injection of props from an isolated scope. Similar to `picked()`, the `propsMapperOrMap` can be a function that takes the current props and returns the props to inject, or a name list or map of prop names similar to the one provided to `picked()`.

<details>
  <summary>Examples</summary>

```js
scoped(...decorators, returned({ user: 'value' }))

scoped(...decorators, returned(omitted(['value'])))
```

</details>

### Property-based decorators

#### `defaultProp()`

> ➡️ `({ name, defaultName? } | name)`

> ⬆️ `{ [name]?, [defaultName]? }`

> ⬇️ `{ [name]? }`

Sets `[name]` to `[defaultName]` if `[name]` is `nil`.

#### `initialProp()`

> ➡️ `({ name, initialName? } | name)`

> ⬆️ `{ [name]?, [initialName]? }`

> ⬇️ `{ [name]? }`

Sets `[name]` to `[initialName]` on first render if `[initialName]` is not `nil`, then to `[name]` for subsequent renders.

#### `suspendableProp()`

> ➡️ `({ name, delayName?, onPullName? } | name)`

> ⬆️ `{ [name], [delayName] }`

> ⬇️ `{ [name], [onPullName] }`

Suspends `[name]` changes for `[delayName]` milliseconds. Subsequent `[name]` changes cancel previous suspensions.
Calling the injected method `[onPullName]` immediately sets `[name]` to the latest value.
If `[delayName]` is falsy, no suspension occurs, nor the injection of `[onPullName]`.

#### `resilientProp()`

> ➡️ `({ name, constantName } | name)`

> ⬆️ `{ [name]? }`

> ⬇️ `{ [name] }`

Keeps the last non-`nil` value of prop `[name]`.
If `constantName` is provided, keeps the last non-`nil` value of prop `[name]` only if prop `[constantName]` did change.
If `delayName` is provided, unconditionally updates the value of prop `[name]` only if prop `[delayName]` is truthy.

#### `delayableProp()`

> ➡️ `({ name, delayName?, onPushName?, mode? } | name)`

> ⬆️ `{ [name], [delayName] }`

> ⬇️ `{ [name], [onPushName] }`

Delays `[name]` calls until after `[delayName]` milliseconds have elapsed since the last call if `options.mode` is `'debounce'` (default value), or calls `[name]` at most once every `[delayName]` milliseconds if `options.mode` is `'throttle'`. The `mode` can also be a function that returns a callback based from the `([name], [delayName])` arguments.
Renames undelayed `[name]` as `['onPush' + name]`.
If `[delayName]` is falsy, no delay occurs nor the injection of `[onPushName]`.

#### `editableProp()`

> ➡️ `({ name, onChangeName? } | name)`

> ⬆️ `{ [name]? }`

> ⬇️ `{ [onChangeName] }`

Enables a value prop of a given `name` to be locally editable.
The value can be updated with `onChangeName`.

#### `syncedProp()`

> ➡️ `({ name, onChangeName?, onPullName? } | name)`

> ⬆️ `{ [name]?, [onPullName]? }`

> ⬇️ `{ [name], [onChangeName], [onPullName]? }`

Enables a prop with a given `name` to be locally editable while staying in sync with its parent value.
The prop can be updated with prop `[onChangeName](value, name, payload)`, which triggers the optional parent prop `[onChangeName]`.
Calling `[onPullName]()` sets the local value to the parent value.
The return value of the optional parent prop `[onPullName](newValue, previousValue)` is used on prop `[name]` changes or when calling `[onPullName]()`.

#### `cyclableProp()`

> ➡️ `({ name, valuesName?, onCycleName?, onChangeName?, nameName? } | name)`

> ⬆️ `{ [name]? }`

> ⬇️ `{ [onChangeName] }`

Injects prop `[onCycleName](payload)` that cycles the value of prop `[name]` through the values found in prop `[valuesName]` which default to `[false, true]`.
Calls `[onChangeName](value, name, payload)` with `name` taken from prop `[nameName]` or `name`.

#### `promisedProp()`

> ➡️ `(name)`

> ⬆️ `{ [name]? }`

> ⬇️ `{ [name], [doneName], [errorName] }`

Replaces the promise at prop `[name]` with `{ done, error, value }`.
Before the promise resolves, `done` is `false` and `value` is `undefined`.
If an error occured in the promise, `error` is set to it. Otherwise, the `value` is set to the resolved value amd `done` is `true`.
If the propmise at prop `[name]` changes, `done`, `error`, and `value` are reset and any previous promise is discarded.

#### `persistedProp()`

> ➡️ `({ name, onChangeName, domainName, storageName } | name)`

> ⬆️ `{ [name]?, [onChangeName]? }`

> ⬇️ `{ [name]? }`

Persists prop `[name]` in the storage found in prop `[storageName]`, optionally prepending the value found in `[domainName]` to the key when looking for the value. On mount, if the value is found in the storage, it is set to prop `[name]`. Its value is updated in the storage when `[onChangeName](value, name, payload)` is called.

<details>
  <summary>Example</summary>

```js
const STORAGE = new Map()

const PersistedInput = compose(
  withProps({ domain: 'persisted', storage: STORAGE }),
  persisted,
  string,
  fromEvent('target.value'),
  domProps,
)('input')
```

</details>

#### `delayableHandler()`

> ⬆️ `({ handlerName, sentinelName })`

> ⬇️ `{ [handlerName] }`

Delays `[handlerName]` calls until after `[sentinelName]` is truthy.

### Children-based decorators

#### `withChildren()`

> ➡️ `(Component, childProps?, { valueName?, destinationName? })`

> ⬆️ `{ [valueName]?, item? }`

> ⬇️ `{ children }`

Builds an array that maps every item from the `[valueName]` prop (`'value'` by default) with the result of `<Component {...childProps(props)(itemValue, itemIndex)}` and injects it as a `[destinationName]` prop (`'children'` by default).

<details>
  <summary>Example</summary>

```js
function Item({ value }) {
  return $('li', value)
}
const List = compose(
  array,
  withChildren(Item),
)('ul')
const element = $(List, { value: [1, 2, 3] })
```

</details>

#### `withChild()`

> ➡️ `(Component | { [string]: [Component, childProps()] | Component }, childProps(props, name?)?, { destinationName? })`

> ⬆️ `{ [valueName]?, property? }`

> ⬇️ `{ children }`

If `ChildComponentOrMap` is a component, builds an element from the provided `ChildComponentOrMap` with the props from `childProps(props, undefined)` and injects it as a `[destinationName]` prop (`'children'` by default).
Otherwise, if `ChildComponentOrMap` is a mapping of `name: [Component, childProps()] | Component`, transforms this mapping into `name: $(Component, childProps(props, name))` and injects it into the props at `destinationName` (`'children'` by default).
If `childProps` is not defined, defaults to returning the result of `props.property(name)` merged into the props, if `props.property` and `props.name` are defined. Otherwise, all `props` are provided.

<details>
  <summary>Examples</summary>

```js
const Person = compose(
  withChild({
    name: StringInput,
    lastName: StringInput,
    age: NumberInput,
  }),
)(({ children }) => $('div', children.name, children.lastName, children.age))
```

```js
const Article = compose(withChild(Toolbar))(({ value, children }) =>
  $('div', $('p', value), children),
)
```

</details>

#### `switchChild()`

> ➡️ `(propNameOrPicker, { [string]: [Component, childProps()] | Component }, { destinationName? })`

> ⬆️ `props | { [propNameOrPicker]? }`

> ⬇️ `{ children }`

Builds the element from `componentMap[key]`, with `key` being the value of the prop name `propNameOrPicker`, if `propNameOrPicker` is a string, or of the value returned by `propNameOrPicker(props)`, if `propNameOrPicker` is a function.
The `componentMap` values are either a `[Component, childProps()]` couple or just a `Component`.

<details>
  <summary>Example</summary>

```js
const EntityName = compose(
  switchChild('type', {
    user: UserName,
    device: DeviceName,
    setting: SettingName,
    invoice: InvoiceName,
  }),
)(Children)

const name = $(EntityName, { type: 'user', id: '42' })
```

</details>

### Type-oriented decorators

#### `object`

> ⬆️ `{ value?, name, onChange? }`

> ⬇️ `{ value?, property(name, key?), onChangeProperty(value, name, payload?) }`

Provides `property(name, key?)` that returns the props for the child element responsible of the property `name`.
Also provides `onChangeProperty(value, name, payload?)` that sets the property `name` to the provided `value`.
Sets `value` to `{}` if not set.

#### `objectProp()`

Provides `[propertyName](name, key = name)` that returns the props for the child element responsible of the property `name` of the object at `[name]`.
If `[onChangeName]` is set, also provides `[onChangePropertyName](value, name, payload?)` that sets the property `name` of the object at `[name]` to the provided `value`, and `[onChangePropertiesName](values, payload?)` that merges the provided `values` into the object at `[name]`.
Sets `[name]` to `{}` if `nil`.

> ➡️ `(name | { name, onChangeName?, onChangePropertyName?, onChangePropertiesName?, propertyName?, nameName? })`

> ⬆️ `{ [name]?, [onChangeName]? }`

> ⬇️ `{ [name], [propertyName], [onChangePropertyName]?, [onChangePropertiesName]? }`

#### `splittable`

> ⬆️ `{ value?, name, onChange? }`

> ⬇️ `{ properties(names, key?), onChangeProperties(values, names, payload?) }`

Enables dispatching a subset of properties to a child element.

#### `array`

> ⬆️ `{ value?, name, onChange? }`

> ⬇️ `{ value?, item(index, key = index), onChangeItem(value, index, payload?), onAddItem(item, index, payload) }`

Provides `item(index, key = index)` that returns the props for the child element responsible of the item `index`.
Also provides `onChangeItem(value, index, payload?)` that sets the item `index` to the provided `value`, and `onAddItem(value, index, payload?)` that inserts an item with the provided `value` at `index`.
Sets `value` to `[]` if not set.

#### `removable`

> ⬆️ `{ name, onChange? }`

> ⬇️ `{ onRemove(payload?) }`

Provides `onRemove(payload?)`, which sets the value to `undefined` and results in removing the item or property.

#### `boolean`

> ⬆️ `{ value? }`

> ⬇️ `{ value? }`

Sets `value` to `false` if not set.

#### `string`

> ⬆️ `{ value? }`

> ⬇️ `{ value? }`

Sets `value` to `''` if not set.

#### `number` 🏗

> ⬆️ `{ value? }`

> ⬇️ `{ value? }`

Sets `value` to `0` if not set.

#### `date` 🏗

> ⬆️ `{ value? }`

> ⬇️ `{ value? }`

Sets `value` to `new Date(0)` if not set.

### DOM-based decorators

#### `fromEvent()`

> ➡️ `(path)`

> ⬆️ `{ name, onChange? }`

> ⬇️ `{ onChange(event) }`

Creates an `onChange` handler that takes the value from `get(event, path)`.
If `path` is `nil`, the value is taken from the `value` prop instead.

#### `syncedFocus`

> ⬆️ `{ focus }`

> ⬇️ `{ onFocus, onBlur }`

Exposes the synced `focus` state of an element through the `onFocus()` and `onBlur()` callbacks.

#### `refreshable`

> ⬇️ `{ onRefresh() }`

Adds an `onRefresh()` prop that enables refreshing the component.

#### `refreshed`

> ⬆️ `{ delay? }`

> ⬇️ `{ onRefresh }`

Refreshes the component at a given `delay` interval. See `interval` for the behavior based on `delay`.

#### `onKeysDown()`

> ➡️ `(keys)`

> ⬆️ `{}`

> ⬇️ `{ onKeyDown }`

Triggers the specified `keys` handlers on key down. Each handler is called with the current `(props, event)`.

#### `domProps`

> ⬆️ `{...domProps, ...nonDomProps}`

> ⬇️ `{...domProps}`

Only keeps DOM properties.

#### `withNode`

> ⬆️ `{}`

> ⬇️ `{ node }`

Injects a `node` reference created with `React.createRef()` to be applied on any element through the `ref` attribute.

<details>
  <summary>Example</summary>

```js
const Example = withNode(({ node }) =>
  $('div', { ref: node }, node.current ? 'Referenced' : 'Not referenced'),
)
```

</details>

#### `forwardNode`

> ⬆️ `{ key }`

> ⬇️ `{ node }`

Renames the provided `ref` into `node`.

#### `withBounds()`

> ➡️ `(properties = ['height', 'width', 'top', 'left'], offset?)`

> ⬆️ `{ node, delay? }`

> ⬇️ `{ top?, left?, width?, height?, pullBounds }`

Injects bounds `properties` returned from `offset(node.current)`, and `updateBounds` which triggers a bounds update. Uses the optional `delay` prop as a debounce duration when reading element bounds.

<details>
  <summary>Example</summary>

```js
withBounds(['width', 'height'])(({ width, height }) =>
  $('div', 'Dimensions: ', width, ' x ', height),
)
```

</details>

### Query helpers

#### `Query` object

Either a single query continaing the following properties:

- `type: string`: a string identifying the type object to fetch
- `method: enum { 'get', 'list', 'post', 'put', 'patch', 'delete' }`: method to apply on the queried object
- `refresh: boolean`: if `true`, bypasses any cache
- `value`: details of the object to fetch in case of `get`, or contents to save in case of `post`, `put`, and `patch`
- `fields: string[]`: array of the field names of the object to fetch
- `start: number`: in case of `list` method, start offset
- `limit: number`: in case of `list` method, maximum amount of items to return
- `filter: { [string]: string | boolean | number | object }`: values used to filter
- `order: { key: string, descending: boolean }[]`: array of ordering parameters

Or multiple queries grouped into a single property:

- `queries: query[] | { [string]: query }`: array or map of queries

#### `queriedProp()`

> ➡️ `({ queryName, valueName?, onAbortName?, requestName? } | name)`

> ⬆️ `{ [queryName], [requestName = 'request'] }`

> ⬇️ `{ [valueName?], [onAbortName?] }`

Calls `[requestName](query)` whenever the query at `[queryName]` changes and stores the result progress at `[valueName]`.
An abortion method at `[onAbortName]` is injected. If called before the query resolves, it aborts it, sending the exception to `[valueName].error`.

#### `queried`

> ⬆️ `{ query, request }`

> ⬇️ `{ value, onAbort }`

Calls `request(query)` whenever the query at `query` changes and stores the result progress at `value`.
An abortion method at `onAbort` is injected. If called before the query resolves, it aborts it, sending the exception to `value.error`.

#### `retry()`

> ➡️ `({ amount?, delay?, delayDelta? })`

Retries a failed query call up to `amount` times, with a given `delay` in milliseconds at ±`delayDelta` milliseconds.
Note that an `amount` set to `Infinity` results in indefinitely trying to resolve a query call.
Only instances of `QueryError` will result in new tries. Other errors will propagate immediately.

#### `split()`

> ➡️ `(condition, left, right?)`

Dispatches an incoming query to `left` if `condition(query)` returns a truthy value, `right` otherwise. This is helpful for sending queries to different resolvers.

Example:

const request = compose(
split(query => query.protocol === 'gql', gqlHandlers),
fetchJson(),
)(identity)

#### `cache()`

> ➡️ `({ serialize?, engine?, duration? })`

Caches the result of a query if `serialize` returns a non-empty string key. The `engine` should follow the `Map` API. Elements are kept in the cache until the `duration` in milliseconds expires.
Note that a `duration` set to `Infinity` indefinitely keeps items in the cache.

#### `aggregate()`

> ➡️ `({ categorize?, serialize?, delay?, reduce?, pick? })`

Aggregates multiple incoming query calls into one query.
Queries are grouped according to the string key returned by `categorize(query)`. Inside a group, each query is identified with `serialize(query)`.
The aggregated query is built from the object returned by `reduce(queries)`, after at least `delay` milliseconds after the first non-aggregated aggregatable query call.
When the aggregated query resolves, the result is dispatched back to each aggregatable query call of the category by dispatching the result for each query returned by `pick(result, query)`.`

#### `concurrent`

Runs concurrent queries if `query.queries` contains a list or a map of queries, resulting in a list or map of resolved queries.
Otherwise, passes the query to the next handler.

#### `toFetchQuery(routes, transform?)`

> ➡️ `(routes, transform?)`

Converts a `query` into a DOM Fetch query. The resulting `query` is passed onto `transform(query)` before sending it.
To be used in conjunction with `fetchJson()`.

#### `fetchJson()`

Calls the DOM Fetch `query` and processes the successful response with the provided `responseHandler`, which defaults to requesting the parsed `json()` response.
To be used in conjunction with `toFetchQuery()`.

#### `logQuery()`

> ➡️ `(title?)`

Logs the outgoing query and the incoming result or the error.

This function can be made available globally by importing `realue/src/register-loggers.js` first.

#### `queryString()`

> ➡️ `(values)`

Returns a key-sorted query string from provided `values` object.

#### `searchParams()`

> ➡️ `(query)`

Returns an object containing all search parameters of a provided `query`.

### Immutability-oriented tools

#### `EMPTY_ARRAY`

Immutable empty array. Using this instead of `[]` avoids having several instances of immutable empty arrays.

#### `EMPTY_OBJECT`

Empty object to be used in immutable values. Using this instead of `{}` avoids having several instances of immutable empty objects.

#### `insertItem()`

> ➡️ `(array, value, index)`

Returns a new array with the `value` inserted into the `array` at the provided `index`, provided `value` is not `undefined`, in which case the `array` is returned untouched.
If the `index` is not provided, the `value` appended to the `array`.
If the `array` is `nil`, it is considered as an `EMPTY_ARRAY`.

#### `replaceItem()`

> ➡️ `(array, previousValue, value)`

Returns a new array with the first occurence of the `previousValue` in `array` replaced by `value`.
Returns the same `array` if the `previousValue` is not found.
If the `array` is `nil`, it is considered as an `EMPTY_ARRAY`.

#### `setItem()`

> ➡️ `(array, index, value)`

Returns a new array with `array[index]` set to `value` if `array[index]` is strictly different from `value`. Otherwise, returns the provided `array`.
If `value` is `undefined`, ensures that the returned array does not contain the item found at `index`.
If `index` is greater than `array.length`, appends `value` to the `array`.
If `index` equals `-1` or is `undefined`, returns the `array` untouched.
If the `array` is `nil`, it is considered as an `EMPTY_ARRAY`.

#### `setProperty()`

> ➡️ `(object, key, value)`

Returns a new object with `object[key]` set to `value` if `object[key]` is strictly different from `value`. Otherwise, returns the provided `object`.
If `value` is `undefined`, ensures that the returned object does not contain the `key`.
If `key` is `undefined`, returns the `object` untouched.
If `object` is `nil`, it is considered as an `EMPTY_OBJECT`.

#### `setProperties()`

> ➡️ `(object, values)`

Returns a new object with the properties of `values` merged into `object`.

#### `setPath()`

> ➡️ `(target, path, value)`

Returns a new object or array based on `target` with its `path` set to `value`.
Recursively uses `setItem` and `setProperty` based on the type of each `path` item (`number` and `object`, respectively).
If `path` is `nil`, returns `value`.

### Asynchronous helpers

#### `timeout()`

> ➡️ `(duration, callback)`

Calls `callback` after at least `duration` milliseconds. Returns a function that cancels the future call of `callback`, if not already called.

#### `interval()`

> ➡️ `(duration, callback)`

Calls `callback` at least every `duration` milliseconds. Returns a function that stops future calls of `callback`. If `duration` is falsy, uses `requestAnimationFrame`.

### Storage helpers

#### `sessionStorage`

Storage that persists between page reloads, until the tab or window is closed. To be used with `persistedProp()` or `persisted`.

#### `localStorage`

Persistent storage. To be used with `persistedProp()` or `persisted`.

### Prop helpers

#### `picked()`

> ➡️ `(propNamesOrMap)`

Returns a function that returns a subset of the provided object or a mapping of selected property paths.

<details>
  <summary>Examples</summary>

```js
// Only keeps the `value` prop
mapProps(picked(['value']))

// Only keeps the `value` prop renamed to `user`
mapProps(picked({ user: 'value' }))

// Injects selected properties of `value`
withProps(
  picked({ done: 'value.done', error: 'value.error', value: 'value.value' }),
)
```

</details>

#### `omitted()`

> ➡️ `(propNames)`

Returns a function that returns all props without the ones whose name is in `propNames`.

<details>
  <summary>Example</summary>

```js
// Only omit the `value` prop
returned(omitted(['value']))
```

</details>

#### `hasProp()`

> ➡️ `(name)`

Returns a function that checks if `props[name]` is not `nil`.

#### `hasNotProp()`

> ➡️ `(name)`

Returns a function that checks if `props[name]` is `nil`.

#### `hasProps()`

> ➡️ `(names)`

Returns a function that checks if every prop `name` in `names` is not `nil`.

#### `hasNotProps()`

> ➡️ `(names)`

Returns a function that checks if some prop `name` in `names` is `nil`.

#### `same()`

> ➡️ `(a, b, properties, deep = false)`

Returns `true` if objects `a` and `b` have the same `properties`.
Unless provided, `properties` are the combined set of property names from `a` and `b`.
If `deep` is `true`, considers properties as paths (e.g., `p1.p2`).

#### `different()`

> ➡️ `(properties, deep = true)`

Returns a function that returns `true` if one of the `properties` of the objects `(a, b)` differs. This is usefull when deep-nested comparisons are required.

<details>
  <summary>Example</summary>

```js
// Extracts the name from a `value` prop and updates it only if it changes
const withName = withPropsOnChange(
  different(['value.name']),
  ({ value: { name } }) => ({ name }),
)
```

</details>

### Formatters

#### `replaceAll()`

> ➡️ `(string, find, replace)`

Replaces all occurrences of `find` by `replace` in the provided `string`.

## Demo

A demo application can be run in the browser with:

```bash
npm run build:watch
open http://localhost:1234
```

You can then inspect and edit the code in the `demo/` folder.
