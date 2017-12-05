module Commands.Query exposing (runQuery)

import Routing
import Http
import Json.Encode
import Json.Decode exposing (Decoder, at, list, string)
import Json.Decode.Pipeline exposing (decode, required, requiredAt)
import Msgs exposing (Msg)
import Models exposing (QueryResponse, SchemaColumn)
import RemoteData


runQuery : String -> Models.Model -> Cmd Msg
runQuery query model =
    Http.get (queryUrl query model) queryDecoder
        |> RemoteData.sendRequest
        |> Cmd.map Msgs.OnQueryResponse


queryUrl : String -> Models.Model -> String
queryUrl query model =
    "/api/query/"
        ++ (Routing.getDatabase model)
        ++ "?q="
        ++ (Http.encodeUri query)


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
