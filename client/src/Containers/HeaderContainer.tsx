import { MapStateToProps, connect } from "react-redux";
import { Header } from "../Components/Header/Header.component";
import { AppState } from "../store";



const mapStateToProps: MapStateToProps<any, any, AppState> = state =>({
     ...state.user,
})


export const HeaderContainer = connect(mapStateToProps, null)(Header)