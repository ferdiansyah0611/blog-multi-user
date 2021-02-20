<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Controllers\AuthController;

class UserUiController extends ResourceController
{
    protected $modelName = 'App\Models\UserUiModel';
    protected $format    = 'json';

    public function __construct()
    {
        $this->protect = new AuthController();
    }
    public function index()
    {
        if($this->request->getGet('users')){
            $data = $this->model->select('app_user_ui.user_id, app_user_ui.profil-cover')->get()->getRow();
            return $this->respond($data);
        }else{
            $check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
            if(!empty($check->{'message'}) && $check->message == 'Access Granted'){
                $data = $this->model->select('*')->where('user_id', $check->data->id)->get()->getRow();
                return $this->respond($data);
            }else{
                return $this->respond(['message' => 'Access Denied'], 401);
            }
        }
    }
    public function show($id = null)
    {
        $data = $this->model->select('app_article.*, app_user.name, app_user.avatar, app_user.bio')
        ->join('app_user', 'app_article.user_id = app_user.id')
        ->where('app_article.id', $id)->get()->getRow();
        return $this->respond($data);
    }
    public function create()
    {
        $validation =  \Config\Services::validation();
        $validation->setRules([
            'navbar-bg' => 'required|string|min_length[2]|max_length[100]',
            'navbar-txt' => 'required|string|min_length[2]|max_length[100]',
            'sidebar-bg' => 'required|string|min_length[2]|max_length[100]',
            'sidebar-txt' => 'required|string|min_length[2]|max_length[100]',
            'footer-bg' => 'required|string|min_length[2]|max_length[100]',
            'footer-status' => 'required|string|min_length[2]|max_length[100]',
        ]);
        if($validation->withRequest($this->request)->run() === true)
        {
            $check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
            if(!empty($check->{'message'}) && $check->message == 'Access Granted'){
                $data = [
                    'user_id' => $check->data->id,
                    'navbar-bg' => $this->request->getPost('navbar-bg'),
                    'navbar-txt' => $this->request->getPost('navbar-txt'),
                    'sidebar-bg' => $this->request->getPost('sidebar-bg'),
                    'sidebar-txt' => $this->request->getPost('sidebar-txt'),
                    'footer-bg' => $this->request->getPost('footer-bg'),
                    'footer-status' => $this->request->getPost('footer-status'),
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s')
                ];
                if($this->request->getFile('sidebar-cover')){
                    $files = $this->request->getFile('sidebar-cover');
                    $files->move(WRITEPATH.'uploads/'. $check->data->id);
                    $data['sidebar-cover'] = $files->getName();
                }
                if($this->request->getFile('profil-cover')){
                    $files = $this->request->getFile('profil-cover');
                    $files->move(WRITEPATH.'uploads/'. $check->data->id);
                    $data['profil-cover'] = $files->getName();
                }
            	$this->model->insert_data($data);
                return $this->respond(['message' => 'Successfuly add data']);
            }else{
                return $this->respond(['message' => 'Access Denied'], 401);
            }
        }else{
            return $this->respond(['message' => $validation->listErrors()], 400);
        }
    }
    public function update($id = null)
    {
        $validation =  \Config\Services::validation();
        $validation->setRules([
            'navbar-bg' => 'required|string|min_length[2]|max_length[100]',
            'navbar-txt' => 'required|string|min_length[2]|max_length[100]',
            'sidebar-bg' => 'required|string|min_length[2]|max_length[100]',
            'sidebar-txt' => 'required|string|min_length[2]|max_length[100]',
            'footer-status' => 'required|min_length[2]|max_length[100]',
        ]);
        if($validation->withRequest($this->request)->run() === true)
        {
            $check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
            if(!empty($check->{'message'}) && $check->message == 'Access Granted'){
                $data = [
                    'navbar-bg' => $this->request->getPost('navbar-bg'),
                    'navbar-txt' => $this->request->getPost('navbar-txt'),
                    'sidebar-bg' => $this->request->getPost('sidebar-bg'),
                    'sidebar-txt' => $this->request->getPost('sidebar-txt'),
                    'footer-bg' => $this->request->getPost('footer-bg'),
                    'footer-status' => $this->request->getPost('footer-status'),
                    'updated_at' => date('Y-m-d H:i:s')
                ];
                if($this->request->getFile('sidebar-cover')){
                    $files = $this->request->getFile('sidebar-cover');
                    $files->move(WRITEPATH.'uploads/'. $check->data->id);
                    $data['sidebar-cover'] = $files->getName();
                }
                if($this->request->getFile('profil-cover')){
                    $files = $this->request->getFile('profil-cover');
                    $files->move(WRITEPATH.'uploads/'. $check->data->id);
                    $data['profil-cover'] = $files->getName();
                }
                $checkui = $this->model->where('user_id', $check->data->id)->get()->getRow();
                if($checkui->id)
                {
                    $this->model->update(['id' => $id], $data);
                    return $this->respond(['message' => 'Successfuly Update The Ui']);
                }
                else{
                    $data->id = rand();
                    $data->user_id = $check->data->id;
                    $data->updated_at = date('Y-m-d H:i:s');
                    $this->model->insert($data);
                    return $this->respond(['message' => 'Successfuly Update The Ui']);
                }
            }else{
                return $this->respond(['message' => 'Access Denied'], 401);
            }
        }else{
            return $this->respond(['message' => $validation->listErrors()], 400);
        }
    }
    public function delete($id = null)
    {
        return $this->respond(['message' => 'Access Denied'], 401);
    }
    public function category($id = null)
    {
        $data = [
            'data' => $this->model->select('app_article.*, app_user.name, app_user.avatar')
            ->join('app_user', 'app_article.user_id = app_user.id')->where('app_article.category_id', $id)
            ->whereNotIn('app_article.id', [$this->request->getGet('article_id')])
            ->orderBy('app_article.id', 'RANDOM')->paginate(8),
            'pager' => $this->model->pager->links()
        ];
        return $this->respond($data);
    }
}