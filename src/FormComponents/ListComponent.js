import {
    FormControl,
    MenuItem,
    Select,
    InputLabel
} from "@mui/material";
import cn from "classnames";
import { useEffect, useState, useImperativeHandle } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setErrorById, selectErrorById } from "../redux/progress"



export default function ListComponent({ values, id, required, formState }) {

    const st = useSelector((state) => state.progress.errors);
    const form = useSelector((state) => state.form.tasks[id]);

    const [value, setValue] = useState(() => {
        if(form && form.formValue !== null){
            return Object.keys(form.formValue)[0];
        }
            return 0
    });

    const { formValues, setFormValues } = formState

    const handleOnChange = (event, newValue) => {
        setValue(event.target.value)

        const key = newValue.props.value;
        setFormValues((formValues) => ({
            ...formValues,
            [id]: {
                ...formValues[id],
                formValue: { [key]: values[key] }
            }
        }))
    }

    return (
        <FormControl style={{ minWidth: 240 }} error={st[id] && true} >
            <InputLabel id="select">{st[id] ? st[id] : 'Pont'}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="select"
                value={value ? value : ''}
                label='Pont'
                onChange={handleOnChange}
            >

                {Object.entries(values).map((value) => (
                    <MenuItem
                        key={value[0]}
                        value={value[0]}>
                        {value[1]}</MenuItem>
                ))}
            </Select>
        </FormControl>

    )
}