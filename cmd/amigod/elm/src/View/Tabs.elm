module View.Tabs exposing (..)

import Utils.String exposing (tern)
import Html exposing (Html, button, div, text, ul, li, select, option, a)
import Html.Attributes exposing (class, value, disabled, href)
import Html.Events as Events
import Msgs
import Models exposing (Model, Route(Query, Tables), SimpleRoute(SQuery, STables))
import RemoteData exposing (WebData)
import Routing


tabs : Model -> Html Msgs.Msg
tabs model =
    case model.databaseServer of
        RemoteData.NotAsked ->
            div [ class "tabs" ] [ text "" ]

        RemoteData.Loading ->
            div [ class "tabs" ] [ text "Loading..." ]

        RemoteData.Failure err ->
            div [ class "tabs" ] [ text <| toString err ]

        RemoteData.Success databaseServer ->
            div [ class "tabs" ]
                [ div [ class "database-selector" ]
                    [ select
                        [ disabled (List.isEmpty databaseServer.databases)
                        , Events.onInput Msgs.OnUpdateDatabase
                        ]
                        (List.map
                            (\db -> option [ value db ] [ text db ])
                            databaseServer.databases
                        )
                    ]
                , a
                    [ href <| Routing.routeToUrl SQuery model
                    , class <| tern (Routing.isRoute SQuery model) "current" ""
                    ]
                    [ text "Query" ]
                , a
                    [ href <| Routing.routeToUrl STables model
                    , class <| tern (Routing.isRoute STables model) "current" ""
                    ]
                    [ text "Tables" ]
                ]
