import PasswordModal from '../components/password-modal';
import { connect } from 'react-redux';
import { togglePasswordModal } from '../store/actions/creators';

function mapStateToProps(state) {
  return {
    password: state.password,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleModal: () => {
      dispatch(togglePasswordModal());
    }
  }
}

const PasswordModalContianer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordModal);

export default PasswordModalContianer;
