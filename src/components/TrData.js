import React,{Component} from 'react';
class TrData extends Component{
    constructor(props){
      super(props);
    }
    render(){
      return (
        this.props.users.map((user,i)=>{
            return (
                <tr key={user.id} className="text-center">
                  <td>{user.id}</td>
                  <td>{user.title}</td>
                  <td>{user.name}</td>
                  <td>{user.sex}</td>
                </tr>
            )       
        })
      )
    }
}
export default TrData;
