import React,{Component} from 'react';
import axios from 'axios'
// import TrData from './components/TrData'
class App extends  Component {
  constructor(props) {
    super(props);
    this.state={
        users:[],
        getAccountState:{},
        getTx:{},
        isLoaded:false
    }

    this.handleChange = this.handleChange.bind(this);
    
  }

   handleChange(event){
    let keyword = event.target.value;
    const _this=this;  
    axios.get('/search?keyword='+keyword).then(function (response) {
      _this.setState({
        // users:response.data,
        getAccountState:response.data.getAccountState,
        getTx:response.data.getTx,

        isLoaded:true
      });
      console.log(response.data);
    })
    .catch(function (error) {
      //
      _this.setState({
        isLoaded:false,
        error:error
      })
    })
  }
  render() {
    const getAccountState =this.state.getAccountState.state||{};
    const getTx = this.state.getTx.info||{};
    return (
      <div className="App">
        <header className="App-header">
          
        <input type="text" onChange={this.handleChange} placeholder="地址"/>

        <table>
           <tr>
             <td>address</td>
             <td>{getAccountState.address||"暂无"}</td>
           </tr>
           <tr>
             <td>balance</td>
             <td>{getAccountState.balance||"暂无"}</td>
           </tr>
           <tr>
             <td>balance</td>
             <td>{getTx.hash||"暂无"}</td>
             </tr>
        </table>

        </header>

        {/* <table className="table table-bordered">
          <thead>
            <tr>
              <th className="text-center">ID</th>
              <th className="text-center">姓名</th>
              <th className="text-center">年龄</th>
              <th className="text-center">性别</th>
            </tr>
          </thead>
        <tbody>
           <TrData users={this.state.users}/>
        </tbody>
        </table> */}
      </div>
    );
  }

}

  

export default App;
