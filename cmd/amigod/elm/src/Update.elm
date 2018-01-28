module Update exposing (update, Msg(..))

import Navigation
import RemoteData
import Model exposing (Model, DBServer)
import Route


type Msg
    = UrlChange Navigation.Location
    | OnFetchDBServer (RemoteData.WebData DBServer)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        UrlChange location ->
            ( { model
                | history = location :: model.history
                , route = Route.parseLocation location
              }
            , Cmd.none
            )

        OnFetchDBServer resp ->
            ( { model | dbServer = resp }, Cmd.none )
