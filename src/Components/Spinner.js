import React from 'react'
import loading from '../spinner.gif'
// export default class Spinner extends Component {
//     render() {
const Spinner = ()=>{ //Converted to funtion based
        return (
            <div className="text-center my-5 ">
                <img src={loading} alt="Loading..."/>
            </div>
        )
    }
export default Spinner;
