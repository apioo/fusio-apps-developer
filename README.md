
# Fusio-Consumer

## About

This is a sample Fusio consumer application which provides a basic account page
to grant apps access to your account and to manage basic account data and app 
grants/credentials. Note this is only a sample normally you would embed this 
into your application. More informations about Fusio at http://fusio-project.org

## Configuration

The app must know the API endpoint of Fusio. If not provided it tries to guess 
the correct endpoint url. If this does not work you can set the correct 
url at the `/index.html` file i.e.:

    var fusioUrl = 'http://api.acme/';

At the /auth endpoint the user can authorize new apps. The OAuth2 specification 
states that the `Redirection Endpoint` URL must not contain a fragment 
component. Because of that we need to configure the [Html5Mode] so that we can 
use clean urls i.e.:
`/auth?response_type=code&client_id=afd389ff-3a3f-45d9-8ccc-c6574380f3da&scope=authorization,consumer`

To correctly configure the html 5 mode you have to set a correct base tag in the 
`/index.html` file. Also you have to configure the webserver so that all 
requests are redirected to the index.html. I.e. for Apache you could use the 
following directives:

    DirectoryIndex index.html
    FallbackResource /consumer/index.html

[Html5Mode]: https://docs.angularjs.org/api/ng/provider/$locationProvider#html5Mode
