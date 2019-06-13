import React from 'react';
import renderer from 'react-test-renderer';
import TextField from '../../components/inputs/text-filed';
import CheckBox from '../../components/inputs/checkbox';

test("Input renders testing ", ()=>{
   let component = renderer.create(<TextField 
        classes="test" 
        placeholder="test" 
        helperText="test" 
        type="text"
        name="test"
        />)

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    component = renderer.create(<TextField 
        classes="test" 
        placeholder="test" 
        helperText="test" 
        type="text"
        name="test"
        errorMessage = "test"
        isInvalid = {true}
        />)
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    component = renderer.create(<TextField 
        classes="test" 
        placeholder="test" 
        helperText="test" 
        type="text"
        name="test"
        disabled = {true}
        />)

    tree = component.toJSON();

    expect(tree).toMatchSnapshot();
})

test("Checkbox input renders testing ", ()=>{
    let component = renderer.create(<CheckBox classes="test" name="test" label="test" />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    tree.props.checked = true;
    expect(tree).toMatchSnapshot();
})