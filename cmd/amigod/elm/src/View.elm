module View exposing (..)

import Html exposing (Html, div, h1, text)
import Html.Attributes exposing (class)
import Models exposing (Model, Route(Query, Tables))
import View.Tabs exposing (tabs)
import View.Query exposing (query)
import Msgs exposing (Msg)


view : Model -> Html Msg
view model =
    div [ class "app" ]
        [ tabs model
        , div [ class "content" ] [ page model ]
        ]


page : Model -> Html Msg
page model =
    case model.route of
        Query ->
            query model

        Tables ->
            h1 [] [ text "tables" ]
