/**
 * Created by Benson on 2017/3/31.
 */

import { connect } from 'react-redux';
import _ArticleContent from '../../components/ArticleList/ArticleContent';
import { changeClass,click } from '../../actions/ArticleAction';


const mapStateToProps = (state,ownProps) => ({
    type: state,
})

const mapDispatchToProps = {
    changeClass:changeClass,
    click:click
}


const ArticleContent = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ArticleContent)

export default ArticleContent;
