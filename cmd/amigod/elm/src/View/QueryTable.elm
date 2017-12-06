module View.QueryTable exposing (queryTable)

import Utils.List as ListUtils
import Msgs exposing (Msg)
import Models exposing (QueryResponse, SchemaColumn)
import Html exposing (Html, text, div, a, span, table, thead, tbody, tr, th, td)
import Html.Attributes exposing (class, href, attribute)
import Html.Events exposing (onClick)


queryTable : Int -> Int -> QueryResponse -> Html Msg
queryTable offset chunk data =
    div []
        [ renderTopBar offset chunk (List.length data.values)
        , renderTable offset chunk data
        ]


renderTopBar : Int -> Int -> Int -> Html Msg
renderTopBar offset chunk numRows =
    let
        numPages =
            ceiling ((toFloat numRows) / (toFloat chunk))

        currentPage =
            (offset // chunk) % numPages + 1

        numLink n =
            a
                [ href "#"
                , onClick (Msgs.UpdateQueryOffset ((n * chunk) - chunk))
                , attribute "data-current" (toString <| n == currentPage)
                ]
                [ text <| toString n ]

        incLink offset txt disabled =
            if disabled then
                span [ class "disabled-link" ] [ text txt ]
            else
                a [ href "#", onClick (Msgs.UpdateQueryOffset offset) ]
                    [ text txt ]
    in
        div [ class "query-topbar" ]
            [ incLink (offset - chunk) "prev" (currentPage == 1)
            , div [ class "numbers" ] (List.map numLink (List.range 1 numPages))
            , incLink (offset + chunk) "next" (currentPage == numPages)
            ]


renderTable : Int -> Int -> QueryResponse -> Html Msg
renderTable offset chunk data =
    table []
        [ thead []
            [ tr [ class "labels" ]
                (List.map schema data.schema)
            ]
        , tbody []
            (data.values
                |> ListUtils.section offset chunk
                |> List.map row
            )
        ]


schema : SchemaColumn -> Html Msg
schema sc =
    td [] [ text (.name sc) ]


row : List String -> Html Msg
row r =
    tr [] (List.map col r)


col : String -> Html Msg
col c =
    td [] [ text c ]
