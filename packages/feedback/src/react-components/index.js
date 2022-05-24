import React from 'react'

import useRecaptcha from './hooks/use-recaptcha'
import Form from './form/form'


import { formsData } from './mock-forms'


export default function Feedback({ data = formsData }) {
  const forms = data.forms
  const { verified } = useRecaptcha()

  return (
    <>
      {forms.map((form) => (
        <Form key={form.id} form={form} verified={verified} />
      ))}
    </>
  )
}