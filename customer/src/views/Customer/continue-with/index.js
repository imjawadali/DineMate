import React from 'react';
import image from '../../../assets/ios-android.jpg';
import google from '../../../assets/google.png';
import apple from '../../../assets/apple.png';
import computer from '../../../assets/computer.png';
import './styles.css';

function ContinueWith() {

    return (
        <div className="continue-with">
            <div className="flex-1 flex justify-center">
                <img className="ios-android" src={image} />
            </div>

            <div className="flex-1" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ margin: 50, fontSize: 24, fontWeight: 'bolder' }}>Get the App & Place Order</div>

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <div style={{ backgroundColor: 'black', borderRadius: 21, paddingTop: 4, margin: '0 5px' }}>
                        <img className="play-store" src={google} />
                    </div>

                    <div style={{ backgroundColor: 'black', borderRadius: 21, paddingTop: 4, margin: '0 5px' }}>
                        <img className="play-store" src={apple} />
                    </div>
                </div>

                <div style={{ margin: 50, fontSize: 24, fontWeight: 'bolder' }}>Or</div>

                <div style={{ marginBottom: 50, fontSize: 24, fontWeight: 'bolder' }}>Start Using</div>

                <div style={{ display: 'flex', marginBottom: 20, cursor: 'pointer', background: '#0000001c', padding: 10, borderRadius: 5, alignItems: 'center' }}>
                    <img className="computer-img" src={computer} />
                    <span style={{ margin: 10, fontSize: 24, fontWeight: 'bolder' }}>The Web</span>
                </div>
            </div>
        </div>
    )
}

export default ContinueWith