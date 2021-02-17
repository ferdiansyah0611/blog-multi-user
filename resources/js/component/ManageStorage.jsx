import React from 'react'
import {
  Link,
  Redirect,
} from "react-router-dom";
import axios from 'axios';
import BreadCrumb from './tools/BreadCrumb.jsx';
import Datatables from './tools/Datatables.jsx';
/*tools*/
import BaseUrl from '../tools/Base';
import errorStatusCode from '../tools/errorStatusCode';
import print from '../tools/print';
/*context*/
import ContextDATA from '../ContextDATA';

class ManageStorageCMP extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      file: '',
      preview: '',
      link: '',
      file_upload: '',
      headers: {}
    }
    this.handle = this.handle.bind(this)
    this.upload = this.upload.bind(this)
    this.openView = this.openView.bind(this)
    this.copyLink = this.copyLink.bind(this)
    this.downloadFile = this.downloadFile.bind(this)
    this.deleteFile = this.deleteFile.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
  }
  handle(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  upload(){
    if(this.state.file_upload.length >= 1){
      for (var i = 0; i < this.state.file_upload.length; i++) {
        var formData = new FormData()
        formData.append('file_upload', this.state.file_upload[i])
        axios.post(`${BaseUrl}api/upload-usrfile`, formData).then(result => {
          this.setState({file_upload: ''})
          Swal.fire('Successfuly',result.data.message,'success');
          this.fetchAPI()
        }).catch(e => errorStatusCode(e, this.setState({redirect: '/login'})))
      }
    }
  }
  copyLink(e){
    var link = document.querySelector('input[name="link"]')
    link.focus();link.select(0,  99999999);document.execCommand('copy');M.toast({html: 'Copy Successfuly'})
  }
  downloadFile(e){
    window.open(this.state.link + '?download=true', '_blank')
  }
  deleteFile(e){
    Swal.fire({
      title: 'Confirm!',
      text: 'Do you want delete file?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if(result.isConfirmed) {
        Swal.fire({
          title: 'Loading',
          html: 'Please Wait...',
          didOpen: () => {
            Swal.showLoading()
          }
        })
        axios.get(`${BaseUrl}api/usrfile/${JSON.parse(window.localStorage.getItem('account')).data.id}/${e.target.dataset.name}?delete=true`, {headers: this.state.headers}).then(result => {
          this.setState({file: this.state.file.filter(data => data !== e.target.dataset.name)})
          Swal.fire('Successfuly',result.data.message,'success');
        }).catch(e => errorStatusCode(e, this.setState({redirect: '/login'})))
      }
    })
  }
  openView(e){
    var link = `${BaseUrl}api/usrfile/${JSON.parse(window.localStorage.getItem('account')).data.id}/${e.target.dataset.name}`
    axios.get(link).then(res => {
      var mimetype = res.headers['content-type'].split(';')[0]
      if(mimetype.match('image')){
        this.setState({preview: `<img src="${BaseUrl}api/usrfile/${JSON.parse(window.localStorage.getItem('account')).data.id}/${e.target.dataset.name}" alt="" style="max-width:100%" height="auto">`})
      }
      if(mimetype.match('video')){
        this.setState({preview: `<video width="100%" height="auto" controls><source src="${BaseUrl}api/usrfile/${JSON.parse(window.localStorage.getItem('account')).data.id}/${e.target.dataset.name}" type="${mimetype}">Your browser does not support the video tag.</video>`})
      }
      if(mimetype.match('text')){
        this.setState({preview: res.data})
      }
      this.setState({link: link})
      $('#modal-preview').modal('open');
    })
  }
  onFileChange(event) {
    this.setState({ file_upload: event.target.files }); 
  }
  componentDidMount(){
    document.title = 'Manage Storage | Go Blog'
    $('#modal-preview').modal();
    var account = window.localStorage.getItem('account')
    if(account){
      let dropzone = new Dropzone(".dropzone", {
        url: BaseUrl + "api/upload-usrfile",
        headers: {
          Authorization: JSON.parse(account).token,
          'X-CSRF-TOKEN': document.querySelector('meta[name="X-CSRF-TOKEN"]').getAttribute('content')
        },
        paramName: 'file_upload'
      }),
      _this = this;
      dropzone.on("complete", function(file) {
        dropzone.removeFile(file);
        M.toast({html: 'Upload Files Successfuly'});
        _this.fetchAPI();
      });
      dropzone.on('error', (file, message) => {
        M.toast({html: message, classes: 'red'})
      })
      this.setState({
        headers: {Authorization: JSON.parse(account).token}
      })
    }
    this.fetchAPI()
  }
  fetchAPI(){
    var account = window.localStorage.getItem('account')
    if(account){
      axios.get(`${BaseUrl}api/storage`, {headers: { Authorization :JSON.parse(account).token}}).then(result => {
        this.setState({'file': result.data.data})
      }).catch(e => errorStatusCode(e, this.setState({redirect: '/login'})))
    }
  }
  render(){
    if(this.state.redirect || !window.localStorage.getItem('account')) {
      return this.state.redirect ? <Redirect to={this.state.redirect} />: <Redirect to="/login" />
    }
    return(
      <React.Fragment>
      <BreadCrumb data={[{url: '/management/storage', str: 'Management Storage'}]} />
      <div className="row">
        <div className="col s12">
          <div className="card-panel">
            <div className="card-content">
              <div className="row">
                <div className="col s12">
                  <form action="/api/upload-usrfile" className="dropzone">
                    <div className="fallback">
                      <input name="file_upload" type="file" multiple />
                    </div>
                  </form>
                </div>
                <div className="col s12">
                  <table className="responsive-table highlight">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      Object.getOwnPropertyNames(this.state.file).map((data, key) => {
                        return(
                          <tr key={key}>
                            {
                              typeof this.state.file[data] !== 'number' ? <td>{this.state.file[data]}</td>: null
                            }
                            {
                              typeof this.state.file[data] !== 'number' ?
                              <td>
                                <button data-name={this.state.file[data]} className="btn-small blue darken-2" onClick={this.openView}><i data-name={this.state.file[data]} className="material-icons">visibility</i></button>
                                <button data-name={this.state.file[data]} onClick={this.deleteFile} style={{marginLeft:10}} className="btn-small red darken-2"><i data-name={this.state.file[data]} className="material-icons">delete</i></button>
                              </td>: null
                            }
                          </tr>
                        )
                      })
                    }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="modal-preview" className="modal modal-fixed-footer">
        <div className="modal-content">
          <input value={this.state.link} onChange={this.handle} name="link"/>
          <h4>Preview</h4>
          <div dangerouslySetInnerHTML={{ __html: this.state.preview }}/>
        </div>
        <div className="modal-footer">
          <a className="waves-effect waves-green btn-small blue white-text" style={{cursor:'pointer'}} onClick={this.downloadFile}><i className="material-icons">cloud_download</i></a>
          <a className="waves-effect waves-green btn-small red white-text" style={{marginLeft:5,cursor:'pointer'}} onClick={this.copyLink}><i className="material-icons">content_copy</i></a>
          <a className="modal-close waves-effect waves-green btn-small red darken-2 white-text" style={{marginLeft:5,cursor:'pointer'}}><i className="material-icons">close</i></a>
        </div>
      </div>
      </React.Fragment>
    )
  }
}
export default ManageStorageCMP;