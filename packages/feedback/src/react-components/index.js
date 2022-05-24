import React, { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';

import Section from './layout/Section'
import ThumbsForm from './thumbs-form/ThumbsForm'
import CommentForm from './comment-form/CommentForm'
import useRecaptcha from './hooks/useRecaptcha'
import Comments from './comments/Comments'
import useComments from './hooks/useComments';
import { getThumbUps } from './api'


export default function Feedback() {
  const [thumbsValue, setThumbsValue] = useState(null)
  const [userId, setUserId] = useState(null)

  const { verified } = useRecaptcha()
  const { comments, noMoreComment, loadMoreComments } = useComments()

  useEffect(() => {
    if (sessionStorage['corvid-19-query-user-id']) {
      setUserId(sessionStorage['corvid-19-query-user-id'])
    } else {
      const userId = uuidv4()
      setUserId(userId)
      sessionStorage['corvid-19-query-user-id'] = userId
    }
  })

  useEffect(() => {
    const fetchThumbUpData = async () => {
      try {
        const result = await getThumbUps()
        if (result?.data) {
          const { like, dislike } = result.data
          const thumbsValue = { thumbUp: like, thumbDown: dislike }
          setThumbsValue(thumbsValue)
        } else {
          console.log('respond not as expected', result)
        }
      } catch (error) {
        console.log('error', error)
      }
    }

    fetchThumbUpData()
  }, [])



  const commentFormSubmitHandler = (textareaValue) => {
    console.log(`send comment '${textareaValue}' to BE`);
    return true
  }

  const thumbsFormSubmitHandler = (thumbValue) => {
    console.log(`send thumbValue '${thumbValue}' to BE`);
    return true
  }

  return (
    <>
      <Section>
        <ThumbsForm onSubmit={thumbsFormSubmitHandler} thumbs={thumbsValue} />
        {verified && <CommentForm onSubmit={commentFormSubmitHandler} />}
      </Section>
      <Section>
        <Comments comments={comments} onExpand={loadMoreComments} noMoreComment={noMoreComment} />
      </Section>
    </>
  )
}