const Helper = require('../../../__fixtures__/unit/helper')
const Comment = require('../../../lib/validators/comment')

test('must_include works', async () => {
  const comment = new Comment()
  const settings = {
    do: 'comment',
    must_include: {
      regex: 'test string',
      message: 'failed test'
    }
  }

  let commentValidation = await comment.processValidate(createMockComment('test string included'), settings)
  expect(commentValidation.status).toBe('pass')

  commentValidation = await comment.processValidate(createMockComment('Non empty Comment'), settings)
  expect(commentValidation.status).toBe('fail')
  expect(commentValidation.validations[0].description).toBe('failed test')
})

test('must_exclude works', async () => {
  const comment = new Comment()
  const settings = {
    do: 'comment',
    must_exclude: {
      regex: 'test string',
      message: 'failed test'
    }
  }

  let commentValidation = await comment.processValidate(createMockComment('test string included'), settings)
  expect(commentValidation.status).toBe('fail')
  expect(commentValidation.validations[0].description).toBe('failed test')

  commentValidation = await comment.processValidate(createMockComment('Non empty Comment'), settings)
  expect(commentValidation.status).toBe('pass')
})

test('begins_with works', async () => {
  const comment = new Comment()
  const settings = {
    do: 'comment',
    begins_with: {
      match: 'test string',
      message: 'failed test'
    }
  }

  let commentValidation = await comment.processValidate(createMockComment('test string included'), settings)
  expect(commentValidation.status).toBe('pass')

  commentValidation = await comment.processValidate(createMockComment('does not begin with test string'), settings)
  expect(commentValidation.validations[0].description).toBe('failed test')
  expect(commentValidation.status).toBe('fail')
})

test('ends_with works', async () => {
  const comment = new Comment()
  const settings = {
    do: 'comment',
    ends_with: {
      match: 'test string',
      message: 'failed test'
    }
  }

  let commentValidation = await comment.processValidate(createMockComment('must end with test string'), settings)
  expect(commentValidation.status).toBe('pass')

  commentValidation = await comment.processValidate(createMockComment('does not end with test string well'), settings)
  expect(commentValidation.validations[0].description).toBe('failed test')
  expect(commentValidation.status).toBe('fail')
})

const createMockComment = (comment) => {
  return Helper.mockContext({ body: comment })
}
