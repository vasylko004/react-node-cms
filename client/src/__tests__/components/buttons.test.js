import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../../components/buttons';

test("Buttons rendering tests", ()=>{
    let component = renderer.create(<Button classes="test" size="std" > Test </Button>)
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    component = renderer.create(<Button classes="test_large" size="large" > Test 2 </Button>)
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});