module Commands.Databases exposing (fetchDatabaseServer)

import Http
import Json.Encode
import Json.Decode exposing (Decoder, list, string)
import Json.Decode.Pipeline exposing (decode, requiredAt)
import Msgs exposing (Msg)
import Models exposing (DatabaseServer)
import RemoteData


fetchDatabaseServer : Cmd Msg
fetchDatabaseServer =
    Http.get databaseServerUrl databaseServerDecoder
        |> RemoteData.sendRequest
        |> Cmd.map Msgs.OnFetchDatabaseServerResponse


databaseServerUrl : String
databaseServerUrl =
    "/static/dummyDatabasesData.json"


databaseServerDecoder : Decoder DatabaseServer
databaseServerDecoder =
    decode DatabaseServer
        |> requiredAt [ "data", "databases" ] (list string)
