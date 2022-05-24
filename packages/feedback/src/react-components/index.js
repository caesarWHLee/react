import React, { useState, useEffect, useRef } from 'react'

import Section from './layout/Section'
import ThumbsForm from './thumbs-form/thumbs-form'
import CommentForm from './comment-form/comment-form'
import useRecaptcha from './hooks/use-recaptcha'
import Comments from './comments/comments'
import useComments from './hooks/use-comments';
import useThumbsUp from './hooks/use-thumbsUp'

import { formsData } from './mock-forms'


export default function Feedback({ data = formsData }) {
  const { verified } = useRecaptcha()
  const { comments, noMoreComment, loadMoreComments, postComment } = useComments()
  const { thumbsUp, giveThumbUp } = useThumbsUp()
  console.log(`show comments count: ${comments.length}`)

  return (
    <>
      <Section>
        <ThumbsForm onSubmit={giveThumbUp} thumbs={thumbsUp} />
      </Section>
      <Section>
        {verified && <CommentForm onSubmit={postComment} />}
        <Comments comments={comments} onExpand={loadMoreComments} noMoreComment={noMoreComment} />
      </Section>
    </>
  )
}