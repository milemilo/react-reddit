import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import Home from '../components/Home'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe("Home component", () => {
  test('renders without error', () => {
    const wrapper = shallow(<Home />)
    const homeComponent = wrapper.find("[data-test='home-component']")
    expect(homeComponent.length).toEqual(1)
  })
});
