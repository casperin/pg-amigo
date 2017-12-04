module Models exposing (..)

import RemoteData exposing (WebData)


type Route
    = Home


type alias QueryResponse =
    { schema : List SchemaColumn
    , values : List (List String)
    }


type alias SchemaColumn =
    { name : String
    }


type alias Structure =
    { databases : List DatabaseSchema
    }


type alias DatabaseSchema =
    { name : String
    , kind : String
    , tables : List String
    , views : List String
    }


type alias Model =
    { loading : Int
    , route : Route
    , sidebarOpen : Bool
    , ignoreKeyEvents : Bool
    , structure : WebData Structure
    , selectedDatabase : Int
    , queryString : String
    , queryResponse : WebData QueryResponse
    , error : Maybe String
    }


initialModel : Route -> Model
initialModel route =
    { loading = 0
    , route = route
    , sidebarOpen = True
    , ignoreKeyEvents = False
    , structure = RemoteData.Loading
    , selectedDatabase = 0
    , queryString = ""
    , queryResponse = RemoteData.NotAsked
    , error = Nothing
    }
