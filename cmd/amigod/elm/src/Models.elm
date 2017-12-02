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


type alias Model =
    { loading : Int
    , route : Route
    , sidebarOpen : Bool
    , ignoreKeyEvents : Bool
    , queryResponse : WebData QueryResponse
    , error : Maybe String
    }


initialModel : Route -> Model
initialModel route =
    { loading = 0
    , route = route
    , sidebarOpen = True
    , ignoreKeyEvents = False
    , queryResponse = RemoteData.NotAsked
    , error = Nothing
    }
