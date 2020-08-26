import React from 'react';
import Modal from '../../component/UI/Modal/Modal';

function withErrorHandler(WrappedComponent, axios) {
    return class extends React.Component {  //ComponentDidMount hook을 사용하기 위해 클래스 컴포넌트를 리턴.
        state = {
            error: null
        }

        errorConfirmHandler = () => {
            this.setState({error: null});
        }

        componentWillMount() { // request 보내기 전에 여기로 온다.
            this.reqInterceptor = axios.interceptors.request.use(req => { 
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        render() { //Error Modal은 에러가 있으면 showing한다.
            return (
                <div> 
                    <Modal 
                        show={this.state.error} 
                        modalClosed={this.errorConfirmHandler}> 
                        {this.state.error ? this.state.error.message : null} 
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </div>
            )
        }
    }
}

export default withErrorHandler;



