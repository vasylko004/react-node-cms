import React from 'react';
import renderer from 'react-test-renderer';
import UserSign from '../../components/user-sign-module';

test("User sign module ", ()=>{
    let component = renderer.create(<UserSign />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    component = renderer.create(<UserSign name="test" avatar="/test/image.png" />);
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})