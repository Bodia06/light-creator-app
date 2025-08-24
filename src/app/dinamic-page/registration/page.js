import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import initialValuesUser from '@/constans/initialValuesUser'
import validationSchema from '@/utils/userValidation'
import AiOutlineCheck from '@/images/AiOutlineCheck'
import { saveUserData } from '@/firebase/config'
import countryCodes from '@/constans/countryCodes'
import TiArrowUnsorted from '@/images/TiArrowUnsorted'

export default function Registartion ({ setIsLooking }) {
  const handleClose = () => {
    setIsLooking(false)
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const userId = Date.now().toString()
      const fullPhoneNumber = `${values.countryCode}${values.phone}`

      await saveUserData(
        userId,
        values.firstName,
        values.lastName,
        fullPhoneNumber,
        values.email
      )
      console.log('User data saved successfully')
      setIsLooking(false)
    } catch (err) {
      console.error('Error saving user data:', err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='fixed flex left-[50%] top-[30%] -translate-x-[50%] -translate-y-[30%] flex-col items-center justify-center shadow-[0px_3px_5px] shadow-[#d7d7d7] z-[50] p-[50px] bg-[#fff]'>
      <div className='flex flex-col items-center justify-center mb-[40px]'>
        <AiOutlineCheck />
        <h2 className='text-[20px] font-[bold]'>Wprowadż dane</h2>
      </div>
      <Formik
        initialValues={initialValuesUser}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className='flex flex-col gap-[10px]'>
            <div className='flex flex-col'>
              <Field
                type='text'
                name='firstName'
                placeholder='Imię'
                className='px-[20px] py-[10px] border border-[solid] border-[#d7d7d7] rounded-[5px] text-[15px]'
              />
              <div className='min-h-[18px] max-w-[400px]'>
                <ErrorMessage
                  name='firstName'
                  component='div'
                  className='text-[#ff0000] text-[16px]'
                />
              </div>
            </div>

            <div className='flex flex-col'>
              <Field
                type='text'
                name='lastName'
                placeholder='Nazwisko'
                className='px-[20px] py-[10px] border border-[solid] border-[#d7d7d7] rounded-[5px] text-[15px]'
              />
              <div className='min-h-[18px] max-w-[400px]'>
                <ErrorMessage
                  name='lastName'
                  component='div'
                  className='text-[#ff0000] text-[16px]'
                />
              </div>
            </div>

            <div className='flex flex-col'>
              <div className='flex gap-[10px] '>
                <div className='relative w-[150px]'>
                  <Field
                    as='select'
                    name='countryCode'
                    className='px-[10px] py-[10px] border border-[#d7d7d7] rounded-[5px] text-[15px] w-full appearance-none text-[#a9a3a3]'
                  >
                    {countryCodes.map(country => (
                      <option key={country.value} value={country.value}>
                        {country.label}
                      </option>
                    ))}
                  </Field>
                  <div className='absolute pointer-events-none right-[2px] top-[56%] -translate-y-[50%]'>
                    <TiArrowUnsorted />
                  </div>
                </div>

                <Field
                  type='text'
                  name='phone'
                  placeholder='Numer telefonu'
                  className='px-[20px] py-[10px] border border-[solid] border-[#d7d7d7] rounded-[5px] text-[15px] flex-1'
                />
              </div>
              <div className='min-h-[18px] max-w-[400px]'>
                <ErrorMessage
                  name='phone'
                  component='div'
                  className='text-[#ff0000] text-[16px]'
                />
              </div>
            </div>

            <div className='flex flex-col'>
              <Field
                type='email'
                name='email'
                placeholder='Email'
                className='px-[20px] py-[10px] border border-[solid] border-[#d7d7d7] rounded-[5px] text-[15px]'
              />
              <div className='min-h-[18px] max-w-[400px]'>
                <ErrorMessage
                  name='email'
                  component='div'
                  className='text-[#ff0000] text-[16px]'
                />
              </div>
            </div>

            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full px-[20px] py-[10px] border border-[#000] bg-[#000] text-[#fff] font-[bold] flex items-center justify-center rounded-[5px] text-[15px] cursor-pointer hover:opacity-[85%]'
            >
              Dalej
            </button>
            <button
              type='button'
              onClick={handleClose}
              className='w-full px-[20px] py-[10px] bg-transparent border-[0px] text-[15px] text-[#000] font-[bold] flex items-center justify-center cursor-pointer'
            >
              Zamknij
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
