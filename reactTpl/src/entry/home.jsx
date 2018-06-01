import React, { Component } from 'react'
import DocumentTitle from "react-document-title";
import { Link } from 'react-router-dom'
import action from "action/action-interface.js"
import ajax from 'action/ajax.js'
import '../css/home.scss';
import { Toast } from 'antd-mobile';
import util from "../js/common/util";

/**
 * 表示一个home。
 * @internal
 */
export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }
    render() {


        return (
            <DocumentTitle title="Hello World" >
                <div className="x-home">
                    <p>
                        Hello World
                </p>
                </div>
            </DocumentTitle>
        );
    }
}
