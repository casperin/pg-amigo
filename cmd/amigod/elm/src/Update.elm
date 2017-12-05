module Update exposing (..)

import RemoteData
import Navigation
import Commands.Query exposing (runQuery)
import Routing exposing (updateLocation)
import Msgs exposing (Msg(..))
import Models exposing (Model, Route(Query, Tables), SimpleRoute(SQuery))
import Keyboard.Event exposing (KeyboardEvent)
import Dom exposing (focus)
import Task


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        OnLocationChange location ->
            updateLocation location model

        HandleKeyboardEvent event ->
            if model.ignoreKeyEvents then
                ( model, Cmd.none )
            else
                ( model, keyEventToCmd event model )

        SetIgnoreKeyEvent ignore ->
            ( { model | ignoreKeyEvents = ignore }, Cmd.none )

        OnFetchDatabaseServerResponse resp ->
            let
                m =
                    { model | databaseServer = resp }

                cmd =
                    case resp of
                        RemoteData.Success _ ->
                            Navigation.load <| Routing.routeToUrl SQuery m

                        _ ->
                            Cmd.none
            in
                ( m, cmd )

        OnUpdateDatabase database ->
            ( model, Navigation.load <| "#query/" ++ database )

        FocusQuery ->
            model ! [ Task.attempt OnFocusQuery (focus "query") ]

        OnUpdateQueryString str ->
            ( { model | queryString = str }, Cmd.none )

        OnFocusQuery result ->
            case result of
                Err (Dom.NotFound id) ->
                    { model | error = Just ("Could not find dom id: " ++ id) } ! []

                Ok () ->
                    { model | error = Nothing } ! []

        RunQuery ->
            ( { model | queryResponse = RemoteData.Loading, loading = model.loading + 1 }, runQuery model.queryString model )

        Msgs.OnQueryResponse resp ->
            ( { model | queryResponse = resp, loading = model.loading - 1 }, Cmd.none )


keyEventToCmd : KeyboardEvent -> Model -> Cmd Msg
keyEventToCmd event model =
    case event.key of
        Just "q" ->
            Navigation.load <| "#query/" ++ Routing.getDatabase model

        Just "t" ->
            Navigation.load <| "#tables/" ++ Routing.getDatabase model

        _ ->
            Cmd.none
