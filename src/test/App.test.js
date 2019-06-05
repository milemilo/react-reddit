import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from '../components/App'

Enzyme.configure({ adapter: new EnzymeAdapter() })

test('renders without error', () => {
  const wrapper = shallow(<App />)
  const appComponent = wrapper.find("[data-test='app-component']");

  expect(appComponent.length).toEqual(1)
})
