module View exposing (..)

import Html exposing (Html, button, input, div, text, textarea, hr, br)
import Html.Attributes exposing (id, class, attribute, title)
import Html.Events exposing (onClick, onFocus, onBlur)
import Models exposing (Model)
import Msgs exposing (Msg(ToggleSidebar, SetIgnoreKeyEvent, RunQuery))
import View.Sidebar exposing (sidebar)
import View.Query exposing (query)
import Utils.String exposing (tern)


view : Model -> Html Msg
view model =
    div [ class "app", attribute "data-sidebar" (tern model.sidebarOpen "open" "closed") ]
        [ sidebar model
        , div [ class "content" ]
            [ button [ onClick ToggleSidebar, title "Toggle the sidebar [t]" ] [ text "Toggle sidebar [t]" ]
            , div [] [ text ("Sidebar open: " ++ toString model.sidebarOpen) ]
            , textarea [ id "query", onFocus (SetIgnoreKeyEvent True), onBlur (SetIgnoreKeyEvent False) ] []
            , br [] []
            , button [ onClick RunQuery ] [ text "Run query" ]
            , div [] [ text ("Ignore key events: " ++ toString model.ignoreKeyEvents) ]
            , text "Press \"q\" to focus on query field"
            , hr [] []
            , query model.queryResponse
            ]
        ]
