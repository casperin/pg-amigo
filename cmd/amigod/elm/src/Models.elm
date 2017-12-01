module Models exposing (..)


type Route
    = Home


type alias Model =
    { loading : Int
    , route : Route
    , sidebarOpen : Bool
    , ignoreKeyEvents : Bool
    , error : Maybe String
    }


initialModel : Route -> Model
initialModel route =
    { loading = 0
    , route = route
    , sidebarOpen = True
    , ignoreKeyEvents = False
    , error = Nothing
    }
