import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import PhotoViewer from '../components/PhotoViewer'

Enzyme.configure({ adapter: new EnzymeAdapter() })

describe("PhotoViewer component", () => {
  test('renders without crashing', () => {
    const wrapper = shallow(<PhotoViewer />)
    const homeComponent = wrapper.find("[data-test='photos-component']")
    expect(homeComponent.length).toEqual(1)
  })
});
