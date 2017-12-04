module View exposing (..)

import Html exposing (Html, button, input, div, text, textarea, hr, br)
import Html.Attributes exposing (id, class, attribute, title, value, placeholder)
import Html.Events exposing (onClick, onFocus, onBlur, onInput)
import Models exposing (Model)
import Msgs exposing (Msg(ToggleSidebar, SetIgnoreKeyEvent, RunQuery, OnUpdateQueryString))
import View.Sidebar exposing (sidebar)
import View.Query exposing (query)
import Utils.String exposing (tern)


view : Model -> Html Msg
view model =
    div [ class "app", attribute "data-sidebar" (tern model.sidebarOpen "open" "closed") ]
        [ sidebar model
        , div [ class "content" ]
            [ div [ class "query-container" ]
                [ textarea
                    [ id "query"
                    , value model.queryString
                    , onInput OnUpdateQueryString
                    , onFocus (SetIgnoreKeyEvent True)
                    , onBlur (SetIgnoreKeyEvent False)
                    , placeholder "Press \"q\" to jump to this field"
                    ]
                    []
                , button [ class "run-query-button", onClick RunQuery ] [ text "Run query" ]
                ]
            , div [ class "query-result-container" ]
                [ query model.queryResponse ]
            ]
        ]
