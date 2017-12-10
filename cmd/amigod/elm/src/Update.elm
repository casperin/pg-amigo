module Update exposing (..)

import RemoteData
import Navigation
import Commands.Query
import Routing
import Msgs exposing (Msg(..))
import Models exposing (Model, Route(Query, Tables), SimpleRoute(SQuery))
import Keyboard.Event
import Dom
import Task


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        OnLocationChange location ->
            Routing.updateLocation location model

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
                        RemoteData.Success databaseServer ->
                            Cmd.batch
                                [ Navigation.load <| Routing.routeToUrl SQuery m
                                , Msgs.loadDatabase databaseServer.databases
                                ]

                        _ ->
                            Cmd.none
            in
                ( m, cmd )

        OnUpdateDatabase database ->
            ( model
            , Cmd.batch
                [ Navigation.load <| "#query/" ++ database
                , Msgs.saveDatabase database
                ]
            )

        FocusQuery ->
            model ! [ Task.attempt OnFocusQuery (Dom.focus "query") ]

        OnUpdateQueryString str ->
            ( { model | queryString = str }, Cmd.none )

        OnForceUpdateQueryString str ->
            ( { model | queryString = str, queryKey = model.queryKey + 1 }, Cmd.none )

        OnFocusQuery result ->
            case result of
                Err (Dom.NotFound id) ->
                    { model | error = Just ("Could not find dom id: " ++ id) } ! []

                Ok () ->
                    { model | error = Nothing } ! []

        RunQuery ->
            let
                filteredHistory =
                    List.filter ((/=) model.queryString) model.queryHistory

                queryHistory =
                    model.queryString :: filteredHistory
            in
                ( { model
                    | queryResponse = RemoteData.Loading
                    , queryHistory = List.take 100 queryHistory
                  }
                , Commands.Query.runQuery model.queryString model
                )

        Msgs.OnQueryResponse resp ->
            ( { model | queryResponse = resp }, Cmd.none )

        Msgs.UpdateQueryOffset offset ->
            ( { model | queryResponseOffset = offset }, Cmd.none )


keyEventToCmd : Keyboard.Event.KeyboardEvent -> Model -> Cmd Msg
keyEventToCmd event model =
    case event.key of
        Just "q" ->
            Navigation.load <| "#query/" ++ Routing.getDatabase model

        Just "t" ->
            Navigation.load <| "#tables/" ++ Routing.getDatabase model

        _ ->
            Cmd.none
