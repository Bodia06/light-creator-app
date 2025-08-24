import * as Yup from 'yup'
const validationSchema = Yup.object({
  firstName: Yup.string()
    .matches(
      /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźżA-ZĄĆĘŁŃÓŚŹŻ]{2,15}$/,
      'Pierwsza litera musi być wielka, długość od 3 do 16 znaków'
    )
    .required('Imię jest wymagane'),
  lastName: Yup.string()
    .matches(
      /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźżA-ZĄĆĘŁŃÓŚŹŻ]{2,15}$/,
      'Pierwsza litera musi być wielka, długość od 3 do 16 znaków'
    )
    .required('Nazwisko jest wymagane'),
  phone: Yup.string()
    .matches(/^\+?\d{9,15}$/, 'Nieprawidłowy numer telefonu')
    .required('Numer telefonu jest wymagany'),
  email: Yup.string()
    .email('Nieprawidłowy email')
    .required('Email jest wymagany')
})

export default validationSchema
