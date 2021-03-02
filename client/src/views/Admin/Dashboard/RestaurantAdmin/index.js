import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Button, DashboardGridItem } from '../../../../components'
import { GET_RESTAURANT_DASHBOARD } from '../../../../constants'
import { customisedAction } from '../../../../redux/actions'

function RestaurantAdmin() {

  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const fetchingDashboard = useSelector(({ sessionReducer }) => sessionReducer.fetchingDashboard)
  const restaurantDashboard = useSelector(({ sessionReducer }) => sessionReducer.restaurantDashboard)
  const dispatch = useDispatch()

  const { restaurantId } = admin

  const getUnmergedTables = () => {
    let unMergedTables = restaurantDashboard
    if (restaurantDashboard) {
      unMergedTables = restaurantDashboard.filter(
        (table) => !table.mergeId
      )
    }
    getGroupedMergedTables()
    return unMergedTables
  }

  const getMergedTables = () => {
    let mergedTables = []
    if (restaurantDashboard) {
      mergedTables = restaurantDashboard.filter(
        (table) => table.mergeId
      )
    }
    return mergedTables
  }

  const getGroupedMergedTables = () => {
    let groupedMergedTables = []
    if (getMergedTables() && getMergedTables().length) {
      groupedMergedTables = getMergedTables().reduce((r, a) => {
        r[a.mergeId] = r[a.mergeId] || [];
        r[a.mergeId].push(a);
        return r;
      }, Object.create(null));
    }
    return groupedMergedTables
  }

  const getUnmergedColumnCounts = () => {
    let counts = 0
    if (getMergedTables().length) {
      if (getMergedTables().length > 3) counts = 2
      else counts = 1
    }
    return (4 - counts) * 4
  }

  const getMergedColumnCounts = () => {
    if (getUnmergedColumnCounts() === 12) {
      if (getUnmergedTables().length > 8) return 4
      else if (getUnmergedTables().length > 4) return 3
      else if (getUnmergedTables().length) return 2
      else return 1
    }
    else if (getUnmergedColumnCounts() === 8) {
      if (getUnmergedTables().length > 4) return 3
      else if (getUnmergedTables().length) return 2
      else return 1
    }
  }

  const getMergedRowCounts = (groupIndex) => {
    let mergedRowCounts = 0, index = groupIndex
    while (index - 2 > -1) {
      index = index - 2
      Object.keys(getGroupedMergedTables()).map((key, currentIndex) => {
        if (currentIndex === index)
          mergedRowCounts = mergedRowCounts + getGroupedMergedTables()[key].length
      })
    }
    return mergedRowCounts
  }

  let column = 1, row, unMergedRowCounts=0
  return (
    <div className="Container">
      <div className="PageTitleContainer">
        <h2>Dashboard</h2>
        <div className="PageTitleButtonContainer">
          {restaurantDashboard ? 
            <Button
              text={"Merge"}
              light={true}
              iconLeft={<i className="fa fa-map fa-rotate-90" />}
              onClick={() => null} /> : null
          }
          <Button
            style={{ marginLeft: '10px' }}
            text={fetchingDashboard ? "Syncing" : "Refresh"}
            light={fetchingDashboard}
            lightAction={() => null}
            iconLeft={<i className={`fa fa-refresh ${fetchingDashboard ? 'fa-pulse' : ''}`} />}
            onClick={() => dispatch(customisedAction(GET_RESTAURANT_DASHBOARD, { restaurantId }))} />
        </div>
      </div>
        {fetchingDashboard && !restaurantDashboard ?
          <div className="DashBoardContainer">
            <div className="loadingContainer">
              <p><i className={`fa fa-refresh ${fetchingDashboard ? 'fa-pulse' : ''}`} style={{ padding: '0px 5px' }} />Fetching / Syncing Dashboard Data . . .</p>
            </div>
          </div> : null
        }
      <div className="RestaurantDashBoardContainer">
        {restaurantDashboard ? <>
          <div className="DashBoardColumnsContainer">
            <div className="DashBoardGridsContainer">
              <div className="DashBoardGrids">
                {
                  getUnmergedTables().map((table, index) => {
                    const { value, doNotDisturb, occupiedBy } = table
                    if (index > 0 && index % getUnmergedColumnCounts() === 0) {
                      column = 1
                      unMergedRowCounts = unMergedRowCounts + 4
                    }
                    if (index > 0 && index % 4 === 0 && index % getUnmergedColumnCounts() !== 0) column = (Math.floor((index % getUnmergedColumnCounts())/4) % 4)+1
                    row = (index % 4) + unMergedRowCounts + 1
                    return (<div className="DashboardGridItemContainer" key={value}
                      style={{ gridColumn: column, gridRow: row}}>
                        <DashboardGridItem
                          text={"Table " + value.replace(`${restaurantId}/`, '')}
                          doNotDisturb={doNotDisturb}
                          occupiedBy={occupiedBy}
                        />
                    </div>)
                  })
                }
                {
                  Object.keys(getGroupedMergedTables()).map((key, groupIndex) => {
                    const mergedTables = getGroupedMergedTables()[key]
                    return mergedTables.map((table, index) => {
                      const { value, doNotDisturb, occupiedBy } = table
                      return (<div className="DashboardGridItemContainer" key={value}
                        style={{
                          gridColumn: getMergedColumnCounts() + (groupIndex % 2),
                          gridRow: (index + 1 + getMergedRowCounts(groupIndex)),
                          border: '1px solid black',
                          borderTopLeftRadius: index === 0 ? '10px' : '0px',
                          borderTopRightRadius: index === 0 ? '10px' : '0px',
                          borderBottomLeftRadius: index === mergedTables.length - 1 ? '10px' : '0px',
                          borderBottomRightRadius: index === mergedTables.length - 1 ? '10px' : '0px',
                          borderTop: index === 0 ? '1px solid black' : 'none',
                          borderBottom: index === mergedTables.length - 1 ? '1px solid black' : 'none'
                        }}>
                        <DashboardGridItem
                          text={"Table " + value.replace(`${restaurantId}/`, '')}
                          doNotDisturb={doNotDisturb}
                          occupiedBy={mergedTables[0].occupiedBy}
                          merged
                        />
                      </div>)
                    })
                  })
                }
              </div>
            </div>
            <div className="DashBoardServicesContainer">
              <p>Services Que</p>
            </div>
          </div>
        </> : null}
      </div>
    </div>
  )
}

export default RestaurantAdmin
