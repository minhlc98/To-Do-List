import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/index'
function Filter(props) {
    function handleChange(e){
        const { value: title } = e.target
        props.filter(title)
    }
    return (
        <div className="row">
            <div className="col-md-6 col-lg-4">
            <div className="form-group has-search">
                    <span className="fa fa-search form-control-feedback"></span>
                    <input type="text" 
                            className="form-control" 
                            placeholder="Search"
                            onChange = {handleChange} />
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {

    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        filter: (title) => {
            dispatch(actions.filterTask(title))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Filter)