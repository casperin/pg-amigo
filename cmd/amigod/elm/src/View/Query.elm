module View.Query exposing (..)

import RemoteData exposing (WebData)
import Models exposing (Model, QueryResponse, SchemaColumn)
import Msgs exposing (Msg(SetIgnoreKeyEvent, RunQuery, OnUpdateQueryString))
import Msgs exposing (Msg)
import Html exposing (Html, text, div, table, textarea, button, thead, tbody, tr, th, td)
import Html.Attributes exposing (class, autofocus, defaultValue, id)
import Html.Events exposing (onClick, onFocus, onBlur, onInput)
import View.QueryTable exposing (queryTable)


query : String -> Int -> Int -> WebData QueryResponse -> Html Msg
query queryString queryOffset queryChunk queryResponse =
    div [ class "query-page" ]
        [ div [ class "query-container" ]
            [ textarea
                [ id "query"
                , autofocus True
                , defaultValue queryString
                , onInput OnUpdateQueryString
                , onFocus (SetIgnoreKeyEvent True)
                , onBlur (SetIgnoreKeyEvent False)
                ]
                []
            , button [ class "run-query-button", onClick RunQuery ] [ text "Run query" ]
            ]
        , div [ class "query-result-container" ]
            [ renderQueryTable queryOffset queryChunk queryResponse ]
        ]


renderQueryTable : Int -> Int -> WebData QueryResponse -> Html Msg
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
