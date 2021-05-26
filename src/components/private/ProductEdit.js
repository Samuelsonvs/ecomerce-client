import React, { useState } from "react";
import Axios from 'axios';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  button: {
    fontSize: '1.3rem'
  },
}));

export default function ProductEdit(props) {
  const [pictures, setPictures] = useState([]);

  const classes = useStyles();

  const userInfo = useSelector((state) => state.entities.signinOrRegister);

  const onDrop = e => {
    e.preventDefault();
    setPictures([...pictures,...[...e.target.files]])
  };
  const clearPictures = () => {
    setPictures([]);
  }

  const uploadFileHandler = async (e) => {
    e.preventDefault();
      const bodyFormData = new FormData();
      pictures.map((state) => bodyFormData.append('image', state));
      await Axios.post('/uploads/123456789', bodyFormData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${JSON.stringify(userInfo.token)}`, 
        },
      })
  };

  return (
    <>
    <div className={classes.root}>
        <input
          accept="image/*"
          className={classes.input}
          disabled={pictures.length >= 15 ? true : false}
          id="contained-button-file"
          multiple
          onChange={onDrop}
          type="file"
        />
        <label htmlFor="contained-button-file">
          <Button 
            disabled={pictures.length >= 15 ? true : false}
            className={classes.button}
            variant="contained" 
            color="primary"
            startIcon={<CloudUploadIcon style={{fontSize:'2.5rem'}} />} 
            component="span">
            Upload
          </Button>
        </label>
      </div>
    {
        pictures.length > 0 && 
        <div className="mt-20 ml-5">
          {pictures.map((state, index) => {
            return (
              <img key={index} className="inline max-w-xs max-h-20" src={URL.createObjectURL(state)} alt='preview'></img>
            )
          })}
          <button className="block mt-10 p-5 bg-red-600" onClick={clearPictures}>Temizle</button>
          <button className="p-5 bg-green-600" onClick={uploadFileHandler}>Resimleri Upload Et</button>
        </div>
    }
    </>
  );
};