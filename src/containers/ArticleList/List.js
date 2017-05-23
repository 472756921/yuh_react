/**
 * Created by Benson on 2017/3/30.
 */
import { connect } from 'react-redux';
import _Lists from '../../components/ArticleList/Lists';
import { click } from '../../actions/ArticleAction';
import {ARTICLE} from '../../InterFace/InterfaceAPI';

const mapStateToProps = (state,ownProps) => ({
  position: ownProps.position,
  type:state.AritcleTODO.types
})

const mapDispatchToProps = (dispatch,ownProps)=>({
  click: click,
})

const Lists = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Lists)

export default Lists;
