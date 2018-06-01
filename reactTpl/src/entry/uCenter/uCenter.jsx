import React, { Component } from 'react'
import DocumentTitle from "react-document-title";
import './uCenter.scss';

/**
 * 表示一个uCenter。
 * @internal
 */
export default class UCenter extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <DocumentTitle title="" >
                <div className="x-ucenter">用户中心
                </div>
            </DocumentTitle>
        );
    }
}
