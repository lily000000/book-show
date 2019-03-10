import React, { Component } from 'react'; 
import Tool from '@/utils/tool.js';
import { API } from "@/api/index.js";
import './style.scss';

class Details extends Component{
  constructor(props){
    super(props)
    this.state = {
        currentBook:{
            
        }
    }
  }
  componentDidMount () {
    API.getBooksData().then(ret=>{ 
      const {data,success,message}  = ret;
      if(success){
        const index =Tool.getQueryString('index');
        const type = Tool.getQueryString('type');
        const bookData = data[parseInt(type)].data;
        this.setState({
            currentBook:bookData[parseInt(index)]
          });
      }
      
    })
  }
  render(){
    const {currentBook}  = this.state;
    const {name,url,content,introduce} = currentBook
    return (
      <div>
        <div className="title">{name}</div>
        <img src={url}/>
        <div>{introduce}</div>
        <div>{content}</div>
      </div>
    )
  }
}
export default Details