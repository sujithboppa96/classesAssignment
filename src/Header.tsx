import React from 'react'
import { Students } from './components/Students/Students'



export interface state {
  isHOvered: boolean
}
export class Header extends React.Component<{}, state>{


    constructor(props) {
      super(props)
      this.state= {
        isHOvered: false
      }
    }


handleOver= () => {
  this.setState({isHOvered: true})
}


static getDerivedStateFromProps = (props, state) => {
  console.log(props, state, 'props, state')
}


getSectionGroupData = (users) => {

  const groups = users.reduce((groups, item) => {
    console.log(groups, 'groups')
    const section = (groups[item.section] || [])
    section.push(item)
    groups[item.section] = section
    return groups
  }, {});

  return groups
}


    render() {
      const SectionGroupData = this.getSectionGroupData(this.props.users)
      const sections = []
      for( let x in SectionGroupData ) {
          let ele = (
            <ul>
            <li>{`section${x}`}</li>
            <Students students= {SectionGroupData[x]}></Students>
            </ul>
          )
          sections.push(ele)
       }

        return (
          <div>
            {sections}
          </div>
        )
    }
}

