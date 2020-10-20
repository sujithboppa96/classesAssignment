import React from 'react'
import './Students.scss'


export class Students extends React.Component {

    constructor() {
        super()
        this.state = {
            isHovered: false,
            hoverDetails: []
        }
    }

    displySports = (sports) => {
        const sports1 = sports.map((x => {
            return(<div>{x},</div>)
        }))
        return sports
    }

    setIsHovered = (details) => {
        this.setState({isHovered: true, hoverDetails: details})
    }
    unSetIsHovered = () => {
        this.setState({isHovered: false})
    }

    render() {
        const data = this.props.students.map((x,index) => {
            return(
                <div className={'studentall'}>
                <div key={index} className={'student'} onClick = {() => this.props.setUserExpandedState(x.rollNumber)} onMouseOver={() =>this.setIsHovered(x)} onMouseOut={this.unSetIsHovered}>
                    {x.name}
                </div>
                {this.state.isHovered && this.state.hoverDetails.rollNumber === x.rollNumber && (
                                    <div className={'toolTip'}>

                        <div>Name <span className={'attribute'}>{this.state.hoverDetails.name}</span></div>
                        <div>Age <span>{this.state.hoverDetails.age}</span></div>
                        <div>Gender <span>{this.state.hoverDetails.gender}</span></div>
                        <div>Sports <span>{this.displySports(this.state.hoverDetails.sports)}</span></div>
                        </div>
                )}
                </div>
            )
        })
        return(
            <div >
                <div className={'studentsContainer'}>{data}</div>
            </div>
        )
    }
}


export default Students

