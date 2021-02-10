import React from 'react';
import ReactDOM from 'react-dom'
import {
  Link,
  Redirect,
} from "react-router-dom";
import axios from 'axios';
import Loader from './Loader.jsx';
/*tools*/
import BaseUrl from '../../tools/Base';
import errorStatusCode from '../../tools/errorStatusCode';

const text_truncate = function(str, length, ending) {
  return str.substring(0,length) + '...';
}

class Datatables extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
      finished: false
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
    axios.get(`${this.props.url.default}?paginate=25&page=${this.state.paginate + 1}`, {headers: this.state.headers}).then(result => {
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
                      Swal.fire(title,response.data.message,'success')
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
    axios.get(this.props.url.search + '?q=' + event.target.value, {headers: this.state.headers}).then(result => {
      this.setState({data: result.data})
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
      this.setState({headers: {Authorization: JSON.parse(window.localStorage.getItem('account')).token}})
      await axios.get(url, {headers: {Authorization: JSON.parse(window.localStorage.getItem('account')).token}}).then(result => {
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
      }).catch(e => errorStatusCode(e, this.setState({redirect: '/login'})))
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
    this.loadData()
    var tiny = new tinymce.Editor('edit-content', {
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
      menubar: 'favs file edit view insert format tools table help',
    }, tinymce.EditorManager);
    tiny.render();
  }
  render() {
    if(this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return(
      <React.Fragment>
        <div className="row">
          <div className="input-field col s12 m6">
            <i className="material-icons prefix">search</i>
            <input placeholder="Search data..." id="first_name" type="text" defaultValue="" className="validate" onKeyUp={this.searching}/>
          </div>
          <div className="input-field col s12 m6">
            <select name="select_action" defaultValue="Choose your option" className="browser-default" onChange={this.removing}>
              <option value="Choose your option">Choose your option</option>
              <option value="2">Remove</option>
            </select>
          </div>
        </div>
        <table className="responsive-table highlight">
          <thead>
            <tr>
            {
              this.props.heading.map((text, key) => {
                return(
                  <th key={key} className="pointer">{text}</th>
                )
              })
            }
            <th className="pointer">Action</th>
            <th>Selection</th>
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
                      <td className={'row-' + datatd} data-id={text.id} onContextMenu={this.rightClick} key={keytd}>{text[datatd].length > 49 ? text_truncate(text[datatd], 50): text[datatd]}</td>
                    )
                  })
                }
                  <td>
                      <button type="button" data-id={text.id} className="btn blue" onClick={this.editing}><i data-id={text.id} className="material-icons">edit</i></button>
                  </td>
                  <td>
                    <label>
                    <input type="checkbox" data-id={text.id} name="select" className="filled-in" />
                    <span>Select</span>
                    </label>
                  </td>
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
          this.props.paginate ? <p className="center-align"><button className="btn waves-effect waves-light blue" onClick={this.nextData}>Load More<i className="material-icons right">expand_more</i></button></p>:''
        }
        <div id="modal_edit" className={this.props.hasArticle ? "modal modal-fixed-footer edit-article": 'modal modal-fixed-footer'}>
          <div className="modal-content">
            <h4>Edit Data</h4>
            <p>Last Updated : {this.state.updated_at}</p>
            <div className="row mt-10px">
            {
              this.props.form.map((text, key) => {
                return(
                  <div key={key}>
                {
                  this.props.type[key] == 'text' ?
                    <div className="input-field col s12">
                      <input placeholder="Name" id="last_name" type="text" className="validate" name={text} value={this.state[text] || ''} onChange={this.handle}/>
                      <label className="active" htmlFor="email">{text}</label>
                    </div>
                  : false
                }
                {
                  this.props.type[key] == 'number' ?
                    <div className="input-field col s12">
                      <input placeholder="Name" id="last_name" type="number" className="validate" name={text} value={this.state[text] || ''} onChange={this.handle}/>
                      <label className="active" htmlFor="email">{text}</label>
                    </div>
                  : false
                }
                {
                  this.props.type[key] == 'text-disabled' ?
                    <div className="input-field col s12">
                      <input placeholder="Name" id="last_name" type="text" className="validate" name={text} defaultValue={this.state[text] || ''} onChange={this.handle} disabled/>
                      <label className="active" htmlFor="email">{text}</label>
                    </div>
                  : false
                }
                {
                  this.props.type[key] == 'number-disabled' ?
                    <div className="input-field col s12">
                      <input placeholder="Name" id="last_name" type="number" className="validate" name={text} defaultValue={this.state[text] || ''} onChange={this.handle} disabled/>
                      <label className="active" htmlFor="email">{text}</label>
                    </div>
                  : false
                }
                {
                  this.props.type[key] == 'textarea' ?
                    <div className="input-field col s12">
                      <textarea className="materialize-textarea" name={text} value={this.state[text] || ''} onChange={this.handle}/>
                      <label className="active" htmlFor="email">{text}</label>
                    </div>
                  : false
                }
                {
                  this.props.type[key] == 'textareatinymce' ?
                    <div className="input-field col s12">
                      <div className="col s12" id="edit-content"/>
                    </div>
                  : false
                }
                {
                  this.props.type[key] == 'select' ?
                    <select name={text} onChange={this.handle} defaultValue="Choose option" className="browser-default">
                      <option value="Choose your option" disabled>Choose option</option>
                      <option value="public">Public</option>
                      <option value="archive">Archives</option>
                    </select>
                  : false
                }
                </div>
                )
              })
            }
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn waves-effect waves-light blue" onClick={this.updating}>Submit<i className="material-icons right">send</i></button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default Datatables;