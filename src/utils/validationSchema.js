import * as yup from 'yup'

export const bookSchema = yup
  .object({
    moduleCode: yup.string().required('El módulo es obligatorio'),

    publisher: yup.string().required('La editorial es obligatoria').min(2, 'La editorial debe tener al menos 2 caracteres'),

    price: yup.number().required('El precio es obligatorio').min(0, 'El precio no puede ser negativo').typeError('El precio debe ser un número'),

    pages: yup.number().required('El número de páginas es obligatorio').min(1, 'Debe haber al menos 1 página').integer('El número de páginas debe ser entero').typeError('Las páginas deben ser un número entero'),

    status: yup.string().required('El estado es obligatorio').oneOf(['good', 'new', 'bad'], 'Estado no válido'),

    comments: yup.string().optional(),
  })
  .required()
