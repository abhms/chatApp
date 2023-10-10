import Swal, { SweetAlertOptions } from 'sweetalert2';

const showAlert = (options: SweetAlertOptions) => {
  return Swal.fire(options);
};

export default showAlert;
