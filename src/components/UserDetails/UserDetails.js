import React from 'react'
import './UserDetails.scss'

export class UserDetails extends React.Component {



displySports = (sports) => {
    console.log(sports)
    const sports1 = sports.map((x => {
        return(<span>{x},</span>)
    }))
return sports1
}

    render() {
        console.log(this.props.UserDetails[0].sports)
        return(
            <div className={'sidebarx'}>
                <div className={'closeButton'} onClick={this.props.unSetUserExpandedState}>x</div>
                <div><span className={'userAttr'}>Name</span> <span className={'userInfo userInfol'}>{this.props.UserDetails[0].name}</span></div>
                <div><span className={'userAttr'}> Age </span> <span className={'userInfo'}>{this.props.UserDetails[0].age}</span></div>
                <div><span className={'userAttr'}>Gender</span> <span className={'userInfo'}>{this.props.UserDetails[0].gender}</span></div>
                <div><span className={'userAttr'}>Sports</span> <span className={'userInfo userInfol'}>{this.displySports(this.props.UserDetails[0].sports)}</span></div>
            </div>
        )
    }
}