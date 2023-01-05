import React from 'react'

const Spinner = () => {
  return (
    <div className="container empty-box">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Spinner
