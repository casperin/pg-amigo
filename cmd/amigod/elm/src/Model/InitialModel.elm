module Model.InitialModel exposing (createInitialModel)

import RemoteData
import Model exposing (Model, Route(Home))


createInitialModel location =
    { history = [ location ]
    , route = Home
    , db = Maybe.Nothing
    , dbServer = RemoteData.Loading
    }
