import { connect } from "react-redux";
import { starHandler } from "../actions/contentActions";
import { Table } from "../components/Content/Table";

const mapStateToProps = (store) => ({
  usersList: store.content.usersList,
  isFetching: store.content.isFetching,
  inputFilter: store.filter.inputFilter,
  sortType: store.content.sortType,
  sortDirection: store.content.sortDirection,
  isEnglish: store.content.isEnglish,
});

const mapDispatchToProps = (dispatch) => ({
  starHandler: (id) => dispatch(starHandler(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
