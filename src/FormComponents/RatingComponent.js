import { Typography, Rating, TextField } from "@mui/material";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'

export default function RatingComponent({maxValue, id, required, formState}){

    const st = useSelector((state) => state.progress.errors);

    const form = useSelector((state) => state.form.tasks[id]);

    const [value, setValue] = useState(() => {
        if(form){
            return form.formValue;
        }
            return 0
    });

    const {formValues, setFormValues} = formState

    const handleOnChange = (event) => {
        event.preventDefault()
        setValue(event.target.value)
    
        setFormValues((formValues) => ({
            ...formValues,
            [id]:{
                ...formValues[id],
                formValue: event.target.value
            }
        }))
    }

    return(
        <>
            <TextField 
                id="outlined-basic" 
                label={ value ? value +"/"+ maxValue : "Maximum pont: "+maxValue }
                variant="outlined"
                value={value ? value : ''}
                onChange={handleOnChange}
                error={st[id] && true}
                helperText={st[id] ? st[id] : ''}
            />
        </>
    )
}