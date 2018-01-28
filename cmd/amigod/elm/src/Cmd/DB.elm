module Cmd.DB exposing (fetchDBServer)

import Http
import Json.Encode
import Json.Decode exposing (Decoder, list, string)
import Json.Decode.Pipeline exposing (decode, requiredAt)
import Update exposing (Msg)
import Model exposing (DBServer)
import RemoteData


fetchDBServer : Cmd Msg
fetchDBServer =
    Http.get "/api/database-server" databaseServerDecoder
        |> RemoteData.sendRequest
        |> Cmd.map Update.OnFetchDBServer


databaseServerDecoder : Decoder DBServer
databaseServerDecoder =
    decode DBServer
        |> requiredAt [ "data", "databases" ] (list string)
