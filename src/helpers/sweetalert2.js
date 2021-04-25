import Swal from 'sweetalert2';

export const SwalSuccess = message => {
    Swal.fire('Success', `${message}`, 'success');
};

export const SwalError = message => {

    if(Array.isArray(message))
    {
        let errors = message.toString();
        Swal.fire('Error', `${errors.split(",").join('<br/>')}`, 'error');
    }
    else
    {
        Swal.fire('Error', `${message}`, 'error');
    }
};

export const SwalWarning = (title, message, callback) => {
    Swal.fire({
        title: title,
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#7f1d1d',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
    })
};



export const SwalUpdateWarning = (title, message, props, callback) => {
    Swal.fire({
        title: title,
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#7f1d1d',
        confirmButtonText: 'Yes'
    }).then(async (result) => {
        if (result.isConfirmed) {
            await callback();
            Swal.fire(
                'Updated!',
                'Your file has been updated.',
                'success'
            ).then((result) => {
                if (result.isConfirmed) {
                    props.history.push('/dashboard/productlist')
                }
            })
        }
    })
};