// src/services/sweetalertService.js
import Swal from "sweetalert2";

const SweetAlertService = {
  successWithHTML: (htmlContent) => {
    Swal.fire({
      title: "Success!",
      html: htmlContent, // Set the HTML content here
      icon: "success",
    });
  },
  success: (title, text) => {
    return Swal.fire({
      icon: "success",
      title: title,
      text: text,
    });
  },
  error: (title, text) => {
    return Swal.fire({
      icon: "error",
      title: title,
      text: text,
    });
  },
  warning: (title, text) => {
    return Swal.fire({
      icon: "warning",
      title: title,
      text: text,
    });
  },
  info: (title, text) => {
    return Swal.fire({
      icon: "info",
      title: title,
      text: text,
    });
  },
  confirm: (title, text, confirmButtonText, cancelButtonText) => {
    return Swal.fire({
      icon: "question",
      title: title,
      text: text,
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
    });
  },
  custom: (title, html, confirmButtonText, cancelButtonText) => {
    Swal.fire({
      title: title,
      icon: "info",
      html: html,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: "Thumbs down",
    });
  },

  delete: () => {
    return Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
  },
  welcome: (name) => {
    return Swal.fire({
      title: "Welcome"+ name,
      name,
      text: "You successfully signed up",
      icon: "success",
      width: 600,
      padding: "3em",
      color: "#716add",
      background: "#fff url(/images/trees.png)",
      backdrop: `
      rgba(0,0,123,0.4)
      url("/images/nyan-cat.gif")
      left top
      no-repeat
    `,
    });
  },
};

export default SweetAlertService;
