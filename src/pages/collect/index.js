import React, { Component } from 'react'; 
import { API } from "@/api/index.js";
import './style.scss';

class Collect extends Component{
  constructor(props){
    super(props)
    this.state = {
      bookData: []
    }
  }
  
  componentDidMount () {
    API.getBooksData().then(ret=>{ 
      const {data,success,message}  = ret;
      if(success){
        this.setState({
          bookData:  data[2].data|| []});
      }
      
    })
  }
  onLookDetalis = (item,index) => {
    this.props.history.push('/details?index='+index+'&type=2');
  }
 redenrList = (bookList) => {
    return bookList.map((item,index)=>{
      return (
      <div className='book-item' key={index} onClick={()=>this.onLookDetalis(item,index)}>
      <div key={index} className='book-wrap' >
          <img src={item.url} className='imgicon'></img> 
          <div className='describe'>
            <p>{item.name}</p>
            <p>{item.introduce}</p>
          </div>
        </div> 
      </div> 
    )
    })
      
  }
  render(){
    const { bookData } = this.state;
    return (
      <div className="bookRack">
          {
            this.redenrList(bookData)
          }
      </div>
    )
  }
}
export default Collect