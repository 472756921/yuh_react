/**
 * Created by Benson on 2017/3/31.
 */

export const AritcleTODO = (state={},action)=>{
  switch (action.type){
    case "CLICK_ART_TODO":
      return  [
        ...state,
        {
          id: action.id,
        }
      ];
      break;
    case 'ChangeList_TODO':
      return {
          types : action.types,
          position: action.position
        }
      break;
    default:
      return state;
  }
};
