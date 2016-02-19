![xinglong](https://devblog.xing.com/wp-content/uploads/login-with-xing-button-300x58.jpg)

# Usage
* To use the Xing-Login you need to generate a consumer key  [here](https://dev.xing.com/plugins/login_with)
* Then you can use the component like this:
 
```XML
<xing-login consumerKey="PUTYOURCONSUMERKEYHERE" (onLoginSucceded) = "login($event)" 
    (onLoginFailed) ="loginFailed($event)"></xing-login>
```

##Configuration Options

#### consumerKey

Unique identifier for your plugin tuned to work only on the domain you specified (though localhost and localhost.local will work for any consumer). The consumer key is also used with the logout function and when verifying the received user data with XING

#### language  (optional)

	
* en *English* 
* de *German*


#### size (optional)	

* small 
* medium
* large
* xlarge

#### color (optional)

* green
* gray

#### onLoginSucceded (optional event)
* is called when login was sucessful 
* provides a user token

#### onLoginFailed (optional event)
* is called when login failed
* provides an error