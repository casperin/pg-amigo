module View.Query exposing (..)

import RemoteData exposing (WebData)
import Models exposing (Model, QueryResponse, SchemaColumn)
import Msgs
import Html exposing (Html, text, div, select, option, table, textarea, button, thead, tbody, tr, th, td)
import Html.Attributes exposing (class, autofocus, defaultValue, id, value, disabled)
import Html.Events exposing (onClick, onFocus, onBlur, onInput, on, targetValue)
import Html.Keyed as Keyed
import View.QueryTable exposing (queryTable)
import Json.Decode


query : String -> Int -> Int -> WebData QueryResponse -> List String -> Int -> Html Msgs.Msg
query queryString queryOffset queryChunk queryResponse queryHistory queryKey =
    div [ class "query-page" ]
        [ div [ class "query-container" ]
            [ Keyed.node "div"
                [ class "query-textarea-container" ]
                [ ( toString queryKey
                  , textarea
                        [ id "query"
                        , autofocus True
                        , defaultValue queryString
                        , onInput Msgs.OnUpdateQueryString
                        , onFocus (Msgs.SetIgnoreKeyEvent True)
                        , onBlur (Msgs.SetIgnoreKeyEvent False)
                        ]
                        []
                  )
                ]
            , div [ class "query-controls" ]
                [ button [ class "run-query-button", onClick Msgs.RunQuery ] [ text "Run query" ]
                , select
                    [ disabled <| List.isEmpty queryHistory
                    , class "history-select"
                    , on "change" (Json.Decode.map Msgs.OnForceUpdateQueryString targetValue)
                    ]
                    (option [ value "" ] [ text "History" ]
                        :: (List.map
                                (\q -> option [ value q ] [ text q ])
                                queryHistory
                           )
                    )
                ]
            ]
        , div [ class "query-result-container" ]
            [ renderQueryTable queryOffset queryChunk queryResponse ]
        ]


renderQueryTable : Int -> Int -> WebData QueryResponse -> Html Msgs.Msg
renderQueryTable offset chunk resp =
    case resp of
        RemoteData.NotAsked ->
            text "No query"

        RemoteData.Loading ->
            text "Loading..."

        RemoteData.Failure error ->
            text (toString error)

        RemoteData.Success data ->
            queryTable offset chunk data
