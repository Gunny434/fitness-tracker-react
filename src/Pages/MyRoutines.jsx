// import PostView from "../Components/PostView";
// import MessageView from "../Components/MessageView";
import LogMeOut from "../Components/LogMeOut";

const MyRoutines = ({token, setToken}) => {
    return (
      <div className="myRoutines_page">
        { token &&
          <LogMeOut
            token={ token } 
            setToken={ setToken }/>
        }
        <h1>My Routines:</h1>
        {/* <PostView token={ token } />
        <MessageView token={ token } /> */}
      </div>
    );
  };
  
export default MyRoutines;