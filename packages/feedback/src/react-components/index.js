import React, { useState, useEffect, useRef } from 'react'

import Section from './layout/Section'
import ThumbsForm from './thumbs-form/ThumbsForm'
import CommentForm from './comment-form/CommentForm'
import useRecaptcha from './hooks/useRecaptcha'
import Comments from './comments/Comments'
import { getFeedbacks, getThumbUps } from './api'

export default function Feedback() {
  const [thumbsValue, setThumbsValue] = useState(null)
  const [comments, setComments] = useState([])
  const nextFeedbackQueryIndex = useRef(0)
  const { verified } = useRecaptcha()

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

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const result = await getFeedbacks({
          take: 13,
        })
        console.log('result', result)
        if (result?.data) {
          const { data: { formResults }, skip } = result.data
          console.log(formResults, skip)
          const comments = formResults.map(({ id, name, result, responseTime }) => ({ id: Math.random(), name, content: result, date: responseTime }))
          setComments(comments)
        }
      } catch (error) {
        window.error = error
        console.log('error', error)
      }
    }

    fetchComments()
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
        <Comments comments={comments} />
      </Section>
    </>
  )
}