import React from 'react';
import renderer from 'react-test-renderer';
import Form from '../../components/forms/form';
import SignUpForm from '../../components/forms/singup';
import SignInForm from '../../components/forms/signin';

test("Form renders testing", ()=>{
    let component = renderer.create(<Form status={0} />)
    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();

    component = renderer.create(<Form status={1} />)
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    component = renderer.create(<Form status={2} />)
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    
    component = renderer.create(<Form status={3} />)
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Sign Up Form renders testing", ()=>{
    let component = renderer.create(<SignUpForm status={0} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Sign In Form renders testing", ()=>{

    let component = renderer.create(<SignInForm status={0} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})