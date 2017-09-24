import React from 'react'

const RenderInput = field => (
  <div>
    {
      console.log('======= field: ', field)
    }
    <input {...field.input} type={field.type} className='form-control' />
    { field.meta.touched && field.meta.error && <span className="error">{field.meta.error}</span> }
  </div>
)

export default RenderInput
