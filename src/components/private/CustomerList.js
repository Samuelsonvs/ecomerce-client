import { Button, makeStyles } from '@material-ui/core';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { changeUserStatus, getUsers } from '../../redux/reduxSlice/adminSlice';
import LoadingBox from '../public/loadingBox';
import MessageBox from '../public/messageBox';

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: '1.2rem'
  },
}));

export default function CustomerList() {
  const classes = useStyles();
  const userList = useSelector(state => state.entities.adminPanel)
  const { loading, users, error } = userList;


  const dispatch = useDispatch();

  const ChangeStatus = (userID) => {
    dispatch(changeUserStatus(userID));
  };

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  return (
    <div className="container mx-auto">
      {
      loading ? 
      <LoadingBox />
      : 
      error ?
      <MessageBox variant="error">{error}</MessageBox>
      :
      (<table className="w-full">
        <thead>
          <tr>
            <th className="w-1/4 p-10">id</th>
            <th className="w-1/4 p-10">Name</th>
            <th className="w-1/4 p-10">Email</th>
            <th className="w-1/4 p-10">Status</th>
          </tr>
        </thead>
        <tbody className="text-center">
            {users.map((state) => {
              return (
                <tr key={state._id}>
                  <td className="p-7">{state._id}</td>
                  <td className="p-7">{state.name}</td>
                  <td className="p-7">{state.email}</td>
                  <td className="p-7">{state.status ? 'Active' : 'Banned'}</td>
                  <td className="p-7">
                    <Button 
                      className={classes.button}
                      variant="contained" 
                      color="secondary"
                      onClick={() => ChangeStatus(state._id)}
                      component="span"
                    >
                      status
                    </Button>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>)
      }
    
    </div>
  )
}
