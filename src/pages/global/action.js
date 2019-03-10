import {globalType} from './constant';
import { API } from "@/api/index.js";

const navData = (data) => ({
  type: globalType.GET_NAV_DATA,
  payload: data
})
export const getNavData = (params) => async (dispatch, getState) => {
  try {
    API.getNavList(params).then(response =>{ 
      if (response.success) {
        dispatch(navData(response.data));
      } else {
        //返回失败
      }
    });
  } catch (error) {
    console.log('error: ', error)
  }
}


