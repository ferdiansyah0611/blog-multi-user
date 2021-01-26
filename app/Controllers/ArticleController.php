<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Controllers\AuthController;

class ArticleController extends ResourceController
{
    protected $modelName = 'App\Models\ArticleModel';
    protected $format    = 'json';

    public function __construct()
    {
        $this->protect = new AuthController();
    }
    public function index()
    {
        if($this->request->getGet('users')){
            $data = $this->model->onWhere(['app_article.status' => 'public', 'app_article.user_id' => $this->request->getGet('users')], ['app_article.created_at', 'DESC'], 8);
            return $this->respond($data);
        }
        if($this->request->getGet('paginate')){
            $check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
            if(!empty($check->{'message'}) && $check->message == 'Access Granted'){
                $data = $this->model->onWhere(['app_article.status' => 'public', 'app_article.user_id' => $check->data->id], ['app_article.created_at', 'DESC'], $this->request->getGet('manage'));
                return $this->respond($data);
            }
        }
        if($this->request->getGet('popular')){
            $data = $this->model->onWhere(['app_article.status' => 'public'], ['app_article.views', 'DESC'], 8);
            return $this->respond($data);
        }
        if($this->request->getGet('latest')){
            $data = $this->model->onWhere(['app_article.status' => 'public'], ['app_article.created_at', 'DESC'], 2128538, 8);
            return $this->respond($data);
        }
        if($this->request->getGet('search')){
            $data = $this->model->onSearch(['app_article.status' => 'public'], ['app_article.created_at', 'DESC'], $this->request->getGet('search'), 8);
            return $this->respond($data);
        }
        if($this->request->getGet('total')){
            $check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
            if(!empty($check->{'message'}) && $check->message == 'Access Granted'){
                $db = \Config\Database::connect();
                $build = ['total' => $db->table('app_article')->where('user_id', $check->data->id)->countAllResults()];
                return $this->respond($build);
            }
        }
        if($this->request->getGet('default')){
            $data = [
                'data' => $this->model->select('app_article.*, app_user.name, app_user.avatar, app_user.location, app_user.gender')
                ->join('app_user', 'app_article.user_id = app_user.id')->where('app_article.status', 'public')->orderBy('app_article.id', 'RANDOM')->paginate(8)
            ];
            return $this->respond($data);
        }
    }
    public function show($id = null)
    {
        $data = $this->model->select('app_article.*, app_user.name, app_user.avatar')
        ->join('app_user', 'app_article.user_id = app_user.id')
        ->where('app_article.id', $id)->get()->getRow();
        return $this->respond($data);
    }
    public function create()
    {
        // $validation =  \Config\Services::validation();
        // $validation->setRules([
        //     'category_id' => 'required',
        //     'password' => 'required|min_length[10]'
        // ]);
        $check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
        if(!empty($check->{'message'}) && $check->message == 'Access Granted'){
            $files = $this->request->getFile('image');
            $files->move(WRITEPATH.'uploads/'. $check->data->id);
        	$this->model->insert_data([
                'user_id' => $check->data->id,
                'category_id' => $this->request->getPost('category_id'),
                'title' => $this->request->getPost('title'),
                'content' => $this->request->getPost('content'),
                'description' => $this->request->getPost('description'),
                'image' => $files->getName(),
                'status' => $this->request->getPost('status'),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ]);
            return $this->respond(['message' => 'Successfuly add data']);
        }else{
            return $this->respond(['message' => 'Access Denied'], 401);
        }
    }
    public function update($id = null)
    {
        $check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
        if(!empty($check->{'message'}) && $check->message == 'Access Granted'){
            $data = $this->request->getJSON(true);
            if($this->request->getFile('image')) {
                $files = $this->request->getFile('image');
                $files->move(WRITEPATH.'uploads/'. $check->data->id);
                $data['image'] = $files->getName();
            }
            $data['updated_at'] = date('Y-m-d H:i:s');
        	$this->model->update_data($data, $id);
            return $this->respond(['message' => 'Successfuly update data']);
        }else{
            return $this->respond(['message' => 'Access Denied'], 401);
        }
    }
    public function delete($id = null)
    {
        $check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
        if(!empty($check->{'message'}) && $check->message == 'Access Granted'){
        	$this->model->delete_data($id);
            return $this->respond(['message' => 'Successfuly delete data']);
        }else{
            return $this->respond(['message' => 'Access Denied'], 401);
        }
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