

import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { connect } from 'react-redux'
import './App.scss'
import { Header }  from './Header'
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom'
import { Students } from './components/Students/Students'
import { UserDetails } from './components/UserDetails/UserDetails'

import { store } from './index'
import axios from 'axios'




export class App extends React.Component {


  constructor() {
    super()
    this.state = {
      users: [],
      isUserExpanded: false,
      rollNumber: ''
    }
  }


  componentDidMount() {
    axios.get('https://student-management-api-1u3cd4j7s.now.sh/students')
    .then((res) => {
      this.setState({users: res.data})
    })
  }


setUserExpandedState = (rollNumber) => {
  this.setState({rollNumber: rollNumber})
  this.setState({isUserExpanded: true})
}
unSetUserExpandedState = () => {
  this.setState({isUserExpanded: false})
}

getGroupedData = (users, iterator) => {

  const groups = users.reduce((groups, item) => {
    let key = iterator === 'class' ? item.class : item.section
    const class1 = (groups[key] || [])
    class1.push(item)
    groups[key] = class1
    return groups
  }, {});

  return groups
}

getUserDetails = () => {
  const userDetail = this.state.users && this.state.users.filter((x) => {
    if(x.rollNumber === this.state.rollNumber) {
      return x
    }
  })
  console.log(userDetail, 'userDetail')
  return userDetail
}

getClassData = (sectionsdata) => {
  let SectionGroupData = this.getGroupedData(sectionsdata, 'section')
  const sections = []
  for( let x in SectionGroupData ) {
      let ele = (
        <ul>
        <li>{`section${x}`}</li>
        <Students students= {SectionGroupData[x]} setUserExpandedState ={this.setUserExpandedState}></Students>
        </ul>
      )
      sections.push(ele)
   }
   return sections
}


    render() {
      const userDetail = this.getUserDetails()
      console.log(this.state.users, 'this.state.users')
      const groupedData = this.state.users.length > 0 ? this.getGroupedData(this.state.users, 'class') : []
      const data = []
          for (let x in groupedData) {
            let ele = <ul>
                <li>{`class${x}`}</li>
                <ul>{this.getClassData(groupedData[x])}</ul>
            </ul>
            data.push(ele)
          }

          return(
            <div className={"container"}>
              <div className={"classData"}>{data}</div>
            {this.state.isUserExpanded && (
              <div className={`userDetails ${this.state.isUserExpanded && 'sidebar'}`}>
                <UserDetails UserDetails={userDetail} unSetUserExpandedState={this.unSetUserExpandedState}></UserDetails>
              </div>
            ) }
            </div>
          )

    }
}


export default App