import { MapStateToProps, connect } from "react-redux";

import { AppState } from "../store";
import Lobby, { LobbyProps } from "../Components/Lobby/Lobby.component";



const mapStateToProps: MapStateToProps<LobbyProps, any, AppState> = state =>({
     user: state.user,
     isLoggedIn: state.user.isLoggedIn,
     roomState: {...state.rooms},
})


export const LobbyContainer = connect(mapStateToProps, null)(Lobby)