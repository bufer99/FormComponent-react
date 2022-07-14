import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import FormActions from './FormActions'
import getGradingType from './GradingType';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addErrorById, deleteErrorById, addResult, getErrors } from '../redux/progress'
import './tabContent.css'
import { setValueById } from '../redux/formState';
import LinearWithValueLabel from './progressBar'
import store from '../redux/store'

const Errors = {
    REQUIRED: "kitöltés kötelező!",
    NOTNUM: "Nem szám!",
    OUTOFRANGE: "0-",
    TEXTHELP: " közötti számot adjon meg!"
};


export default function TabContent({ task, onSubmit, onCancel }) {

    const res = useSelector((state) => state.progress.results);

    const progressDispatch = useDispatch()
    const formDispatch = useDispatch()
    const formData = useSelector((state) => state.form.tasks);

    const [formValues, setFormValues] = useState(
        task.reduce((prev, curr) => {
            const value = formData[curr.id] ? formData[curr.id].formValue : null;
            return {
                ...prev,
                [curr.id]: {
                    ...curr,
                    formValue: value
                }
            }
        }, {})
    );

    const canSubmit = () => {
        const { results, errors } = store.getState().progress;
        const canSub = Object.entries(results).every((result) => result[1].value !== null)
            && Object.keys(errors).length === 0
        if (canSub) onSubmit(results)
    }

    const saveFrom = (e) => {
        Object.entries(formValues).forEach(([key, e]) => {
            
            let isError = false
            if (e.type === 'number') {
                if (e.formValue !== null && e.formValue !== '') { //van érték
                    const val = e.formValue;
                    if (Number.isFinite(val * 1)) { //szám
                        if (!(val <= e.maxValue && val >= 0)) {
                            progressDispatch(addErrorById({ 'text': Errors.OUTOFRANGE + e.maxValue + Errors.TEXTHELP, 'id': e.id })) //0-max között kell megadni
                            isError = true;
                        }
                    } else {
                        progressDispatch(addErrorById({ 'text': Errors.NOTNUM, 'id': e.id })) //számot kell megadni
                        isError = true;
                    }
                } else if (e.required) { //nincs érték, required?
                    progressDispatch(addErrorById({ 'text': Errors.REQUIRED, 'id': e.id })) //meg kell adni
                    isError = true;
                }
            } else if (e.type === 'list') {
                if (e.formValue === null && e.required) {
                    progressDispatch(addErrorById({ 'text': Errors.REQUIRED, 'id': e.id })) //meg kell adni
                    isError = true;
                }
            }

            if (!isError) {
                progressDispatch(deleteErrorById(e.id))
                progressDispatch(addResult(e))

                formDispatch(setValueById(e))
            }
        })

        canSubmit()
    }

    const cancelForm = (e) => {

        const retval = Object.entries(res).reduce((prev, curr) => {

            let value = null;
            if (formValues[curr[0]]?.formValue) {
                value = Object.values(formValues[curr[0]].formValue) * 1
            }
            return {
                ...prev,
                [curr[0]]: {
                    id: curr[0],
                    value: curr[1].value !== null ? curr[1].value : value
                }
            }
        }, {})


        onCancel(Object.fromEntries(Object.entries(retval)
            .filter(e => e[1].value !== null)));
    }

    const getColLabel = () => {
        const { type } = task[0];

        switch (type) {
            case 'list':
                return "Add meg a pontot a listából!"
            case 'boolean':
                return "Válaszd ki az értéket!"
            case 'number':
                return "Elért/Max"
            default:
                return "Nincsenek szempontok"
        }
    }

    return (
        <>
            <form>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Szempont megnevezése</TableCell>
                            <TableCell>{task[0] ? getColLabel() : "Nincs szempont"}</TableCell>
                            <TableCell>Szempont leírása</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {task.map((row) => (
                            <TableRow
                                key={row.name}
                            >
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{getGradingType(row, formValues, setFormValues)}</TableCell>
                                <TableCell>{row.description ? row.description : 'Nincs leírás'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {task[0] && <FormActions save={saveFrom} cancel={cancelForm}></FormActions>}
            </form>
            <div className="progress">
                {task[0] && <LinearWithValueLabel progress={res} />}
            </div>
        </>
    )
}