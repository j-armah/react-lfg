import React, { useState } from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function TagBox({ tag }) {
    const { id } = tag
    const [state, setState] = useState({
        [id]: false,
    });
    // const [state, setState] = useState(false)

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    console.log(state)

    return (
        <FormControlLabel
            control={<Checkbox checked={state.id} onChange={handleChange} name={tag.id} />}
            label={tag.name}
        />
    )
}

export default TagBox
