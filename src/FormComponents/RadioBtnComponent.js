import { 
    FormControl,
    RadioGroup, 
    Radio, 
    FormControlLabel, 
    FormLabel,
 } from "@mui/material";
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux'


export default function RadioBtnComponent({value, id, required, formState}){

    const form = useSelector((state) => state.form.tasks[id]);

    const [Radiovalue, setRadioValue] = useState(() => {
        if(form){
            return form.formValue;
        }
            return ''
    });

    const {formValues, setFormValues} = formState

    const handleOnChange = (event, newValue) => {
        setRadioValue(newValue)

        setFormValues((formValues) => ({
            ...formValues,
            [id]:{
                ...formValues[id],
                formValue: newValue
            }
        }))
    }

    return (
        <FormControl>
            <FormLabel id="label">Value</FormLabel>
            <RadioGroup
                aria-labelledby="label"
                defaultValue=''
                name="radio-button"
                onChange={handleOnChange}
                value={Radiovalue}
            >

                <FormControlLabel value={value} control={<Radio />} label="Igaz" />
                <FormControlLabel value={0} control={<Radio />} label="Hamis" />
            </RadioGroup>
        </FormControl>
    )
}