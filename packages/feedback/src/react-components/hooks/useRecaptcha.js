import React, { useState, useEffect, useCallback } from 'react'

import { verifyRecaptcha } from '../api'

const action = 'submit'
const tolerantScore = 0.3

export default function useRecaptcha() {
  const [verified, setVerified] = useState(false)

  const fakeSendTokenToVerify = useCallback(async (token, action) => {
    const scores = [0, 0.3, 0.7, 1.0]
    const score = scores[Math.floor(Math.random() * scores.length)]
    console.log(score)
    if (score >= tolerantScore) {
      setVerified(true)
    }
    return score >= tolerantScore ? true : false
  }, [])

  const getReCaptchaToken = useCallback(() => {
    const { grecaptcha } = window
    grecaptcha.enterprise.ready(async () => {
      const token = await grecaptcha.enterprise.execute('6LfjDw4gAAAAAEoKF6fhiBvFEoPPFvO7KUb_-50J', action)
      console.log(token)
      // const verified = await verifyRecaptcha({
      //   token,
      //   recaptchaAction: action
      // })
      const verified = await fakeSendTokenToVerify(token, action)
      if (verified) {
        setVerified(true)
      }
    })
  })

  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://www.google.com/recaptcha/enterprise.js?render=6LfjDw4gAAAAAEoKF6fhiBvFEoPPFvO7KUb_-50J'
    script.id = 'recaptcha-key'
    script.onload = async () => {
      console.log('recaptcha-key script loaded')
      getReCaptchaToken()
    }
    document.body.appendChild(script)
  }, [])

  return { verified }
}