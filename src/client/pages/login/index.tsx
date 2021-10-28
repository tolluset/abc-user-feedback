/* */
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

/* */
import { LoginContainer } from '~/containers'

const schema = yup.object().shape({
  email: yup.string().email('not a email format').required(),
  password: yup.string().required()
})

const LoginPage = () => {
  const methods = useForm({
    resolver: yupResolver(schema)
  })

  return (
    <FormProvider {...methods}>
      <LoginContainer />
    </FormProvider>
  )
}

export const getServerSideProps = async ({ query }) => {
  return {
    props: {
      ...(await serverSideTranslations(query.service.locale, ['common']))
    }
  }
}

export default LoginPage
