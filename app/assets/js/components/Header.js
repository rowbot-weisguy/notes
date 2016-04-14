import React from 'react';
import autobind from 'autobind-decorator';
import config from '../helpers/config';

@autobind
export default class Header extends React.Component {
    sidebarButtonHandler() {
        if (this.props.sidebar === 'IS_CLOSED') {
            this.props.openSidebar();
        } else {
            this.props.closeSidebar();
        }
    }

    render() {
        return (
            <nav className="layout__header header">
                <div className="header__left">
                    <button className={"sidebar-control " + (this.props.sidebar === 'IS_OPEN' ? "is-open" : "")} onClick={this.sidebarButtonHandler}>
                        <span className="sidebar-control__icon"></span>
                    </button>
                </div>
                <div className="header__center">
                    <h1 className="site-title">{config.name}</h1>
                </div>
                <div className="header__right">
                    <button className="button button--create" onClick={this.props.createNote}><i className="icon-edit-alt"></i><span className="u-sm-hide">{config.actions.create}</span></button>
                </div>
            </nav>
        )
    }
}
