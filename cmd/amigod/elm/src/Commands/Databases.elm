module Commands.Databases exposing (fetchStructure)

import Http
import Json.Encode
import Json.Decode exposing (Decoder, list, string)
import Json.Decode.Pipeline exposing (decode, required, optional)
import Msgs exposing (Msg)
import Models exposing (DatabaseSchema, Structure)
import RemoteData


fetchStructure : Cmd Msg
fetchStructure =
    Http.get structureUrl structureDecoder
        |> RemoteData.sendRequest
        |> Cmd.map Msgs.OnFetchDatabasesResponse


structureUrl : String
structureUrl =
    "/static/dummyDatabasesData.json"


structureDecoder : Decoder Structure
structureDecoder =
    decode Structure
        |> required "data" (list databaseDecoder)


databaseDecoder : Decoder DatabaseSchema
databaseDecoder =
    decode DatabaseSchema
        |> required "name" string
        |> required "kind" string
        |> optional "tables" (list string) []
        |> optional "views" (list string) []
