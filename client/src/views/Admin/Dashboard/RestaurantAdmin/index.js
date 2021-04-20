import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Button, DashboardGridItem, ServiceQueItem } from '../../../../components'
import { CLEAR_TABLE_ORDERS, GET_RESTAURANT_DASHBOARD, MERGE_TABLES, SET_TOAST, SET_TOAST_DISMISSING, UN_MERGE_TABLES } from '../../../../constants'
import { customisedAction } from '../../../../redux/actions'

function RestaurantAdmin(props) {

  const [merging, setmerging] = useState(false)
  const [selectedTables, setselectedTables] = useState([])
  const [hoveredTable, sethoveredTable] = useState(null)

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
    if (!mergingTables) {
      cancelMerge()
    }
    if (!mergingTables && !unMergingTables)
      sethoveredTable(null)
  }, [mergingTables, unMergingTables])

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
    return (4 - counts)
  }

  const getMergedColumnCounts = () => {
    if (getUnmergedColumnCounts() === 3) {
      if (getUnmergedTables().length > 2) return 4
      else if (getUnmergedTables().length > 1) return 3
      else if (getUnmergedTables().length) return 2
      else return 1
    }
    else if (getUnmergedColumnCounts() === 2) {
      if (getUnmergedTables().length > 1) return 3
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

  let row=1
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
              else {
                sethoveredTable(null)
                dispatch(customisedAction(GET_RESTAURANT_DASHBOARD, { restaurantId }))
              }
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
                    if (index >= getUnmergedColumnCounts() && index % getUnmergedColumnCounts() === 0) {
                      row = row + 1
                    }
                    return (<div className="DashboardGridItemContainer" key={id}
                      style={{
                        gridColumn: (index % getUnmergedColumnCounts())+1,
                        gridRow: row, 
                        backgroundColor: merging ? occupiedBy ? 'white' : 'rgb(245, 222, 179)' : ''
                        }}>
                        <DashboardGridItem
                          text={"Table " + value.replace(`${restaurantId}/`, '')}
                          doNotDisturb={doNotDisturb}
                          occupiedBy={occupiedBy}
                          merging={merging}
                          includesMerging={selectedTables.includes(id)}
                          onMouseEnter={() => merging ? null : sethoveredTable(table)}
                          onClick={() => {
                            if (merging) selectTable(id)
                            else if (occupiedBy) {
                              dispatch(customisedAction(CLEAR_TABLE_ORDERS))
                              props.history.push({
                                pathname: '/client/admin/dashboard/restaurantAdmin/orderDetails',
                                state: { restaurantId, tableId: value }
                              })
                            }
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
                          backgroundColor: merging ? 'white' : '',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={() => merging ? null : sethoveredTable(mergedTables)}
                        onClick={() => {
                          if (mergedTables.filter(table => table.occupiedBy).length) {
                            dispatch(customisedAction(CLEAR_TABLE_ORDERS))
                            props.history.push({
                              pathname: '/client/admin/dashboard/restaurantAdmin/orderDetails',
                              state: { restaurantId, tableId: table.mergeId, mergedTables }
                            })
                          }
                        }}
                      >
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
              <div className="DashboardTableDetailsContainer"
                style={{
                  justifyContent: hoveredTable ? '' : 'center'
                }}>
                  {hoveredTable ?
                    <>
                      <p style={{ flex: 1}}>Amount: $ 0</p>
                      <p>Table - {
                        Array.isArray(hoveredTable) ?
                          hoveredTable.map((table, index) => {
                            return `
                              ${index === hoveredTable.length - 1 ? ' & ' : ''}
                              ${table.value.replace(`${restaurantId}/`, '')}
                              ${index < hoveredTable.length - 2 ? ', ' : ''}`
                          })
                        : hoveredTable.value.replace(`${restaurantId}/`, '')
                      }</p>
                      <p style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>Duration: 00:00:00</p>
                    </>
                    : <p>Hover on a table to show details!</p>
                  }
              </div>
            </div>
            <div className="DashBoardServicesContainer">
              <p>Services Que</p>
              <div>
                {servicesQue ?
                  servicesQue.map(item => {
                    return <ServiceQueItem
                      id={item.id}
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
