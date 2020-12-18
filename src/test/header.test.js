import React from "react";
import { shallow } from "enzyme"

import HeaderComponent from '../components/Header'

it("renders Account header", () => {
    const wrapper = shallow(<HeaderComponent />);
    const welcome = 'Poké';
    expect(wrapper.contains(welcome)).toEqual(true);
});