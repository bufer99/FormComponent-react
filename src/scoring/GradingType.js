import ListComponent from '../FormComponents/ListComponent'
import RadioBtnComponent from '../FormComponents/RadioBtnComponent'
import RatingComponent from '../FormComponents/RatingComponent'



export default function getGradingType({ id, required, type, values, maxValue, value },formValues,setFormValues,myRef) {
    const formState = {formValues, setFormValues}
    switch (type) {
        case 'list':
            return <ListComponent values={values} id={id} required={required} formState={formState}></ListComponent>
        case 'boolean':
            return <RadioBtnComponent value={value} id={id} required={required} formState={formState}></RadioBtnComponent>
        case 'number':
            return <RatingComponent maxValue={maxValue} id={id} required={required} formState={formState}></RatingComponent>
        default:
    }
}
