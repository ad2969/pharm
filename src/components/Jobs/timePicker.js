import React from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, TimePicker as TP, Button } from 'antd'
import * as moment from 'moment'
import t from 'assets/languages'

import Header from 'components/Header'

import * as ROUTES from 'constants/routes'

import { convertToSendable } from 'functions/converts'

class TimePicker extends React.Component {

    constructor(props) {
        super(props)
        if(props.location.state.new) {
            this.state = {
                new: true,
                index: props.location.state.id,
                days: [0, 0, 0, 0, 0, 0, 0],
                timestamp: +moment({hour: 0, minute: 0}),
                all: props.location.state.all,
            }
        }
        else {
            this.state = { ...props.location.state }
        }
        console.log(this.state)
    }

    updateTime(time) {
        this.setState({
            timestamp: +moment(time)
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        var data = this.state.all
        const { timestamp, days } = this.state
        data[this.state.index] = {
            timestamp, days
        }
        var result = convertToSendable(data)
        console.log('sending ', result)
        this.props.history.push(ROUTES.JOBS + '/create')
    }

    updateDay(index) {
        this.setState(prevState => {
            const days = prevState.days.map((item, j) => {
              if (j === index) {
                return !item
              } else {
                return item;
              }
            });
            return {
              days,
            };
          });
    }

    render() {
        return (
            <Layout>
                <Header title='' backRoute={ROUTES.JOBS + '/create'}/>
                <Layout.Content>
                    <div className="time-picker">
                        <TP defaultValue={moment(this.state.timestamp)}
                            size="large"
                            use12Hours
                            format="h:mm A"
                            open={true}
                            className="ant-time-picker--hidden"
                            onChange={this.updateTime}/>
                    </div>
                    <h1 style={{paddingTop: "35vh", paddingLeft: "10vw"}}>Repeat:</h1>
                    <div className="forms__line forms__line--narrow" style={{paddingTop: "1rem", margin: "0 auto"}}>
                        <span className="forms__line__day" style={{width:"14%"}}>
                            <span className={this.state.days[0] ? "t--circle" : ""} onClick={() => {this.updateDay(0)}}>S</span></span>
                        <span className="forms__line__day" style={{width:"14%"}}>
                            <span className={this.state.days[1] ? "t--circle" : ""} onClick={() => {this.updateDay(1)}}>M</span></span>
                        <span className="forms__line__day" style={{width:"14%"}}>
                            <span className={this.state.days[2] ? "t--circle" : ""} onClick={() => {this.updateDay(2)}}>T</span></span>
                        <span className="forms__line__day" style={{width:"14%"}}>
                            <span className={this.state.days[3] ? "t--circle" : ""} onClick={() => {this.updateDay(3)}}>W</span></span>
                        <span className="forms__line__day" style={{width:"14%"}}>
                            <span className={this.state.days[4] ? "t--circle" : ""} onClick={() => {this.updateDay(4)}}>T</span></span>
                        <span className="forms__line__day" style={{width:"14%"}}>
                            <span className={this.state.days[5] ? "t--circle" : ""} onClick={() => {this.updateDay(5)}}>F</span></span>
                        <span className="forms__line__day" style={{width:"14%"}}>
                            <span className={this.state.days[6] ? "t--circle" : ""} onClick={() => {this.updateDay(6)}}>S</span></span>
                    </div>
                    <Button type="primary" size="large" className="t--uppercase b--done"
                            style={{marginLeft: "10vw"}}
                            onClick={this.handleSubmit} >{t('done')}</Button>
                </Layout.Content>
            </Layout>
        )
    }
}

export default withRouter(TimePicker)
