$(document).ready(function () {
  $("#formu").validate({
    rules: {
      rut: { required: true, minlength: 9, maxlength: 10 },

      apep: { required: true, minlength: 3, maxlength: 20 },

      apem: { required: true, minlength: 3, maxlength: 20 },

      nombre: { required: true, minlength: 3, maxlength: 20 },

      fechanac: { required: true, date: true },

      edad: { required: true, number: true, min: 18, max: 35 },

      gene: { required: true },

      email: { required: true, email: true },
    },

    messages: {
      rut: {
        required: "El rut es requerido.",
        minlength: "El rut debe tener 9 digitos minimo.",
        maxlength: "El rut debe tener 10 digitos maximo.",
      },
      apep: {
        required: "El apellido paterno es requerido.",
        minlength: "El apellido debe tener 3 caracteres minimo.",
        maxlength: "El apellido debe tener 20 caracteres maximo.",
      },
      apem: {
        required: "El apellido materno es requerido.",
        minlength: "El apellido debe tener 3 caracteres minimo.",
        maxlength: "El apellido debe tener 20 caracteres maximo.",
      },
      nombre: {
        required: "El nombre es requerido.",
        minlength: "El apellido debe tener 3 caracteres minimo.",
        maxlength: "El apellido debe tener 20 caracteres maximo.",
      },
      fechanac: {
        required: "La fecha es requerida.",
        dateISO: "La fecha es incorrecta. Ej: 2000/06/15",
      },
      edad: {
        required: "La edad es requerida.",
        number: "La edad debe ser un numero.",
        min: "La edad debe ser minimo 18 años.",
        max: "La edad debe ser maximo 35 años.",
      },
      gene: {
        required: "El genero es requerido.",
      },
      email: {
        required: "El email es requerido.",
        email: "Debe tener el formato email.",
      },
    },
  });
});
