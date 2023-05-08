$(document).ready(function () {
  $("#formu").validate({
    rules: {
      cel: { required: true, number: true, minlength: 9, max: 11 },

      comuna: { required: true, minlength: 3, maxlength: 20 },

      reg: { required: true, minlength: 3, maxlength: 20 },

      zip: { required: true, number: true, minlength: 4, maxlength: 9 },

      tipo: { required: true },

      cbox1: { required: true },
    },

    messages: {
      cel: {
        required: "El celular es requerido.",
        minlength: "El celular debe tener 9 digitos minimo.",
        maxlength: "El celular debe tener 11 digitos maximo.",
      },
      comuna: {
        required: "La comuna es requerida.",
        minlength: "La comuna debe tener 3 caracteres minimo.",
        maxlength: "La comuna debe tener 20 caracteres maximo.",
      },
      reg: {
        required: "La región materno es requerida.",
        minlength: "La región debe tener 3 caracteres minimo.",
        maxlength: "La región debe tener 20 caracteres maximo.",
      },
      zip: {
        required: "El zip es requerido.",
        number: "El zip debe ser un numero.",
        minlength: "El zip debe tener 4 digitos minimo.",
        maxlength: "El zip debe tener 9 caracteres maximo.",
      },
      tipo: {
        required: "El tipo de envio es requerido.",
      },
      cbox1: {
        required: "Debe aceptar las condiciones para continuar.",
      },
    },
  });
});
