import { Button } from "@mui/material"
import './FormActions.css'
import { useContext } from "react"
import { ValueContext } from "./FormHolder"
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';


const CancelButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  }));


export default function FromActions({ save, cancel }) {
    const { value, setValue, criteria } = useContext(ValueContext);
    const maxTab = criteria.tasks.length

    const handleBtn = e => {
        if (e.target.id === '0') {
            if (value * 1 > 1)
                setValue((value) => (value * 1 - 1).toString())
        } else {
            if (value * 1 < maxTab)
                setValue((value) => (value * 1 + 1).toString())
        }
    }

    return (
        <div className="form-actions">

            <Button id='0' variant="contained" onClick={handleBtn}>Előző</Button>
            <div>
                <Button variant="contained" color="success" onClick={save}>Mentés</Button>
                <CancelButton variant="contained" onClick={cancel}>Mégse</CancelButton>
            </div>
            <Button id='1' variant="contained" onClick={handleBtn}>Következő</Button>
        </div>
    )
}