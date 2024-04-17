import { useContext, useRef, useState} from "react";



const LogInForm = () => {
    const FirstNameRef = useRef();
    const LastNameRef = useRef();
    const EmailRef = useRef();
    const PasswordRef = useRef();

    const {sendRequest, isLoading, error} = useAuth();

    const [submitted, setSubmitted] = useState(false)
    const authCtx = useContext(AuthContext);

    const proccessFormSubmission = (data) => {
        //Call Log In Function of the AuthCtx Pass in First Name Last
        //
        const expirationTime = new Date(
            new Date().getTime() + +data.expiresIn * 1000
          );
          const userData = {
              firstName: FirstNameRef.current.value,
              lastName: LastNameRef.current.value,
              userId: data.localId
          }
          authCtx.login(data.idToken, expirationTime.toISOString(), userData);
          console.log("loging Data", data, userData)
          setSubmitted(true);
        
    }

    const submitLogInRequest = (event) => {
        event.preventDefault()
        sendRequest({
            url: 'signInWithPassword',
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: {
                email: EmailRef.current.value,
            password: PasswordRef.current.value,
        returnSecureToken: true}
        }, proccessFormSubmission);
    }

   if (submitted) {
       return(<p>Your form was successfully submitted!</p>)
   }

    if (error) {
        return (error);
    }

    if (isLoading) {
        return (<p>Please wait we are submitting your request</p>);
    }

    return(
        <div>
            <div>
                <div>
                    <form onSubmit={submitLogInRequest} name="sentMessage" id="contactForm" noValidate={false}>
                            <div className="control-group">
                            <input type="email" className="form-control" id="email" ref={EmailRef} placeholder=" Email"
                                required="required" data-validation-required-message="Please enter your email"/>
                            <p className="help-block text-danger"></p>
                        </div>
                        <div className="control-group">
                            <input type="text" className="form-control" id="subject" ref={PasswordRef} placeholder="Password"
                                required="required" data-validation-required-message="Please enter a Password" />
                            <p className="help-block text-danger"></p>
                        </div>
                        <div>
                            <button className="btn btn-primary py-2 px-4" type="submit" id="sendMessageButton">Log In</button>
                        </div>
                    </form>   
                </div>
            </div>
        </div>
    )
}