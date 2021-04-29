import React from 'react';
import { FormControl, FormControlLabel, makeStyles, Radio, RadioGroup } from '@material-ui/core';

const useStyles = makeStyles({
    radio: {
        transform: 'scale(1.2)',
    },
    radioLabel: {
        fontSize: '1.7rem',
        color: '#4338ca',
        fontWeight: '600'
    },
});

export default function RadioGroupSchema({arialabel, name, value, values=[], label=[], callback}) {
    const classes = useStyles();
    return (
        <FormControl component="fieldset">
            <RadioGroup aria-label={arialabel} name={name} value={value} onChange={(e) => callback(e.target.value)}>
                {values.map((state, index) => {
                    return (
                        <FormControlLabel 
                            key={Date.now() + index} 
                            classes={{label: classes.radioLabel}} 
                            value={state} 
                            control={<Radio className={classes.radio} />} 
                            label={label.length > 0 ? label[index] : state} 
                            />
                    )
                })}                  
            </RadioGroup>
        </FormControl>
    )
}
