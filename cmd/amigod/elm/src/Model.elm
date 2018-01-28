module Model exposing (Model, DBServer, Route(..))

import RemoteData
import Navigation


type alias Model =
    { history : List Navigation.Location
    , route : Route
    , db : Maybe String
    , dbServer : RemoteData.WebData DBServer
    }


type alias DBServer =
    { databases : List String }


type Route
    = NotFound
    | Home
    | Query String
    | Tables String
