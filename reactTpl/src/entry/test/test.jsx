import React, { Component } from 'react'
import DocumentTitle from "react-document-title";
import './test.scss';

/**
 * 表示一个test。
 * @internal
 */
export default class Test extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <DocumentTitle title="" >
                <div className="x-test">
                test</div>
            </DocumentTitle>
        );
    }
}
