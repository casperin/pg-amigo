module Update exposing (..)

import Routing exposing (parseLocation)
import Msgs exposing (Msg(..))
import Models exposing (Model)
import Keyboard.Event exposing (KeyboardEvent)
import Dom exposing (focus)
import Task


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ToggleSidebar ->
            ( { model | sidebarOpen = not model.sidebarOpen }, Cmd.none )

        OnLocationChange location ->
            ( { model | route = parseLocation location }, Cmd.none )

        HandleKeyboardEvent event ->
            if model.ignoreKeyEvents then
                ( model, Cmd.none )
            else
                handleKeyEvent event model

        SetIgnoreKeyEvent ignore ->
            ( { model | ignoreKeyEvents = ignore }, Cmd.none )

        FocusQuery ->
            model ! [ Task.attempt OnFocusQuery (focus "query") ]

        OnFocusQuery result ->
            case result of
                Err (Dom.NotFound id) ->
                    { model | error = Just ("Could not find dom id: " ++ id) } ! []

                Ok () ->
                    { model | error = Nothing } ! []


handleKeyEvent : KeyboardEvent -> Model -> ( Model, Cmd Msg )
handleKeyEvent event model =
    case event.key of
        Just "t" ->
            ( { model | sidebarOpen = not model.sidebarOpen }, Cmd.none )

        Just "q" ->
            model ! [ Task.attempt OnFocusQuery (focus "query") ]

        _ ->
            ( model, Cmd.none )
