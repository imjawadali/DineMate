import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Button, DashboardGridItem, ServiceQueItem } from '../../../../components'
import { GET_RESTAURANT_DASHBOARD, MERGE_TABLES, SET_TOAST, SET_TOAST_DISMISSING, UN_MERGE_TABLES } from '../../../../constants'
import { customisedAction } from '../../../../redux/actions'

function RestaurantAdmin() {

  const [merging, setmerging] = useState(false)
  const [selectedTables, setselectedTables] = useState([])

  const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
  const fetchingDashboard = useSelector(({ dashboardReducer }) => dashboardReducer.fetchingDashboard)
  const restaurantDashboard = useSelector(({ dashboardReducer }) => dashboardReducer.restaurantDashboard)
  const mergingTables = useSelector(({ dashboardReducer }) => dashboardReducer.mergingTables)
  const unMergingTables = useSelector(({ dashboardReducer }) => dashboardReducer.unMergingTables)
  const fetchingServicesQue = useSelector(({ dashboardReducer }) => dashboardReducer.fetchingServicesQue)
  const servicesQue = useSelector(({ dashboardReducer }) => dashboardReducer.servicesQue)
  const dispatch = useDispatch()

  const { restaurantId } = admin

  useEffect(() => {
    if (!mergingTables)
      cancelMerge()
  }, [mergingTables])

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

  const cancelMerge = () => {
    setmerging(false)
    setselectedTables([])
  }

  const selectTable = (id) => {
    let temp = []
    if (selectedTables.includes(id))
      temp = selectedTables.filter((tableId) => tableId !== id)
    else {
      temp = [...selectedTables]
      temp.push(id)
    }
    setselectedTables(temp)
  }

  const getTableById = (id) => {
    const tables = restaurantDashboard.filter(table => table.id === id)
    return tables.length && tables[0]
  }

  const mergeTables = () => {
    dispatch(customisedAction(SET_TOAST_DISMISSING))
    if (selectedTables && selectedTables.length) {
      if (selectedTables.length < 2 || selectedTables.length > 3)
        dispatch(customisedAction(SET_TOAST, { message: 'Select Minimum 2 & Maximum 3 Tables!', type: 'error'}))
      else dispatch(customisedAction(MERGE_TABLES, {
        selectedTables,
        mergeId: getTableById(Math.min(...selectedTables)).value,
        restaurantId
      }))
    } else {
      dispatch(customisedAction(SET_TOAST, { message: 'No Tables Selected!', type: 'error'}))
    }
  }

  const unMergeTables = (mergeId) => dispatch(customisedAction(UN_MERGE_TABLES, { mergeId, restaurantId }))

  let column = 1, row, unMergedRowCounts=0
  return (
    <div className="Container">
      <div className="PageTitleContainer">
        <h2>Dashboard</h2>
        <div className="PageTitleButtonContainer">
          {restaurantDashboard ? 
            <Button
              text={`${merging ? "Cancel " : ""}Merge`}
              light={fetchingDashboard || merging || mergingTables || unMergingTables}
              lightAction={() => merging ? cancelMerge() : null}
              iconLeft={<i className={`fa ${merging ? 'fa-times-circle' : 'fa-columns'} fa-rotate-90`} />}
              onClick={() => setmerging(true)} /> : null
          }
          <Button
            style={{ marginLeft: '10px' }}
            text={fetchingDashboard || fetchingServicesQue ? "Syncing" : merging ? "Submit" : "Refresh"}
            light={fetchingDashboard || fetchingServicesQue || mergingTables || unMergingTables}
            lightAction={() => null}
            iconLeft={<i className={`fa ${merging ? 'fa-send' : 'fa-refresh'} ${fetchingDashboard || fetchingServicesQue ? 'fa-pulse' : ''}`} />}
            onClick={() => {
              if (merging) mergeTables()
              else dispatch(customisedAction(GET_RESTAURANT_DASHBOARD, { restaurantId }))
            }} />
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
                    const { id, value, doNotDisturb, occupiedBy } = table
                    if (index > 0 && index % getUnmergedColumnCounts() === 0) {
                      column = 1
                      unMergedRowCounts = unMergedRowCounts + 4
                    }
                    if (index > 0 && index % 4 === 0 && index % getUnmergedColumnCounts() !== 0) column = (Math.floor((index % getUnmergedColumnCounts())/4) % 4)+1
                    row = (index % 4) + unMergedRowCounts + 1
                    return (<div className="DashboardGridItemContainer" key={id}
                      style={{
                        gridColumn: column, gridRow: row, 
                        backgroundColor: merging ? occupiedBy ? 'white' : 'rgb(245, 222, 179)' : ''
                      }}>
                        <DashboardGridItem
                          text={"Table " + value.replace(`${restaurantId}/`, '')}
                          doNotDisturb={doNotDisturb}
                          occupiedBy={occupiedBy}
                          merging={merging}
                          includesMerging={selectedTables.includes(id)}
                          onClick={() => {
                            if (merging) selectTable(id)
                          }}
                        />
                    </div>)
                  })
                }
                {
                  Object.keys(getGroupedMergedTables()).map((key, groupIndex) => {
                    const mergedTables = getGroupedMergedTables()[key]
                    return mergedTables.map((table, index) => {
                      const { id, value, mergeId } = table
                      return (<div className="DashboardGridItemContainer" key={id}
                        style={{
                          gridColumn: getMergedColumnCounts() + (groupIndex % 2),
                          gridRow: getMergedRowCounts(groupIndex) + index + 1,
                          border: '1px solid black',
                          borderTopLeftRadius: index === 0 ? '10px' : '0px',
                          borderTopRightRadius: index === 0 ? '10px' : '0px',
                          borderBottomLeftRadius: index === mergedTables.length - 1 ? '10px' : '0px',
                          borderBottomRightRadius: index === mergedTables.length - 1 ? '10px' : '0px',
                          borderTop: index === 0 ? '1px solid black' : 'none',
                          borderBottom: index === mergedTables.length - 1 ? '1px solid black' : 'none',
                          backgroundColor: merging ? 'white' : ''
                        }}>
                        <i className="fa fa-times-circle"
                          style={{
                            color: 'red',
                            display: !index && !mergedTables.filter(table => table.occupiedBy).length && !merging ? 'block': 'none',
                            float: 'right',
                            position: 'absolute',
                            top: 5,
                            right: 5
                          }}
                          onClick={() => unMergeTables(mergeId)}
                        />
                        <DashboardGridItem
                          text={"Table " + value.replace(`${restaurantId}/`, '')}
                          doNotDisturb={mergedTables.filter(table => table.doNotDisturb).length}
                          occupiedBy={mergedTables.filter(table => table.occupiedBy).length}
                          merging={merging}
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
              <div>
                {servicesQue ?
                  servicesQue.map(item => {
                    return <ServiceQueItem
                      type={item.type}
                      tableNumber={item.tableNumber.replace(`${restaurantId}/`, '')}
                      text={item.text}
                      onClick={() => null}
                    />
                  }) : null
                }
              </div>
            </div>
          </div>
        </> : null}
      </div>
    </div>
  )
}

export default RestaurantAdmin
