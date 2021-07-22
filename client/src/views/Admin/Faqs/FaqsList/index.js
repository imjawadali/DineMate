import React from 'react'

import { TableActionicons } from '../../../../components'

function FaqsList(props) {

  const { faqs, fetchingGenericData, onDelete } = props

  return (
    <div className="TableDataContainer">
      <table>
        <thead>
          <tr>
            <th>Manage</th>
            <th>Question</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
          {faqs && faqs.length ?
            faqs.map((faq) => {
              const { id, question, answer } = faq
              return (
                <tr key={id}>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <TableActionicons
                        icon="fa-trash"
                        onClick={() => onDelete(id)} />
                    </div>
                  </td>
                  <td>{question}</td>
                  <td>{answer}</td>
                </tr>
              )
            }) :
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>
                {fetchingGenericData ?
                  <p><i className={`fa fa-refresh fa-pulse`} style={{ padding: '0px 5px' }} />Fetching / Syncing Faqs . . .</p>
                  : 'No Data Found!'}
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default FaqsList
