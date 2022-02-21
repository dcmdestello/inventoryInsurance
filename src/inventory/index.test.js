import reducer, { addInventoryItem, setInventoryItems } from './reduxSlice'
import { checkItemCanBeAdded, useAddInventoryItem } from './index';
import {renderHook, act} from '@testing-library/react-hooks';
import * as redux from 'react-redux';
import { useToast } from 'react-native-toast-notifications';

test('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    items: [],
  });
});

const mockItem1 = 	{
  id: 1,
  name: "Cartier ring",
	value: 5000,
	type: "JEWELRY",
	description: "Gift from my grandfather",
	photo: "https://i.ibb.co/znXC7LQ/marcus-lewis-U63z-XX2f7ho-unsplash.jpg",
};

const mockItem2 = 	{
  id: 2,
  name: "Guitar",
	value: 10000,
	type: "OTHER",
	photo: "https://i.ibb.co/4dfndL2/louis-hansel-M-d-J-Scwa-LE-unsplash.jpg",
};


test('Should add an inventory item', () => {
  let state = { items: [] };
  state = reducer(state, addInventoryItem(mockItem1));
  expect(state).toEqual({
    items: [mockItem1],
  });
  state = reducer(state, addInventoryItem(mockItem2));
  expect(state).toEqual({
    items: [mockItem1, mockItem2],
  });
});

test('Should add an inventory item', () => {
  const previousState = { items: [mockItem1] };
  expect(reducer(previousState, addInventoryItem(mockItem2))).toEqual({
    items: [mockItem1, mockItem2],
  });
});

test('Should overwrite an inventory', () => {
  const previousState = { items: [mockItem1] };
  expect(reducer(previousState, setInventoryItems([]))).toEqual({
    items: [],
  });
  expect(reducer(previousState, setInventoryItems([mockItem2]))).toEqual({
    items: [mockItem2],
  });
  expect(reducer(previousState, setInventoryItems([mockItem1, mockItem2]))).toEqual({
    items: [mockItem1, mockItem2],
  });
});


test('checkItemCanBeAdded correctly allows adding item to empty inventory', () => {
  expect(checkItemCanBeAdded([], mockItem1)).toBe(true);
  expect(checkItemCanBeAdded([], { mockItem1, value: 40000 })).toBe(true);
});

test('checkItemCanBeAdded correctly disallows adding item to empty inventory', () => {
  expect(checkItemCanBeAdded([], { mockItem1, value: 40001 })).toBe(false);
});

test('checkItemCanBeAdded correctly allows adding item to inventory', () => {
  expect(checkItemCanBeAdded([mockItem2], mockItem1)).toBe(true);
});

test('checkItemCanBeAdded correctly disallows adding item to inventory', () => {
  expect(checkItemCanBeAdded([mockItem2], { mockItem1, value: 35000 })).toBe(false);
  expect(checkItemCanBeAdded([mockItem2], { mockItem1, value: 40001 })).toBe(false);
});

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn()
}));

jest.mock('react-native-toast-notifications', () => ({
  useToast: () => ({ show: jest.fn() }),
}));

test('useAddInventoryItem does not add item with missing fields', () => {
  redux.useSelector.mockImplementation( () => [] );
  let name, value, photo, description;
  let { result, rerender } = renderHook(() => useAddInventoryItem(name, value, photo, description));
  const fn = jest.fn(() => {});
  result.current(fn);
  expect(fn).not.toBeCalled();

  name = 'name';
  rerender(name, value, photo, description);
  result.current(fn);
  expect(fn).not.toBeCalled();

  value = 500;
  rerender(name, value, photo, description);
  result.current(fn);
  expect(fn).not.toBeCalled();

  description = "description";
  rerender(name, value, photo, description);
  result.current(fn);
  expect(fn).not.toBeCalled();

  photo = "some/url";
  rerender(name, value, photo, description);
  result.current(fn);
  expect(fn).toBeCalled();
});

test('useAddInventoryItem adds item under 40k total', () => {
  redux.useSelector.mockImplementation( () =>[ mockItem1, mockItem2 ] );

  let name, value, photo, description;
  name = 'name';
  value = 20000;
  photo = "some/url";
  description = "description";
  let { result } = renderHook(() => useAddInventoryItem(name, value, photo, description));
  const fn = jest.fn(() => {});
  result.current(fn);
  expect(fn).toBeCalled();
});

test('useAddInventoryItem does not add item over 40k total', () => {
  redux.useSelector.mockImplementation( () => [  mockItem1, mockItem2 ] );

  let name, value, photo, description;
  name = 'name';
  value = 35000;
  photo = "some/url";
  description = "description";
  let { result } = renderHook(() => useAddInventoryItem(name, value, photo, description));
  const fn = jest.fn(() => {});
  result.current(fn);
  expect(fn).not.toBeCalled();
});
