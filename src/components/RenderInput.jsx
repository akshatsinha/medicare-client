import React from 'react'
import classnames from 'classnames'

const RenderInput = field => (
  <div className={field.divClasses}>
    <input {...field.input} type={field.type} className={classnames('form-control', field.className, {'error': field.meta.touched && field.meta.error} )} placeholder={field.placeholder} />
    { field.meta.touched && field.meta.error && <span className="error">{field.meta.error}</span> }
  </div>
)

export default RenderInput
