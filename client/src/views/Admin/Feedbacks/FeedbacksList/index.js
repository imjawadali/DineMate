import React from 'react'

function FeedbacksList(props) {

  const { fetchingFeedbacks, feedbacks } = props

  return (
    <div className="TableDataContainer">
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Rating</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks && feedbacks.length ?
            feedbacks.map((x) => {
              const { firstName, lastName, rating, feedback } = x
              return (
                <tr key={firstName+rating}>
                  <td>{firstName} {lastName}</td>
                  <td>{rating}</td>
                  <td style={{ width: '50vw' }}>{feedback || "-"}</td>
                </tr>
              )
            }) :
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>{
                fetchingFeedbacks ?
                  <p><i className="fa fa-refresh fa-pulse" style={{ padding: '0px 5px' }} />Fetching Feedbacks . . .</p>
                  : 'No Data Found!'
              }</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default FeedbacksList
