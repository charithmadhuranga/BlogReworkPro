/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/9/24
 * Description:
 */

import React, {Component, PropTypes} from 'react';

import Modal from 'react-modal';
import QrCode from 'qrcode.react';

import config from '../../config';
import * as themeReducer from '../reducers/theme';
import * as shareInfoReducer from '../reducers/shareInfo';

import '../theme/css/share.css';


export default class Share extends Component {
    static propTypes = {
        theme: PropTypes.object,
        info: PropTypes.object
    };

    static defaultProps = {
        theme: themeReducer.defaultState,
        info: shareInfoReducer.defaultState
    };

    state = {
        openModal: false
    };

    openModal() {
        this.setState({showModal: true});
    }

    closeModal() {
        this.setState({showModal: false});
    }

    format(url: string) {
        const data = this.props.info;
        return url.replace(/\{\{(\w)(\w*)\}\}/g, (m, fix, k) => {
            const key = (fix + k).toLowerCase();
            return (data[key] || '');
        });
    }

    render() {
        const modalStyle = {
            overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                overflow: 'auto'
            },
            content: {
                width: 180,
                height: 360,
                margin: 'auto',
                backgroundColor: config.themeColor[this.props.theme],
                opacity: 0.9,
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '20px',
                transition: 'all 150ms ease-in'
            }
        };
        return (
            <div
                className="share"
            >
                <button
                    className="share-button home-icon-share"
                    onClick={this.openModal}
                />
                <Modal
                    key='modal'
                    className="share-window"
                    isOpen={this.state.openModal}
                    onRequestClose={::this.closeModal}
                    style={modalStyle}

                >
                    <div
                        style={{
                            marginLeft: 5,
                            border: '5px solid #eee'
                        }}
                    >
                        <QrCode
                            key='qr-code'
                            value={this.props.info.url}
                            size={160}
                            fgColor={config.themeColor[this.props.theme]}
                            level='M'
                        />
                    </div>
                    {
                        config.shareTemplates.map((template, index) =>
                            <a
                                key={index}
                                target='_blank'
                                href={this.format(template[1])}
                                className={`share-icon icon-${template[0]}`}
                            />
                        )
                    }
                </Modal>
            </div>
        );
    }
}