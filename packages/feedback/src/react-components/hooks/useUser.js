import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

export default function useUser() {
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    if (sessionStorage['corvid-19-query-user-id']) {
      setUserId(sessionStorage['corvid-19-query-user-id'])
    } else {
      const userId = uuidv4()
      setUserId(userId)
      sessionStorage['corvid-19-query-user-id'] = userId
    }
  })

  return { userId }
}