import React from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    paginator: {
      padding: "10px"
    },
    root: {
        cursor: 'pointer',
    }
}));

export default function PaginationUI({pageNumber, noOfPages, handleChange, USER_PATH}) {
    const classes = useStyles();
    return (
        <>
            <Pagination
                page={Number(pageNumber)}
                count={noOfPages}
                shape="round"
                color="primary"
                boundaryCount={2}
                showFirstButton
                showLastButton
                onChange={handleChange}
                classes={{ ul: classes.paginator }}
                renderItem={(item) => (
                            <PaginationItem
                                type={"start-ellipsis"}
                                component={Link}
                                selected
                                to={`${USER_PATH}?syf=${item.page}`}
                                {...item}
                    />
                )}
            />
        </>
    )
}
