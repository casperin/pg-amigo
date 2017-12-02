module Commands.Query exposing (runQuery)

import Http
import Json.Encode
import Json.Decode exposing (Decoder, at, list, string, int, succeed, fail, andThen)
import Json.Decode.Pipeline exposing (decode, required, requiredAt)
import Msgs exposing (Msg)
import Models exposing (QueryResponse, SchemaColumn)
import RemoteData


runQuery : String -> Cmd Msg
runQuery _ =
    Http.get queryUrl queryDecoder
        |> RemoteData.sendRequest
        |> Cmd.map Msgs.OnQueryResponse


queryUrl : String
queryUrl =
    "/static/dummyData.json"


queryDecoder : Decoder QueryResponse
queryDecoder =
    decode QueryResponse
        |> requiredAt [ "data", "schema" ] schemaDecoder
        |> requiredAt [ "data", "values" ] valuesDecoder


schemaDecoder : Decoder (List SchemaColumn)
schemaDecoder =
    list schemaColumnDecoder


schemaColumnDecoder : Decoder SchemaColumn
schemaColumnDecoder =
    decode SchemaColumn
        |> required "name" string


valuesDecoder : Decoder (List (List String))
valuesDecoder =
    list (list string)
