module Update exposing (..)

import Debug
import RemoteData
import Navigation
import Commands.Query exposing (runQuery)
import Routing exposing (updateLocation)
import Msgs exposing (Msg(..))
import Models exposing (Model, Route(Query, Tables))
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
                ( model, keyEventToCmd event )

        SetIgnoreKeyEvent ignore ->
            ( { model | ignoreKeyEvents = ignore }, Cmd.none )

        OnFetchDatabaseServerResponse resp ->
            let
                cmd =
                    case resp of
                        RemoteData.Success _ ->
                            Navigation.load "#tables"

                        _ ->
                            Cmd.none
            in
                ( { model | databaseServer = resp }, cmd )

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
            ( { model | queryResponse = RemoteData.Loading, loading = model.loading + 1 }, runQuery model.queryString )

        Msgs.OnQueryResponse resp ->
            ( { model | queryResponse = resp, loading = model.loading - 1 }, Cmd.none )


keyEventToCmd : KeyboardEvent -> Cmd Msg
keyEventToCmd event =
    case event.key of
        Just "q" ->
            Navigation.load "#query"

        Just "t" ->
            Navigation.load "#tables"

        _ ->
            Cmd.none
