import axios from 'axios';
import BaseUrl from '../../tools/Base';
import errorStatusCode from '../../tools/errorStatusCode';

let Action = {
    reportUser: () => {
        axios.post(`${BaseUrl}api/user-report`, data, {
            headers: {
                Authorization: JSON.parse(window.localStorage.getItem('account')).token
            }
        }).then(result => {
            M.toast({
                html: result.data.message
            })
        })
    },
    subscribeUser: (statusSubscribe, user_subscribe_id) => {
        if (statusSubscribe == 'Subscribe') {
            if (JSON.parse(window.localStorage.getItem('account'))) {
                return axios.post(`${BaseUrl}api/article-subscribe`, {
                    user_subscribe_id: user_subscribe_id,
                }, {
                    headers: {
                        Authorization: JSON.parse(window.localStorage.getItem('account')).token
                    }
                }).then(result => {
                    M.toast({
                        html: 'Added to Subscribe'
                    })
                    return {
                        statusSubscribe: 'Subscribed'
                    }
                    /*this.setState({
                        statusSubscribe: 'Subscribed'
                    })*/
                })
            }
        }
        if (statusSubscribe == 'Subscribed') {
            if (JSON.parse(window.localStorage.getItem('account'))) {
                return axios.get(`${BaseUrl}api/article-subscribe?user_subscribe_id=${user_subscribe_id}&unsubscribe=true`, {
                    headers: {
                        Authorization: JSON.parse(window.localStorage.getItem('account')).token
                    }
                }).then(result => {
                    M.toast({
                        html: 'Remove From Subscribe'
                    })
                    return {
                        statusSubscribe: 'Subscribe'
                    }
                    /*this.setState({
                        statusSubscribe: 'Subscribe'
                    })*/
                })
            }
        }
    },
    favoriteArticle: (article_id) => {
        if(JSON.parse(window.localStorage.getItem('account'))) {
            return axios.post(`${BaseUrl}api/article-favorite`, {
                article_id: article_id
            }, {
                headers: {
                    Authorization: JSON.parse(window.localStorage.getItem('account')).token
                }
            }).then(result => {
                return {
                    response: result.data.message
                }
            }).catch(e => {
            	return{
            		response: 'error'
            	}
            })
        }
    }
}
export default Action;