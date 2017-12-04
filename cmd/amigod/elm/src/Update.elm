module Update exposing (..)

import RemoteData
import Commands.Query exposing (runQuery)
import Routing exposing (parseLocation)
import Msgs exposing (Msg(..))
import Models exposing (Model)
import Keyboard.Event exposing (KeyboardEvent)
import Dom exposing (focus)
import Task


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        OnLocationChange location ->
            ( { model | route = parseLocation location }, Cmd.none )

        HandleKeyboardEvent event ->
            if model.ignoreKeyEvents then
                ( model, Cmd.none )
            else
                handleKeyEvent event model

        SetIgnoreKeyEvent ignore ->
            ( { model | ignoreKeyEvents = ignore }, Cmd.none )

        OnFetchDatabaseServerResponse resp ->
            ( { model | databaseServer = resp }, Cmd.none )

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


handleKeyEvent : KeyboardEvent -> Model -> ( Model, Cmd Msg )
handleKeyEvent event model =
    case event.key of
        Just "q" ->
            model ! [ Task.attempt OnFocusQuery (focus "query") ]

        _ ->
            ( model, Cmd.none )
