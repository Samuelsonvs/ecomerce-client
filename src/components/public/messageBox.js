import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles({
    alert: {
      width: '100%',
      fontSize: '1.5rem',
    },
    alertitle: {
        fontSize: '2rem',
    }
});

export default function MessageBox({ variant, children }) {
    const classes = useStyles();
    return (
        <div>
            <Alert className={classes.alert} severity={`${variant || 'warning'}`}>
                <AlertTitle className={classes.alertitle}>Error</AlertTitle>
                {children} — <strong>check it out!</strong>
            </Alert>
        </div>
    )
}




// import React from 'react'

// export default function MessageBox(props) {
//     return (
//         <div className={`aler alert-${props.variant || 'info'}`}>
//             {props.children}
//         </div>
//     )
// }
