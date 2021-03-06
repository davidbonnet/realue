import test from 'ava'
import { create } from 'react-test-renderer'

import { $ } from '../tools'
import { object } from '../objects'

import { ThrownValue } from './'

test('returns a function', (assert) => {
  assert.is(typeof object, 'function')
  assert.is(typeof object(Function.prototype), 'function')
})

const Property = ({ value, name }) => $('li', name, ': ', value)
const Movie = object(({ property }) =>
  $('ul', $(Property, property('title')), $(Property, property('year'))),
)

test('decorates object component', (assert) => {
  assert.snapshot(
    create($(Movie, { value: { title: 'Serenity', year: 2005 } })).toJSON(),
  )
})

test('handles null values', (assert) => {
  assert.snapshot(create($(Movie)).toJSON())
})

test('sets properties in non-edition mode', (assert) => {
  const rendering = create($(Movie))
  const { root } = rendering

  const properties = root.findAllByType(Property)
  assert.is(properties.length, 2)

  const [title, year] = properties
  assert.is(title.props.name, 'title')
  assert.is(year.props.name, 'year')

  assert.is(title.props.onChange, undefined)
  assert.is(year.props.onChange, undefined)

  rendering.unmount()
})

test('sets properties in edition mode', (assert) => {
  const onChange = (value, name, payload) => {
    throw new ThrownValue({ value, name, payload })
  }
  const rendering = create($(Movie, { onChange, name: 'movie' }))
  const { root } = rendering

  const properties = root.findAllByType(Property)

  const [title, year] = properties
  assert.is(typeof title.props.onChange, 'function')
  assert.is(typeof year.props.onChange, 'function')

  const { value: result } = assert.throws(() => {
    const { onChange, name } = title.props
    onChange('Serenity', name, null)
  })
  assert.deepEqual(result, {
    value: { title: 'Serenity' },
    name: 'movie',
    payload: null,
  })

  rendering.unmount()
})
