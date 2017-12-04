module Models exposing (..)

import RemoteData exposing (WebData)


type Route
    = Home
    | Query
    | Tables


type alias QueryResponse =
    { schema : List SchemaColumn
    , values : List (List String)
    }


type alias SchemaColumn =
    { name : String
    }


type alias DatabaseServer =
    { databases : List String }


type alias Model =
    { loading : Int
    , route : Route
    , ignoreKeyEvents : Bool
    , databaseServer : WebData DatabaseServer
    , selectedDatabase : Maybe String
    , queryString : String
    , queryResponse : WebData QueryResponse
    , error : Maybe String
    }


initialModel : Route -> Model
initialModel route =
    { loading = 0
    , route = route
    , ignoreKeyEvents = False
    , databaseServer = RemoteData.Loading
    , selectedDatabase = Nothing
    , queryString = ""
    , queryResponse = RemoteData.NotAsked
    , error = Nothing
    }
