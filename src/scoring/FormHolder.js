import React, { useEffect } from 'react'
import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import TabContent from './TabContent';
import { createResult } from '../redux/progress';
import { useDispatch, useSelector } from 'react-redux';

export const ValueContext = React.createContext({
    value: 1,
    setValue: () => { }
});

export default function FormHolder({ criteria, onSubmit, onCancel }) {

    const [value, setValue] = useState('1');
    const context = { value, setValue, criteria };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const dispatch = useDispatch();

    useEffect(() => {
       
        criteria.tasks.forEach(e => {
            e.aspects.forEach(aspect => {
                dispatch(createResult(aspect))
        
            })
        });
    }, [])

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                    onChange={handleChange}
                    variant="scrollable"
                    //centered 
                    scrollButtons="auto"
                >
                    {criteria.tasks.map((task, index) => (
                        <Tab key={index} label={task.name} value={`${index + 1}`} />
                    ))}
                </TabList>
            </Box>
            {criteria.tasks.map((task, index) => (
                <TabPanel key={index} value={`${index + 1}`}>
                    <ValueContext.Provider value={context}>
                        <TabContent task={task.aspects} onSubmit={onSubmit} onCancel={onCancel}></TabContent>
                    </ValueContext.Provider>
                </TabPanel>
            ))}
        </TabContext>

    )
}



