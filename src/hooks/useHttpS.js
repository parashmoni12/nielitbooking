import axios from "axios";
import {
  useState,
  useEffect
} from "react";

axios.defaults.baseURL = "http://localhost:8080";

const useHttp = (request)=>{
  const [httpResponse,setHttpResponse] = useState(null);
  const [httpError,setHttpError] = useState(null);
  const [httpLoader,setHttpLoader] = useState(true);

  const ajax = ()=>{
    axios(request)
    .then((response)=>{
      
      setHttpResponse(response);
      
    })
    .catch((err)=>{
    
      setHttpError(err);
    })
    .finally(()=>{
      setHttpLoader(false);
    });
  }

  useEffect(()=>{
    if(request)
    {
      ajax();
    }
  },[request]);

  return [httpResponse,httpError,httpLoader];
}
export default useHttp;
