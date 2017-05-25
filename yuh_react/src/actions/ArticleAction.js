/**
 * Created by Benson on 2017/3/31.
 * article  Action
 */

export const click =(id)=> {
  return{
    type: 'CLICK_TODO',
    id: id
  }
};

export const changeClass =(position,types)=> {
  return{
    type: 'ChangeList_TODO',
    types: types,
    position: position
  }
};
