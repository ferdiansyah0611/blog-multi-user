import React from 'react';
import ReactDOM from 'react-dom'
import {
  Link,
  Redirect,
} from "react-router-dom";
import axios from 'axios';
import Loader from './Loader.jsx';
import { Editor } from '@tinymce/tinymce-react';
/*tools*/
import BaseUrl from '../../tools/Base';
import errorStatusCode from '../../tools/errorStatusCode';
import ContextDATA from '../../ContextDATA';

const text_truncate = function(str, length, ending) {
  return str.substring(0,length) + '...';
}

class Datatables extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      table_id: 'id-' + Math.floor(Math.random() * 1100),
      id: '',
      status: '',
      title: '',
      updated_at: '',
      description: '',
      content: '',
      data: [],
      redirect: '',
      paginate: 1,
      headers: {},
      finished: false,
      order_by: 'id',
      order_status: false,/*false: asc,true: desc*/
      q: '',
      tinymce: {
        data: {
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink link image lists charmap print preview hr anchor pagebreak',
            'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
            'table emoticons template paste help'
          ],
          toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist outdent indent | link image | print preview media fullpage | ' +
            'forecolor backcolor emoticons | help',
          menu: {
            favs: {title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons'}
          },
        }
      }
    }
    this.rightClick = this.rightClick.bind(this)
    this.nextData = this.nextData.bind(this)
    this.searching = this.searching.bind(this)
    this.removing = this.removing.bind(this)
    this.editing = this.editing.bind(this)
    this.updating = this.updating.bind(this)
    this.handle = this.handle.bind(this)
  }
  rightClick(e){
    e.preventDefault()
  }
  nextData(e){
    let url = `${this.props.url.default}?paginate=25&page=${this.state.paginate + 1}`;
    this.state.q.length > 0 ? url = `${url}&q=${this.state.q}`:''
    axios.get(url + `&order_by=${this.state.order_by}&order_status=${this.state.order_status}`,
      {
        headers: this.state.headers
      })
    .then(result => {
      if(result.data.data.length >= 1){
        this.setState({
          data: [...this.state.data, ...result.data.data],
          paginate: this.state.paginate + 1
        })
      }else{
        e.target.setAttribute('disabled', true);
        M.toast({html: 'Maximum Of Data'})
      }
    }).catch(e => errorStatusCode(e, this.setState({redirect: '/login'})))
  }
  removing(event) {
    if(event.target.value == '2'){
      const iddelete = []
      const chooseaction = document.querySelector("select[name='select_action']").value
      document.querySelectorAll("input[name='select']").forEach((text, key) => {
        if(text.checked) {
          iddelete.push(text.dataset.id)
          var texts = '', success = '', title = ''
          if(chooseaction == '1') {
            this.setState({selected: []})
            $('#modaledit').modal('open');
          }
          if(chooseaction == '2' || chooseaction == '3') {
            if(chooseaction == '2') {
              title = 'Deleted';texts = 'Do you want delete selected data';success = 'Your data has been Deleted.'
            }
            if(chooseaction == '3') {
              title = 'Archived';texts = 'Do you want archive selected data';success = 'Your data has been Archived.'
            }
            Swal.fire({
              title: 'Confirm!',
              text: texts,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
              if(result.isConfirmed) {
                if(chooseaction == '2') {
                  iddelete.forEach(d_delete => {
                    axios.delete(this.props.url.deleted + d_delete, {headers: this.state.headers}).then(response => {
                      var newcategory = this.state.data.filter((datacategory, key) => {
                        if(datacategory.id !== d_delete){
                          return true;
                        }
                      })
                      document.querySelectorAll("input[name='select']").forEach((text, key) => {
                        text.checked = false
                       })
                      this.setState({data: newcategory})
                    }).catch(e => errorStatusCode(e, this.setState({redirect: '/login'})))
                  })
                  M.toast({html: 'Successfuly delete the data', classes: 'green'})
                }
                if(chooseaction == '3') {
                  Swal.fire(title,success,'success')
                }
                event.target.value = "Choose your option"
              }
            })
          }
        }
      })
    }
  }
  searching(event) {
    let url = `${this.props.url.search}?q=${event.target.value}&paginate=25&page=${this.state.paginate}&order_by=${this.state.order_by}&order_status=${this.state.order_status}`;
    axios.get(url,
      {headers: this.state.headers})
    .then(result => {
      this.setState({data: result.data.data, q: event.target.value})
    }).catch(e => errorStatusCode(e, this.setState({redirect: '/login'})))
  }
  editing(event) {
    this.state.data.find((text, key) => {
      if(text.id == event.target.dataset.id) {
        var form = this.props.form.reduce(function(result, item, index, array) {
          result[item] = text[item];
          if(item == 'content'){
            tinymce.get('edit-content').setContent(result[item])
          }
          return result
        }, {})
        this.setState(form)
        $('#modal_edit').modal('open');
      }
    })
  }
  updating(event) {
    var _this = this
    event.target.setAttribute('disabled', true)
    var form = this.props.form.reduce(function(result, item, index, array) {
      result[item] = _this.state[item]
      /*get value state = this.state[item]*/
      if(item == 'content'){
        result[item] = tinymce.get('edit-content').getContent()
      }
      return result
    }, {})
    axios.put(this.props.url.edited + this.state.id, form, {headers: this.state.headers}).then(result => {
      this.loadData()
      event.target.removeAttribute('disabled')
      Swal.fire('Successfuly',result.data.message,'success')
      $('#modal_edit').modal('close');
    }).catch(e => errorStatusCode(e, this.setState({redirect: '/login'})))
  }
  /*HANDLING FORM*/
  handle(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  async loadData() {
    let account = window.localStorage.getItem('account'),
        url = this.props.url.default;
    if(this.props.paginate){
      url = url + '?paginate=25&page=' + this.state.paginate;
    }
    if(account){
      this.setState({headers: {Authorization: JSON.parse(account).token}})
      await axios.get(url  + `&order_by=${this.state.order_by}&order_status=${this.state.order_status}`,
        {headers: {Authorization: JSON.parse(account).token}}).then(result => {
        if(this.props.paginate){
          this.setState({
            data: result.data.data,
            finished: true
          })
        }else{
          this.setState({
            data: result.data,
            finished: true
          })
        }
      }).catch(e => console.error(e))
      var form = this.props.form.reduce(function(res, item, index, array) {
        res[item] = '';
        return res
      }, {})
      this.setState(form)
    }else{
      this.setState({redirect: '/login'})
    }
  }
  componentDidMount() {
    try{
      $('select').formSelect();
      this.loadData()
      let _this = this
      document.querySelectorAll(`#${this.state.table_id} th`).forEach((data, key) => {
        data.addEventListener('click', async e => {
          _this.setState({order_by: e.target.dataset.name})
          let account = window.localStorage.getItem('account'),
          url = this.props.url.default;
          if(this.props.paginate){
            url = url + '?paginate=25&page=' + this.state.paginate;
          }
          this.state.q.length > 0 ? url = `${url}&q=${this.state.q}`:''
          if(account){
            this.setState({headers: {Authorization: JSON.parse(window.localStorage.getItem('account')).token}})
            await axios.get(url + `&order_by=${e.target.dataset.name}&order_status=${this.state.order_status}`,
              {headers: {Authorization: JSON.parse(window.localStorage.getItem('account')).token}}).then(result => {
              if(this.props.paginate){
                this.setState({
                  data: result.data.data,
                  finished: true
                })
              }else{
                this.setState({
                  data: result.data,
                  finished: true
                })
              }
            }).catch(e => console.error(e))
          }else{
            this.setState({redirect: '/login'})
          }
        })
      })
      $(document).ready(() => {
        $('.modal').modal();
      })
    }catch(e){
      this.setState({redirect: '/login'})
    }
  }
  render() {
    if(this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return(
      <React.Fragment>
      <ContextDATA.Consumer>
      {
        result => (
          <React.Fragment>
            <div className="row">
              <div className={this.props.editable ? "input-field col s12 m6": "input-field col s12"}>
                <i className="material-icons prefix">search</i>
                <input autoComplete="off" placeholder="Search data..." type="text" defaultValue="" className="validate" onKeyUp={this.searching}/>
              </div>
              {
                this.props.editable ?
                  <div className="input-field col s12 m6">
                    <select name="select_action" defaultValue="Choose your option" onChange={this.removing}>
                      <option value="Choose your option">Choose your option</option>
                      <option value="2">Remove</option>
                    </select>
                  </div>
                :''
              }
              <div className="col s12">
                <div className="switch">
                  <label>
                    Asc
                    <input name="order_status" type="checkbox" onChange={this.handle}/>
                    <span className="lever"></span>
                    Desc
                  </label>
                </div>
              </div>
            </div>
            <table className={this.state.finished ? "responsive-table highlight": 'highlight'} id={this.state.table_id}>
              <thead>
                <tr>
                {
                  this.props.heading.map((text, key) => {
                    return(
                      <th data-name={this.props.td[key]} key={key} className="pointer">{text}</th>
                    )
                  })
                }
                {
                  this.props.editable ?
                    <React.Fragment>
                      <th className="pointer">Action</th>
                      <th>Selection</th>
                    </React.Fragment>
                  :false
                }
                </tr>
              </thead>
              <tbody>
              {
                this.state.data.map((text, key) => {
                  return(
                    <tr key={key}>
                    {
                      this.props.td.map((datatd, keytd) => {
                        return(
                          <td
                            className={'row-' + datatd}
                            data-id={text.id}
                            onContextMenu={this.rightClick}
                            key={keytd}>{text[datatd].length > 49 ? text_truncate(text[datatd], 50): text[datatd]}
                          </td>
                        )
                      })
                    }
                    {
                      this.props.editable ?
                      <React.Fragment>
                        <td>
                            <button
                              type="button"
                              data-id={text.id}
                              className={result.ui.navbar.bg + " btn darken-1"}
                              onClick={this.editing}>
                              <i data-id={text.id} className="material-icons">edit</i>
                            </button>
                        </td>
                        <td>
                          <label>
                          <input type="checkbox" data-id={text.id} name="select" className="filled-in" />
                          <span>Select</span>
                          </label>
                        </td>
                      </React.Fragment>
                      :false
                    }
                    </tr>
                  )
                })
              }
              </tbody>
            </table>
            {
              this.state.finished ? this.state.data.length == 0 ? <h6 className="center mt-10px">Empty Data</h6>: '': <Loader/>
            }
            {
              this.state.finished === 'error' ? <h6 className="center">Data Not found</h6>: ''
            }
            {
              this.props.paginate ?
                <p className="center-align">
                  <button className={"btn waves-effect waves-light mt-10px darken-1 " + result.ui.navbar.bg} onClick={this.nextData}>Load More
                    <i className="material-icons right">expand_more</i>
                  </button>
                </p>:''
            }
            <div id="modal_edit" className={this.props.hasArticle ? "modal modal-fixed-footer edit-article": 'modal modal-fixed-footer'}>
              <div className="modal-content">
                <button class="btn waves-effect waves-light darken-1 red lighten-1 modal-close" style="float: right;">Close<i class="material-icons right">close</i></button>
                <h4>Edit Data</h4>
                <div class="divider"></div>
                <p>Last Updated : {this.state.updated_at}</p>
                <div className="row mt-10px">
                {
                  this.props.form.map((text, key) => {
                    return(
                      <div key={key}>
                    {
                      this.props.type[key] == 'text' ?
                        <div className="input-field col s12">
                          <input
                            type="text"
                            className="validate"
                            name={text}
                            value={this.state[text] || ''}
                            onChange={this.handle}
                          />
                          <label className="active">{text}</label>
                        </div>
                      : false
                    }
                    {
                      this.props.type[key] == 'email' ?
                        <div className="input-field col s12">
                          <input
                            type="email"
                            className="validate"
                            name={text}
                            value={this.state[text] || ''}
                            onChange={this.handle}
                          />
                          <label className="active">{text}</label>
                        </div>
                      : false
                    }
                    {
                      this.props.type[key] == 'number' ?
                        <div className="input-field col s12">
                          <input
                            type="number"
                            className="validate"
                            name={text}
                            value={this.state[text] || ''}
                            onChange={this.handle}
                          />
                          <label className="active">{text}</label>
                        </div>
                      : false
                    }
                    {
                      this.props.type[key] == 'date' ?
                        <div className="input-field col s12">
                          <input
                            type="date"
                            className="validate"
                            name={text}
                            value={this.state[text] || ''}
                            onChange={this.handle}
                          />
                          <label className="active">{text}</label>
                        </div>
                      : false
                    }
                    {
                      this.props.type[key] == 'text-disabled' ?
                        <div className="input-field col s12">
                          <input
                            placeholder="Name"
                            type="text"
                            className="validate"
                            name={text}
                            defaultValue={this.state[text] || ''}
                            onChange={this.handle}
                            disabled
                          />
                          <label className="active">{text}</label>
                        </div>
                      : false
                    }
                    {
                      this.props.type[key] == 'number-disabled' ?
                        <div className="input-field col s12">
                          <input
                            placeholder="Name"
                            type="number"
                            className="validate"
                            name={text}
                            defaultValue={this.state[text] || ''}
                            onChange={this.handle}
                            disabled
                          />
                          <label className="active">{text}</label>
                        </div>
                      : false
                    }
                    {
                      this.props.type[key] == 'textarea' ?
                        <div className="input-field col s12">
                          <textarea className="materialize-textarea" name={text} value={this.state[text] || ''} onChange={this.handle}/>
                          <label className="active">{text}</label>
                        </div>
                      : false
                    }
                    {
                      this.props.type[key] == 'textareatinymce' ?
                        <Editor
                          id="edit-content"
                          initialValue={this.state[text]}
                          init={this.state.tinymce.data}
                          onEditorChange={this.handleEditorChange}
                          textareaName="content"
                        />
                      : false
                    }
                    {
                      this.props.type[key] == 'select|public,private' ?
                        <div className="input-field col s12">
                          <select name={text} onChange={this.handle} defaultValue="Choose option">
                            <option value="Choose your option" disabled>Choose option</option>
                            <option value="public">Public</option>
                            <option value="archive">Archives</option>
                          </select>
                        </div>
                      : false
                    }
                    {
                      this.props.type[key] == 'select|gender,female' ?
                        <div className="input-field col s12">
                          <select name={text} onChange={this.handle} defaultValue="Choose option">
                            <option value="Choose your option" disabled>Choose option</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      : false
                    }
                    {
                      this.props.type[key] == 'select|location' ?
                        <div className="input-field col s12">
                          <select className="browser-default" name={text} onChange={this.handle} defaultValue={this.state[text]}>
                            <option value="Choose your option" disabled>Choose option</option>
                            <option value={this.state[text]}>{this.state[text]}</option>
                            {
                              result.locationAPI.map((data, key) => {
                                return(<option key={key} value={data.name}>{data.name}</option>)
                              })
                            }
                          </select>
                        </div>
                      : false
                    }
                    </div>
                    )
                  })
                }
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className={"btn waves-effect waves-light darken-1 " + result.ui.navbar.bg}
                  onClick={this.updating}>
                  Submit
                  <i className="material-icons right">send</i>
                </button>
              </div>
            </div>
          </React.Fragment>
        )
      }
      </ContextDATA.Consumer>
      </React.Fragment>
    )
  }
}
export default Datatables;