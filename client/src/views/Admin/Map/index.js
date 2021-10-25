import React from 'react'
import { useDispatch } from 'react-redux'
import { GoogleMap, Marker, Autocomplete } from '@react-google-maps/api'
import { customisedAction } from '../../../redux/actions'
import { SET_TOAST, SET_TOAST_DISMISSING } from '../../../constants'

function Map({ center, setcenter, searchText, setsearchText, autocomplete, setautocomplete, expanded, setshowMapModal, setlatitude, setlongitude }) {

  const dispatch = useDispatch()

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      center={center}
      options={{
        zoom: 20,
        fullscreenControl: false
      }}
      onLoad={map => {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
      }} >
      {expanded
        ? <Autocomplete
          onLoad={autocomplete => setautocomplete(autocomplete)}
          onPlaceChanged={() => {
            if (autocomplete) {
              try {
                const { geometry } = autocomplete.getPlace()
                setsearchText(autocomplete.name)
                if (geometry) {
                  setcenter({
                    lat: geometry.location.lat(),
                    lng: geometry.location.lng()
                  })
                  setlatitude(geometry.location.lat())
                  setlongitude(geometry.location.lng())
                  dispatch(customisedAction(SET_TOAST_DISMISSING))
                } else dispatch(customisedAction(SET_TOAST, {
                  message: "Try to pick a location from suggestions!", type: 'error'
                }))
              } catch (error) {
                dispatch(customisedAction(SET_TOAST, {
                  message: error.message, type: 'error'
                }))
              }
            } else dispatch(customisedAction(SET_TOAST, {
              message: "Autocomplete not loaded yet!", type: 'error'
            }))
          }} >
          <div style={{
            width: '100%',
            marginTop: '5px',
            display: 'flex',
            justifyContent: 'center',
            position: 'absolute',
            top: 5
          }}>
            <input
              placeholder="Search your place"
              style={{
                width: '300px',
                padding: '9px 12px',
                outline: 'none',
                borderRadius: '3px',
                borderColor: 'transparent',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                boxSizing: 'border-box'
              }}
              value={searchText}
              onChange={({ target: { value } }) => setsearchText(value)}
            />
            <i className="fa fa-compress fa-lg"
              style={{
                cursor: 'pointer',
                display: 'block',
                float: 'right',
                position: 'absolute',
                right: 5,
                background: 'white',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                padding: 10
              }}
              onClick={() => setshowMapModal(false)} />
          </div>
        </Autocomplete>
        : <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          background: 'rgba(0, 0, 0, 0.2)'
        }}
        onClick={() => setshowMapModal(true)} >
        {/* <i className="fa fa-expand fa-lg"
          style={{
            cursor: 'pointer',
            background: 'white',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
            padding: 6
          }}
          onClick={() => setshowMapModal(true)} /> */}
          </div>
      }
      <Marker key="marker"
        position={center}
        draggable={true}
        onDragEnd={position => {
          setcenter({
            lat: position.latLng.lat(),
            lng: position.latLng.lng()
          })
          setlatitude(position.latLng.lat())
          setlongitude(position.latLng.lng())
        }}
      />
    </GoogleMap>
  )
}

export default Map
